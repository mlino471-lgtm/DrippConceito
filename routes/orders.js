const express = require('express');
const router = express.Router();
const db = require('../database');
const { authenticateToken } = require('../middleware/auth');

/**
 * POST /api/orders/apply-coupon
 * Validação e cálculo de desconto de cupom
 */
router.post('/apply-coupon', (req, res) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Código do cupom é obrigatório.'
      });
    }

    const orderSubtotal = parseFloat(subtotal) || 0;
    const cleanCode = code.trim().toUpperCase();

    const coupon = db.prepare(`
      SELECT * FROM coupons 
      WHERE code = ? AND active = 1
    `).get(cleanCode);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Cupom de desconto inválido ou inexistente.'
      });
    }

    // Verifica validade de data
    if (coupon.expires_at) {
      const expirationDate = new Date(coupon.expires_at);
      if (new Date() > expirationDate) {
        return res.status(400).json({
          success: false,
          message: 'Este cupom de desconto já expirou.'
        });
      }
    }

    // Verifica limite de uso
    if (coupon.max_uses && coupon.used_count >= coupon.max_uses) {
      return res.status(400).json({
        success: false,
        message: 'O limite máximo de utilização deste cupom foi atingido.'
      });
    }

    // Verifica valor mínimo do pedido
    if (coupon.min_order_value && orderSubtotal < coupon.min_order_value) {
      return res.status(400).json({
        success: false,
        message: `Este cupom é válido apenas para compras acima de R$ ${coupon.min_order_value.toFixed(2)}.`
      });
    }

    // Calcula valor do desconto
    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = (orderSubtotal * coupon.value) / 100;
    } else {
      discount = Math.min(coupon.value, orderSubtotal);
    }

    discount = Math.round(discount * 100) / 100;

    return res.json({
      success: true,
      message: 'Cupom de desconto aplicado com sucesso!',
      coupon: {
        id: coupon.id,
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discount_amount: discount
      }
    });
  } catch (error) {
    console.error('Erro ao aplicar cupom:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao validar cupom de desconto.'
    });
  }
});

/**
 * POST /api/orders
 * Criação de um novo pedido (autenticação necessária)
 */
router.post('/', authenticateToken, (req, res) => {
  try {
    const {
      items,
      shipping_address,
      payment_method,
      coupon_code,
      shipping = 20.0,
      notes = ''
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'O carrinho está vazio. Adicione produtos para finalizar a compra.'
      });
    }

    if (!payment_method) {
      return res.status(400).json({
        success: false,
        message: 'Selecione a forma de pagamento desejada (PIX, Cartão de Crédito ou Boleto).'
      });
    }

    // Endereço de entrega
    let finalAddress = shipping_address;
    if (!finalAddress) {
      // Utiliza o endereço padrão do usuário
      finalAddress = {
        recipient_name: req.user.name,
        street: req.user.address_street,
        number: req.user.address_number,
        complement: req.user.address_complement,
        neighborhood: req.user.address_neighborhood,
        city: req.user.address_city,
        state: req.user.address_state,
        cep: req.user.address_cep,
        phone: req.user.phone
      };
    }

    if (!finalAddress.street || !finalAddress.number || !finalAddress.cep) {
      return res.status(400).json({
        success: false,
        message: 'Endereço de entrega incompleto. Por favor, preencha rua, número e CEP.'
      });
    }

    // Validação dos itens e cálculo do subtotal baseado nos preços reais do banco
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      if (!item.product_id || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Itens do pedido inválidos.'
        });
      }

      const product = db.prepare('SELECT * FROM products WHERE id = ? AND active = 1').get(item.product_id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Produto ID ${item.product_id} não encontrado ou indisponível.`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Estoque insuficiente para o produto "${product.name}". Disponível: ${product.stock} unidade(s).`
        });
      }

      const unitPrice = parseFloat(product.price);
      const itemTotal = Math.round(unitPrice * item.quantity * 100) / 100;
      subtotal += itemTotal;

      let productImages = [];
      try {
        productImages = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      } catch {
        productImages = [];
      }

      validatedItems.push({
        product_id: product.id,
        product_name: product.name,
        product_image: productImages[0] || '/uploads/products/placeholder.jpg',
        size: item.size || 'Único',
        color: item.color || 'Padrão',
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: itemTotal
      });
    }

    subtotal = Math.round(subtotal * 100) / 100;

    // Cálculo do cupom se informado
    let discount = 0;
    let couponRecord = null;
    if (coupon_code) {
      const cleanCode = coupon_code.trim().toUpperCase();
      couponRecord = db.prepare('SELECT * FROM coupons WHERE code = ? AND active = 1').get(cleanCode);

      if (couponRecord) {
        let isExpired = couponRecord.expires_at && new Date() > new Date(couponRecord.expires_at);
        let maxReached = couponRecord.max_uses && couponRecord.used_count >= couponRecord.max_uses;
        let minValOk = !couponRecord.min_order_value || subtotal >= couponRecord.min_order_value;

        if (!isExpired && !maxReached && minValOk) {
          if (couponRecord.type === 'percentage') {
            discount = (subtotal * couponRecord.value) / 100;
          } else {
            discount = Math.min(couponRecord.value, subtotal);
          }
          discount = Math.round(discount * 100) / 100;
        }
      }
    }

    const shippingCost = parseFloat(shipping) || 0;
    const total = Math.max(0, Math.round((subtotal + shippingCost - discount) * 100) / 100);

    // Gerador de número de pedido exclusivo DRIPP
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `DP-${dateStr}-${randomSuffix}`;

    // Executa inserção com transação segura do SQLite
    const createOrderTx = db.transaction(() => {
      const orderInsert = db.prepare(`
        INSERT INTO orders (
          order_number, user_id, status, subtotal, shipping, discount, total,
          shipping_address, payment_method, payment_status, notes
        ) VALUES (?, ?, 'pending', ?, ?, ?, ?, ?, ?, 'pending', ?)
      `);

      const orderResult = orderInsert.run(
        orderNumber,
        req.user.id,
        subtotal,
        shippingCost,
        discount,
        total,
        JSON.stringify(finalAddress),
        payment_method,
        notes
      );

      const orderId = orderResult.lastInsertRowid;

      // Inserção dos itens e decremento do estoque
      const itemInsert = db.prepare(`
        INSERT INTO order_items (
          order_id, product_id, product_name, product_image, size, color, quantity, unit_price, total_price
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const decrementStock = db.prepare(`
        UPDATE products 
        SET stock = MAX(0, stock - ?), updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `);

      for (const item of validatedItems) {
        itemInsert.run(
          orderId,
          item.product_id,
          item.product_name,
          item.product_image,
          item.size,
          item.color,
          item.quantity,
          item.unit_price,
          item.total_price
        );
        decrementStock.run(item.quantity, item.product_id);
      }

      // Se usou cupom válido, incrementa contagem
      if (couponRecord) {
        db.prepare('UPDATE coupons SET used_count = used_count + 1 WHERE id = ?').run(couponRecord.id);
      }

      return orderId;
    });

    const orderId = createOrderTx();

    const createdOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    const orderItems = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(orderId);

    return res.status(201).json({
      success: true,
      message: 'Pedido realizado com sucesso! O drip está a caminho.',
      order: {
        ...createdOrder,
        shipping_address: JSON.parse(createdOrder.shipping_address),
        items: orderItems
      }
    });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao processar seu pedido. Tente novamente mais tarde.'
    });
  }
});

/**
 * GET /api/orders
 * Lista de pedidos do usuário autenticado
 */
router.get('/', authenticateToken, (req, res) => {
  try {
    const orders = db.prepare(`
      SELECT o.*, COUNT(oi.id) as total_items
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      WHERE o.user_id = ?
      GROUP BY o.id
      ORDER BY o.id DESC
    `).all(req.user.id);

    const formattedOrders = orders.map(order => ({
      ...order,
      shipping_address: order.shipping_address ? JSON.parse(order.shipping_address) : null
    }));

    return res.json({
      success: true,
      orders: formattedOrders
    });
  } catch (error) {
    console.error('Erro ao listar pedidos do usuário:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao listar pedidos.'
    });
  }
});

/**
 * GET /api/orders/:id
 * Detalhes de um pedido específico
 */
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;

    let order;
    if (!isNaN(id)) {
      order = db.prepare(`
        SELECT * FROM orders 
        WHERE (id = ? OR order_number = ?) AND (user_id = ? OR ? = 'admin')
      `).get(Number(id), id, req.user.id, req.user.role);
    } else {
      order = db.prepare(`
        SELECT * FROM orders 
        WHERE order_number = ? AND (user_id = ? OR ? = 'admin')
      `).get(id, req.user.id, req.user.role);
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado ou você não possui permissão para visualizá-lo.'
      });
    }

    const items = db.prepare(`
      SELECT * FROM order_items WHERE order_id = ?
    `).all(order.id);

    return res.json({
      success: true,
      order: {
        ...order,
        shipping_address: order.shipping_address ? JSON.parse(order.shipping_address) : null,
        items
      }
    });
  } catch (error) {
    console.error('Erro ao buscar detalhes do pedido:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao obter detalhes do pedido.'
    });
  }
});

module.exports = router;
