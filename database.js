const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'dripp.db');
const db = new Database(dbPath);

// Ativar chaves estrangeiras e modo WAL para alta performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

/**
 * Criação das Tabelas
 */
function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      phone TEXT,
      cpf TEXT,
      address_street TEXT,
      address_number TEXT,
      address_complement TEXT,
      address_neighborhood TEXT,
      address_city TEXT,
      address_state TEXT,
      address_cep TEXT,
      role TEXT DEFAULT 'customer',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      image_url TEXT,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      compare_at_price REAL,
      category_id INTEGER,
      brand TEXT,
      sizes TEXT,
      colors TEXT,
      stock INTEGER NOT NULL DEFAULT 0,
      images TEXT,
      featured INTEGER DEFAULT 0,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT UNIQUE NOT NULL,
      user_id INTEGER,
      status TEXT DEFAULT 'pending',
      subtotal REAL NOT NULL DEFAULT 0,
      shipping REAL NOT NULL DEFAULT 0,
      discount REAL NOT NULL DEFAULT 0,
      total REAL NOT NULL DEFAULT 0,
      shipping_address TEXT,
      payment_method TEXT,
      payment_status TEXT DEFAULT 'pending',
      tracking_code TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER,
      product_name TEXT NOT NULL,
      product_image TEXT,
      size TEXT,
      color TEXT,
      quantity INTEGER NOT NULL DEFAULT 1,
      unit_price REAL NOT NULL DEFAULT 0,
      total_price REAL NOT NULL DEFAULT 0,
      FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS coupons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL,
      value REAL NOT NULL,
      min_order_value REAL DEFAULT 0,
      max_uses INTEGER,
      used_count INTEGER DEFAULT 0,
      active INTEGER DEFAULT 1,
      expires_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  seedDatabase();
}

/**
 * Povoamento inicial (Seed) caso o banco esteja vazio
 */
function seedDatabase() {
  // 1. Usuários
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount === 0) {
    const adminPasswordHash = bcrypt.hashSync('admin123', 10);
    const customerPasswordHash = bcrypt.hashSync('cliente123', 10);

    const insertUser = db.prepare(`
      INSERT INTO users (
        name, email, password_hash, phone, cpf, 
        address_street, address_number, address_complement, 
        address_neighborhood, address_city, address_state, address_cep, 
        role
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Administrador
    insertUser.run(
      'Admin DRIPP CONCEITO',
      'admin@dripp.com.br',
      adminPasswordHash,
      '(16) 99876-5432',
      '123.456.789-00',
      'Rua Episcopal',
      '1250',
      'Loja 1',
      'Centro',
      'São Carlos',
      'SP',
      '13560-000',
      'admin'
    );

    // Cliente de Teste
    insertUser.run(
      'Lucas Santos Silva',
      'cliente@dripp.com.br',
      customerPasswordHash,
      '(16) 99123-4567',
      '987.654.321-99',
      'Avenida São Carlos',
      '2345',
      'Apto 42',
      'Vila Nery',
      'São Carlos',
      'SP',
      '13560-011',
      'customer'
    );
  }

  // 2. Categorias
  const catCount = db.prepare('SELECT COUNT(*) as count FROM categories').get().count;
  if (catCount === 0) {
    const categories = [
      {
        name: 'Camisetas',
        slug: 'camisetas',
        description: 'Camisetas oversized, boxy fit e gráficas exclusivas com algodão de alta gramatura.',
        image_url: '/uploads/products/product-1.jpg'
      },
      {
        name: 'Calças',
        slug: 'calcas',
        description: 'Calças parachute, cargo táticas, baggy jeans e joggers com modelagem streetwear.',
        image_url: '/uploads/products/product-4.jpg'
      },
      {
        name: 'Bermudas',
        slug: 'bermudas',
        description: 'Bermudas cargo utilitárias, moletom pesado e jorts com acabamento premium.',
        image_url: '/uploads/products/product-6.jpg'
      },
      {
        name: 'Tênis',
        slug: 'tenis',
        description: 'Sneakers urbanos e calçados exclusivos que elevam a identidade do seu visual.',
        image_url: '/uploads/products/product-8.jpg'
      },
      {
        name: 'Acessórios',
        slug: 'acessorios',
        description: 'Bonés 5-panel, shoulder bags ripstop, meias cano alto e correntes urbanas.',
        image_url: '/uploads/products/product-10.jpg'
      },
      {
        name: 'Kits/Conjuntos',
        slug: 'kits-conjuntos',
        description: 'Combinações completas de hoodies e calças para o drip perfeito com desconto especial.',
        image_url: '/uploads/products/product-12.jpg'
      }
    ];

    const insertCat = db.prepare(`
      INSERT INTO categories (name, slug, description, image_url, active)
      VALUES (?, ?, ?, ?, 1)
    `);

    for (const cat of categories) {
      insertCat.run(cat.name, cat.slug, cat.description, cat.image_url);
    }
  }

  // 3. Produtos (12 itens streetwear com fotos placeholder)
  const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
  if (productCount === 0) {
    const getCatId = (slug) => {
      const row = db.prepare('SELECT id FROM categories WHERE slug = ?').get(slug);
      return row ? row.id : 1;
    };

    const products = [
      {
        name: 'Camiseta Oversized Acid Wash Skull DRIPP',
        slug: 'camiseta-oversized-acid-wash-skull',
        description: 'Camiseta streetwear com lavagem acid wash especial artesanal, estampa skull em silk screen de alta definição nas costas e peito. Tecido 100% algodão fio 26.1 penteado com gramatura 220g. Caimento largo estilo skate culture.',
        price: 149.90,
        compare_at_price: 189.90,
        category_slug: 'camisetas',
        brand: 'DRIPP CONCEITO',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['Preto Estonado', 'Cinza Chumbo'],
        stock: 35,
        images: ['/uploads/products/product-1.jpg'],
        featured: 1
      },
      {
        name: 'Camiseta Boxy Heavyweight Minimalist',
        slug: 'camiseta-boxy-heavyweight-minimalist',
        description: 'Modelagem boxy moderna e encorpada, gola canelada de 3cm com reforço ombro a ombro. Algodão heavyweight 240g de toque macio e caimento reto impecável. Essencial para sobreposições contemporâneas.',
        price: 129.90,
        compare_at_price: 159.90,
        category_slug: 'camisetas',
        brand: 'DRIPP CONCEITO',
        sizes: ['P', 'M', 'G', 'GG', 'XGG'],
        colors: ['Off-White', 'Preto Puro', 'Marrom Terra'],
        stock: 50,
        images: ['/uploads/products/product-2.jpg'],
        featured: 1
      },
      {
        name: 'Camiseta Streetwear Cyberpunk Graphic',
        slug: 'camiseta-streetwear-cyberpunk-graphic',
        description: 'Arte futurista inspirada na estética de Tóquio e Neo-São Paulo. Confeccionada em meia malha premium antipilling. Modelagem oversized autêntica que não encolhe após a lavagem.',
        price: 139.90,
        compare_at_price: null,
        category_slug: 'camisetas',
        brand: 'DRIPP CONCEITO',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['Preto', 'Roxo Noturno'],
        stock: 28,
        images: ['/uploads/products/product-3.jpg'],
        featured: 0
      },
      {
        name: 'Calça Cargo Parachute Street Black',
        slug: 'calca-cargo-parachute-street-black',
        description: 'Calça modelo parachute em tactel encorpado resistente a respingos com 6 bolsos multifuncionais. Possui ajustadores com elástico na barra e na cintura para personalização do caimento. Estilo streetwear urbano moderno.',
        price: 269.90,
        compare_at_price: 329.90,
        category_slug: 'calcas',
        brand: 'DRIPP CONCEITO',
        sizes: ['38', '40', '42', '44'],
        colors: ['Preto', 'Verde Militar'],
        stock: 24,
        images: ['/uploads/products/product-4.jpg'],
        featured: 1
      },
      {
        name: 'Calça Jeans Baggy Skate Vintage 90s',
        slug: 'calca-jeans-baggy-skate-vintage-90s',
        description: 'Jeans 100% algodão 13oz de alta resistência com lavagem vintage stonewashed. Modelagem super baggy clássica dos anos 90, pernas amplas e caimento despojado sobre o tênis.',
        price: 289.90,
        compare_at_price: 349.90,
        category_slug: 'calcas',
        brand: 'DRIPP CONCEITO',
        sizes: ['38', '40', '42', '44', '46'],
        colors: ['Azul Claro Estonado', 'Azul Escuro Vintage'],
        stock: 20,
        images: ['/uploads/products/product-5.jpg'],
        featured: 1
      },
      {
        name: 'Bermuda Cargo Ripstop Tática Utilitária',
        slug: 'bermuda-cargo-ripstop-tatica-utilitaria',
        description: 'Bermuda em tecido ripstop militar anti-rasgo. Conta com 6 bolsos com fecho em velcro, passador de cinto reforçado e costura tripla em pontos de maior tração. Máximo estilo e durabilidade.',
        price: 179.90,
        compare_at_price: 219.90,
        category_slug: 'bermudas',
        brand: 'DRIPP CONCEITO',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['Preto', 'Cáqui Areia', 'Verde Militar'],
        stock: 32,
        images: ['/uploads/products/product-6.jpg'],
        featured: 0
      },
      {
        name: 'Bermuda Moletom Heavyweight Raw Hem',
        slug: 'bermuda-moletom-heavyweight-raw-hem',
        description: 'Bermuda em moletom 3 cabos 360g sem felpa, com barra em acabamento a fio (raw hem) e cordão ajustável em algodão cru. Conforto absoluto com atitude para o dia a dia.',
        price: 159.90,
        compare_at_price: 199.90,
        category_slug: 'bermudas',
        brand: 'DRIPP CONCEITO',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['Cinza Mescla', 'Preto', 'Creme Aveia'],
        stock: 30,
        images: ['/uploads/products/product-7.jpg'],
        featured: 0
      },
      {
        name: 'Sneaker DRIPP Low Chunky Retro 80s',
        slug: 'sneaker-dripp-low-chunky-retro-80s',
        description: 'Sneaker cano baixo confeccionado em couro sintético nobuck e camurça premium. Entressola em EVA expandido para amortecimento superior e solado de borracha vulcanizada antiderrapante.',
        price: 489.90,
        compare_at_price: 589.90,
        category_slug: 'tenis',
        brand: 'DRIPP SNEAKERS',
        sizes: ['38', '39', '40', '41', '42', '43'],
        colors: ['Branco com Cinza', 'Preto com Refletivo 3M'],
        stock: 16,
        images: ['/uploads/products/product-8.jpg'],
        featured: 1
      },
      {
        name: 'Sneaker High-Top Urban Runner Techwear',
        slug: 'sneaker-high-top-urban-runner-techwear',
        description: 'Sneaker de cano alto com influências techwear e gorpcore. Cabedal respirável com sobreposições estruturais e zíper lateral para calce rápido. Palmilha anatômica anti-impacto.',
        price: 549.90,
        compare_at_price: 599.00,
        category_slug: 'tenis',
        brand: 'DRIPP SNEAKERS',
        sizes: ['39', '40', '41', '42', '43', '44'],
        colors: ['Triple Black', 'Branco e Verde Floresta'],
        stock: 14,
        images: ['/uploads/products/product-9.jpg'],
        featured: 1
      },
      {
        name: 'Shoulder Bag Tática Modular Cordura',
        slug: 'shoulder-bag-tatica-modular-cordura',
        description: 'Bolsa transversal compacta em nylon resinado impermeável estilo Cordura. Compartimento principal com zíper invertido selado, bolso frontal em tela mesh e alça regulável removível.',
        price: 99.90,
        compare_at_price: 129.90,
        category_slug: 'acessorios',
        brand: 'DRIPP CONCEITO',
        sizes: ['Único'],
        colors: ['Preto', 'Verde Oliva'],
        stock: 45,
        images: ['/uploads/products/product-10.jpg'],
        featured: 0
      },
      {
        name: 'Boné 5 Panel Streetwear Corduroy Bordado',
        slug: 'bone-5-panel-streetwear-corduroy-bordado',
        description: 'Boné modelo 5 panel em veludo cotelê de alta densidade com bordado DRIPP frontal em alto relevo. Aba reta moldável e fecho strapback traseiro com fivela metálica fosca.',
        price: 89.90,
        compare_at_price: 119.90,
        category_slug: 'acessorios',
        brand: 'DRIPP CONCEITO',
        sizes: ['Ajustável'],
        colors: ['Preto', 'Caramelo', 'Verde Escuro'],
        stock: 40,
        images: ['/uploads/products/product-11.jpg'],
        featured: 1
      },
      {
        name: 'Kit Conjunto Hoodie Canguru + Calça Jogger Heavy',
        slug: 'kit-conjunto-hoodie-canguru-calca-jogger-heavy',
        description: 'Combo exclusivo de inverno com Blusão Moletom Canguru forrado com capuz duplo e Calça Jogger com bolsos embutidos. Moletom 50% algodão 50% poliéster 380g super aquecido e confortável.',
        price: 429.90,
        compare_at_price: 499.90,
        category_slug: 'kits-conjuntos',
        brand: 'DRIPP CONCEITO',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['Preto All-Black', 'Cinza Grafite', 'Off-White'],
        stock: 18,
        images: ['/uploads/products/product-12.jpg'],
        featured: 1
      }
    ];

    const insertProd = db.prepare(`
      INSERT INTO products (
        name, slug, description, price, compare_at_price, 
        category_id, brand, sizes, colors, stock, 
        images, featured, active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `);

    for (const p of products) {
      const catId = getCatId(p.category_slug);
      insertProd.run(
        p.name,
        p.slug,
        p.description,
        p.price,
        p.compare_at_price,
        catId,
        p.brand,
        JSON.stringify(p.sizes),
        JSON.stringify(p.colors),
        p.stock,
        JSON.stringify(p.images),
        p.featured
      );
    }
  }

  // 4. Cupons
  const couponCount = db.prepare('SELECT COUNT(*) as count FROM coupons').get().count;
  if (couponCount === 0) {
    const coupons = [
      {
        code: 'BEMVINDO10',
        type: 'percentage',
        value: 10,
        min_order_value: 100.0,
        max_uses: 500,
        expires_at: '2027-12-31 23:59:59'
      },
      {
        code: 'DRIPP50',
        type: 'fixed',
        value: 50.0,
        min_order_value: 250.0,
        max_uses: 100,
        expires_at: '2027-12-31 23:59:59'
      },
      {
        code: 'STREET15',
        type: 'percentage',
        value: 15,
        min_order_value: 180.0,
        max_uses: 200,
        expires_at: '2027-12-31 23:59:59'
      },
      {
        code: 'FRETEGRATIS',
        type: 'fixed',
        value: 25.0,
        min_order_value: 150.0,
        max_uses: 300,
        expires_at: '2027-12-31 23:59:59'
      }
    ];

    const insertCoupon = db.prepare(`
      INSERT INTO coupons (code, type, value, min_order_value, max_uses, active, expires_at)
      VALUES (?, ?, ?, ?, ?, 1, ?)
    `);

    for (const c of coupons) {
      insertCoupon.run(c.code, c.type, c.value, c.min_order_value, c.max_uses, c.expires_at);
    }
  }

  // 5. Pedidos de exemplo para alimentar dashboard e relatórios
  const orderCount = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
  if (orderCount === 0) {
    const customer = db.prepare("SELECT id FROM users WHERE email = 'cliente@dripp.com.br'").get();
    const prod1 = db.prepare('SELECT * FROM products WHERE id = 1').get();
    const prod4 = db.prepare('SELECT * FROM products WHERE id = 4').get();

    if (customer && prod1 && prod4) {
      const shippingAddress = {
        recipient_name: 'Lucas Santos Silva',
        street: 'Avenida São Carlos',
        number: '2345',
        complement: 'Apto 42',
        neighborhood: 'Vila Nery',
        city: 'São Carlos',
        state: 'SP',
        cep: '13560-011',
        phone: '(16) 99123-4567'
      };

      // Pedido 1 - Entregue
      const insertOrder = db.prepare(`
        INSERT INTO orders (
          order_number, user_id, status, subtotal, shipping, discount, total,
          shipping_address, payment_method, payment_status, tracking_code, notes, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-5 days'))
      `);

      const order1Result = insertOrder.run(
        'DP-20261001-8421',
        customer.id,
        'delivered',
        419.80,
        25.00,
        41.98,
        402.82,
        JSON.stringify(shippingAddress),
        'pix',
        'paid',
        'BR987654321SC',
        'Pedido entregue na portaria com sucesso.'
      );

      const insertOrderItem = db.prepare(`
        INSERT INTO order_items (
          order_id, product_id, product_name, product_image, size, color, quantity, unit_price, total_price
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      insertOrderItem.run(
        order1Result.lastInsertRowid,
        prod1.id,
        prod1.name,
        '/uploads/products/product-1.jpg',
        'G',
        'Preto Estonado',
        1,
        149.90,
        149.90
      );

      insertOrderItem.run(
        order1Result.lastInsertRowid,
        prod4.id,
        prod4.name,
        '/uploads/products/product-4.jpg',
        '42',
        'Preto',
        1,
        269.90,
        269.90
      );

      // Pedido 2 - Em trânsito
      const order2Result = insertOrder.run(
        'DP-20261010-9154',
        customer.id,
        'shipped',
        129.90,
        15.00,
        0.00,
        144.90,
        JSON.stringify(shippingAddress),
        'credit_card',
        'paid',
        'BR123456789SC',
        'Enviado via Sedex.'
      );

      insertOrderItem.run(
        order2Result.lastInsertRowid,
        2,
        'Camiseta Boxy Heavyweight Minimalist',
        '/uploads/products/product-2.jpg',
        'M',
        'Off-White',
        1,
        129.90,
        129.90
      );
    }
  }
}

// Inicializa banco de dados
initDatabase();

module.exports = db;
