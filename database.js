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
 * Criação e Migração das Tabelas
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
      permissions TEXT DEFAULT '["all"]',
      status TEXT DEFAULT 'active',
      last_login DATETIME,
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
      cost_price REAL DEFAULT 0,
      compare_at_price REAL,
      category_id INTEGER,
      brand TEXT,
      sizes TEXT,
      colors TEXT,
      stock INTEGER NOT NULL DEFAULT 0,
      min_stock INTEGER NOT NULL DEFAULT 5,
      qr_code TEXT,
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
      unit_cost REAL NOT NULL DEFAULT 0,
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

    CREATE TABLE IF NOT EXISTS stock_movements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      type TEXT NOT NULL, -- 'entrada', 'saida', 'ajuste', 'venda', 'devolucao'
      quantity INTEGER NOT NULL,
      previous_stock INTEGER NOT NULL,
      new_stock INTEGER NOT NULL,
      unit_cost REAL DEFAULT 0,
      reason TEXT,
      operator TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS site_analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL, -- 'page_view', 'product_click', 'add_to_cart', 'begin_checkout', 'purchase', 'whatsapp_click', 'banner_click'
      page_url TEXT,
      product_id INTEGER,
      product_name TEXT,
      category TEXT,
      session_id TEXT,
      device TEXT DEFAULT 'desktop',
      referrer TEXT,
      metadata TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS activity_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      user_name TEXT,
      action TEXT NOT NULL,
      details TEXT,
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migrações automáticas de colunas caso o banco já existisse
  migrateColumns();

  // Povoamento e sincronização de dados Luxury Rap
  seedDatabase();
}

/**
 * Adiciona novas colunas caso tabelas antigas não as possuam
 */
function migrateColumns() {
  const getColumns = (table) => {
    return db.prepare(`PRAGMA table_info(${table})`).all().map(c => c.name);
  };

  const productCols = getColumns('products');
  if (!productCols.includes('cost_price')) {
    db.exec("ALTER TABLE products ADD COLUMN cost_price REAL DEFAULT 0;");
  }
  if (!productCols.includes('min_stock')) {
    db.exec("ALTER TABLE products ADD COLUMN min_stock INTEGER DEFAULT 5;");
  }
  if (!productCols.includes('qr_code')) {
    db.exec("ALTER TABLE products ADD COLUMN qr_code TEXT;");
  }

  const userCols = getColumns('users');
  if (!userCols.includes('permissions')) {
    db.exec("ALTER TABLE users ADD COLUMN permissions TEXT DEFAULT '[\"all\"]';");
  }
  if (!userCols.includes('status')) {
    db.exec("ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'active';");
  }
  if (!userCols.includes('last_login')) {
    db.exec("ALTER TABLE users ADD COLUMN last_login DATETIME;");
  }

  const orderItemCols = getColumns('order_items');
  if (!orderItemCols.includes('unit_cost')) {
    db.exec("ALTER TABLE order_items ADD COLUMN unit_cost REAL DEFAULT 0;");
  }
}

/**
 * Povoamento e atualização do catálogo Luxury Rap & Streetwear de Luxo
 */
function seedDatabase() {
  // 1. Usuários e Equipe da Loja (Gestão de Contas)
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount <= 2) {
    const adminPasswordHash = bcrypt.hashSync('admin123', 10);
    const staffPasswordHash = bcrypt.hashSync('staff123', 10);
    const customerPasswordHash = bcrypt.hashSync('cliente123', 10);

    const insertUser = db.prepare(`
      INSERT OR IGNORE INTO users (
        name, email, password_hash, phone, cpf, 
        address_street, address_number, address_complement, 
        address_neighborhood, address_city, address_state, address_cep, 
        role, permissions, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Administrador Master
    insertUser.run(
      'Admin Master DRIPP',
      'admin@dripp.com.br',
      adminPasswordHash,
      '(16) 99876-5432',
      '123.456.789-00',
      'Av. Regit Arab',
      '703',
      'Sede Oficial',
      'Cidade Aracy',
      'São Carlos',
      'SP',
      '13573-060',
      'admin',
      JSON.stringify(['all']),
      'active'
    );

    // Gerente de Loja e Estoque
    insertUser.run(
      'Matheus ' + 'Dripp' + ' (Gerente de Loja)',
      'gerente@dripp.com.br',
      staffPasswordHash,
      '(16) 99765-4321',
      '234.567.890-11',
      'Av. Regit Arab',
      '703',
      'Showroom',
      'Cidade Aracy',
      'São Carlos',
      'SP',
      '13573-060',
      'manager',
      JSON.stringify(['products', 'inventory', 'orders', 'qr_scanner']),
      'active'
    );

    // Vendedor & Operador de Caixa
    insertUser.run(
      'Gabriel Rap Drip (Vendedor)',
      'vendas@dripp.com.br',
      staffPasswordHash,
      '(16) 99654-3210',
      '345.678.901-22',
      'Rua Episcopal',
      '450',
      'Loja Física',
      'Centro',
      'São Carlos',
      'SP',
      '13560-000',
      'seller',
      JSON.stringify(['orders', 'qr_scanner', 'inventory_read']),
      'active'
    );

    // Cliente VIP de Teste
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
      'customer',
      JSON.stringify([]),
      'active'
    );
  }

  // 2. Categorias Luxury Rap & Streetwear de Luxo
  const luxuryCategories = [
    {
      name: 'Relógios de Luxo & Iced Out',
      slug: 'relogios',
      description: 'Relógios automáticos esqueleto, cronógrafos cravejados estilo VVS e caixas em aço inoxidável dourado.',
      image_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'Bonés & Headwear Luxo',
      slug: 'bones',
      description: 'Trucker caps premium com bordado 3D, 5-panels em veludo cotelê e fitteds exclusivos numerados.',
      image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'Sneakers & Tênis Hype',
      slug: 'tenis',
      description: 'Sneakers cano alto e chunky com couros nobres, solados bionics e estética luxury rap.',
      image_url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'Camisetas Heavyweight Luxo',
      slug: 'camisetas',
      description: 'Modelagem boxy oversized autêntica com malha 100% algodão 260g e silkscreens em ouro metálico.',
      image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'Calças Cargo & Parachute',
      slug: 'calcas',
      description: 'Calças cargo utilitárias táticas em ripstop militar e parachute pants com reguladores em metal cromado.',
      image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'Outerwear, Hoodies & Puffers',
      slug: 'hoodies',
      description: 'Jaquetas puffer em vinil brilhante, corta-ventos com refletivo 3M e hoodies pesados 400g.',
      image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'Jóias, Correntes & Acessórios',
      slug: 'acessorios',
      description: 'Correntes cubanas cravejadas banhadas a ouro 18k, shoulder bags em couro monograma e óculos shield.',
      image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'Bermudas Streetwear',
      slug: 'bermudas',
      description: 'Bermudas de moletom pesado sem felpa, jorts streetwear e cargos táticas com costura reforçada.',
      image_url: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop'
    }
  ];

  const insertCategory = db.prepare(`
    INSERT INTO categories (name, slug, description, image_url, active)
    VALUES (?, ?, ?, ?, 1)
  `);

  for (const cat of luxuryCategories) {
    const exists = db.prepare('SELECT id FROM categories WHERE slug = ?').get(cat.slug);
    if (!exists) {
      insertCategory.run(cat.name, cat.slug, cat.description, cat.image_url);
    } else {
      db.prepare('UPDATE categories SET name = ?, description = ?, image_url = ? WHERE slug = ?')
        .run(cat.name, cat.description, cat.image_url, cat.slug);
    }
  }

  // 3. Catálogo de Produtos Luxury Rap & Streetwear de Luxo
  const getCatId = (slug) => {
    const row = db.prepare('SELECT id FROM categories WHERE slug = ?').get(slug);
    return row ? row.id : 1;
  };

  const luxuryProducts = [
    // --- RELÓGIOS DE LUXO ---
    {
      name: 'Relógio DRIPP Skeleton Automatic 18K Gold & Safira',
      slug: 'relogio-dripp-skeleton-automatic-18k-gold',
      description: 'O ápice do luxo rap. Movimento automático esqueleto japonês aparente, caixa de 42mm em aço 316L com banho de ouro 18K PVD e vidro em cristal de safira anti-risco. Pulseira em aço polido com fecho duplo butterfly. Acompanha estojo de luxo forrado em veludo preto.',
      price: 1890.00,
      cost_price: 650.00,
      compare_at_price: 2490.00,
      category_slug: 'relogios',
      brand: 'DRIPP HAUTE HORLOGERIE',
      sizes: ['Único (42mm)'],
      colors: ['Ouro 18K / Preto', 'Platinum Prata'],
      stock: 8,
      min_stock: 3,
      qr_code: 'DRIPP-WATCH-SKEL-01',
      images: [
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop'
      ],
      featured: 1
    },
    {
      name: 'Relógio DRIPP Iced Out Baguette Pave Cravejado VVS',
      slug: 'relogio-dripp-iced-out-baguette-pave-vvs',
      description: 'Estética hip hop internacional. Caixa e pulseira totalmente cravejadas com pedras zircônia cúbica lapidação Baguette 5A com brilho VVS impecável. Resistência a respingos 5ATM e mostrador luminescente. O grail definitivo para os clipes e rolês mais exclusivos.',
      price: 2290.00,
      cost_price: 780.00,
      compare_at_price: 2890.00,
      category_slug: 'relogios',
      brand: 'DRIPP ICE CULTURE',
      sizes: ['Único (44mm)'],
      colors: ['Iced Silver Platinum', 'Iced Royal Gold'],
      stock: 6,
      min_stock: 2,
      qr_code: 'DRIPP-WATCH-ICE-02',
      images: [
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop'
      ],
      featured: 1
    },
    {
      name: 'Relógio Cronógrafo DRIPP Matte Carbon Black Edition',
      slug: 'relogio-cronografo-dripp-matte-carbon-black',
      description: 'Minimalismo tático de alta relojoaria. Caixa em aço cirúrgico com acabamento PVD preto fosco acetinado, mostrador com três sub-dials cronógrafos funcionais e pulseira de silicone vulcanizado texturizado anti-suor.',
      price: 1390.00,
      cost_price: 480.00,
      compare_at_price: 1690.00,
      category_slug: 'relogios',
      brand: 'DRIPP TACTICAL',
      sizes: ['Único (43mm)'],
      colors: ['All Black Matte', 'Black & Gold'],
      stock: 12,
      min_stock: 4,
      qr_code: 'DRIPP-WATCH-CARB-03',
      images: [
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop'
      ],
      featured: 1
    },

    // --- BONÉS & HEADWEAR LUXO ---
    {
      name: 'Boné Trucker DRIPP Luxury Rap Leather & 3D Embroidery',
      slug: 'bone-trucker-dripp-luxury-rap-leather',
      description: 'Boné trucker de alto padrão com painel frontal em couro legítimo macio e tela respirável traseira estruturada. Bordado frontal DRIPP CONCEITO em ultra alto relevo 3D na cor dourada metálica. Fivela traseira em latão banhado a ouro.',
      price: 219.90,
      cost_price: 65.00,
      compare_at_price: 279.90,
      category_slug: 'bones',
      brand: 'DRIPP CONCEITO',
      sizes: ['Snapback Ajustável'],
      colors: ['Preto Couro / Dourado', 'Preto All-Black'],
      stock: 35,
      min_stock: 8,
      qr_code: 'DRIPP-CAP-TRUCK-01',
      images: [
        'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop'
      ],
      featured: 1
    },
    {
      name: 'Boné 5-Panel Velvet Chrome DRIPP Gothic Cross',
      slug: 'bone-5-panel-velvet-chrome-dripp',
      description: 'Confeccionado em veludo cotelê premium pesado de toque suave. Aplicação metálica exclusiva Gothic Cross em liga de zinco cromada na lateral e fecho traseiro strapback com passante de metal.',
      price: 199.90,
      cost_price: 58.00,
      compare_at_price: 249.90,
      category_slug: 'bones',
      brand: 'DRIPP CONCEITO',
      sizes: ['Strapback Ajustável'],
      colors: ['Preto Ônix', 'Vinho Burgundy', 'Verde Floresta'],
      stock: 28,
      min_stock: 6,
      qr_code: 'DRIPP-CAP-5PAN-02',
      images: [
        'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=800&auto=format&fit=crop'
      ],
      featured: 1
    },
    {
      name: 'Boné Fitted DRIPP São Carlos Limited Edition 7 1/4',
      slug: 'bone-fitted-dripp-sao-carlos-limited',
      description: 'Modelagem fitted estruturada tradicional do rap nova-iorquino adaptada para a cena de São Carlos. Sarja pesada 100% algodão, bordado lateral comemorativo do código de área 016 e patch exclusivo DRIPP.',
      price: 239.90,
      cost_price: 70.00,
      compare_at_price: 299.90,
      category_slug: 'bones',
      brand: 'DRIPP CONCEITO',
      sizes: ['7 1/8', '7 1/4', '7 3/8', '7 1/2'],
      colors: ['Preto com Aba Cinza', 'Azul Marinho Royal'],
      stock: 20,
      min_stock: 5,
      qr_code: 'DRIPP-CAP-FIT-03',
      images: [
        'https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=800&auto=format&fit=crop'
      ],
      featured: 0
    },

    // --- SNEAKERS & TÊNIS HYPE ---
    {
      name: 'Sneaker DRIPP High "Phantom Platinum" Leather & Suede',
      slug: 'sneaker-dripp-high-phantom-platinum',
      description: 'Sneaker cano alto artesanal inspirado nos calçados de basquete dos anos 80 e na alta costura moderna. Cabedal em couro bovino legítimo selecionado com sobreposições em suede aveludado e detalhes em foil platinado. Palmilha ortopédica em gel com amortecimento responsivo.',
      price: 899.90,
      cost_price: 320.00,
      compare_at_price: 1199.90,
      category_slug: 'tenis',
      brand: 'DRIPP SNEAKERS',
      sizes: ['38', '39', '40', '41', '42', '43', '44'],
      colors: ['Platinum White / Ice Grey', 'Onyx Black / Platinum'],
      stock: 14,
      min_stock: 4,
      qr_code: 'DRIPP-SNK-HIGH-01',
      images: [
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop'
      ],
      featured: 1
    },
    {
      name: 'Sneaker Chunky DRIPP Skate Lux "Onyx Gold"',
      slug: 'sneaker-chunky-dripp-skate-lux-onyx-gold',
      description: 'Silhueta robusta chunky acolchoada com língua estofada no melhor estilo rap Y2K. Solado em borracha vulcanizada com detalhes em entressola dourada fosca e passadores metálicos industriais.',
      price: 789.90,
      cost_price: 270.00,
      compare_at_price: 989.90,
      category_slug: 'tenis',
      brand: 'DRIPP SNEAKERS',
      sizes: ['38', '39', '40', '41', '42', '43'],
      colors: ['All Black com Ouro', 'Off-White com Dourado'],
      stock: 16,
      min_stock: 4,
      qr_code: 'DRIPP-SNK-CHUN-02',
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop'
      ],
      featured: 1
    },
    {
      name: 'Sneaker Runner DRIPP Bionic Cyber Track "Triple Black"',
      slug: 'sneaker-runner-dripp-bionic-cyber-track',
      description: 'Fusão gorpcore e luxury techwear. Cabedal em malha knit respirável com exoesqueleto em poliuretano injetado e solado biônico tratorado de tração máxima. Cadarço elástico com sistema quick-lace.',
      price: 949.90,
      cost_price: 340.00,
      compare_at_price: 1250.00,
      category_slug: 'tenis',
      brand: 'DRIPP SNEAKERS',
      sizes: ['39', '40', '41', '42', '43', '44'],
      colors: ['Triple Black Reflexivo', 'Cyber White / Metallic'],
      stock: 11,
      min_stock: 3,
      qr_code: 'DRIPP-SNK-RUN-03',
      images: [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop'
      ],
      featured: 1
    },

    // --- JÓIAS & ACESSÓRIOS CRAVEJADOS ---
    {
      name: 'Corrente Cubana DRIPP 14mm Cravejada Ice Gold 18K',
      slug: 'corrente-cubana-dripp-14mm-cravejada-ice-gold',
      description: 'Choker / Corrente Elo Miami Cuban Link de 14mm banhada a ouro 18K com camada protetora antialérgica de alta durabilidade. Cravada artesanalmente com mais de 800 cristais zircônias VVS lapidação brilhante. Fecho de pressão duplo personalizado com a logo DRIPP.',
      price: 599.90,
      cost_price: 180.00,
      compare_at_price: 799.90,
      category_slug: 'acessorios',
      brand: 'DRIPP JEWELRY',
      sizes: ['50cm (Choker)', '60cm (Standard)'],
      colors: ['Ouro 18K Cravejado', 'Ouro Branco Cravejado'],
      stock: 22,
      min_stock: 5,
      qr_code: 'DRIPP-JWL-CUB-01',
      images: [
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop'
      ],
      featured: 1
    },
    {
      name: 'Óculos de Sol DRIPP Shield Cyclops Luxury Rap',
      slug: 'oculos-de-sol-dripp-shield-cyclops',
      description: 'Armação unissex inteiriça estilo máscara futurista em acetato preto de alta densidade com lentes espelhadas douradas e proteção UV400 completa. Logo DRIPP gravada a laser nas hastes.',
      price: 349.90,
      cost_price: 95.00,
      compare_at_price: 450.00,
      category_slug: 'acessorios',
      brand: 'DRIPP OPTICS',
      sizes: ['Único'],
      colors: ['Lente Espelhada Dourada', 'Lente Blackout Total'],
      stock: 30,
      min_stock: 6,
      qr_code: 'DRIPP-OPT-SHLD-02',
      images: [
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop'
      ],
      featured: 0
    },

    // --- VESTUÁRIO STREETWEAR DE LUXO ---
    {
      name: 'Jaqueta Puffer DRIPP Glossy Vinyl Black Boxy Fit',
      slug: 'jaqueta-puffer-dripp-glossy-vinyl-black',
      description: 'A peça mais cobiçada do inverno do rap nacional. Jaqueta acolchoada volumosa em tecido vinílico com brilho acetinado à prova de vento. Enchimento térmico sintético ultra quente, gola alta estruturada e puxadores em zíper metálico pesado.',
      price: 689.90,
      cost_price: 240.00,
      compare_at_price: 890.00,
      category_slug: 'hoodies',
      brand: 'DRIPP CONCEITO',
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Preto Vinil Brilhante', 'Prata Espelhado Chrome'],
      stock: 18,
      min_stock: 5,
      qr_code: 'DRIPP-APL-PUFF-01',
      images: [
        'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop'
      ],
      featured: 1
    },
    {
      name: 'Camiseta Oversized Acid Wash Skull DRIPP Gold',
      slug: 'camiseta-oversized-acid-wash-skull',
      description: 'Camiseta streetwear de luxo com lavagem acid wash artesanal, estampa skull em silk screen com pigmento dourado especial no peito e costas. Tecido 100% algodão fio 26.1 penteado 240g/m². Caimento largo despojado.',
      price: 179.90,
      cost_price: 48.00,
      compare_at_price: 229.90,
      category_slug: 'camisetas',
      brand: 'DRIPP CONCEITO',
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Preto Acid Wash', 'Cinza Chumbo'],
      stock: 42,
      min_stock: 10,
      qr_code: 'DRIPP-APL-TSK-02',
      images: [
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop'
      ],
      featured: 1
    },
    {
      name: 'Calça Cargo Parachute Street Black Gold Tech',
      slug: 'calca-cargo-parachute-street-black',
      description: 'Calça modelo parachute em tactel encorpado resistente com 6 bolsos multifuncionais. Possui ajustadores com elástico na barra e na cintura com acabamento dourado. Caimento largo autêntico de passarela.',
      price: 299.90,
      cost_price: 90.00,
      compare_at_price: 369.90,
      category_slug: 'calcas',
      brand: 'DRIPP CONCEITO',
      sizes: ['38', '40', '42', '44', '46'],
      colors: ['Preto Ônix', 'Verde Tático'],
      stock: 25,
      min_stock: 6,
      qr_code: 'DRIPP-APL-CRG-03',
      images: [
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop'
      ],
      featured: 1
    }
  ];

  const insertProd = db.prepare(`
    INSERT INTO products (
      name, slug, description, price, cost_price, compare_at_price, 
      category_id, brand, sizes, colors, stock, min_stock, qr_code,
      images, featured, active
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `);

  for (const p of luxuryProducts) {
    const catId = getCatId(p.category_slug);
    const existing = db.prepare('SELECT id FROM products WHERE slug = ?').get(p.slug);
    if (!existing) {
      insertProd.run(
        p.name,
        p.slug,
        p.description,
        p.price,
        p.cost_price,
        p.compare_at_price,
        catId,
        p.brand,
        JSON.stringify(p.sizes),
        JSON.stringify(p.colors),
        p.stock,
        p.min_stock,
        p.qr_code,
        JSON.stringify(p.images),
        p.featured
      );
    } else {
      // Atualizar com preço de custo, estoque mínimo, código QR e categoria
      db.prepare(`
        UPDATE products SET 
          price = ?, cost_price = ?, compare_at_price = ?, 
          category_id = ?, brand = ?, stock = ?, min_stock = ?, qr_code = ?,
          description = ?, featured = ?
        WHERE slug = ?
      `).run(
        p.price,
        p.cost_price,
        p.compare_at_price,
        catId,
        p.brand,
        p.stock,
        p.min_stock,
        p.qr_code,
        p.description,
        p.featured,
        p.slug
      );
    }
  }

  // 4. Histórico de Movimentações de Estoque (Controle de Estoque)
  const movCount = db.prepare('SELECT COUNT(*) as count FROM stock_movements').get().count;
  if (movCount === 0) {
    const insertMovement = db.prepare(`
      INSERT INTO stock_movements (
        product_id, type, quantity, previous_stock, new_stock, unit_cost, reason, operator, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now', ?))
    `);

    const allProds = db.prepare('SELECT id, stock, cost_price FROM products LIMIT 10').all();
    for (const prod of allProds) {
      // Entrada inicial
      insertMovement.run(
        prod.id,
        'entrada',
        prod.stock + 10,
        0,
        prod.stock + 10,
        prod.cost_price,
        'Lote inicial de importação / Confecção Drop de Luxo',
        'Admin Master',
        '-15 days'
      );
      // Venda showroom
      insertMovement.run(
        prod.id,
        'venda',
        10,
        prod.stock + 10,
        prod.stock,
        prod.cost_price,
        'Vendas realizadas no showroom físico & e-commerce',
        'Gabriel Rap Drip',
        '-2 days'
      );
    }
  }

  // 5. Histórico de Cliques & Analytics do Site
  const analyticsCount = db.prepare('SELECT COUNT(*) as count FROM site_analytics').get().count;
  if (analyticsCount === 0) {
    const insertAnalytics = db.prepare(`
      INSERT INTO site_analytics (
        event_type, page_url, product_id, product_name, category, session_id, device, metadata, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now', ?))
    `);

    const prods = db.prepare('SELECT id, name FROM products LIMIT 6').all();
    const eventTypes = ['page_view', 'product_click', 'add_to_cart', 'begin_checkout', 'whatsapp_click'];
    const devices = ['mobile', 'mobile', 'desktop', 'desktop', 'tablet'];

    for (let i = 0; i < 60; i++) {
      const prod = prods[i % prods.length];
      const ev = eventTypes[i % eventTypes.length];
      const dev = devices[i % devices.length];
      const daysAgo = `-${(i % 14)} days`;

      insertAnalytics.run(
        ev,
        ev === 'page_view' ? '/index.html' : `/produto.html?id=${prod.id}`,
        prod.id,
        prod.name,
        'luxury-rap',
        `sess_${1000 + i}`,
        dev,
        JSON.stringify({ source: 'instagram_stories', city: 'São Carlos' }),
        daysAgo
      );
    }
  }

  // 6. Logs de Atividades da Equipe
  const logCount = db.prepare('SELECT COUNT(*) as count FROM activity_logs').get().count;
  if (logCount === 0) {
    const insertLog = db.prepare(`
      INSERT INTO activity_logs (user_id, user_name, action, details, ip_address, created_at)
      VALUES (?, ?, ?, ?, ?, datetime('now', ?))
    `);

    insertLog.run(1, 'Admin Master', 'LOGIN', 'Login com sucesso via painel administrativo', '192.168.0.201', '-1 hour');
    insertLog.run(2, 'Matheus Dripp', 'ESTOQUE_ENTRADA', 'Registrada entrada de 20 un. Relógio Skeleton 18K', '192.168.0.125', '-4 hours');
    insertLog.run(1, 'Admin Master', 'PRECO_ATUALIZADO', 'Atualizado preço promocional Sneaker Phantom', '192.168.0.201', '-1 day');
    insertLog.run(3, 'Gabriel Rap Drip', 'LEITURA_QR_CODE', 'Conferência de produto via leitor QR: DRIPP-WATCH-SKEL-01', '192.168.0.150', '-2 days');
  }
}

// Inicializa banco de dados
initDatabase();

module.exports = db;
