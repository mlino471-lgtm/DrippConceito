const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const db = require('../database');
const { requireAdmin } = require('../middleware/auth');

// Aplica autenticação de admin a todas as rotas deste router
router.use(requireAdmin);

// Configuração do multer para upload de imagens de produtos
const uploadDir = path.join(__dirname, '..', 'public', 'uploads', 'products');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `product-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|svg/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mimeType = file.mimetype;
  if (allowedTypes.test(ext) && allowedTypes.test(mimeType)) {
    cb(null, true);
  } else {
    cb(new Error('Apenas imagens (JPEG, PNG, WebP) são permitidas!'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function formatProduct(product) {
  if (!product) return null;
  return {
    ...product,
    sizes: typeof product.sizes === 'string' ? JSON.parse(product.sizes || '[]') : (product.sizes || []),
    colors: typeof product.colors === 'string' ? JSON.parse(product.colors || '[]') : (product.colors || []),
    images: typeof product.images === 'string' ? JSON.parse(product.images || '[]') : (product.images || []),
    featured: Boolean(product.featured),
    active: Boolean(product.active)
  };
}

/* ==========================================================================
   1. DASHBOARD & MÉTRICAS
   ========================================================================== */

/**
 * GET /api/admin/dashboard
 * Estatísticas gerais: faturamento, pedidos, clientes, vendas por mês, mais vendidos, pedidos recentes
 */
router.get('/dashboard', (req, res) => {
  try {
    // Faturamento Total (pedidos pagos/concluídos ou em trânsito)
    const salesStat = db.prepare(`
      SELECT 
        COALESCE(SUM(total), 0) as total_sales,
        COUNT(id) as total_orders
      FROM orders
      WHERE payment_status = 'paid' OR status IN ('delivered', 'shipped', 'processing')
    `).get();

    // Total de todos os pedidos
    const allOrdersCount = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;

    // Total de Clientes cadastrados
    const customersCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'customer'").get().count;

    // Total de Produtos Ativos
    const productsCount = db.prepare('SELECT COUNT(*) as count FROM products WHERE active = 1').get().count;

    // Produtos com estoque baixo (< 10)
    const lowStockCount = db.prepare('SELECT COUNT(*) as count FROM products WHERE active = 1 AND stock <= 10').get().count;

    // Faturamento dos últimos meses
    const revenueByMonth = db.prepare(`
      SELECT 
        strftime('%Y-%m', created_at) as month,
        COUNT(id) as orders_count,
        COALESCE(SUM(total), 0) as total_revenue
      FROM orders
      WHERE payment_status = 'paid' OR status IN ('delivered', 'shipped', 'processing')
      GROUP BY strftime('%Y-%m', created_at)
      ORDER BY month DESC
      LIMIT 6
    `).all().reverse();

    // Top produtos mais vendidos
    const topProducts = db.prepare(`
      SELECT 
        oi.product_id,
        oi.product_name,
        oi.product_image,
        SUM(oi.quantity) as total_sold,
        SUM(oi.total_price) as total_revenue
      FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
      WHERE o.payment_status = 'paid' OR o.status IN ('delivered', 'shipped', 'processing')
      GROUP BY oi.product_id, oi.product_name, oi.product_image
      ORDER BY total_sold DESC
      LIMIT 5
    `).all();

    // Pedidos recentes
    const recentOrders = db.prepare(`
      SELECT 
        o.id,
        o.order_number,
        o.user_id,
        u.name as customer_name,
        u.email as customer_email,
        o.status,
        o.total,
        o.payment_method,
        o.payment_status,
        o.created_at
      FROM orders o
      LEFT JOIN users u ON u.id = o.user_id
      ORDER BY o.id DESC
      LIMIT 8
    `).all();

    return res.json({
      success: true,
      stats: {
        total_sales: salesStat.total_sales,
        total_orders: allOrdersCount,
        paid_orders: salesStat.total_orders,
        total_customers: customersCount,
        active_products: productsCount,
        low_stock_products: lowStockCount
      },
      revenue_by_month: revenueByMonth,
      top_products: topProducts,
      recent_orders: recentOrders
    });
  } catch (error) {
    console.error('Erro ao gerar dados do dashboard:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao consultar dados do dashboard.'
    });
  }
});

/* ==========================================================================
   2. GESTÃO DE PRODUTOS
   ========================================================================== */

/**
 * GET /api/admin/products
 * Lista todos os produtos (incluindo inativos) com paginação e busca
 */
router.get('/products', (req, res) => {
  try {
    const { search, category_id, active, page = 1, limit = 20 } = req.query;

    let query = `
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      query += ` AND (p.name LIKE ? OR p.brand LIKE ? OR p.slug LIKE ?)`;
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    if (category_id) {
      query += ` AND p.category_id = ?`;
      params.push(Number(category_id));
    }

    if (active !== undefined && active !== '') {
      query += ` AND p.active = ?`;
      params.push(active === 'true' || active === '1' ? 1 : 0);
    }

    const countSql = `SELECT COUNT(*) as total FROM (${query})`;
    const countRow = db.prepare(countSql).get(...params);
    const total = countRow ? countRow.total : 0;

    const pageNum = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, parseInt(limit, 10));
    const offset = (pageNum - 1) * pageSize;

    query += ` ORDER BY p.id DESC LIMIT ? OFFSET ?`;
    params.push(pageSize, offset);

    const rows = db.prepare(query).all(...params);
    const products = rows.map(formatProduct);

    return res.json({
      success: true,
      total,
      page: pageNum,
      limit: pageSize,
      total_pages: Math.ceil(total / pageSize),
      products
    });
  } catch (error) {
    console.error('Erro ao listar produtos no admin:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao listar produtos.'
    });
  }
});

/**
 * POST /api/admin/products
 * Criação de novo produto com suporte a upload de imagens via multer ou array JSON
 */
router.post('/products', upload.array('images', 6), (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      compare_at_price,
      category_id,
      brand = 'DRIPP CONCEITO',
      sizes,
      colors,
      stock = 0,
      featured = 0
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Nome e preço do produto são campos obrigatórios.'
      });
    }

    let finalSlug = slug ? slugify(slug) : slugify(name);
    // Garante slug único
    const existingSlug = db.prepare('SELECT id FROM products WHERE slug = ?').get(finalSlug);
    if (existingSlug) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    // Processar imagens
    let imagesList = [];
    if (req.files && req.files.length > 0) {
      imagesList = req.files.map(f => `/uploads/products/${f.filename}`);
    } else if (req.body.images) {
      try {
        imagesList = typeof req.body.images === 'string' ? JSON.parse(req.body.images) : req.body.images;
      } catch {
        imagesList = [req.body.images];
      }
    }

    if (imagesList.length === 0) {
      imagesList.push('/uploads/products/product-1.jpg');
    }

    // Processar tamanhos e cores
    let parsedSizes = ['P', 'M', 'G', 'GG'];
    if (sizes) {
      try {
        parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
      } catch {
        parsedSizes = sizes.split(',').map(s => s.trim());
      }
    }

    let parsedColors = ['Preto'];
    if (colors) {
      try {
        parsedColors = typeof colors === 'string' ? JSON.parse(colors) : colors;
      } catch {
        parsedColors = colors.split(',').map(c => c.trim());
      }
    }

    const insertProd = db.prepare(`
      INSERT INTO products (
        name, slug, description, price, compare_at_price,
        category_id, brand, sizes, colors, stock,
        images, featured, active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `);

    const result = insertProd.run(
      name.trim(),
      finalSlug,
      description ? description.trim() : '',
      parseFloat(price),
      compare_at_price ? parseFloat(compare_at_price) : null,
      category_id ? Number(category_id) : null,
      brand ? brand.trim() : 'DRIPP CONCEITO',
      JSON.stringify(parsedSizes),
      JSON.stringify(parsedColors),
      parseInt(stock, 10) || 0,
      JSON.stringify(imagesList),
      featured === '1' || featured === 1 || featured === true || featured === 'true' ? 1 : 0
    );

    const createdProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);

    return res.status(201).json({
      success: true,
      message: 'Produto cadastrado com sucesso!',
      product: formatProduct(createdProduct)
    });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao cadastrar produto.'
    });
  }
});

/**
 * PUT /api/admin/products/:id
 * Atualização completa de produto
 */
router.put('/products/:id', upload.array('images', 6), (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado.'
      });
    }

    const {
      name,
      slug,
      description,
      price,
      compare_at_price,
      category_id,
      brand,
      sizes,
      colors,
      stock,
      featured,
      active
    } = req.body;

    let finalSlug = existing.slug;
    if (slug && slug !== existing.slug) {
      finalSlug = slugify(slug);
    } else if (name && !slug) {
      finalSlug = slugify(name);
    }

    // Processar imagens
    let imagesList = typeof existing.images === 'string' ? JSON.parse(existing.images || '[]') : existing.images;
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(f => `/uploads/products/${f.filename}`);
      imagesList = newImages; // substitui ou complementa
    } else if (req.body.images !== undefined) {
      try {
        imagesList = typeof req.body.images === 'string' ? JSON.parse(req.body.images) : req.body.images;
      } catch {
        imagesList = [req.body.images];
      }
    }

    // Processar tamanhos
    let finalSizes = existing.sizes;
    if (sizes !== undefined) {
      try {
        finalSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
      } catch {
        finalSizes = sizes.split(',').map(s => s.trim());
      }
      finalSizes = JSON.stringify(finalSizes);
    }

    // Processar cores
    let finalColors = existing.colors;
    if (colors !== undefined) {
      try {
        finalColors = typeof colors === 'string' ? JSON.parse(colors) : colors;
      } catch {
        finalColors = colors.split(',').map(c => c.trim());
      }
      finalColors = JSON.stringify(finalColors);
    }

    const updateProd = db.prepare(`
      UPDATE products SET
        name = COALESCE(?, name),
        slug = COALESCE(?, slug),
        description = COALESCE(?, description),
        price = COALESCE(?, price),
        compare_at_price = ?,
        category_id = COALESCE(?, category_id),
        brand = COALESCE(?, brand),
        sizes = COALESCE(?, sizes),
        colors = COALESCE(?, colors),
        stock = COALESCE(?, stock),
        images = ?,
        featured = COALESCE(?, featured),
        active = COALESCE(?, active),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    updateProd.run(
      name !== undefined ? name.trim() : null,
      finalSlug,
      description !== undefined ? description.trim() : null,
      price !== undefined ? parseFloat(price) : null,
      compare_at_price !== undefined ? (compare_at_price ? parseFloat(compare_at_price) : null) : existing.compare_at_price,
      category_id !== undefined ? Number(category_id) : null,
      brand !== undefined ? brand.trim() : null,
      finalSizes,
      finalColors,
      stock !== undefined ? parseInt(stock, 10) : null,
      JSON.stringify(imagesList),
      featured !== undefined ? (featured === '1' || featured === 1 || featured === true || featured === 'true' ? 1 : 0) : null,
      active !== undefined ? (active === '1' || active === 1 || active === true || active === 'true' ? 1 : 0) : null,
      id
    );

    const updatedProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(id);

    return res.json({
      success: true,
      message: 'Produto atualizado com sucesso!',
      product: formatProduct(updatedProduct)
    });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao atualizar produto.'
    });
  }
});

/**
 * DELETE /api/admin/products/:id
 * Soft delete de produto (marca como active = 0)
 */
router.delete('/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT id, name FROM products WHERE id = ?').get(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado.'
      });
    }

    db.prepare('UPDATE products SET active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(id);

    return res.json({
      success: true,
      message: `Produto "${existing.name}" desativado com sucesso!`
    });
  } catch (error) {
    console.error('Erro ao desativar produto:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao desativar produto.'
    });
  }
});

/* ==========================================================================
   3. GESTÃO DE PEDIDOS
   ========================================================================== */

/**
 * GET /api/admin/orders
 * Lista todos os pedidos com filtros avançados
 */
router.get('/orders', (req, res) => {
  try {
    const { status, payment_status, search, page = 1, limit = 20 } = req.query;

    let query = `
      SELECT o.*, u.name as customer_name, u.email as customer_email, u.phone as customer_phone
      FROM orders o
      LEFT JOIN users u ON u.id = o.user_id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += ` AND o.status = ?`;
      params.push(status);
    }

    if (payment_status) {
      query += ` AND o.payment_status = ?`;
      params.push(payment_status);
    }

    if (search) {
      query += ` AND (o.order_number LIKE ? OR u.name LIKE ? OR u.email LIKE ?)`;
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    const countSql = `SELECT COUNT(*) as total FROM (${query})`;
    const countRow = db.prepare(countSql).get(...params);
    const total = countRow ? countRow.total : 0;

    const pageNum = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, parseInt(limit, 10));
    const offset = (pageNum - 1) * pageSize;

    query += ` ORDER BY o.id DESC LIMIT ? OFFSET ?`;
    params.push(pageSize, offset);

    const orders = db.prepare(query).all(...params);

    const formattedOrders = orders.map(order => ({
      ...order,
      shipping_address: order.shipping_address ? JSON.parse(order.shipping_address) : null
    }));

    return res.json({
      success: true,
      total,
      page: pageNum,
      limit: pageSize,
      total_pages: Math.ceil(total / pageSize),
      orders: formattedOrders
    });
  } catch (error) {
    console.error('Erro ao buscar pedidos no admin:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao consultar lista de pedidos.'
    });
  }
});

/**
 * PUT /api/admin/orders/:id
 * Atualiza status, rastreio e observações do pedido
 */
router.put('/orders/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, payment_status, tracking_code, notes } = req.body;

    const existing = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado.'
      });
    }

    const updateOrder = db.prepare(`
      UPDATE orders SET
        status = COALESCE(?, status),
        payment_status = COALESCE(?, payment_status),
        tracking_code = COALESCE(?, tracking_code),
        notes = COALESCE(?, notes),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    updateOrder.run(
      status || null,
      payment_status || null,
      tracking_code !== undefined ? tracking_code : null,
      notes !== undefined ? notes : null,
      id
    );

    const updated = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);

    return res.json({
      success: true,
      message: 'Pedido atualizado com sucesso!',
      order: {
        ...updated,
        shipping_address: updated.shipping_address ? JSON.parse(updated.shipping_address) : null
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao atualizar pedido.'
    });
  }
});

/* ==========================================================================
   4. CLIENTES
   ========================================================================== */

/**
 * GET /api/admin/customers
 * Lista de clientes cadastrados com métricas de compras
 */
router.get('/customers', (req, res) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;

    let query = `
      SELECT 
        u.id, u.name, u.email, u.phone, u.cpf,
        u.address_city, u.address_state, u.created_at,
        COUNT(o.id) as orders_count,
        COALESCE(SUM(CASE WHEN o.payment_status = 'paid' THEN o.total ELSE 0 END), 0) as total_spent
      FROM users u
      LEFT JOIN orders o ON o.user_id = u.id
      WHERE u.role = 'customer'
    `;
    const params = [];

    if (search) {
      query += ` AND (u.name LIKE ? OR u.email LIKE ? OR u.phone LIKE ? OR u.cpf LIKE ?)`;
      const term = `%${search.trim()}%`;
      params.push(term, term, term, term);
    }

    query += ` GROUP BY u.id`;

    const countSql = `SELECT COUNT(*) as total FROM (${query})`;
    const countRow = db.prepare(countSql).get(...params);
    const total = countRow ? countRow.total : 0;

    const pageNum = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, parseInt(limit, 10));
    const offset = (pageNum - 1) * pageSize;

    query += ` ORDER BY u.id DESC LIMIT ? OFFSET ?`;
    params.push(pageSize, offset);

    const customers = db.prepare(query).all(...params);

    return res.json({
      success: true,
      total,
      page: pageNum,
      limit: pageSize,
      total_pages: Math.ceil(total / pageSize),
      customers
    });
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao buscar clientes.'
    });
  }
});

/* ==========================================================================
   5. RELATÓRIO FINANCEIRO
   ========================================================================== */

/**
 * GET /api/admin/finance
 * Relatório financeiro detalhado: faturamento por períodos, métodos de pagamento e status
 */
router.get('/finance', (req, res) => {
  try {
    // Faturamento Total
    const totalRevenue = db.prepare(`
      SELECT 
        COALESCE(SUM(total), 0) as total_revenue,
        COALESCE(SUM(subtotal), 0) as total_subtotal,
        COALESCE(SUM(shipping), 0) as total_shipping,
        COALESCE(SUM(discount), 0) as total_discounts,
        COUNT(id) as paid_orders
      FROM orders
      WHERE payment_status = 'paid'
    `).get();

    // Faturamento Hoje
    const todayRevenue = db.prepare(`
      SELECT COALESCE(SUM(total), 0) as total, COUNT(id) as count
      FROM orders
      WHERE payment_status = 'paid' AND date(created_at) = date('now')
    `).get();

    // Faturamento Últimos 7 dias
    const last7DaysRevenue = db.prepare(`
      SELECT COALESCE(SUM(total), 0) as total, COUNT(id) as count
      FROM orders
      WHERE payment_status = 'paid' AND created_at >= datetime('now', '-7 days')
    `).get();

    // Faturamento Últimos 30 dias
    const last30DaysRevenue = db.prepare(`
      SELECT COALESCE(SUM(total), 0) as total, COUNT(id) as count
      FROM orders
      WHERE payment_status = 'paid' AND created_at >= datetime('now', '-30 days')
    `).get();

    // Divisão por método de pagamento
    const paymentMethods = db.prepare(`
      SELECT 
        payment_method,
        COUNT(id) as count,
        COALESCE(SUM(total), 0) as total
      FROM orders
      GROUP BY payment_method
      ORDER BY total DESC
    `).all();

    // Divisão por status do pedido
    const orderStatuses = db.prepare(`
      SELECT 
        status,
        COUNT(id) as count,
        COALESCE(SUM(total), 0) as total
      FROM orders
      GROUP BY status
    `).all();

    return res.json({
      success: true,
      revenue_by_period: {
        today: todayRevenue,
        last_7_days: last7DaysRevenue,
        last_30_days: last30DaysRevenue,
        all_time: totalRevenue
      },
      payment_methods_breakdown: paymentMethods,
      order_status_breakdown: orderStatuses
    });
  } catch (error) {
    console.error('Erro ao gerar relatório financeiro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao compilar relatório financeiro.'
    });
  }
});

/* ==========================================================================
   6. GESTÃO DE CUPONS
   ========================================================================== */

/**
 * GET /api/admin/coupons
 * Lista de cupons de desconto
 */
router.get('/coupons', (req, res) => {
  try {
    const coupons = db.prepare('SELECT * FROM coupons ORDER BY id DESC').all();
    return res.json({
      success: true,
      coupons
    });
  } catch (error) {
    console.error('Erro ao listar cupons:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao listar cupons.'
    });
  }
});

/**
 * POST /api/admin/coupons
 * Criação de novo cupom
 */
router.post('/coupons', (req, res) => {
  try {
    const { code, type, value, min_order_value = 0, max_uses, expires_at } = req.body;

    if (!code || !type || value === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Código, tipo (percentage ou fixed) e valor do cupom são obrigatórios.'
      });
    }

    const cleanCode = code.trim().toUpperCase();
    const existing = db.prepare('SELECT id FROM coupons WHERE code = ?').get(cleanCode);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Já existe um cupom cadastrado com este código.'
      });
    }

    const insertCoupon = db.prepare(`
      INSERT INTO coupons (code, type, value, min_order_value, max_uses, expires_at, active)
      VALUES (?, ?, ?, ?, ?, ?, 1)
    `);

    const result = insertCoupon.run(
      cleanCode,
      type,
      parseFloat(value),
      min_order_value ? parseFloat(min_order_value) : 0,
      max_uses ? parseInt(max_uses, 10) : null,
      expires_at || null
    );

    const coupon = db.prepare('SELECT * FROM coupons WHERE id = ?').get(result.lastInsertRowid);

    return res.status(201).json({
      success: true,
      message: 'Cupom de desconto criado com sucesso!',
      coupon
    });
  } catch (error) {
    console.error('Erro ao cadastrar cupom:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao cadastrar cupom.'
    });
  }
});

/**
 * PUT /api/admin/coupons/:id
 * Atualização de cupom
 */
router.put('/coupons/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { code, type, value, min_order_value, max_uses, expires_at, active } = req.body;

    const existing = db.prepare('SELECT * FROM coupons WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Cupom não encontrado.'
      });
    }

    let cleanCode = existing.code;
    if (code) {
      cleanCode = code.trim().toUpperCase();
    }

    const updateCoupon = db.prepare(`
      UPDATE coupons SET
        code = ?,
        type = COALESCE(?, type),
        value = COALESCE(?, value),
        min_order_value = COALESCE(?, min_order_value),
        max_uses = COALESCE(?, max_uses),
        expires_at = COALESCE(?, expires_at),
        active = COALESCE(?, active)
      WHERE id = ?
    `);

    updateCoupon.run(
      cleanCode,
      type || null,
      value !== undefined ? parseFloat(value) : null,
      min_order_value !== undefined ? parseFloat(min_order_value) : null,
      max_uses !== undefined ? parseInt(max_uses, 10) : null,
      expires_at !== undefined ? expires_at : null,
      active !== undefined ? (active === '1' || active === 1 || active === true || active === 'true' ? 1 : 0) : null,
      id
    );

    const updated = db.prepare('SELECT * FROM coupons WHERE id = ?').get(id);

    return res.json({
      success: true,
      message: 'Cupom atualizado com sucesso!',
      coupon: updated
    });
  } catch (error) {
    console.error('Erro ao atualizar cupom:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao atualizar cupom.'
    });
  }
});

/**
 * DELETE /api/admin/coupons/:id
 * Excluir cupom
 */
router.delete('/coupons/:id', (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT id, code FROM coupons WHERE id = ?').get(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Cupom não encontrado.'
      });
    }

    db.prepare('DELETE FROM coupons WHERE id = ?').run(id);

    return res.json({
      success: true,
      message: `Cupom ${existing.code} removido com sucesso!`
    });
  } catch (error) {
    console.error('Erro ao deletar cupom:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao deletar cupom.'
    });
  }
});

/* ==========================================================================
   7. GESTÃO DE CATEGORIAS
   ========================================================================== */

/**
 * GET /api/admin/categories
 * Lista todas as categorias com contagem de produtos
 */
router.get('/categories', (req, res) => {
  try {
    const categories = db.prepare(`
      SELECT c.*, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      GROUP BY c.id
      ORDER BY c.id ASC
    `).all();

    return res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Erro ao buscar categorias no admin:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar categorias.'
    });
  }
});

/**
 * POST /api/admin/categories
 * Criação de nova categoria
 */
router.post('/categories', (req, res) => {
  try {
    const { name, slug, description, image_url } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Nome da categoria é obrigatório.'
      });
    }

    const finalSlug = slug ? slugify(slug) : slugify(name);
    const existing = db.prepare('SELECT id FROM categories WHERE slug = ?').get(finalSlug);

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Já existe uma categoria cadastrada com este slug.'
      });
    }

    const insertCat = db.prepare(`
      INSERT INTO categories (name, slug, description, image_url, active)
      VALUES (?, ?, ?, ?, 1)
    `);

    const result = insertCat.run(
      name.trim(),
      finalSlug,
      description ? description.trim() : '',
      image_url ? image_url.trim() : null
    );

    const category = db.prepare('SELECT * FROM categories WHERE id = ?').get(result.lastInsertRowid);

    return res.status(201).json({
      success: true,
      message: 'Categoria criada com sucesso!',
      category
    });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao criar categoria.'
    });
  }
});

/**
 * PUT /api/admin/categories/:id
 * Atualização de categoria
 */
router.put('/categories/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, image_url, active } = req.body;

    const existing = db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Categoria não encontrada.'
      });
    }

    let finalSlug = existing.slug;
    if (slug) {
      finalSlug = slugify(slug);
    } else if (name) {
      finalSlug = slugify(name);
    }

    const updateCat = db.prepare(`
      UPDATE categories SET
        name = COALESCE(?, name),
        slug = ?,
        description = COALESCE(?, description),
        image_url = COALESCE(?, image_url),
        active = COALESCE(?, active)
      WHERE id = ?
    `);

    updateCat.run(
      name ? name.trim() : null,
      finalSlug,
      description !== undefined ? description.trim() : null,
      image_url !== undefined ? image_url.trim() : null,
      active !== undefined ? (active === '1' || active === 1 || active === true || active === 'true' ? 1 : 0) : null,
      id
    );

    const updated = db.prepare('SELECT * FROM categories WHERE id = ?').get(id);

    return res.json({
      success: true,
      message: 'Categoria atualizada com sucesso!',
      category: updated
    });
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao atualizar categoria.'
    });
  }
});

/**
 * DELETE /api/admin/categories/:id
 * Exclusão de categoria
 */
router.delete('/categories/:id', (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT id, name FROM categories WHERE id = ?').get(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Categoria não encontrada.'
      });
    }

    // Desvincula produtos desta categoria antes de excluir
    db.prepare('UPDATE products SET category_id = NULL WHERE category_id = ?').run(id);
    db.prepare('DELETE FROM categories WHERE id = ?').run(id);

    return res.json({
      success: true,
      message: `Categoria "${existing.name}" removida com sucesso!`
    });
  } catch (error) {
    console.error('Erro ao remover categoria:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao excluir categoria.'
    });
  }
});

module.exports = router;
