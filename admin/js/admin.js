/**
 * DRIPP CONCEITO - PAINEL ADMINISTRATIVO
 * Streetwear Masculino de Luxo - São Carlos, SP
 * JavaScript Unificado & Completo
 */

// ==========================================
// 1. DADOS INICIAIS / SEED DATABASE (MOCK/CACHE)
// ==========================================
const SEED_DATA = {
  adminUser: {
    id: 1,
    name: "Administrador DRIPP",
    email: "admin@drippconceito.com.br",
    role: "admin",
    avatar: "AD"
  },
  categories: [
    {
      id: 1,
      name: "Camisetas Oversized",
      slug: "camisetas-oversized",
      description: "Modelagem streetwear boxy e oversized com algodão pesado 260g.",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      active: true,
      order: 1
    },
    {
      id: 2,
      name: "Moletons & Hoodies",
      slug: "moletons-hoodies",
      description: "Moletom 3 cabos 400g com forro aveludado e bordados em relevo.",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
      active: true,
      order: 2
    },
    {
      id: 3,
      name: "Calças Cargo & Parachute",
      slug: "calcas-cargo",
      description: "Ripstop militar, bolsos utilitários táticos e reguladores em metal.",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
      active: true,
      order: 3
    },
    {
      id: 4,
      name: "Jaquetas & Corta-Ventos",
      slug: "jaquetas-corta-ventos",
      description: "Tecidos impermeáveis, detalhes refletivos 3M e cortes técnicos.",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
      active: true,
      order: 4
    },
    {
      id: 5,
      name: "Bermudas Street",
      slug: "bermudas-street",
      description: "Bermudas em moletom pesado e nylon taslan com cordão ajustável.",
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
      active: true,
      order: 5
    },
    {
      id: 6,
      name: "Bonés & Acessórios",
      slug: "bones-acessorios",
      description: "Dad hats, snapbacks com fivela de latão, correntes e meias tech.",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
      active: true,
      order: 6
    }
  ],
  products: [
    {
      id: 1,
      name: "Camiseta Oversized Acid Wash Gold",
      slug: "camiseta-oversized-acid-wash-gold",
      description: "Camiseta com lavagem ácida artesanal, estampa frontal silk screen em relevo dourado e modelagem streetwear autêntica. 100% Algodão 260g.",
      price: 189.90,
      comparePrice: 229.90,
      categoryId: 1,
      brand: "DRIPP",
      sizes: ["P", "M", "G", "GG"],
      colors: ["#1A1A1A", "#FFFFFF"],
      stock: 34,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
      ],
      featured: true,
      active: true,
      salesCount: 142
    },
    {
      id: 2,
      name: "Moletom Canguru Heavyweight Dark Gold",
      slug: "moletom-canguru-heavyweight-dark-gold",
      description: "Moletom pesado 420g com forro flanelado, capuz transpassado sem cordão e bordado DRIPP CONCEITO em alta definição nas costas.",
      price: 389.90,
      comparePrice: 449.90,
      categoryId: 2,
      brand: "DRIPP",
      sizes: ["M", "G", "GG", "XG"],
      colors: ["#000000", "#1C1C28"],
      stock: 18,
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
      ],
      featured: true,
      active: true,
      salesCount: 98
    },
    {
      id: 3,
      name: "Calça Parachute Cargo Blackout",
      slug: "calca-parachute-cargo-blackout",
      description: "Calça utilitária confeccionada em ripstop militar de alta resistência, 6 bolsos multifuncionais, regulador elástico na barra e zíper YKK.",
      price: 299.90,
      comparePrice: 349.90,
      categoryId: 3,
      brand: "DRIPP",
      sizes: ["38", "40", "42", "44"],
      colors: ["#111111", "#2D3748"],
      stock: 22,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80"
      ],
      featured: true,
      active: true,
      salesCount: 86
    },
    {
      id: 4,
      name: "Jaqueta Corta-Vento Refletivo 3M Stealth",
      slug: "jaqueta-corta-vento-refletivo-3m",
      description: "Jaqueta corta-vento impermeável com tecnologia hidrorrepelente, costuras termo-seladas e linhas refletivas 3M para alta visibilidade noturna.",
      price: 349.90,
      comparePrice: 399.90,
      categoryId: 4,
      brand: "DRIPP",
      sizes: ["P", "M", "G", "GG"],
      colors: ["#0B0C10", "#4B5563"],
      stock: 12,
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80"
      ],
      featured: false,
      active: true,
      salesCount: 65
    },
    {
      id: 5,
      name: "Camiseta Boxy Vintage Raw White",
      slug: "camiseta-boxy-vintage-raw-white",
      description: "Camiseta boxy fit gola canelada 3cm, cor cru natural sem tingimento químico prejudicial ao meio ambiente. Estampa emborrachada minimalista.",
      price: 179.90,
      comparePrice: 199.90,
      categoryId: 1,
      brand: "DRIPP",
      sizes: ["PP", "P", "M", "G", "GG"],
      colors: ["#F3F4F6", "#E5E7EB"],
      stock: 40,
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80"
      ],
      featured: true,
      active: true,
      salesCount: 115
    },
    {
      id: 6,
      name: "Bermuda Moletom Heavy Raw Cut",
      slug: "bermuda-moletom-heavy-raw-cut",
      description: "Bermuda acima do joelho com acabamento corte a fio nas barras, bolsos embutidos e cordão em algodão cru com ponteira de metal dourada.",
      price: 199.90,
      comparePrice: 239.90,
      categoryId: 5,
      brand: "DRIPP",
      sizes: ["P", "M", "G", "GG"],
      colors: ["#1E1E2F", "#000000"],
      stock: 28,
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80"
      ],
      featured: false,
      active: true,
      salesCount: 52
    },
    {
      id: 7,
      name: "Boné Snapback Gold Emblem DRIPP",
      slug: "bone-snapback-gold-emblem-dripp",
      description: "Snapback estruturado aba reta, sarja encorpada e placa de metal dourada personalizada na frente. Fecho traseiro ajustável.",
      price: 149.90,
      comparePrice: 179.90,
      categoryId: 6,
      brand: "DRIPP",
      sizes: ["ÚNICO"],
      colors: ["#000000"],
      stock: 45,
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80"
      ],
      featured: true,
      active: true,
      salesCount: 78
    },
    {
      id: 8,
      name: "Moletom Gola Careca Street Concept",
      slug: "moletom-gola-careca-street-concept",
      description: "Crewneck casual confeccionado em moletom premium, etiqueta emborrachada na manga esquerda e estampa tipográfica minimalista.",
      price: 319.90,
      comparePrice: 369.90,
      categoryId: 2,
      brand: "DRIPP",
      sizes: ["P", "M", "G", "GG"],
      colors: ["#2C302E", "#111827"],
      stock: 15,
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80"
      ],
      featured: false,
      active: true,
      salesCount: 41
    }
  ],
  customers: [
    {
      id: 1,
      name: "Matheus Silveira da Rocha",
      email: "matheus.silveira@gmail.com",
      phone: "(16) 99742-1829",
      cpf: "348.912.840-02",
      city: "São Carlos",
      state: "SP",
      address: "Rua Episcopal, 1420 - Centro",
      cep: "13560-001",
      ordersCount: 5,
      totalSpent: 1689.50,
      createdAt: "2024-01-15T14:30:00Z"
    },
    {
      id: 2,
      name: "Gabriel dos Santos Castro",
      email: "gabriel.castro@outlook.com",
      phone: "(16) 99182-4411",
      cpf: "412.873.190-54",
      city: "São Carlos",
      state: "SP",
      address: "Av. Trabalhador São Carlense, 400 - Parque Arnold Schimidt",
      cep: "13566-590",
      ordersCount: 3,
      totalSpent: 879.70,
      createdAt: "2024-02-02T10:15:00Z"
    },
    {
      id: 3,
      name: "Lucas Ribeiro Alencar",
      email: "lucas.alencar@hotmail.com",
      phone: "(11) 98845-9201",
      cpf: "299.145.788-31",
      city: "São Paulo",
      state: "SP",
      address: "Rua Augusta, 2190 - Consolação",
      cep: "01412-100",
      ordersCount: 4,
      totalSpent: 1420.30,
      createdAt: "2024-02-18T18:40:00Z"
    },
    {
      id: 4,
      name: "Felipe Nogueira Mendes",
      email: "felipe.mendes@gmail.com",
      phone: "(19) 99654-7712",
      cpf: "389.201.765-19",
      city: "Campinas",
      state: "SP",
      address: "Av. José de Souza Campos, 810 - Cambuí",
      cep: "13025-320",
      ordersCount: 2,
      totalSpent: 689.80,
      createdAt: "2024-03-01T11:20:00Z"
    },
    {
      id: 5,
      name: "Amanda Beatriz Toledo",
      email: "amanda.toledo@yahoo.com.br",
      phone: "(16) 99760-3382",
      cpf: "441.982.045-88",
      city: "Ribeirão Preto",
      state: "SP",
      address: "Rua Florêncio de Abreu, 750 - Centro",
      cep: "14015-060",
      ordersCount: 1,
      totalSpent: 389.90,
      createdAt: "2024-03-12T09:10:00Z"
    },
    {
      id: 6,
      name: "Bruno Carvalho Prado",
      email: "bruno.prado@gmail.com",
      phone: "(16) 99233-8819",
      cpf: "365.120.984-72",
      city: "São Carlos",
      state: "SP",
      address: "Rua Nove de Julho, 1980 - Jardim São Carlos",
      cep: "13560-042",
      ordersCount: 3,
      totalSpent: 998.40,
      createdAt: "2024-03-25T16:05:00Z"
    }
  ],
  orders: [
    {
      id: 1001,
      orderNumber: "DRP-9842",
      date: "2024-10-13T16:45:00Z",
      customerId: 1,
      customerName: "Matheus Silveira da Rocha",
      customerEmail: "matheus.silveira@gmail.com",
      customerPhone: "(16) 99742-1829",
      shippingAddress: "Rua Episcopal, 1420 - Centro, São Carlos - SP, CEP 13560-001",
      paymentMethod: "PIX",
      paymentStatus: "Pago",
      status: "Processando",
      shippingCost: 0.00,
      discount: 20.00,
      total: 559.80,
      trackingCode: "BR984210398AA",
      notes: "Cliente pediu envio rápido para aniversário.",
      items: [
        {
          productId: 1,
          name: "Camiseta Oversized Acid Wash Gold",
          size: "G",
          color: "Preto Ouro",
          price: 189.90,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
        },
        {
          productId: 2,
          name: "Moletom Canguru Heavyweight Dark Gold",
          size: "GG",
          color: "Blackout",
          price: 389.90,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
        }
      ],
      timeline: [
        { status: "Pendente", time: "2024-10-13T16:45:00Z", note: "Pedido realizado pelo cliente via site" },
        { status: "Pago", time: "2024-10-13T16:46:12Z", note: "Pagamento instantâneo via PIX confirmado pelo Banco Central" },
        { status: "Processando", time: "2024-10-13T17:00:00Z", note: "Pedido encaminhado para separação no centro de distribuição em São Carlos" }
      ]
    },
    {
      id: 1002,
      orderNumber: "DRP-9841",
      date: "2024-10-13T14:10:00Z",
      customerId: 2,
      customerName: "Gabriel dos Santos Castro",
      customerEmail: "gabriel.castro@outlook.com",
      customerPhone: "(16) 99182-4411",
      shippingAddress: "Av. Trabalhador São Carlense, 400 - Parque Arnold Schimidt, São Carlos - SP, CEP 13566-590",
      paymentMethod: "Cartão de Crédito (3x)",
      paymentStatus: "Pago",
      status: "Pendente",
      shippingCost: 15.00,
      discount: 0.00,
      total: 314.90,
      trackingCode: "",
      notes: "Entregar em horário comercial na portaria.",
      items: [
        {
          productId: 3,
          name: "Calça Parachute Cargo Blackout",
          size: "42",
          color: "Preto",
          price: 299.90,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80"
        }
      ],
      timeline: [
        { status: "Pendente", time: "2024-10-13T14:10:00Z", note: "Pedido recebido, aguardando faturamento" }
      ]
    },
    {
      id: 1003,
      orderNumber: "DRP-9840",
      date: "2024-10-12T19:25:00Z",
      customerId: 3,
      customerName: "Lucas Ribeiro Alencar",
      customerEmail: "lucas.alencar@hotmail.com",
      customerPhone: "(11) 98845-9201",
      shippingAddress: "Rua Augusta, 2190 - Consolação, São Paulo - SP, CEP 01412-100",
      paymentMethod: "PIX",
      paymentStatus: "Pago",
      status: "Enviado",
      shippingCost: 0.00,
      discount: 30.00,
      total: 669.80,
      trackingCode: "BR983991204AA",
      notes: "",
      items: [
        {
          productId: 4,
          name: "Jaqueta Corta-Vento Refletivo 3M Stealth",
          size: "G",
          color: "Grafite",
          price: 349.90,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80"
        },
        {
          productId: 8,
          name: "Moletom Gola Careca Street Concept",
          size: "G",
          color: "Verde Militar",
          price: 319.90,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80"
        }
      ],
      timeline: [
        { status: "Pendente", time: "2024-10-12T19:25:00Z", note: "Pedido criado" },
        { status: "Pago", time: "2024-10-12T19:27:00Z", note: "PIX validado" },
        { status: "Processando", time: "2024-10-12T20:10:00Z", note: "Nota Fiscal emitida (NF-e 12049)" },
        { status: "Enviado", time: "2024-10-13T09:30:00Z", note: "Despachado via Sedex dos Correios. Código: BR983991204AA" }
      ]
    },
    {
      id: 1004,
      orderNumber: "DRP-9839",
      date: "2024-10-11T11:05:00Z",
      customerId: 4,
      customerName: "Felipe Nogueira Mendes",
      customerEmail: "felipe.mendes@gmail.com",
      customerPhone: "(19) 99654-7712",
      shippingAddress: "Av. José de Souza Campos, 810 - Cambuí, Campinas - SP, CEP 13025-320",
      paymentMethod: "Boleto Bancário",
      paymentStatus: "Pago",
      status: "Entregue",
      shippingCost: 18.00,
      discount: 0.00,
      total: 397.90,
      trackingCode: "BR982180492AA",
      notes: "Deixar com o porteiro Sr. José.",
      items: [
        {
          productId: 5,
          name: "Camiseta Boxy Vintage Raw White",
          size: "M",
          color: "Cru Natural",
          price: 179.90,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80"
        },
        {
          productId: 6,
          name: "Bermuda Moletom Heavy Raw Cut",
          size: "M",
          color: "Preto",
          price: 199.90,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80"
        }
      ],
      timeline: [
        { status: "Pendente", time: "2024-10-11T11:05:00Z", note: "Aguardando compensação de boleto" },
        { status: "Pago", time: "2024-10-11T15:00:00Z", note: "Boleto compensado" },
        { status: "Processando", time: "2024-10-11T16:30:00Z", note: "Embalado e etiquetado" },
        { status: "Enviado", time: "2024-10-12T10:00:00Z", note: "Enviado por transportadora Jadlog" },
        { status: "Entregue", time: "2024-10-13T12:45:00Z", note: "Entregue no endereço do destinatário" }
      ]
    },
    {
      id: 1005,
      orderNumber: "DRP-9838",
      date: "2024-10-10T08:50:00Z",
      customerId: 5,
      customerName: "Amanda Beatriz Toledo",
      customerEmail: "amanda.toledo@yahoo.com.br",
      customerPhone: "(16) 99760-3382",
      shippingAddress: "Rua Florêncio de Abreu, 750 - Centro, Ribeirão Preto - SP, CEP 14015-060",
      paymentMethod: "Cartão de Crédito",
      paymentStatus: "Estornado",
      status: "Cancelado",
      shippingCost: 0.00,
      discount: 0.00,
      total: 389.90,
      trackingCode: "",
      notes: "Cancelamento solicitado pela cliente antes do despacho.",
      items: [
        {
          productId: 2,
          name: "Moletom Canguru Heavyweight Dark Gold",
          size: "M",
          color: "Preto Ouro",
          price: 389.90,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
        }
      ],
      timeline: [
        { status: "Pendente", time: "2024-10-10T08:50:00Z", note: "Pedido recebido" },
        { status: "Cancelado", time: "2024-10-10T10:15:00Z", note: "Cancelamento efetuado e estorno solicitado no gateway" }
      ]
    },
    {
      id: 1006,
      orderNumber: "DRP-9837",
      date: "2024-10-09T18:14:00Z",
      customerId: 6,
      customerName: "Bruno Carvalho Prado",
      customerEmail: "bruno.prado@gmail.com",
      customerPhone: "(16) 99233-8819",
      shippingAddress: "Rua Nove de Julho, 1980 - Jardim São Carlos, São Carlos - SP, CEP 13560-042",
      paymentMethod: "PIX",
      paymentStatus: "Pago",
      status: "Entregue",
      shippingCost: 0.00,
      discount: 15.00,
      total: 484.80,
      trackingCode: "BR981920384AA",
      notes: "Retirada em loja autorizada.",
      items: [
        {
          productId: 1,
          name: "Camiseta Oversized Acid Wash Gold",
          size: "M",
          color: "Preto Ouro",
          price: 189.90,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
        },
        {
          productId: 3,
          name: "Calça Parachute Cargo Blackout",
          size: "40",
          color: "Preto",
          price: 299.90,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80"
        }
      ],
      timeline: [
        { status: "Pendente", time: "2024-10-09T18:14:00Z", note: "Pedido realizado" },
        { status: "Pago", time: "2024-10-09T18:15:30Z", note: "PIX confirmado" },
        { status: "Entregue", time: "2024-10-10T14:20:00Z", note: "Entregue com sucesso" }
      ]
    }
  ],
  coupons: [
    {
      id: 1,
      code: "DRIPP10",
      type: "percentage",
      value: 10,
      minOrder: 150.00,
      uses: 148,
      maxUses: 500,
      active: true,
      expiryDate: "2025-12-31"
    },
    {
      id: 2,
      code: "PRIMEIRACOMPRA",
      type: "percentage",
      value: 15,
      minOrder: 200.00,
      uses: 320,
      maxUses: 1000,
      active: true,
      expiryDate: "2025-06-30"
    },
    {
      id: 3,
      code: "VIPGOLD",
      type: "fixed",
      value: 50.00,
      minOrder: 400.00,
      uses: 45,
      maxUses: 100,
      active: true,
      expiryDate: "2024-12-31"
    },
    {
      id: 4,
      code: "STREET20",
      type: "percentage",
      value: 20,
      minOrder: 300.00,
      uses: 89,
      maxUses: 200,
      active: false,
      expiryDate: "2024-09-30"
    }
  ]
};

// ==========================================
// 2. GERENCIAMENTO DE BANCO DE DADOS LOCAL
// ==========================================
class AdminStorage {
  static DB_KEY = 'dripp_admin_db';

  static init() {
    let db = localStorage.getItem(this.DB_KEY);
    if (!db) {
      localStorage.setItem(this.DB_KEY, JSON.stringify(SEED_DATA));
      return SEED_DATA;
    }
    try {
      return JSON.parse(db);
    } catch {
      localStorage.setItem(this.DB_KEY, JSON.stringify(SEED_DATA));
      return SEED_DATA;
    }
  }

  static getDB() {
    const raw = localStorage.getItem(this.DB_KEY);
    if (!raw) return this.init();
    try {
      return JSON.parse(raw);
    } catch {
      return this.init();
    }
  }

  static saveDB(data) {
    localStorage.setItem(this.DB_KEY, JSON.stringify(data));
  }

  static get(key) {
    const db = this.getDB();
    return db[key] || [];
  }

  static set(key, list) {
    const db = this.getDB();
    db[key] = list;
    this.saveDB(db);
  }
}

// Inicializa banco local
AdminStorage.init();

// ==========================================
// 3. API SERVICE COM FALLBACK ELEGANTE
// ==========================================
const API_BASE = '/api';

const DrippAPI = {
  getToken() {
    return localStorage.getItem('dripp_admin_token') || localStorage.getItem('token') || 'demo-admin-token-dripp';
  },

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`,
      ...(options.headers || {})
    };

    const tryEndpoints = endpoint.startsWith('/admin')
      ? [`${API_BASE}${endpoint}`, `${API_BASE}${endpoint.replace('/admin', '')}`]
      : [`${API_BASE}/admin${endpoint}`, `${API_BASE}${endpoint}`];

    for (const url of tryEndpoints) {
      try {
        const res = await fetch(url, {
          ...options,
          headers
        });

        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        // tenta o próximo ou cai no fallback
      }
    }

    console.warn(`[DRIPP API Fallback] Usando storage local para ${endpoint}`);
    return null;
  },

  // PRODUTOS
  async getProducts() {
    const apiRes = await this.request('/products');
    if (apiRes && (Array.isArray(apiRes) || apiRes.products)) {
      return Array.isArray(apiRes) ? apiRes : apiRes.products;
    }
    return AdminStorage.get('products');
  },

  async saveProduct(product) {
    const isEdit = Boolean(product.id);
    const endpoint = isEdit ? `/products/${product.id}` : '/products';
    const method = isEdit ? 'PUT' : 'POST';

    const apiRes = await this.request(endpoint, {
      method,
      body: JSON.stringify(product)
    });

    const products = AdminStorage.get('products');
    if (isEdit) {
      const idx = products.findIndex(p => p.id === product.id);
      if (idx !== -1) {
        products[idx] = { ...products[idx], ...product };
      }
    } else {
      product.id = Date.now();
      product.salesCount = product.salesCount || 0;
      products.unshift(product);
    }
    AdminStorage.set('products', products);

    return apiRes || product;
  },

  async deleteProduct(id) {
    await this.request(`/products/${id}`, { method: 'DELETE' });
    const products = AdminStorage.get('products').filter(p => p.id !== id);
    AdminStorage.set('products', products);
    return true;
  },

  // PEDIDOS
  async getOrders() {
    const apiRes = await this.request('/orders');
    if (apiRes && (Array.isArray(apiRes) || apiRes.orders)) {
      return Array.isArray(apiRes) ? apiRes : apiRes.orders;
    }
    return AdminStorage.get('orders');
  },

  async updateOrderStatus(id, newStatus, note = '') {
    await this.request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus, note })
    });

    const orders = AdminStorage.get('orders');
    const order = orders.find(o => o.id === id);
    if (order) {
      order.status = newStatus;
      order.timeline = order.timeline || [];
      order.timeline.push({
        status: newStatus,
        time: new Date().toISOString(),
        note: note || `Status alterado para ${newStatus} pelo painel administrativo.`
      });
      AdminStorage.set('orders', orders);
    }
    return order;
  },

  async updateOrderDetails(id, updates) {
    await this.request(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });

    const orders = AdminStorage.get('orders');
    const idx = orders.findIndex(o => o.id === id);
    if (idx !== -1) {
      orders[idx] = { ...orders[idx], ...updates };
      AdminStorage.set('orders', orders);
    }
    return orders[idx];
  },

  // CLIENTES
  async getCustomers() {
    const apiRes = await this.request('/customers');
    if (apiRes && (Array.isArray(apiRes) || apiRes.customers)) {
      return Array.isArray(apiRes) ? apiRes : apiRes.customers;
    }
    return AdminStorage.get('customers');
  },

  // CATEGORIAS
  async getCategories() {
    const apiRes = await this.request('/categories');
    if (apiRes && (Array.isArray(apiRes) || apiRes.categories)) {
      return Array.isArray(apiRes) ? apiRes : apiRes.categories;
    }
    return AdminStorage.get('categories');
  },

  async saveCategory(cat) {
    const isEdit = Boolean(cat.id);
    const endpoint = isEdit ? `/categories/${cat.id}` : '/categories';
    const method = isEdit ? 'PUT' : 'POST';

    await this.request(endpoint, {
      method,
      body: JSON.stringify(cat)
    });

    const cats = AdminStorage.get('categories');
    if (isEdit) {
      const idx = cats.findIndex(c => c.id === cat.id);
      if (idx !== -1) cats[idx] = { ...cats[idx], ...cat };
    } else {
      cat.id = Date.now();
      cat.order = cats.length + 1;
      cats.push(cat);
    }
    AdminStorage.set('categories', cats);
    return cat;
  },

  async deleteCategory(id) {
    await this.request(`/categories/${id}`, { method: 'DELETE' });
    const cats = AdminStorage.get('categories').filter(c => c.id !== id);
    AdminStorage.set('categories', cats);
    return true;
  },

  // CUPONS
  async getCoupons() {
    const apiRes = await this.request('/coupons');
    if (apiRes && (Array.isArray(apiRes) || apiRes.coupons)) {
      return Array.isArray(apiRes) ? apiRes : apiRes.coupons;
    }
    return AdminStorage.get('coupons');
  },

  async saveCoupon(coupon) {
    const isEdit = Boolean(coupon.id);
    const endpoint = isEdit ? `/coupons/${coupon.id}` : '/coupons';
    const method = isEdit ? 'PUT' : 'POST';

    await this.request(endpoint, {
      method,
      body: JSON.stringify(coupon)
    });

    const coupons = AdminStorage.get('coupons');
    if (isEdit) {
      const idx = coupons.findIndex(c => c.id === coupon.id);
      if (idx !== -1) coupons[idx] = { ...coupons[idx], ...coupon };
    } else {
      coupon.id = Date.now();
      coupon.uses = 0;
      coupons.unshift(coupon);
    }
    AdminStorage.set('coupons', coupons);
    return coupon;
  },

  async deleteCoupon(id) {
    await this.request(`/coupons/${id}`, { method: 'DELETE' });
    const coupons = AdminStorage.get('coupons').filter(c => c.id !== id);
    AdminStorage.set('coupons', coupons);
    return true;
  }
};

// ==========================================
// 4. NOTIFICAÇÕES TOAST
// ==========================================
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? 'fa-circle-check' : (type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-info');

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <div class="toast-message">${message}</div>
    <button type="button" class="btn-icon" style="border:none;background:transparent;color:#94a3b8;" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);

  // Trigger anim
  setTimeout(() => toast.classList.add('show'), 10);

  // Auto-remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================
// 5. FORMATAÇÕES & UTILITÁRIOS
// ==========================================
function formatCurrency(val) {
  const num = parseFloat(val) || 0;
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatDate(isoStr) {
  if (!isoStr) return '-';
  const d = new Date(isoStr);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatDateShort(isoStr) {
  if (!isoStr) return '-';
  const d = new Date(isoStr);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function generateSlug(text) {
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

function exportToCSV(filename, rows) {
  if (!rows || !rows.length) {
    showToast('Nenhum dado para exportar.', 'info');
    return;
  }
  const keys = Object.keys(rows[0]);
  const csvContent = [
    keys.join(';'),
    ...rows.map(row => keys.map(k => `"${(row[k] !== undefined && row[k] !== null ? String(row[k]) : '').replace(/"/g, '""')}"`).join(';'))
  ].join('\r\n');

  const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Relatório CSV baixado com sucesso!', 'success');
}

// ==========================================
// 6. CONTROLE DO SIDEBAR & AUTENTICAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Configura Sidebar Toggle
  const toggleBtn = document.querySelector('.sidebar-toggle-btn');
  const sidebar = document.querySelector('.admin-sidebar');
  const mobileToggleBtn = document.querySelector('.mobile-sidebar-toggle');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      localStorage.setItem('dripp_sidebar_collapsed', sidebar.classList.contains('collapsed'));
    });

    if (localStorage.getItem('dripp_sidebar_collapsed') === 'true') {
      sidebar.classList.add('collapsed');
    }
  }

  if (mobileToggleBtn && sidebar) {
    mobileToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // Logout Handler
  const logoutBtns = document.querySelectorAll('.logout-btn');
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Deseja realmente sair do painel administrativo da DRIPP CONCEITO?')) {
        localStorage.removeItem('dripp_admin_token');
        showToast('Sessão encerrada com sucesso.', 'info');
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    });
  });

  // Fecha modal ao clicar fora
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
    }
  });

  // Fecha modal no botão X
  document.querySelectorAll('.modal-close-btn, .modal-cancel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
    });
  });
});

// ==========================================
// 7. PÁGINA: DASHBOARD (index.html)
// ==========================================
async function initDashboard() {
  const [orders, products, customers] = await Promise.all([
    DrippAPI.getOrders(),
    DrippAPI.getProducts(),
    DrippAPI.getCustomers()
  ]);

  // Cálculos de KPI
  const totalSales = orders
    .filter(o => o.status !== 'Cancelado')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const todayStr = new Date().toISOString().slice(0, 10);
  const ordersToday = orders.filter(o => (o.date || '').slice(0, 10) === todayStr).length;
  const customersCount = customers.length;
  const avgTicket = orders.length ? totalSales / orders.filter(o => o.status !== 'Cancelado').length : 0;

  // Atualiza Cards de Stats
  const elTotalSales = document.getElementById('statTotalSales');
  if (elTotalSales) elTotalSales.textContent = formatCurrency(totalSales);

  const elOrdersToday = document.getElementById('statOrdersToday');
  if (elOrdersToday) elOrdersToday.textContent = ordersToday || orders.length;

  const elCustomersCount = document.getElementById('statCustomers');
  if (elCustomersCount) elCustomersCount.textContent = customersCount;

  const elAvgTicket = document.getElementById('statAvgTicket');
  if (elAvgTicket) elAvgTicket.textContent = formatCurrency(avgTicket);

  // Renderiza Tabela de Pedidos Recentes
  const recentOrdersTbody = document.getElementById('recentOrdersTableBody');
  if (recentOrdersTbody) {
    const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);
    recentOrdersTbody.innerHTML = recentOrders.map(o => `
      <tr>
        <td><strong>${o.orderNumber}</strong></td>
        <td>${formatDate(o.date)}</td>
        <td>${o.customerName}</td>
        <td><span class="badge-status ${o.status.toLowerCase()}">${o.status}</span></td>
        <td><strong>${formatCurrency(o.total)}</strong></td>
        <td>
          <a href="pedidos.html?id=${o.id}" class="btn-icon" title="Ver Detalhes">
            <i class="fa-solid fa-eye"></i>
          </a>
        </td>
      </tr>
    `).join('');
  }

  // Renderiza Top Produtos Vendidos
  const topProductsList = document.getElementById('topProductsList');
  if (topProductsList) {
    const sorted = [...products].sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0)).slice(0, 5);
    topProductsList.innerHTML = sorted.map(p => `
      <div class="top-product-item">
        <img src="${p.image}" class="top-product-img" alt="${p.name}" onerror="this.src='https://via.placeholder.com/50'">
        <div class="top-product-info">
          <div class="top-product-name">${p.name}</div>
          <div class="top-product-cat">Estoque: ${p.stock} un.</div>
        </div>
        <div class="top-product-stats">
          <div class="top-product-sales">${p.salesCount || 0} vendidos</div>
          <div class="top-product-revenue">${formatCurrency(p.price)}</div>
        </div>
      </div>
    `).join('');
  }

  // Gráfico de Receita dos Últimos 6 Meses com Chart.js
  const revenueChartCanvas = document.getElementById('revenueChart');
  if (revenueChartCanvas && typeof Chart !== 'undefined') {
    const months = ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'];
    const revenueData = [14200, 18900, 24500, 21800, 29400, 36800];

    new Chart(revenueChartCanvas, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Faturamento (R$)',
          data: revenueData,
          borderColor: '#FFFFFF',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: '#FFFFFF',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#16213e',
            titleColor: '#FFFFFF',
            bodyColor: '#ffffff',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 1,
            callbacks: {
              label: (ctx) => ` Receita: ${formatCurrency(ctx.raw)}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8' }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: '#94a3b8',
              callback: (val) => 'R$ ' + (val / 1000) + 'k'
            }
          }
        }
      }
    });
  }
}

// ==========================================
// 8. PÁGINA: PRODUTOS (produtos.html)
// ==========================================
let productsCurrentPage = 1;
const productsPerPage = 8;
let allProducts = [];
let allCategories = [];

async function initProductsPage() {
  allCategories = await DrippAPI.getCategories();
  allProducts = await DrippAPI.getProducts();

  // Preenche select de categorias no filtro
  const filterCat = document.getElementById('filterCategory');
  const formCatSelect = document.getElementById('productCategory');
  if (filterCat) {
    filterCat.innerHTML = '<option value="">Todas as Categorias</option>' + 
      allCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  }
  if (formCatSelect) {
    formCatSelect.innerHTML = allCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  }

  // Bind Listeners
  const searchInput = document.getElementById('searchProducts');
  if (searchInput) searchInput.addEventListener('input', renderProductsTable);

  if (filterCat) filterCat.addEventListener('change', renderProductsTable);

  const filterStatus = document.getElementById('filterStatus');
  if (filterStatus) filterStatus.addEventListener('change', renderProductsTable);

  // Checkbox de selecionar todos
  const selectAll = document.getElementById('selectAllProducts');
  if (selectAll) {
    selectAll.addEventListener('change', (e) => {
      document.querySelectorAll('.product-checkbox').forEach(cb => cb.checked = e.target.checked);
      updateBulkActionsState();
    });
  }

  // Auto-slug no formulário
  const prodNameInput = document.getElementById('productName');
  const prodSlugInput = document.getElementById('productSlug');
  if (prodNameInput && prodSlugInput) {
    prodNameInput.addEventListener('input', () => {
      if (!document.getElementById('productId').value) {
        prodSlugInput.value = generateSlug(prodNameInput.value);
      }
    });
  }

  // Upload Drag & Drop Preview
  setupImageDropzone();

  // Form Submit
  const productForm = document.getElementById('productForm');
  if (productForm) {
    productForm.addEventListener('submit', handleProductFormSubmit);
  }

  renderProductsTable();
}

function setupImageDropzone() {
  const dropzone = document.getElementById('imageDropzone');
  const fileInput = document.getElementById('productImageFile');
  const previewGrid = document.getElementById('imagePreviewsGrid');

  if (!dropzone || !fileInput) return;

  dropzone.addEventListener('click', () => fileInput.click());

  ['dragenter', 'dragover'].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFiles(e.dataTransfer.files);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFiles(e.target.files);
    }
  });
}

function handleImageFiles(files) {
  const previewGrid = document.getElementById('imagePreviewsGrid');
  const hiddenImgInput = document.getElementById('productMainImage');

  for (let file of files) {
    if (!file.type.startsWith('image/')) continue;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      if (hiddenImgInput && !hiddenImgInput.value) {
        hiddenImgInput.value = dataUrl;
      }
      if (previewGrid) {
        const card = document.createElement('div');
        card.className = 'img-preview-card';
        card.innerHTML = `
          <img src="${dataUrl}" alt="Preview">
          <button type="button" class="remove-img-btn" onclick="this.parentElement.remove();"><i class="fa-solid fa-xmark"></i></button>
        `;
        previewGrid.appendChild(card);
      }
    };
    reader.readAsDataURL(file);
  }
}

function renderProductsTable() {
  const tbody = document.getElementById('productsTableBody');
  if (!tbody) return;

  const searchTerm = (document.getElementById('searchProducts')?.value || '').toLowerCase();
  const catFilter = document.getElementById('filterCategory')?.value;
  const statusFilter = document.getElementById('filterStatus')?.value;

  let filtered = allProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm) || (p.brand || '').toLowerCase().includes(searchTerm);
    const matchCat = catFilter ? String(p.categoryId) === String(catFilter) : true;
    const matchStatus = statusFilter !== '' && statusFilter !== undefined ? (statusFilter === 'active' ? p.active : !p.active) : true;
    return matchSearch && matchCat && matchStatus;
  });

  // Paginação
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / productsPerPage) || 1;
  if (productsCurrentPage > totalPages) productsCurrentPage = totalPages;

  const start = (productsCurrentPage - 1) * productsPerPage;
  const paginated = filtered.slice(start, start + productsPerPage);

  if (paginated.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; padding: 2rem; color: #94a3b8;">
          <i class="fa-solid fa-box-open" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: #FFFFFF;"></i>
          Nenhum produto encontrado com os filtros selecionados.
        </td>
      </tr>
    `;
    renderPaginationControls('productsPagination', totalPages, productsCurrentPage, (page) => {
      productsCurrentPage = page;
      renderProductsTable();
    });
    return;
  }

  tbody.innerHTML = paginated.map(p => {
    const cat = allCategories.find(c => c.id === p.categoryId);
    return `
      <tr>
        <td>
          <label class="custom-checkbox">
            <input type="checkbox" class="product-checkbox" value="${p.id}" onchange="updateBulkActionsState()">
          </label>
        </td>
        <td>
          <img src="${p.image}" class="table-thumb" alt="${p.name}" onerror="this.src='https://via.placeholder.com/44'">
        </td>
        <td>
          <strong>${p.name}</strong>
          <div style="font-size: 0.75rem; color: #64748b;">${p.brand || 'DRIPP'}</div>
        </td>
        <td>${cat ? cat.name : 'Geral'}</td>
        <td>
          <strong>${formatCurrency(p.price)}</strong>
          ${p.comparePrice ? `<div style="font-size: 0.75rem; text-decoration: line-through; color: #64748b;">${formatCurrency(p.comparePrice)}</div>` : ''}
        </td>
        <td>
          <span style="font-weight: 700; color: ${p.stock <= 5 ? '#f87171' : '#34d399'};">${p.stock} un.</span>
        </td>
        <td>
          <label class="switch">
            <input type="checkbox" ${p.active ? 'checked' : ''} onchange="toggleProductStatus(${p.id}, this.checked)">
            <span class="slider"></span>
          </label>
        </td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <button class="btn-icon" title="Editar" onclick="openEditProductModal(${p.id})">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-icon delete" title="Excluir" onclick="deleteProductById(${p.id})">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  renderPaginationControls('productsPagination', totalPages, productsCurrentPage, (page) => {
    productsCurrentPage = page;
    renderProductsTable();
  });
}

function updateBulkActionsState() {
  const checked = document.querySelectorAll('.product-checkbox:checked');
  const bulkBar = document.getElementById('bulkActionsBar');
  const countBadge = document.getElementById('selectedProductsCount');
  if (bulkBar && countBadge) {
    if (checked.length > 0) {
      bulkBar.style.display = 'flex';
      countBadge.textContent = `${checked.length} selecionado(s)`;
    } else {
      bulkBar.style.display = 'none';
    }
  }
}

async function executeBulkAction(action) {
  const checked = Array.from(document.querySelectorAll('.product-checkbox:checked')).map(cb => Number(cb.value));
  if (!checked.length) return;

  if (action === 'delete') {
    if (!confirm(`Deseja realmente excluir ${checked.length} produtos permanentemente?`)) return;
    for (const id of checked) {
      await DrippAPI.deleteProduct(id);
    }
    showToast(`${checked.length} produtos excluídos!`, 'success');
  } else if (action === 'activate' || action === 'deactivate') {
    const active = action === 'activate';
    for (const id of checked) {
      const p = allProducts.find(prod => prod.id === id);
      if (p) {
        p.active = active;
        await DrippAPI.saveProduct(p);
      }
    }
    showToast(`Status atualizado para ${checked.length} produtos!`, 'success');
  }

  allProducts = await DrippAPI.getProducts();
  renderProductsTable();
  updateBulkActionsState();
}

async function toggleProductStatus(id, newStatus) {
  const p = allProducts.find(prod => prod.id === id);
  if (p) {
    p.active = newStatus;
    await DrippAPI.saveProduct(p);
    showToast(`Produto "${p.name}" ${newStatus ? 'ativado' : 'desativado'} com sucesso!`);
  }
}

function openNewProductModal() {
  const form = document.getElementById('productForm');
  if (form) form.reset();

  document.getElementById('productId').value = '';
  document.getElementById('modalProductTitle').innerHTML = '<i class="fa-solid fa-plus"></i> Novo Produto';
  document.getElementById('imagePreviewsGrid').innerHTML = '';
  document.getElementById('productMainImage').value = '';
  document.getElementById('productActive').checked = true;
  document.getElementById('productFeatured').checked = false;

  document.querySelectorAll('input[name="sizes"]').forEach(cb => cb.checked = false);

  const modal = document.getElementById('productModal');
  if (modal) modal.classList.add('active');
}

function openEditProductModal(id) {
  const p = allProducts.find(prod => prod.id === id);
  if (!p) return;

  document.getElementById('productId').value = p.id;
  document.getElementById('modalProductTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Editar Produto';
  document.getElementById('productName').value = p.name;
  document.getElementById('productSlug').value = p.slug;
  document.getElementById('productDescription').value = p.description || '';
  document.getElementById('productPrice').value = p.price;
  document.getElementById('productComparePrice').value = p.comparePrice || '';
  document.getElementById('productCategory').value = p.categoryId;
  document.getElementById('productBrand').value = p.brand || 'DRIPP';
  document.getElementById('productStock').value = p.stock;
  document.getElementById('productActive').checked = p.active;
  document.getElementById('productFeatured').checked = Boolean(p.featured);

  // Tamanhos
  document.querySelectorAll('input[name="sizes"]').forEach(cb => {
    cb.checked = (p.sizes || []).includes(cb.value);
  });

  // Imagem
  document.getElementById('productMainImage').value = p.image || '';
  const previewGrid = document.getElementById('imagePreviewsGrid');
  previewGrid.innerHTML = '';
  if (p.image) {
    const card = document.createElement('div');
    card.className = 'img-preview-card';
    card.innerHTML = `
      <img src="${p.image}" alt="Preview">
      <button type="button" class="remove-img-btn" onclick="document.getElementById('productMainImage').value=''; this.parentElement.remove();"><i class="fa-solid fa-xmark"></i></button>
    `;
    previewGrid.appendChild(card);
  }

  const modal = document.getElementById('productModal');
  if (modal) modal.classList.add('active');
}

async function handleProductFormSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('productId').value;
  const name = document.getElementById('productName').value.trim();
  const slug = document.getElementById('productSlug').value.trim() || generateSlug(name);
  const description = document.getElementById('productDescription').value.trim();
  const price = parseFloat(document.getElementById('productPrice').value) || 0;
  const comparePrice = parseFloat(document.getElementById('productComparePrice').value) || null;
  const categoryId = parseInt(document.getElementById('productCategory').value);
  const brand = document.getElementById('productBrand').value.trim() || 'DRIPP';
  const stock = parseInt(document.getElementById('productStock').value) || 0;
  const active = document.getElementById('productActive').checked;
  const featured = document.getElementById('productFeatured').checked;
  
  const selectedSizes = Array.from(document.querySelectorAll('input[name="sizes"]:checked')).map(cb => cb.value);
  const mainImage = document.getElementById('productMainImage').value || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80';

  if (!name || isNaN(price)) {
    showToast('Por favor, preencha o nome e preço do produto corretamente.', 'error');
    return;
  }

  const payload = {
    id: id ? parseInt(id) : undefined,
    name,
    slug,
    description,
    price,
    comparePrice,
    categoryId,
    brand,
    stock,
    sizes: selectedSizes,
    colors: ["#000000", "#FFFFFF"],
    image: mainImage,
    active,
    featured
  };

  await DrippAPI.saveProduct(payload);
  showToast(id ? 'Produto atualizado com sucesso!' : 'Novo produto cadastrado com sucesso!', 'success');

  document.getElementById('productModal').classList.remove('active');
  allProducts = await DrippAPI.getProducts();
  renderProductsTable();
}

async function deleteProductById(id) {
  const p = allProducts.find(prod => prod.id === id);
  if (!p) return;

  if (confirm(`Tem certeza que deseja excluir o produto "${p.name}"? Esta ação não pode ser desfeita.`)) {
    await DrippAPI.deleteProduct(id);
    showToast('Produto excluído com sucesso!', 'success');
    allProducts = await DrippAPI.getProducts();
    renderProductsTable();
  }
}

// ==========================================
// 9. PÁGINA: PEDIDOS (pedidos.html)
// ==========================================
let allOrders = [];
let ordersCurrentPage = 1;
const ordersPerPage = 8;
let currentViewingOrder = null;

async function initOrdersPage() {
  allOrders = await DrippAPI.getOrders();

  // URL Query param ?id=
  const urlParams = new URLSearchParams(window.location.search);
  const orderIdParam = urlParams.get('id');

  // Filters
  const searchInput = document.getElementById('searchOrders');
  const statusSelect = document.getElementById('filterOrderStatus');
  const paymentSelect = document.getElementById('filterPaymentStatus');

  if (searchInput) searchInput.addEventListener('input', renderOrdersTable);
  if (statusSelect) statusSelect.addEventListener('change', renderOrdersTable);
  if (paymentSelect) paymentSelect.addEventListener('change', renderOrdersTable);

  renderOrdersTable();

  if (orderIdParam) {
    const o = allOrders.find(ord => ord.id === parseInt(orderIdParam));
    if (o) openOrderDetailsModal(o.id);
  }
}

function renderOrdersTable() {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;

  const search = (document.getElementById('searchOrders')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('filterOrderStatus')?.value;
  const paymentFilter = document.getElementById('filterPaymentStatus')?.value;

  const filtered = allOrders.filter(o => {
    const matchSearch = o.orderNumber.toLowerCase().includes(search) ||
                        o.customerName.toLowerCase().includes(search) ||
                        o.customerEmail.toLowerCase().includes(search);
    const matchStatus = statusFilter ? o.status === statusFilter : true;
    const matchPayment = paymentFilter ? (o.paymentStatus === paymentFilter || o.paymentMethod.includes(paymentFilter)) : true;
    return matchSearch && matchStatus && matchPayment;
  });

  const totalPages = Math.ceil(filtered.length / ordersPerPage) || 1;
  if (ordersCurrentPage > totalPages) ordersCurrentPage = totalPages;

  const start = (ordersCurrentPage - 1) * ordersPerPage;
  const paginated = filtered.slice(start, start + ordersPerPage);

  if (paginated.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 2rem; color: #94a3b8;">
          <i class="fa-solid fa-box-archive" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: #FFFFFF;"></i>
          Nenhum pedido encontrado.
        </td>
      </tr>
    `;
    renderPaginationControls('ordersPagination', totalPages, ordersCurrentPage, (p) => {
      ordersCurrentPage = p;
      renderOrdersTable();
    });
    return;
  }

  tbody.innerHTML = paginated.map(o => `
    <tr style="cursor: pointer;" onclick="openOrderDetailsModal(${o.id})">
      <td><strong>${o.orderNumber}</strong></td>
      <td>${formatDate(o.date)}</td>
      <td>
        <div style="font-weight: 600;">${o.customerName}</div>
        <div style="font-size: 0.75rem; color: #64748b;">${o.customerEmail}</div>
      </td>
      <td>${(o.items || []).reduce((sum, item) => sum + item.quantity, 0)} itens</td>
      <td><strong>${formatCurrency(o.total)}</strong></td>
      <td>
        <span class="badge-status ${o.paymentStatus === 'Pago' ? 'entregue' : 'pendente'}">
          ${o.paymentStatus} (${o.paymentMethod})
        </span>
      </td>
      <td>
        <span class="badge-status ${o.status.toLowerCase()}">${o.status}</span>
      </td>
      <td onclick="event.stopPropagation()">
        <button class="btn-icon" title="Ver Detalhes do Pedido" onclick="openOrderDetailsModal(${o.id})">
          <i class="fa-solid fa-eye"></i>
        </button>
      </td>
    </tr>
  `).join('');

  renderPaginationControls('ordersPagination', totalPages, ordersCurrentPage, (p) => {
    ordersCurrentPage = p;
    renderOrdersTable();
  });
}

function openOrderDetailsModal(orderId) {
  const o = allOrders.find(ord => ord.id === orderId);
  if (!o) return;
  currentViewingOrder = o;

  document.getElementById('modalOrderNumber').textContent = o.orderNumber;
  document.getElementById('modalOrderDate').textContent = formatDate(o.date);
  
  // Cliente
  document.getElementById('orderDetailCustomerName').textContent = o.customerName;
  document.getElementById('orderDetailCustomerEmail').textContent = o.customerEmail;
  document.getElementById('orderDetailCustomerPhone').textContent = o.customerPhone || '-';
  document.getElementById('orderDetailShippingAddress').textContent = o.shippingAddress || 'Endereço não informado';

  // Pagamento
  document.getElementById('orderDetailPaymentMethod').textContent = o.paymentMethod;
  document.getElementById('orderDetailPaymentStatus').innerHTML = `
    <span class="badge-status ${o.paymentStatus === 'Pago' ? 'entregue' : 'pendente'}">${o.paymentStatus}</span>
  `;
  document.getElementById('orderDetailTotal').textContent = formatCurrency(o.total);

  // Status Select
  const statusSelect = document.getElementById('orderDetailStatusSelect');
  if (statusSelect) statusSelect.value = o.status;

  // Tracking Code
  const trackingInput = document.getElementById('orderDetailTrackingCode');
  if (trackingInput) trackingInput.value = o.trackingCode || '';

  // Notes
  const notesTextarea = document.getElementById('orderDetailNotes');
  if (notesTextarea) notesTextarea.value = o.notes || '';

  // Itens
  const itemsContainer = document.getElementById('orderDetailItemsList');
  if (itemsContainer) {
    itemsContainer.innerHTML = (o.items || []).map(item => `
      <div style="display: flex; align-items: center; gap: 0.9rem; padding: 0.6rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <img src="${item.image}" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/44'">
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 0.85rem;">${item.name}</div>
          <div style="font-size: 0.75rem; color: #94a3b8;">Tamanho: <strong>${item.size || 'G'}</strong> | Cor: ${item.color || 'Padrão'}</div>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: 700; font-size: 0.85rem;">${formatCurrency(item.price * item.quantity)}</div>
          <div style="font-size: 0.75rem; color: #64748b;">${item.quantity} x ${formatCurrency(item.price)}</div>
        </div>
      </div>
    `).join('');
  }

  // Timeline
  renderOrderTimeline(o.timeline || []);

  const modal = document.getElementById('orderDetailsModal');
  if (modal) modal.classList.add('active');
}

function renderOrderTimeline(timeline) {
  const container = document.getElementById('orderDetailTimeline');
  if (!container) return;

  if (!timeline || !timeline.length) {
    container.innerHTML = '<p style="color: #64748b; font-size: 0.8rem;">Nenhum evento registrado.</p>';
    return;
  }

  container.innerHTML = timeline.map(event => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h5>${event.status}</h5>
        <p style="font-size: 0.775rem; color: #cbd5e1; margin: 0.15rem 0;">${event.note || ''}</p>
        <span>${formatDate(event.time)}</span>
      </div>
    </div>
  `).join('');
}

async function saveOrderStatusChange() {
  if (!currentViewingOrder) return;
  const newStatus = document.getElementById('orderDetailStatusSelect').value;
  const trackingCode = document.getElementById('orderDetailTrackingCode').value.trim();
  const notes = document.getElementById('orderDetailNotes').value.trim();

  await DrippAPI.updateOrderStatus(currentViewingOrder.id, newStatus, `Atualizado para ${newStatus} pelo painel`);
  await DrippAPI.updateOrderDetails(currentViewingOrder.id, { trackingCode, notes });

  showToast(`Pedido ${currentViewingOrder.orderNumber} atualizado com sucesso!`, 'success');
  
  allOrders = await DrippAPI.getOrders();
  const updated = allOrders.find(o => o.id === currentViewingOrder.id);
  if (updated) openOrderDetailsModal(updated.id);
  renderOrdersTable();
}

function exportOrdersCSV() {
  const rows = allOrders.map(o => ({
    'Numero_Pedido': o.orderNumber,
    'Data': formatDate(o.date),
    'Cliente': o.customerName,
    'Email': o.customerEmail,
    'Telefone': o.customerPhone,
    'Total_R$': o.total,
    'Pagamento': o.paymentMethod,
    'Status_Pagamento': o.paymentStatus,
    'Status_Pedido': o.status,
    'Rastreio': o.trackingCode || ''
  }));
  exportToCSV('dripp_pedidos', rows);
}

// ==========================================
// 10. PÁGINA: CLIENTES (clientes.html)
// ==========================================
let allCustomers = [];
let customersCurrentPage = 1;
const customersPerPage = 8;

async function initCustomersPage() {
  allCustomers = await DrippAPI.getCustomers();

  const searchInput = document.getElementById('searchCustomers');
  if (searchInput) {
    searchInput.addEventListener('input', renderCustomersTable);
  }

  renderCustomersTable();
}

function renderCustomersTable() {
  const tbody = document.getElementById('customersTableBody');
  if (!tbody) return;

  const search = (document.getElementById('searchCustomers')?.value || '').toLowerCase();
  const filtered = allCustomers.filter(c => 
    c.name.toLowerCase().includes(search) ||
    c.email.toLowerCase().includes(search) ||
    (c.phone && c.phone.includes(search))
  );

  const totalPages = Math.ceil(filtered.length / customersPerPage) || 1;
  if (customersCurrentPage > totalPages) customersCurrentPage = totalPages;

  const start = (customersCurrentPage - 1) * customersPerPage;
  const paginated = filtered.slice(start, start + customersPerPage);

  if (paginated.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 2rem; color: #94a3b8;">
          <i class="fa-solid fa-users" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: #FFFFFF;"></i>
          Nenhum cliente encontrado.
        </td>
      </tr>
    `;
    renderPaginationControls('customersPagination', totalPages, customersCurrentPage, (p) => {
      customersCurrentPage = p;
      renderCustomersTable();
    });
    return;
  }

  tbody.innerHTML = paginated.map(c => `
    <tr>
      <td>
        <div style="font-weight: 700; color: #fff;">${c.name}</div>
        <div style="font-size: 0.75rem; color: #64748b;">CPF: ${c.cpf || 'Não informado'}</div>
      </td>
      <td>${c.email}</td>
      <td>${c.phone || '-'}</td>
      <td><span class="badge-status processando">${c.ordersCount || 0} pedidos</span></td>
      <td><strong>${formatCurrency(c.totalSpent || 0)}</strong></td>
      <td>${formatDateShort(c.createdAt)}</td>
      <td>
        <button class="btn-icon" title="Ver Histórico do Cliente" onclick="openCustomerDetailsModal(${c.id})">
          <i class="fa-solid fa-eye"></i>
        </button>
      </td>
    </tr>
  `).join('');

  renderPaginationControls('customersPagination', totalPages, customersCurrentPage, (p) => {
    customersCurrentPage = p;
    renderCustomersTable();
  });
}

async function openCustomerDetailsModal(id) {
  const customer = allCustomers.find(c => c.id === id);
  if (!customer) return;

  const orders = await DrippAPI.getOrders();
  const customerOrders = orders.filter(o => o.customerId === id || o.customerEmail === customer.email);

  document.getElementById('modalCustomerName').textContent = customer.name;
  document.getElementById('customerDetailEmail').textContent = customer.email;
  document.getElementById('customerDetailPhone').textContent = customer.phone || '-';
  document.getElementById('customerDetailCpf').textContent = customer.cpf || '-';
  document.getElementById('customerDetailAddress').textContent = `${customer.address || ''}, ${customer.city || ''} - ${customer.state || ''} (CEP: ${customer.cep || ''})`;
  document.getElementById('customerDetailTotalSpent').textContent = formatCurrency(customer.totalSpent);
  document.getElementById('customerDetailOrdersCount').textContent = `${customerOrders.length} pedido(s)`;

  const ordersListTbody = document.getElementById('customerOrdersTableBody');
  if (ordersListTbody) {
    if (customerOrders.length === 0) {
      ordersListTbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #94a3b8; padding: 1rem;">Nenhum pedido realizado ainda.</td></tr>';
    } else {
      ordersListTbody.innerHTML = customerOrders.map(o => `
        <tr>
          <td><strong>${o.orderNumber}</strong></td>
          <td>${formatDateShort(o.date)}</td>
          <td><span class="badge-status ${o.status.toLowerCase()}">${o.status}</span></td>
          <td><strong>${formatCurrency(o.total)}</strong></td>
        </tr>
      `).join('');
    }
  }

  const modal = document.getElementById('customerDetailsModal');
  if (modal) modal.classList.add('active');
}

function exportCustomersCSV() {
  const rows = allCustomers.map(c => ({
    'Nome': c.name,
    'Email': c.email,
    'Telefone': c.phone,
    'CPF': c.cpf,
    'Cidade': c.city,
    'Estado': c.state,
    'Pedidos': c.ordersCount,
    'Total_Gasto_R$': c.totalSpent,
    'Data_Cadastro': formatDateShort(c.createdAt)
  }));
  exportToCSV('dripp_clientes', rows);
}

// ==========================================
// 11. PÁGINA: FINANCEIRO (financeiro.html)
// ==========================================
let financialCharts = {};

async function initFinancialPage() {
  const [orders, products] = await Promise.all([
    DrippAPI.getOrders(),
    DrippAPI.getProducts()
  ]);

  // Filtro de Data
  const dateRangeSelect = document.getElementById('financialDateRange');
  if (dateRangeSelect) {
    dateRangeSelect.addEventListener('change', () => loadFinancialData(orders, products));
  }

  loadFinancialData(orders, products);
}

function loadFinancialData(orders, products) {
  const range = document.getElementById('financialDateRange')?.value || '30days';

  // Métricas
  const paidOrders = orders.filter(o => o.status !== 'Cancelado');
  const grossRevenue = paidOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const netRevenue = grossRevenue * 0.94; // Dedução estimada taxas bancárias / gateway
  const avgTicket = paidOrders.length ? grossRevenue / paidOrders.length : 0;
  const conversionRate = 3.65; // % estimado e-commerce streetwear

  // KPIs
  document.getElementById('finGrossRevenue').textContent = formatCurrency(grossRevenue);
  document.getElementById('finNetRevenue').textContent = formatCurrency(netRevenue);
  document.getElementById('finAvgTicket').textContent = formatCurrency(avgTicket);
  document.getElementById('finConversionRate').textContent = `${conversionRate}%`;

  // Render Charts
  renderFinancialCharts(orders);

  // Transações Recentes
  const transactionsTbody = document.getElementById('transactionsTableBody');
  if (transactionsTbody) {
    transactionsTbody.innerHTML = orders.map(o => `
      <tr>
        <td>${formatDate(o.date)}</td>
        <td><strong>${o.orderNumber}</strong></td>
        <td>${o.customerName}</td>
        <td>${o.paymentMethod}</td>
        <td><span class="badge-status ${o.paymentStatus === 'Pago' ? 'entregue' : (o.paymentStatus === 'Estornado' ? 'cancelado' : 'pendente')}">${o.paymentStatus}</span></td>
        <td><strong>${formatCurrency(o.total)}</strong></td>
      </tr>
    `).join('');
  }

  // Resumo de Totais
  document.getElementById('summaryTotalRevenue').textContent = formatCurrency(grossRevenue);
  document.getElementById('summaryTotalOrders').textContent = `${orders.length} pedidos`;
  document.getElementById('summaryPaidOrders').textContent = `${paidOrders.length} aprovados`;
}

function renderFinancialCharts(orders) {
  if (typeof Chart === 'undefined') return;

  // 1. Receita por Período
  const revenueCtx = document.getElementById('financialRevenueChart');
  if (revenueCtx) {
    if (financialCharts.revenue) financialCharts.revenue.destroy();
    financialCharts.revenue = new Chart(revenueCtx, {
      type: 'bar',
      data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Receita Diária (R$)',
          data: [4200, 5800, 7100, 6400, 9800, 12400, 11200],
          backgroundColor: '#FFFFFF',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
        }
      }
    });
  }

  // 2. Métodos de Pagamento
  const paymentCtx = document.getElementById('financialPaymentChart');
  if (paymentCtx) {
    if (financialCharts.payment) financialCharts.payment.destroy();
    financialCharts.payment = new Chart(paymentCtx, {
      type: 'doughnut',
      data: {
        labels: ['PIX', 'Cartão de Crédito', 'Boleto'],
        datasets: [{
          data: [54, 36, 10],
          backgroundColor: ['#10B981', '#FFFFFF', '#3B82F6'],
          borderColor: '#16213e',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#fff' } }
        }
      }
    });
  }

  // 3. Distribuição de Status
  const statusCtx = document.getElementById('financialStatusChart');
  if (statusCtx) {
    if (financialCharts.status) financialCharts.status.destroy();
    financialCharts.status = new Chart(statusCtx, {
      type: 'pie',
      data: {
        labels: ['Entregue', 'Processando', 'Enviado', 'Pendente', 'Cancelado'],
        datasets: [{
          data: [45, 25, 18, 8, 4],
          backgroundColor: ['#10B981', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'],
          borderColor: '#16213e',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#fff' } }
        }
      }
    });
  }

  // 4. Receita por Categoria
  const catCtx = document.getElementById('financialCategoryChart');
  if (catCtx) {
    if (financialCharts.category) financialCharts.category.destroy();
    financialCharts.category = new Chart(catCtx, {
      type: 'bar',
      data: {
        labels: ['Camisetas', 'Moletons', 'Calças Cargo', 'Corta-Ventos', 'Bermudas', 'Bonés'],
        datasets: [{
          label: 'Faturamento (R$)',
          data: [18400, 24600, 15800, 12900, 8400, 5600],
          backgroundColor: '#E5C365',
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
        }
      }
    });
  }
}

function exportFinancialCSV() {
  const db = AdminStorage.getDB();
  const rows = (db.orders || []).map(o => ({
    'Data': formatDate(o.date),
    'Pedido': o.orderNumber,
    'Cliente': o.customerName,
    'Metodo_Pagamento': o.paymentMethod,
    'Status_Pagamento': o.paymentStatus,
    'Valor_Total_R$': o.total
  }));
  exportToCSV('dripp_financeiro', rows);
}

// ==========================================
// 12. PÁGINA: CUPONS (cupons.html)
// ==========================================
let allCoupons = [];

async function initCouponsPage() {
  allCoupons = await DrippAPI.getCoupons();

  const form = document.getElementById('couponForm');
  if (form) {
    form.addEventListener('submit', handleCouponFormSubmit);
  }

  renderCouponsTable();
}

function renderCouponsTable() {
  const tbody = document.getElementById('couponsTableBody');
  if (!tbody) return;

  if (allCoupons.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 2rem; color: #94a3b8;">
          <i class="fa-solid fa-ticket" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: #FFFFFF;"></i>
          Nenhum cupom cadastrado.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = allCoupons.map(c => `
    <tr>
      <td>
        <span style="font-family: 'Space Grotesk', monospace; font-weight: 800; color: #e5c365; font-size: 1rem; letter-spacing: 1px;">
          ${c.code}
        </span>
      </td>
      <td>${c.type === 'percentage' ? 'Porcentagem (%)' : 'Valor Fixo (R$)'}</td>
      <td><strong>${c.type === 'percentage' ? `${c.value}%` : formatCurrency(c.value)}</strong></td>
      <td>${formatCurrency(c.minOrder || 0)}</td>
      <td>${c.uses || 0} / ${c.maxUses || 'Ilimitado'}</td>
      <td>
        <span class="${c.active ? 'badge-active' : 'badge-inactive'}">
          ${c.active ? 'Ativo' : 'Inativo'}
        </span>
      </td>
      <td>${formatDateShort(c.expiryDate)}</td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn-icon" title="Editar" onclick="openEditCouponModal(${c.id})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn-icon delete" title="Excluir" onclick="deleteCouponById(${c.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openNewCouponModal() {
  const form = document.getElementById('couponForm');
  if (form) form.reset();

  document.getElementById('couponId').value = '';
  document.getElementById('modalCouponTitle').innerHTML = '<i class="fa-solid fa-plus"></i> Novo Cupom';
  document.getElementById('couponActive').checked = true;

  const modal = document.getElementById('couponModal');
  if (modal) modal.classList.add('active');
}

function openEditCouponModal(id) {
  const c = allCoupons.find(coup => coup.id === id);
  if (!c) return;

  document.getElementById('couponId').value = c.id;
  document.getElementById('modalCouponTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Editar Cupom';
  document.getElementById('couponCode').value = c.code;
  document.getElementById('couponType').value = c.type;
  document.getElementById('couponValue').value = c.value;
  document.getElementById('couponMinOrder').value = c.minOrder || '';
  document.getElementById('couponMaxUses').value = c.maxUses || '';
  document.getElementById('couponExpiryDate').value = c.expiryDate || '';
  document.getElementById('couponActive').checked = c.active;

  const modal = document.getElementById('couponModal');
  if (modal) modal.classList.add('active');
}

async function handleCouponFormSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('couponId').value;
  const code = document.getElementById('couponCode').value.trim().toUpperCase();
  const type = document.getElementById('couponType').value;
  const value = parseFloat(document.getElementById('couponValue').value) || 0;
  const minOrder = parseFloat(document.getElementById('couponMinOrder').value) || 0;
  const maxUses = parseInt(document.getElementById('couponMaxUses').value) || null;
  const expiryDate = document.getElementById('couponExpiryDate').value;
  const active = document.getElementById('couponActive').checked;

  if (!code || isNaN(value)) {
    showToast('Informe o código e valor do cupom corretamente.', 'error');
    return;
  }

  const payload = {
    id: id ? parseInt(id) : undefined,
    code,
    type,
    value,
    minOrder,
    maxUses,
    expiryDate,
    active
  };

  await DrippAPI.saveCoupon(payload);
  showToast(id ? 'Cupom atualizado!' : 'Cupom criado com sucesso!', 'success');

  document.getElementById('couponModal').classList.remove('active');
  allCoupons = await DrippAPI.getCoupons();
  renderCouponsTable();
}

async function deleteCouponById(id) {
  const c = allCoupons.find(coup => coup.id === id);
  if (!c) return;

  if (confirm(`Excluir o cupom "${c.code}" permanentemente?`)) {
    await DrippAPI.deleteCoupon(id);
    showToast('Cupom removido!', 'success');
    allCoupons = await DrippAPI.getCoupons();
    renderCouponsTable();
  }
}

// ==========================================
// 13. PÁGINA: CATEGORIAS (categorias.html)
// ==========================================
let categoriesList = [];

async function initCategoriesPage() {
  categoriesList = await DrippAPI.getCategories();

  const form = document.getElementById('categoryForm');
  if (form) {
    form.addEventListener('submit', handleCategoryFormSubmit);
  }

  renderCategoriesGrid();
}

function renderCategoriesGrid() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;

  const products = AdminStorage.get('products');

  grid.innerHTML = categoriesList.map((cat, idx) => {
    const prodCount = products.filter(p => p.categoryId === cat.id).length;
    return `
      <div class="category-card" draggable="true" ondragstart="handleDragStart(event, ${idx})" ondragover="handleDragOver(event)" ondrop="handleDrop(event, ${idx})">
        <img src="${cat.image}" class="category-card-img" alt="${cat.name}" onerror="this.src='https://via.placeholder.com/300x140'">
        <div class="category-card-body">
          <div class="category-card-title">${cat.name}</div>
          <div class="category-card-desc">${cat.description || 'Sem descrição.'}</div>
          <div class="category-card-footer">
            <span style="font-size: 0.8rem; color: #94a3b8;"><i class="fa-solid fa-shirt"></i> ${prodCount} produtos</span>
            <div style="display: flex; gap: 0.4rem;">
              <button class="btn-icon" title="Editar" onclick="openEditCategoryModal(${cat.id})">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn-icon delete" title="Excluir" onclick="deleteCategoryById(${cat.id})">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

let draggedCategoryIndex = null;
function handleDragStart(e, idx) {
  draggedCategoryIndex = idx;
  e.dataTransfer.effectAllowed = 'move';
}
function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}
function handleDrop(e, targetIdx) {
  e.preventDefault();
  if (draggedCategoryIndex === null || draggedCategoryIndex === targetIdx) return;
  const dragged = categoriesList.splice(draggedCategoryIndex, 1)[0];
  categoriesList.splice(targetIdx, 0, dragged);
  AdminStorage.set('categories', categoriesList);
  renderCategoriesGrid();
  showToast('Ordem das categorias atualizada!', 'info');
}

function openNewCategoryModal() {
  const form = document.getElementById('categoryForm');
  if (form) form.reset();

  document.getElementById('categoryId').value = '';
  document.getElementById('modalCategoryTitle').innerHTML = '<i class="fa-solid fa-plus"></i> Nova Categoria';
  document.getElementById('categoryActive').checked = true;
  document.getElementById('categoryImage').value = '';

  const modal = document.getElementById('categoryModal');
  if (modal) modal.classList.add('active');
}

function openEditCategoryModal(id) {
  const cat = categoriesList.find(c => c.id === id);
  if (!cat) return;

  document.getElementById('categoryId').value = cat.id;
  document.getElementById('modalCategoryTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Editar Categoria';
  document.getElementById('categoryName').value = cat.name;
  document.getElementById('categoryDescription').value = cat.description || '';
  document.getElementById('categoryImage').value = cat.image || '';
  document.getElementById('categoryActive').checked = cat.active !== false;

  const modal = document.getElementById('categoryModal');
  if (modal) modal.classList.add('active');
}

async function handleCategoryFormSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('categoryId').value;
  const name = document.getElementById('categoryName').value.trim();
  const description = document.getElementById('categoryDescription').value.trim();
  const image = document.getElementById('categoryImage').value.trim() || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80';
  const active = document.getElementById('categoryActive').checked;

  if (!name) {
    showToast('Informe o nome da categoria.', 'error');
    return;
  }

  const payload = {
    id: id ? parseInt(id) : undefined,
    name,
    slug: generateSlug(name),
    description,
    image,
    active
  };

  await DrippAPI.saveCategory(payload);
  showToast(id ? 'Categoria atualizada!' : 'Categoria cadastrada!', 'success');

  document.getElementById('categoryModal').classList.remove('active');
  categoriesList = await DrippAPI.getCategories();
  renderCategoriesGrid();
}

async function deleteCategoryById(id) {
  const cat = categoriesList.find(c => c.id === id);
  if (!cat) return;

  if (confirm(`Deseja remover a categoria "${cat.name}"?`)) {
    await DrippAPI.deleteCategory(id);
    showToast('Categoria removida!', 'success');
    categoriesList = await DrippAPI.getCategories();
    renderCategoriesGrid();
  }
}

// ==========================================
// 14. HELPER DE PAGINAÇÃO REUTILIZÁVEL
// ==========================================
function renderPaginationControls(containerId, totalPages, currentPage, onPageChange) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = `
    <div>Página <strong>${currentPage}</strong> de <strong>${totalPages}</strong></div>
    <div class="pagination-controls">
      <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="(${onPageChange.toString()})(${currentPage - 1})">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `
        <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="(${onPageChange.toString()})(${i})">
          ${i}
        </button>
      `;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += `<span style="padding: 0 4px; color: #64748b;">...</span>`;
    }
  }

  html += `
      <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="(${onPageChange.toString()})(${currentPage + 1})">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  `;

  container.innerHTML = html;
}

