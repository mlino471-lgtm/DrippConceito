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
      name: "Camisetas Heavyweight Luxo",
      slug: "camisetas",
      description: "Modelagem streetwear boxy e oversized com algodão pesado 260g e silkscreen em ouro metálico.",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      active: true,
      order: 1
    },
    {
      id: 2,
      name: "Outerwear, Hoodies & Puffers",
      slug: "hoodies",
      description: "Jaquetas puffer em vinil brilhante, corta-ventos com refletivo 3M e hoodies pesados 400g.",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
      active: true,
      order: 2
    },
    {
      id: 3,
      name: "Calças Cargo & Parachute",
      slug: "calcas",
      description: "Ripstop militar, bolsos utilitários táticos e reguladores em metal cromado.",
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
      name: "Bermudas Streetwear",
      slug: "bermudas",
      description: "Bermudas em moletom pesado e nylon taslan com cordão ajustável e ponteiras de metal.",
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
      active: true,
      order: 5
    },
    {
      id: 6,
      name: "Bonés & Headwear Luxo",
      slug: "bones",
      description: "Truckers com bordado 3D em ouro, 5-panels em veludo cotelê e fitteds exclusivos numerados.",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
      active: true,
      order: 6
    },
    {
      id: 7,
      name: "Relógios de Luxo & Iced Out",
      slug: "relogios",
      description: "Relógios automáticos esqueleto, cronógrafos cravejados estilo VVS e ouro 18K.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
      active: true,
      order: 7
    },
    {
      id: 8,
      name: "Sneakers & Tênis Hype",
      slug: "tenis",
      description: "Sneakers cano alto e chunky com couros nobres, solados bionics e estética luxury rap.",
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80",
      active: true,
      order: 8
    },
    {
      id: 9,
      name: "Jóias, Correntes & Acessórios",
      slug: "acessorios",
      description: "Correntes cubanas cravejadas banhadas a ouro 18k, shoulder bags e óculos shield.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
      active: true,
      order: 9
    }
  ],
  products: [
    {
      id: 1,
      name: "Camiseta Oversized Acid Wash Gold",
      slug: "camiseta-oversized-acid-wash-gold",
      description: "Camiseta com lavagem ácida artesanal, estampa frontal silk screen em relevo dourado e modelagem streetwear autêntica. 100% Algodão 260g.",
      price: 189.90,
      costPrice: 58.00,
      comparePrice: 229.90,
      categoryId: 1,
      brand: "DRIPP",
      sizes: ["P", "M", "G", "GG"],
      colors: ["#1A1A1A", "#FFFFFF"],
      stock: 34,
      minStock: 8,
      qrCode: "DRIPP-TEE-ACID-01",
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
      costPrice: 125.00,
      comparePrice: 449.90,
      categoryId: 2,
      brand: "DRIPP",
      sizes: ["M", "G", "GG", "XG"],
      colors: ["#000000", "#1C1C28"],
      stock: 18,
      minStock: 5,
      qrCode: "DRIPP-HOOD-GOLD-02",
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
      costPrice: 95.00,
      comparePrice: 349.90,
      categoryId: 3,
      brand: "DRIPP",
      sizes: ["38", "40", "42", "44"],
      colors: ["#111111", "#2D3748"],
      stock: 22,
      minStock: 6,
      qrCode: "DRIPP-PNT-CARG-03",
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
      costPrice: 110.00,
      comparePrice: 399.90,
      categoryId: 4,
      brand: "DRIPP",
      sizes: ["P", "M", "G", "GG"],
      colors: ["#0B0C10", "#4B5563"],
      stock: 12,
      minStock: 4,
      qrCode: "DRIPP-JKT-3M-04",
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
      costPrice: 52.00,
      comparePrice: 199.90,
      categoryId: 1,
      brand: "DRIPP",
      sizes: ["PP", "P", "M", "G", "GG"],
      colors: ["#F3F4F6", "#E5E7EB"],
      stock: 40,
      minStock: 10,
      qrCode: "DRIPP-TEE-BOXY-05",
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
      costPrice: 62.00,
      comparePrice: 239.90,
      categoryId: 5,
      brand: "DRIPP",
      sizes: ["P", "M", "G", "GG"],
      colors: ["#1E1E2F", "#000000"],
      stock: 28,
      minStock: 6,
      qrCode: "DRIPP-BER-MOLE-06",
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
      costPrice: 42.00,
      comparePrice: 179.90,
      categoryId: 6,
      brand: "DRIPP",
      sizes: ["ÚNICO"],
      colors: ["#000000"],
      stock: 45,
      minStock: 10,
      qrCode: "DRIPP-CAP-SNAP-07",
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
      costPrice: 98.00,
      comparePrice: 369.90,
      categoryId: 2,
      brand: "DRIPP",
      sizes: ["P", "M", "G", "GG"],
      colors: ["#2C302E", "#111827"],
      stock: 15,
      minStock: 5,
      qrCode: "DRIPP-CREW-STRE-08",
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80"
      ],
      featured: false,
      active: true,
      salesCount: 41
    },
    {
      id: 9,
      name: "Relógio DRIPP Skeleton Automatic 18K Gold & Safira",
      slug: "relogio-dripp-skeleton-automatic-18k-gold",
      description: "O ápice do luxo rap. Movimento automático esqueleto japonês aparente, caixa de 42mm em aço 316L com banho de ouro 18K PVD e vidro em cristal de safira anti-risco. Acompanha estojo de luxo forrado em veludo.",
      price: 1890.00,
      costPrice: 650.00,
      comparePrice: 2490.00,
      categoryId: 7,
      brand: "DRIPP HAUTE HORLOGERIE",
      sizes: ["Único (42mm)"],
      colors: ["#D4AF37", "#E5E7EB"],
      stock: 8,
      minStock: 3,
      qrCode: "DRIPP-WATCH-SKEL-01",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop"
      ],
      featured: true,
      active: true,
      salesCount: 29
    },
    {
      id: 10,
      name: "Relógio DRIPP Iced Out Baguette Pave Cravejado VVS",
      slug: "relogio-dripp-iced-out-baguette-pave-vvs",
      description: "Estética hip hop internacional. Caixa e pulseira totalmente cravejadas com pedras zircônia cúbica lapidação Baguette 5A com brilho VVS impecável. Resistência 5ATM.",
      price: 2290.00,
      costPrice: 780.00,
      comparePrice: 2890.00,
      categoryId: 7,
      brand: "DRIPP ICE CULTURE",
      sizes: ["Único (44mm)"],
      colors: ["#E5E7EB", "#D4AF37"],
      stock: 6,
      minStock: 2,
      qrCode: "DRIPP-WATCH-ICE-02",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop"
      ],
      featured: true,
      active: true,
      salesCount: 38
    },
    {
      id: 11,
      name: "Relógio Cronógrafo DRIPP Matte Carbon Black Edition",
      slug: "relogio-cronografo-dripp-matte-carbon-black",
      description: "Minimalismo tático de alta relojoaria. Caixa em aço cirúrgico com acabamento PVD preto fosco acetinado, sub-dials cronógrafos funcionais e pulseira de silicone vulcanizado.",
      price: 1390.00,
      costPrice: 480.00,
      comparePrice: 1690.00,
      categoryId: 7,
      brand: "DRIPP TACTICAL",
      sizes: ["Único (43mm)"],
      colors: ["#111111", "#1E1E2F"],
      stock: 12,
      minStock: 4,
      qrCode: "DRIPP-WATCH-CARB-03",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop"
      ],
      featured: true,
      active: true,
      salesCount: 45
    },
    {
      id: 12,
      name: "Boné Trucker DRIPP Luxury Rap Leather & 3D Gold",
      slug: "bone-trucker-dripp-luxury-rap-leather",
      description: "Boné trucker de alto padrão com painel frontal em couro legítimo macio e tela respirável traseira estruturada. Bordado frontal DRIPP CONCEITO em ultra alto relevo 3D dourado.",
      price: 219.90,
      costPrice: 65.00,
      comparePrice: 279.90,
      categoryId: 6,
      brand: "DRIPP CONCEITO",
      sizes: ["Snapback Ajustável"],
      colors: ["#000000", "#D4AF37"],
      stock: 35,
      minStock: 8,
      qrCode: "DRIPP-CAP-TRUCK-01",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop"
      ],
      featured: true,
      active: true,
      salesCount: 110
    },
    {
      id: 13,
      name: "Boné 5-Panel Velvet Chrome DRIPP Gothic Cross",
      slug: "bone-5-panel-velvet-chrome-dripp",
      description: "Confeccionado em veludo cotelê premium pesado de toque suave. Aplicação metálica exclusiva Gothic Cross em liga de zinco cromada na lateral e fecho traseiro strapback.",
      price: 199.90,
      costPrice: 58.00,
      comparePrice: 249.90,
      categoryId: 6,
      brand: "DRIPP CONCEITO",
      sizes: ["Strapback Ajustável"],
      colors: ["#111111", "#4A154B"],
      stock: 28,
      minStock: 6,
      qrCode: "DRIPP-CAP-5PAN-02",
      image: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=800&auto=format&fit=crop"
      ],
      featured: true,
      active: true,
      salesCount: 76
    },
    {
      id: 14,
      name: "Boné Fitted DRIPP São Carlos Limited Edition 7 1/4",
      slug: "bone-fitted-dripp-sao-carlos-limited",
      description: "Modelagem fitted estruturada tradicional do rap nova-iorquino adaptada para a cena de São Carlos. Sarja pesada 100% algodão, bordado comemorativo do código de área 016.",
      price: 239.90,
      costPrice: 70.00,
      comparePrice: 299.90,
      categoryId: 6,
      brand: "DRIPP CONCEITO",
      sizes: ["7 1/8", "7 1/4", "7 3/8", "7 1/2"],
      colors: ["#0B0C10", "#FFFFFF"],
      stock: 24,
      minStock: 5,
      qrCode: "DRIPP-CAP-FIT-03",
      image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop"
      ],
      featured: true,
      active: true,
      salesCount: 92
    },
    {
      id: 15,
      name: "Sneaker DRIPP Phantom High-Top Platinum Edition",
      slug: "sneaker-dripp-phantom-high-top-platinum",
      description: "Sneaker cano alto manufaturado artesanalmente com mescla de couro vegetal premium e camurça italiana. Solado tratorado costurado 360 graus e detalhes em cromo platinum.",
      price: 989.90,
      costPrice: 320.00,
      comparePrice: 1290.00,
      categoryId: 8,
      brand: "DRIPP FOOTWEAR",
      sizes: ["39", "40", "41", "42", "43", "44"],
      colors: ["#FFFFFF", "#E5E7EB", "#000000"],
      stock: 14,
      minStock: 4,
      qrCode: "DRIPP-SNK-HIGH-01",
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop"
      ],
      featured: true,
      active: true,
      salesCount: 64
    },
    {
      id: 16,
      name: "Chunky Sneaker DRIPP Bionic V2 Triple Black",
      slug: "chunky-sneaker-dripp-bionic-v2-triple-black",
      description: "Design futurista e agressivo com entressola arquitetônica em EVA de densidade dupla para máximo amortecimento e cadarços volumosos estilo rope laces.",
      price: 849.90,
      costPrice: 280.00,
      comparePrice: 1090.00,
      categoryId: 8,
      brand: "DRIPP FOOTWEAR",
      sizes: ["38", "39", "40", "41", "42", "43"],
      colors: ["#111111", "#1E1E2F"],
      stock: 16,
      minStock: 5,
      qrCode: "DRIPP-SNK-CHUNK-02",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop"
      ],
      featured: true,
      active: true,
      salesCount: 55
    },
    {
      id: 17,
      name: "Corrente Miami Cuban Link 14mm Iced Out 18K",
      slug: "corrente-miami-cuban-link-14mm-iced-out",
      description: "Corrente elo cubano de 14mm cravejada com centenas de pedras zircônia 5A, triplo banho de ouro 18K e fecho trava dupla gaveta personalizado DRIPP.",
      price: 799.90,
      costPrice: 240.00,
      comparePrice: 1050.00,
      categoryId: 9,
      brand: "DRIPP ICE CULTURE",
      sizes: ["50cm", "60cm"],
      colors: ["#D4AF37", "#E5E7EB"],
      stock: 19,
      minStock: 4,
      qrCode: "DRIPP-JEW-CUBA-01",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop"
      ],
      featured: true,
      active: true,
      salesCount: 88
    },
    {
      id: 18,
      name: "Jaqueta Puffer Glossy Vinyl DRIPP Noir",
      slug: "jaqueta-puffer-glossy-vinyl-dripp-noir",
      description: "Jaqueta puffer volumosa com acabamento em vinil laqueado brilhante preto, enchimento térmico isolante premium e gola alta imponente.",
      price: 689.90,
      costPrice: 210.00,
      comparePrice: 850.00,
      categoryId: 2,
      brand: "DRIPP HAUTE COUTURE",
      sizes: ["P", "M", "G", "GG"],
      colors: ["#000000"],
      stock: 11,
      minStock: 3,
      qrCode: "DRIPP-JKT-PUFF-01",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80"
      ],
      featured: true,
      active: true,
      salesCount: 49
    },
    {
      id: 19,
      name: "Calça Cargo Tática Ripstop Multi-Pockets Khaki",
      slug: "calca-cargo-tatica-ripstop-khaki",
      description: "Modelagem utilitária militar streetwear com 8 bolsos, fivelas ajustáveis, reforço nos joelhos e zíperes YKK invertidos.",
      price: 329.90,
      costPrice: 105.00,
      comparePrice: 389.90,
      categoryId: 3,
      brand: "DRIPP TACTICAL",
      sizes: ["38", "40", "42", "44", "46"],
      colors: ["#78716C", "#1F2937"],
      stock: 25,
      minStock: 6,
      qrCode: "DRIPP-PNT-KHAK-02",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80"
      ],
      featured: false,
      active: true,
      salesCount: 62
    },
    {
      id: 20,
      name: "Óculos Sol Shield DRIPP Cyberpunk Gold Mirrored",
      slug: "oculos-sol-shield-dripp-cyberpunk-gold",
      description: "Lente inteiriça curva com proteção UV400 total, espelhado dourado 24K e hastes robustas em acetato preto fosco.",
      price: 349.90,
      costPrice: 95.00,
      comparePrice: 420.00,
      categoryId: 9,
      brand: "DRIPP EYEWEAR",
      sizes: ["Único"],
      colors: ["#D4AF37", "#000000"],
      stock: 20,
      minStock: 5,
      qrCode: "DRIPP-ACC-SHLD-01",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
      ],
      featured: true,
      active: true,
      salesCount: 71
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
  ],
  stockMovements: [
    {
      id: 1,
      date: new Date(Date.now() - 3600000 * 2).toISOString(),
      type: "IN",
      productId: 9,
      productName: "Relógio DRIPP Skeleton Automatic 18K Gold & Safira",
      quantity: 5,
      previousStock: 3,
      newStock: 8,
      reason: "Lote de importação recebido e conferido",
      operator: "Admin Master"
    },
    {
      id: 2,
      date: new Date(Date.now() - 3600000 * 5).toISOString(),
      type: "OUT",
      productId: 10,
      productName: "Relógio DRIPP Iced Out Baguette Pave Cravejado VVS",
      quantity: 1,
      previousStock: 7,
      newStock: 6,
      reason: "Venda Showroom PDV Balcão",
      operator: "Gabriel Rap Drip"
    },
    {
      id: 3,
      date: new Date(Date.now() - 3600000 * 12).toISOString(),
      type: "IN",
      productId: 12,
      productName: "Boné Trucker DRIPP Luxury Rap Leather & 3D Gold",
      quantity: 20,
      previousStock: 15,
      newStock: 35,
      reason: "Reposição confecção premium São Carlos",
      operator: "Matheus Dripp"
    },
    {
      id: 4,
      date: new Date(Date.now() - 3600000 * 24).toISOString(),
      type: "OUT",
      productId: 15,
      productName: "Sneaker DRIPP Phantom High-Top Platinum Edition",
      quantity: 2,
      previousStock: 16,
      newStock: 14,
      reason: "Pedido Online Despachado #DRP-9841",
      operator: "Admin Master"
    },
    {
      id: 5,
      date: new Date(Date.now() - 3600000 * 48).toISOString(),
      type: "ADJUST",
      productId: 17,
      productName: "Corrente Miami Cuban Link 14mm Iced Out 18K",
      quantity: 1,
      previousStock: 18,
      newStock: 19,
      reason: "Ajuste balanço de inventário semanal",
      operator: "Matheus Dripp"
    }
  ],
  staffAccounts: [
    {
      id: 1,
      name: "Admin Master DRIPP",
      email: "admin@dripp.com.br",
      phone: "(16) 99876-5432",
      role: "admin",
      permissions: ["all"],
      status: "active",
      lastLogin: new Date().toISOString()
    },
    {
      id: 2,
      name: "Matheus Dripp (Gerente de Loja)",
      email: "gerente@dripp.com.br",
      phone: "(16) 99765-4321",
      role: "manager",
      permissions: ["products", "inventory", "orders", "qr_scanner"],
      status: "active",
      lastLogin: new Date(Date.now() - 3600000 * 3).toISOString()
    },
    {
      id: 3,
      name: "Gabriel Rap Drip (Vendedor)",
      email: "vendas@dripp.com.br",
      phone: "(16) 99654-3210",
      role: "seller",
      permissions: ["orders", "qr_scanner", "inventory_read"],
      status: "active",
      lastLogin: new Date(Date.now() - 3600000 * 6).toISOString()
    },
    {
      id: 4,
      name: "Ana Clara (Operadora de Caixa)",
      email: "caixa@dripp.com.br",
      phone: "(16) 99543-2109",
      role: "cashier",
      permissions: ["orders", "qr_scanner"],
      status: "active",
      lastLogin: new Date(Date.now() - 3600000 * 20).toISOString()
    }
  ],
  activityLogs: [
    {
      id: 1,
      date: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      userName: "Admin Master DRIPP",
      action: "LOGIN",
      details: "Acesso ao painel administrativo via desktop seguro",
      ip: "189.44.120.88 (São Carlos, SP)"
    },
    {
      id: 2,
      date: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      userName: "Matheus Dripp",
      action: "STOCK_IN",
      details: "Entrada de 5 unidades: Relógio DRIPP Skeleton 18K",
      ip: "177.105.82.14 (São Carlos, SP)"
    },
    {
      id: 3,
      date: new Date(Date.now() - 3600000 * 2).toISOString(),
      userName: "Gabriel Rap Drip",
      action: "QR_SCAN",
      details: "Consulta e baixa PDV: Relógio Iced Out Cravejado VVS",
      ip: "177.105.82.14 (Loja Física - Av. Regit Arab 703)"
    },
    {
      id: 4,
      date: new Date(Date.now() - 3600000 * 5).toISOString(),
      userName: "Admin Master DRIPP",
      action: "PRODUCT_UPDATE",
      details: "Atualização de preço e catálogo: Sneaker Phantom Platinum",
      ip: "189.44.120.88 (São Carlos, SP)"
    }
  ]
};

// ==========================================
// 2. GERENCIAMENTO DE BANCO DE DADOS LOCAL
// ==========================================
class AdminStorage {
  static DB_KEY = 'dripp_admin_db';

  static init() {
    let db = null;
    try {
      const raw = localStorage.getItem(this.DB_KEY);
      if (raw) db = JSON.parse(raw);
    } catch (e) {}

    if (!db || !db.products || db.products.length < 15 || !db.stockMovements || !db.staffAccounts) {
      localStorage.setItem(this.DB_KEY, JSON.stringify(SEED_DATA));
      return SEED_DATA;
    }
    return db;
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
  },

  // CONTROLE DE ESTOQUE
  async getInventory() {
    const apiRes = await this.request('/inventory');
    if (apiRes && apiRes.success && (apiRes.products || apiRes.items)) {
      return apiRes.products || apiRes.items;
    }
    const products = await this.getProducts();
    const categories = await this.getCategories();
    const catMap = Object.fromEntries(categories.map(c => [c.id, c.name]));

    return products.map(p => {
      const price = Number(p.price) || 0;
      const cost = Number(p.costPrice || p.cost_price) || (price * 0.35);
      const margin = price > 0 ? (((price - cost) / price) * 100).toFixed(1) : 0;
      const stock = Number(p.stock) || 0;
      const minStock = Number(p.minStock || p.min_stock) || 5;
      let status = 'ok';
      if (stock === 0) status = 'out_of_stock';
      else if (stock <= minStock) status = 'low_stock';

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        brand: p.brand || 'DRIPP',
        category_name: catMap[p.categoryId] || 'Streetwear',
        price,
        cost_price: cost,
        stock,
        min_stock: minStock,
        qr_code: p.qrCode || p.qr_code || `DRIPP-${p.slug ? p.slug.toUpperCase().slice(0, 8) : p.id}`,
        margin,
        status,
        image: p.image || (p.images && p.images[0]) || ''
      };
    });
  },

  async saveStockMovement(mov) {
    const apiRes = await this.request('/inventory/movement', {
      method: 'POST',
      body: JSON.stringify(mov)
    });

    const products = AdminStorage.get('products');
    const prod = products.find(p => p.id === parseInt(mov.product_id || mov.productId));
    if (prod) {
      const qty = parseInt(mov.quantity) || 0;
      if (mov.type === 'IN') prod.stock = (prod.stock || 0) + qty;
      else if (mov.type === 'OUT') prod.stock = Math.max(0, (prod.stock || 0) - qty);
      else if (mov.type === 'ADJUST') prod.stock = qty;
      AdminStorage.set('products', products);
    }

    const movements = AdminStorage.get('stockMovements');
    const newMovement = {
      id: Date.now(),
      date: new Date().toISOString(),
      type: mov.type,
      productId: mov.product_id || mov.productId,
      productName: prod ? prod.name : 'Produto DRIPP',
      quantity: parseInt(mov.quantity) || 0,
      previousStock: prod ? prod.stock : 0,
      newStock: prod ? prod.stock : 0,
      reason: mov.reason || 'Movimentação manual via painel',
      operator: mov.operator || 'Admin Master'
    };
    movements.unshift(newMovement);
    AdminStorage.set('stockMovements', movements);

    return apiRes || { success: true, movement: newMovement };
  },

  async getStockMovements() {
    const apiRes = await this.request('/inventory/movements');
    if (apiRes && apiRes.success && apiRes.movements) {
      return apiRes.movements;
    }
    return AdminStorage.get('stockMovements');
  },

  // LEITOR QR CODE / SCANNER
  async lookupQR(code) {
    const apiRes = await this.request(`/qr/lookup/${encodeURIComponent(code)}`);
    if (apiRes && apiRes.success) {
      return {
        ...apiRes,
        product: apiRes.product || apiRes.data,
        order: apiRes.order || apiRes.data
      };
    }

    const cleanCode = (code || '').trim().toLowerCase();
    const products = await this.getProducts();
    const foundProduct = products.find(p => 
      (p.qrCode && p.qrCode.toLowerCase() === cleanCode) ||
      (p.qr_code && p.qr_code.toLowerCase() === cleanCode) ||
      String(p.id) === cleanCode ||
      (p.slug && p.slug.toLowerCase().includes(cleanCode)) ||
      (p.name && p.name.toLowerCase().includes(cleanCode))
    );

    if (foundProduct) {
      const price = Number(foundProduct.price) || 0;
      const cost = Number(foundProduct.costPrice || foundProduct.cost_price) || (price * 0.35);
      return {
        success: true,
        type: 'product',
        product: {
          ...foundProduct,
          price,
          cost_price: cost,
          min_stock: foundProduct.minStock || foundProduct.min_stock || 5,
          qr_code: foundProduct.qrCode || foundProduct.qr_code || cleanCode.toUpperCase()
        }
      };
    }

    const orders = await this.getOrders();
    const foundOrder = orders.find(o => 
      (o.orderNumber && o.orderNumber.toLowerCase() === cleanCode) ||
      String(o.id) === cleanCode
    );

    if (foundOrder) {
      return {
        success: true,
        type: 'order',
        order: foundOrder
      };
    }

    return { success: false, message: 'Nenhum produto ou pedido correspondente encontrado.' };
  },

  async quickStockAdjust(productId, action, quantity = 1) {
    const apiRes = await this.request('/qr/quick-stock', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, action, quantity })
    });

    const products = AdminStorage.get('products');
    const prod = products.find(p => p.id === parseInt(productId));
    if (prod) {
      const prev = prod.stock || 0;
      if (action === 'add') prod.stock = prev + quantity;
      else if (action === 'remove') prod.stock = Math.max(0, prev - quantity);
      AdminStorage.set('products', products);

      const movements = AdminStorage.get('stockMovements');
      movements.unshift({
        id: Date.now(),
        date: new Date().toISOString(),
        type: action === 'add' ? 'IN' : 'OUT',
        productId: prod.id,
        productName: prod.name,
        quantity,
        previousStock: prev,
        newStock: prod.stock,
        reason: action === 'add' ? 'Entrada rápida via Leitor QR' : 'Baixa rápida PDV via Leitor QR',
        operator: 'Admin Master'
      });
      AdminStorage.set('stockMovements', movements);
    }

    return apiRes || { success: true, newStock: prod ? prod.stock : 0 };
  },

  // FINANCEIRO & LUCRO REAL
  async getProfitReport(period = '30days') {
    const apiRes = await this.request(`/finance/profit?period=${period}`);
    if (apiRes && apiRes.success) {
      return apiRes;
    }

    const orders = (await this.getOrders()).filter(o => o.status !== 'Cancelado');
    const grossRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const cmv = grossRevenue * 0.38;
    const grossProfit = grossRevenue - cmv;
    const profitMargin = grossRevenue > 0 ? ((grossProfit / grossRevenue) * 100).toFixed(1) : 0;
    const avgTicket = orders.length > 0 ? (grossRevenue / orders.length).toFixed(2) : 0;

    return {
      success: true,
      period,
      metrics: {
        grossRevenue,
        cmv,
        grossProfit,
        profitMargin: parseFloat(profitMargin),
        avgTicket: parseFloat(avgTicket),
        totalOrders: orders.length
      },
      categoryProfit: [
        { category: 'Relógios de Luxo', revenue: 14850, cmv: 5400, profit: 9450, margin: 63.6 },
        { category: 'Sneakers & Tênis', revenue: 9800, cmv: 3500, profit: 6300, margin: 64.2 },
        { category: 'Outerwear & Hoodies', revenue: 8400, cmv: 3100, profit: 5300, margin: 63.1 },
        { category: 'Camisetas Heavyweight', revenue: 7600, cmv: 2400, profit: 5200, margin: 68.4 },
        { category: 'Bonés & Headwear', revenue: 4900, cmv: 1500, profit: 3400, margin: 69.3 },
        { category: 'Jóias & Acessórios', revenue: 3800, cmv: 1200, profit: 2600, margin: 68.4 }
      ],
      monthlyProfit: [
        { month: 'Mai/24', revenue: 24500, cmv: 9200, profit: 15300 },
        { month: 'Jun/24', revenue: 28900, cmv: 10800, profit: 18100 },
        { month: 'Jul/24', revenue: 33400, cmv: 12500, profit: 20900 },
        { month: 'Ago/24', revenue: 38200, cmv: 14100, profit: 24100 },
        { month: 'Set/24', revenue: 44100, cmv: 16500, profit: 27600 },
        { month: 'Out/24', revenue: 52400, cmv: 19600, profit: 32800 }
      ]
    };
  },

  // GESTÃO DE CONTAS & AUDITORIA
  async getAccounts() {
    const apiRes = await this.request('/accounts');
    if (apiRes && apiRes.success && (apiRes.accounts || apiRes.users)) {
      return apiRes.accounts || apiRes.users;
    }
    return AdminStorage.get('staffAccounts');
  },

  async saveAccount(acc) {
    const isEdit = Boolean(acc.id);
    const endpoint = isEdit ? `/accounts/${acc.id}` : '/accounts';
    const method = isEdit ? 'PUT' : 'POST';

    const apiRes = await this.request(endpoint, {
      method,
      body: JSON.stringify(acc)
    });

    const accounts = AdminStorage.get('staffAccounts');
    if (isEdit) {
      const idx = accounts.findIndex(a => a.id === acc.id);
      if (idx !== -1) accounts[idx] = { ...accounts[idx], ...acc };
    } else {
      acc.id = Date.now();
      acc.status = 'active';
      acc.lastLogin = 'Nunca';
      accounts.push(acc);
    }
    AdminStorage.set('staffAccounts', accounts);

    const logs = AdminStorage.get('activityLogs');
    logs.unshift({
      id: Date.now(),
      date: new Date().toISOString(),
      userName: 'Admin Master DRIPP',
      action: isEdit ? 'ACCOUNT_UPDATE' : 'ACCOUNT_CREATE',
      details: `${isEdit ? 'Atualizou' : 'Cadastrou'} o usuário: ${acc.name} (${acc.role})`,
      ip: '189.44.120.88 (São Carlos, SP)'
    });
    AdminStorage.set('activityLogs', logs);

    return apiRes || acc;
  },

  async getActivityLogs() {
    const apiRes = await this.request('/accounts/logs');
    if (apiRes && apiRes.success && apiRes.logs) {
      return apiRes.logs;
    }
    return AdminStorage.get('activityLogs');
  },

  // CLIQUES & ANALYTICS
  async getAnalytics(days = 14) {
    const apiRes = await this.request(`/analytics/dashboard?days=${days}`);
    if (apiRes && apiRes.success) {
      return apiRes;
    }

    return {
      success: true,
      summary: {
        totalPageviews: 4820,
        totalClicks: 2340,
        cartAdds: 412,
        checkoutStarts: 168,
        whatsappClicks: 284,
        conversionRate: 8.5
      },
      funnel: [
        { step: 'Pageviews', count: 4820, rate: 100 },
        { step: 'Visualizações de Produto', count: 2340, rate: 48.5 },
        { step: 'Adições ao Carrinho', count: 412, rate: 17.6 },
        { step: 'Início Checkout', count: 168, rate: 40.7 },
        { step: 'Pedidos Concluídos', count: 86, rate: 51.2 }
      ],
      dailyTimeline: [
        { date: '03/10', count: 180 },
        { date: '04/10', count: 210 },
        { date: '05/10', count: 320 },
        { date: '06/10', count: 290 },
        { date: '07/10', count: 240 },
        { date: '08/10', count: 270 },
        { date: '09/10', count: 310 },
        { date: '10/10', count: 350 },
        { date: '11/10', count: 410 },
        { date: '12/10', count: 480 },
        { date: '13/10', count: 520 },
        { date: '14/10', count: 460 },
        { date: '15/10', count: 490 },
        { date: '16/10', count: 540 }
      ],
      devices: [
        { device: 'Mobile / Smartphone', count: 3270, percentage: 67.8 },
        { device: 'Desktop / PC', count: 1310, percentage: 27.2 },
        { device: 'Tablet / iPad', count: 240, percentage: 5.0 }
      ],
      topClickedProducts: [
        { id: 9, name: 'Relógio DRIPP Skeleton Automatic 18K Gold', clicks: 684, share: 29.2, recommendation: 'Manter estoque alto e anunciar no Instagram' },
        { id: 10, name: 'Relógio DRIPP Iced Out Cravejado VVS', clicks: 542, share: 23.1, recommendation: 'Destaque no topo da vitrine virtual' },
        { id: 15, name: 'Sneaker DRIPP Phantom Platinum Edition', clicks: 430, share: 18.3, recommendation: 'Campanha de tráfego pago em São Carlos' },
        { id: 12, name: 'Boné Trucker DRIPP Luxury Rap Leather 3D', clicks: 360, share: 15.3, recommendation: 'Oferta combo junto com camiseta' },
        { id: 17, name: 'Corrente Cuban Link 14mm Iced Out 18K', clicks: 324, share: 14.1, recommendation: 'Estoque baixo! Repor com urgência' }
      ]
    };
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
  // ==========================================
  // CONFIGURAÇÃO COMPLETA: ABRIR E FECHAR MENU LATERAL (DESKTOP & MOBILE)
  // ==========================================
  function setupAdminSidebar() {
    const sidebar = document.querySelector('.admin-sidebar');
    if (!sidebar) return;

    // Injeta backdrop para mobile se ainda não existir
    let backdrop = document.querySelector('.sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'sidebar-backdrop';
      document.body.appendChild(backdrop);
    }

    // Atualiza ícones e títulos de acessibilidade
    function updateToggleIcons() {
      const isCollapsed = sidebar.classList.contains('collapsed');
      const isMobileOpen = sidebar.classList.contains('mobile-open');

      // Botões no topo (topbar)
      document.querySelectorAll('.admin-sidebar-toggle, .mobile-sidebar-toggle').forEach(btn => {
        const titleText = isCollapsed ? 'Abrir / Expandir Menu Lateral' : 'Recolher / Fechar Menu Lateral';
        btn.setAttribute('title', titleText);
        btn.setAttribute('aria-label', titleText);
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = isCollapsed ? 'fa-solid fa-bars-staggered' : 'fa-solid fa-bars';
        }
      });

      // Botão interno no cabeçalho do sidebar
      document.querySelectorAll('.sidebar-toggle-btn').forEach(btn => {
        const titleText = isCollapsed ? 'Abrir Menu Lateral' : 'Fechar / Recolher Menu Lateral';
        btn.setAttribute('title', titleText);
        btn.setAttribute('aria-label', titleText);
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = isCollapsed ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left';
        }
      });
    }

    // Alternar Desktop (Recolher / Abrir)
    function toggleDesktopSidebar() {
      const willCollapse = !sidebar.classList.contains('collapsed');
      sidebar.classList.toggle('collapsed', willCollapse);
      localStorage.setItem('dripp_sidebar_collapsed', willCollapse ? 'true' : 'false');
      updateToggleIcons();
    }

    // Alternar Mobile (Abrir / Fechar gaveta lateral)
    function toggleMobileSidebar(forceClose = false) {
      if (forceClose) {
        sidebar.classList.remove('mobile-open');
        backdrop.classList.remove('active');
      } else {
        const isOpen = sidebar.classList.toggle('mobile-open');
        backdrop.classList.toggle('active', isOpen);
      }
      updateToggleIcons();
    }

    // Clique nos botões da barra superior (topbar)
    document.querySelectorAll('.admin-sidebar-toggle, .mobile-sidebar-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.innerWidth <= 768) {
          toggleMobileSidebar();
        } else {
          toggleDesktopSidebar();
        }
      });
    });

    // Clique no botão interno da sidebar
    document.querySelectorAll('.sidebar-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.innerWidth <= 768) {
          toggleMobileSidebar(true);
        } else {
          toggleDesktopSidebar();
        }
      });
    });

    // Clique no botão de fechar móvel [X]
    document.querySelectorAll('.sidebar-close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMobileSidebar(true);
      });
    });

    // Clique no backdrop fecha no mobile
    backdrop.addEventListener('click', () => {
      toggleMobileSidebar(true);
    });

    // Tecla ESC fecha no mobile
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggleMobileSidebar(true);
      }
    });

    // Clicar em link de navegação fecha a gaveta no mobile
    sidebar.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          toggleMobileSidebar(true);
        }
      });
    });

    // Recupera preferência salva do usuário (desktop)
    if (window.innerWidth > 768 && localStorage.getItem('dripp_sidebar_collapsed') === 'true') {
      sidebar.classList.add('collapsed');
    }
    updateToggleIcons();
  }

  setupAdminSidebar();

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

function calculateModalProfitMargin() {
  const priceInput = document.getElementById('productPrice');
  const costInput = document.getElementById('productCostPrice');
  const preview = document.getElementById('modalProfitPreview');
  if (!priceInput || !costInput || !preview) return;

  const price = parseFloat(priceInput.value) || 0;
  const cost = parseFloat(costInput.value) || 0;
  if (price > 0 && cost > 0) {
    const profit = price - cost;
    const margin = (((price - cost) / price) * 100).toFixed(1);
    const color = margin >= 50 ? '#10B981' : (margin >= 25 ? '#F59E0B' : '#EF4444');
    preview.style.color = color;
    preview.innerHTML = `Margem Estimada: <strong>${margin}%</strong> (Lucro Real: <strong>${formatCurrency(profit)}</strong> por peça)`;
  } else {
    preview.style.color = '#94a3b8';
    preview.innerHTML = 'Margem Estimada: --% (Lucro: R$ --)';
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

  const costEl = document.getElementById('productCostPrice');
  if (costEl) costEl.value = '';
  const minStockEl = document.getElementById('productMinStock');
  if (minStockEl) minStockEl.value = '5';
  const qrEl = document.getElementById('productQrCode');
  if (qrEl) qrEl.value = 'DRIPP-PROD-' + Math.floor(1000 + Math.random() * 9000);
  calculateModalProfitMargin();

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

  const costEl = document.getElementById('productCostPrice');
  if (costEl) costEl.value = p.costPrice || p.cost_price || (p.price * 0.35).toFixed(2);
  const minStockEl = document.getElementById('productMinStock');
  if (minStockEl) minStockEl.value = p.minStock || p.min_stock || 5;
  const qrEl = document.getElementById('productQrCode');
  if (qrEl) qrEl.value = p.qrCode || p.qr_code || ('DRIPP-' + (p.slug ? p.slug.toUpperCase().slice(0, 10) : p.id));
  calculateModalProfitMargin();

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
  const costPrice = parseFloat(document.getElementById('productCostPrice')?.value) || (price * 0.35);
  const minStock = parseInt(document.getElementById('productMinStock')?.value) || 5;
  const qrCode = document.getElementById('productQrCode')?.value.trim() || `DRIPP-${slug.toUpperCase().slice(0, 8)}`;
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
    costPrice,
    cost_price: costPrice,
    minStock,
    min_stock: minStock,
    qrCode,
    qr_code: qrCode,
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

  await loadFinancialData(orders, products);
}

async function loadFinancialData(orders, products) {
  const range = document.getElementById('financialDateRange')?.value || '30days';
  const profitData = await DrippAPI.getProfitReport(range);
  const metrics = profitData?.metrics || {};

  const paidOrders = orders.filter(o => o.status !== 'Cancelado');
  const grossRevenue = metrics.grossRevenue || paidOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const cmv = metrics.cmv || (grossRevenue * 0.38);
  const grossProfit = metrics.grossProfit || (grossRevenue - cmv);
  const profitMargin = metrics.profitMargin || (grossRevenue > 0 ? ((grossProfit / grossRevenue) * 100).toFixed(1) : 0);
  const avgTicket = metrics.avgTicket || (paidOrders.length ? (grossRevenue / paidOrders.length).toFixed(2) : 0);

  // KPIs
  const elGross = document.getElementById('finGrossRevenue');
  if (elGross) elGross.textContent = formatCurrency(grossRevenue);

  const elCMV = document.getElementById('finCMV');
  if (elCMV) elCMV.textContent = formatCurrency(cmv);

  const elProfit = document.getElementById('finGrossProfit');
  if (elProfit) elProfit.textContent = formatCurrency(grossProfit);

  const elMargin = document.getElementById('finProfitMargin');
  if (elMargin) elMargin.textContent = `Margem Bruta Real: ${profitMargin}%`;

  const elTicket = document.getElementById('finAvgTicket');
  if (elTicket) elTicket.textContent = formatCurrency(avgTicket);

  const elOrdersCount = document.getElementById('finTotalOrdersCount');
  if (elOrdersCount) elOrdersCount.textContent = `${paidOrders.length} pedidos faturados`;

  // DRE Simplificado
  const dreGross = document.getElementById('dre-gross-revenue');
  if (dreGross) dreGross.textContent = formatCurrency(grossRevenue);

  const totalDiscounts = paidOrders.reduce((sum, o) => sum + (Number(o.discount) || 0), 0) || (grossRevenue * 0.05);
  const dreDisc = document.getElementById('dre-discounts');
  if (dreDisc) dreDisc.textContent = `- ${formatCurrency(totalDiscounts)}`;

  const netRevenue = grossRevenue - totalDiscounts;
  const dreNet = document.getElementById('dre-net-revenue');
  if (dreNet) dreNet.textContent = formatCurrency(netRevenue);

  const dreCMV = document.getElementById('dre-cmv');
  if (dreCMV) dreCMV.textContent = `- ${formatCurrency(cmv)}`;

  const dreProfit = document.getElementById('dre-profit');
  if (dreProfit) dreProfit.textContent = formatCurrency(grossProfit);

  const dreMargin = document.getElementById('dre-margin');
  if (dreMargin) dreMargin.textContent = `${profitMargin}%`;

  // Render Charts
  renderFinancialCharts(orders, profitData);

  // Transações Recentes
  const transTbody = document.getElementById('financialTransactionsTable') || document.getElementById('transactionsTableBody');
  if (transTbody) {
    transTbody.innerHTML = orders.slice(0, 10).map(o => `
      <tr>
        <td><strong>${o.orderNumber}</strong></td>
        <td>${formatDate(o.date)}</td>
        <td>${o.customerName}</td>
        <td><i class="fa-solid fa-credit-card text-gold" style="margin-right: 4px;"></i> ${o.paymentMethod}</td>
        <td><strong>${formatCurrency(o.total)}</strong></td>
        <td><span class="badge-status ${(o.status || 'pendente').toLowerCase()}">${o.status}</span></td>
      </tr>
    `).join('');
  }
}

function renderFinancialCharts(orders, profitData) {
  if (typeof Chart === 'undefined') return;

  const monthly = profitData?.monthlyProfit || [
    { month: 'Mai/24', revenue: 24500, cmv: 9200, profit: 15300 },
    { month: 'Jun/24', revenue: 28900, cmv: 10800, profit: 18100 },
    { month: 'Jul/24', revenue: 33400, cmv: 12500, profit: 20900 },
    { month: 'Ago/24', revenue: 38200, cmv: 14100, profit: 24100 },
    { month: 'Set/24', revenue: 44100, cmv: 16500, profit: 27600 },
    { month: 'Out/24', revenue: 52400, cmv: 19600, profit: 32800 }
  ];

  // 1. Combo Chart: Lucro Real vs Faturamento vs Custos
  const comboCtx = document.getElementById('financialProfitComboChart') || document.getElementById('financialRevenueChart');
  if (comboCtx) {
    if (financialCharts.combo) financialCharts.combo.destroy();
    financialCharts.combo = new Chart(comboCtx, {
      type: 'bar',
      data: {
        labels: monthly.map(m => m.month),
        datasets: [
          {
            type: 'line',
            label: 'Lucro Líquido Real (R$)',
            data: monthly.map(m => m.profit),
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderWidth: 3,
            tension: 0.35,
            fill: false,
            pointBackgroundColor: '#D4AF37',
            pointRadius: 5,
            yAxisID: 'y'
          },
          {
            type: 'bar',
            label: 'Faturamento Bruto (R$)',
            data: monthly.map(m => m.revenue),
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 6,
            yAxisID: 'y'
          },
          {
            type: 'bar',
            label: 'Custo CMV (R$)',
            data: monthly.map(m => m.cmv),
            backgroundColor: 'rgba(239, 68, 68, 0.75)',
            borderRadius: 6,
            yAxisID: 'y'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { color: '#E2E8F0', font: { weight: '600' } } }
        },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
        }
      }
    });
  }

  // 2. Lucro por Categoria
  const catProfitCtx = document.getElementById('financialCategoryProfitChart') || document.getElementById('financialCategoryChart');
  if (catProfitCtx) {
    if (financialCharts.category) financialCharts.category.destroy();
    const catData = profitData?.categoryProfit || [
      { category: 'Relógios de Luxo', profit: 9450 },
      { category: 'Sneakers & Tênis', profit: 6300 },
      { category: 'Outerwear & Hoodies', profit: 5300 },
      { category: 'Camisetas Heavy', profit: 5200 },
      { category: 'Bonés & Headwear', profit: 3400 },
      { category: 'Jóias & Acessórios', profit: 2600 }
    ];

    financialCharts.category = new Chart(catProfitCtx, {
      type: 'doughnut',
      data: {
        labels: catData.map(c => c.category),
        datasets: [{
          data: catData.map(c => c.profit),
          backgroundColor: [
            '#D4AF37',
            '#FFFFFF',
            '#3B82F6',
            '#10B981',
            '#A855F7',
            '#F59E0B'
          ],
          borderColor: '#111827',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#E2E8F0', font: { size: 11 } } }
        }
      }
    });
  }

  // 3. Formas de Pagamento
  const paymentCtx = document.getElementById('financialPaymentChart');
  if (paymentCtx) {
    if (financialCharts.payment) financialCharts.payment.destroy();
    financialCharts.payment = new Chart(paymentCtx, {
      type: 'pie',
      data: {
        labels: ['PIX Instantâneo', 'Cartão de Crédito', 'Boleto Bancário'],
        datasets: [{
          data: [58, 34, 8],
          backgroundColor: ['#10B981', '#D4AF37', '#3B82F6'],
          borderColor: '#111827',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#E2E8F0' } }
        }
      }
    });
  }

  // 4. Status Operacional
  const statusCtx = document.getElementById('financialStatusChart');
  if (statusCtx) {
    if (financialCharts.status) financialCharts.status.destroy();
    financialCharts.status = new Chart(statusCtx, {
      type: 'doughnut',
      data: {
        labels: ['Entregue', 'Processando', 'Enviado', 'Pendente'],
        datasets: [{
          data: [48, 24, 20, 8],
          backgroundColor: ['#10B981', '#3B82F6', '#A855F7', '#F59E0B'],
          borderColor: '#111827',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#E2E8F0' } }
        }
      }
    });
  }
}

function exportFinancialCSV() {
  const rows = [
    ['Data', 'Item', 'Tipo', 'Valor (R$)'],
    [new Date().toLocaleDateString('pt-BR'), 'Faturamento Bruto', 'Receita', document.getElementById('finGrossRevenue')?.textContent || '0'],
    [new Date().toLocaleDateString('pt-BR'), 'Custo de Mercadoria (CMV)', 'Custo', document.getElementById('finCMV')?.textContent || '0'],
    [new Date().toLocaleDateString('pt-BR'), 'Lucro Bruto Real', 'Lucro', document.getElementById('finGrossProfit')?.textContent || '0'],
    [new Date().toLocaleDateString('pt-BR'), 'Margem de Lucro', 'Percentual', document.getElementById('dre-margin')?.textContent || '0%']
  ];
  let csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(';')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `DRE_Financeiro_Dripp_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast('Demonstrativo financeiro exportado em CSV com sucesso!');
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

// ==========================================
// 15. PÁGINA: CONTROLE DE ESTOQUE (estoque.html)
// ==========================================
let inventoryItems = [];
let inventoryMovements = [];

async function initInventoryPage() {
  const [items, movements] = await Promise.all([
    DrippAPI.getInventory(),
    DrippAPI.getStockMovements()
  ]);

  inventoryItems = items || [];
  inventoryMovements = movements || [];

  updateInventoryKPIs();
  renderInventoryTable();
  renderMovementsTable();

  // Filtros
  const searchInput = document.getElementById('inventory-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderInventoryTable());
  }

  const catSelect = document.getElementById('inventory-filter-category');
  if (catSelect) {
    catSelect.addEventListener('change', () => renderInventoryTable());
  }

  const statusSelect = document.getElementById('inventory-filter-status');
  if (statusSelect) {
    statusSelect.addEventListener('change', () => renderInventoryTable());
  }

  // Formulário de Nova Movimentação
  const stockForm = document.getElementById('stock-entry-form');
  if (stockForm) {
    stockForm.addEventListener('submit', handleStockEntrySubmit);
  }
}

function updateInventoryKPIs() {
  const totalUnits = inventoryItems.reduce((sum, item) => sum + (Number(item.stock) || 0), 0);
  const totalProds = inventoryItems.length;
  const lowStock = inventoryItems.filter(item => (Number(item.stock) || 0) > 0 && (Number(item.stock) || 0) <= (Number(item.min_stock) || 5)).length;
  const outStock = inventoryItems.filter(item => (Number(item.stock) || 0) === 0).length;
  const costValue = inventoryItems.reduce((sum, item) => sum + ((Number(item.stock) || 0) * (Number(item.cost_price) || 0)), 0);
  const retailValue = inventoryItems.reduce((sum, item) => sum + ((Number(item.stock) || 0) * (Number(item.price) || 0)), 0);
  const potentialProfit = retailValue - costValue;

  const elTotalUnits = document.getElementById('kpi-total-units');
  if (elTotalUnits) elTotalUnits.textContent = totalUnits;

  const elTotalProds = document.getElementById('kpi-total-prods');
  if (elTotalProds) elTotalProds.textContent = `${totalProds} modelos ativos`;

  const elLowStock = document.getElementById('kpi-low-stock');
  if (elLowStock) elLowStock.textContent = lowStock;

  const elOutStock = document.getElementById('kpi-out-stock');
  if (elOutStock) elOutStock.textContent = outStock;

  const elCostVal = document.getElementById('kpi-cost-value');
  if (elCostVal) elCostVal.textContent = formatCurrency(costValue);

  const elRetailVal = document.getElementById('kpi-retail-value');
  if (elRetailVal) elRetailVal.textContent = formatCurrency(retailValue);

  const elPotProfit = document.getElementById('kpi-potential-profit');
  if (elPotProfit) elPotProfit.textContent = `Lucro pot.: ${formatCurrency(potentialProfit)}`;

  // Alerta na Sidebar
  const sidebarAlert = document.getElementById('sidebar-stock-alert');
  if (sidebarAlert) {
    const alertsTotal = lowStock + outStock;
    sidebarAlert.textContent = alertsTotal;
    sidebarAlert.style.display = alertsTotal > 0 ? 'inline-block' : 'none';
  }
}

function renderInventoryTable() {
  const tbody = document.getElementById('inventory-table-body');
  if (!tbody) return;

  const searchTerm = (document.getElementById('inventory-search-input')?.value || '').toLowerCase().trim();
  const catFilter = (document.getElementById('inventory-filter-category')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('inventory-filter-status')?.value || '';

  const filtered = inventoryItems.filter(item => {
    const matchSearch = !searchTerm || 
      (item.name || '').toLowerCase().includes(searchTerm) ||
      (item.qr_code || '').toLowerCase().includes(searchTerm) ||
      (item.brand || '').toLowerCase().includes(searchTerm);

    const matchCat = !catFilter || (item.category_name || '').toLowerCase().includes(catFilter);

    let matchStatus = true;
    if (statusFilter === 'low_stock') {
      matchStatus = (item.stock || 0) > 0 && (item.stock || 0) <= (item.min_stock || 5);
    } else if (statusFilter === 'out_of_stock') {
      matchStatus = (item.stock || 0) === 0;
    } else if (statusFilter === 'ok') {
      matchStatus = (item.stock || 0) > (item.min_stock || 5);
    }

    return matchSearch && matchCat && matchStatus;
  });

  const countEl = document.getElementById('inventory-table-count');
  if (countEl) countEl.textContent = `Mostrando ${filtered.length} de ${inventoryItems.length} produtos`;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          <i class="fa-solid fa-box-open" style="font-size: 2rem; opacity: 0.4; margin-bottom: 0.5rem; display: block;"></i>
          Nenhum produto encontrado com os filtros selecionados.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    const stock = Number(item.stock) || 0;
    const minStock = Number(item.min_stock) || 5;
    let statusBadge = '<span class="stock-pill ok"><i class="fa-solid fa-circle-check"></i> Normal</span>';
    if (stock === 0) {
      statusBadge = '<span class="stock-pill out"><i class="fa-solid fa-circle-xmark"></i> Esgotado</span>';
    } else if (stock <= minStock) {
      statusBadge = '<span class="stock-pill low"><i class="fa-solid fa-triangle-exclamation"></i> Baixo</span>';
    }

    const marginVal = Number(item.margin) || 0;
    const marginColor = marginVal >= 60 ? '#10B981' : (marginVal >= 40 ? '#D4AF37' : '#EF4444');

    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="${item.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80'}" alt="${item.name}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-color); background: #000;">
            <div>
              <div style="font-weight: 700; color: #FFF;">${item.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${item.brand || 'DRIPP CONCEITO'}</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-gold" style="font-size: 0.72rem;">${item.category_name}</span></td>
        <td><code style="background: rgba(255,255,255,0.06); padding: 0.2rem 0.5rem; border-radius: 4px; color: var(--gold-primary); font-size: 0.8rem;">${item.qr_code}</code></td>
        <td style="color: var(--text-muted);">${formatCurrency(item.cost_price)}</td>
        <td style="font-weight: 700; color: #FFF;">${formatCurrency(item.price)}</td>
        <td style="font-weight: 800; color: ${marginColor};">${marginVal}%</td>
        <td><strong style="font-size: 1.05rem; color: ${stock <= minStock ? (stock === 0 ? '#EF4444' : 'var(--gold-primary)') : '#FFF'};">${stock} un.</strong></td>
        <td style="color: var(--text-muted);">${minStock} un.</td>
        <td>${statusBadge}</td>
        <td style="text-align: right;">
          <button class="btn btn-secondary btn-sm" onclick="openStockEntryModal(${item.id})" title="Movimentar Estoque">
            <i class="fa-solid fa-arrow-right-arrow-left"></i> Movimentar
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderMovementsTable() {
  const tbody = document.getElementById('movements-table-body');
  if (!tbody) return;

  if (inventoryMovements.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          Nenhuma movimentação de estoque registrada até o momento.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = inventoryMovements.slice(0, 15).map(m => {
    let typeBadge = '<span class="badge" style="background: rgba(16,185,129,0.2); color: #10B981; font-weight: 700;">ENTRADA</span>';
    if (m.type === 'OUT') {
      typeBadge = '<span class="badge" style="background: rgba(239,68,68,0.2); color: #EF4444; font-weight: 700;">SAÍDA / PDV</span>';
    } else if (m.type === 'ADJUST') {
      typeBadge = '<span class="badge" style="background: rgba(59,130,246,0.2); color: #3B82F6; font-weight: 700;">AJUSTE</span>';
    }

    return `
      <tr>
        <td>${formatDate(m.date)}</td>
        <td>${typeBadge}</td>
        <td><strong>${m.productName || 'Peça DRIPP'}</strong></td>
        <td style="font-weight: 800; color: ${m.type === 'OUT' ? '#EF4444' : '#10B981'};">${m.type === 'OUT' ? '-' : '+'}${m.quantity}</td>
        <td style="color: var(--text-muted);">${m.previousStock || 0} un.</td>
        <td><strong>${m.newStock || 0} un.</strong></td>
        <td>${m.reason || 'Movimentação manual'}</td>
        <td style="color: var(--gold-primary); font-size: 0.85rem;"><i class="fa-solid fa-user-shield"></i> ${m.operator || 'Admin'}</td>
      </tr>
    `;
  }).join('');
}

function openStockEntryModal(preSelectProductId = null) {
  const modal = document.getElementById('stockEntryModal');
  const select = document.getElementById('movement-product-select');
  if (select && inventoryItems.length) {
    select.innerHTML = inventoryItems.map(p => `
      <option value="${p.id}" ${preSelectProductId && p.id === Number(preSelectProductId) ? 'selected' : ''}>
        ${p.name} (Atual: ${p.stock} un. | ${p.qr_code})
      </option>
    `).join('');
  }

  if (modal) modal.classList.add('active');
}

function closeStockEntryModal() {
  const modal = document.getElementById('stockEntryModal');
  if (modal) modal.classList.remove('active');
}

async function handleStockEntrySubmit(e) {
  e.preventDefault();

  const productId = document.getElementById('movement-product-select')?.value;
  const type = document.getElementById('movement-type')?.value || 'IN';
  const quantity = parseInt(document.getElementById('movement-quantity')?.value) || 0;
  const reason = document.getElementById('movement-reason')?.value.trim() || 'Ajuste operacional';
  const operator = document.getElementById('movement-operator')?.value.trim() || 'Admin Master';

  if (!productId || quantity <= 0) {
    showToast('Informe o produto e uma quantidade válida.', 'error');
    return;
  }

  await DrippAPI.saveStockMovement({
    product_id: productId,
    type,
    quantity,
    reason,
    operator
  });

  showToast('Movimentação de estoque registrada com sucesso!');
  closeStockEntryModal();

  // Recarrega dados
  const [items, movements] = await Promise.all([
    DrippAPI.getInventory(),
    DrippAPI.getStockMovements()
  ]);
  inventoryItems = items || [];
  inventoryMovements = movements || [];

  updateInventoryKPIs();
  renderInventoryTable();
  renderMovementsTable();
}

function exportStockCSV() {
  const rows = [
    ['SKU_QR', 'Produto', 'Categoria', 'Preco_Custo', 'Preco_Venda', 'Margem_Pct', 'Estoque_Atual', 'Estoque_Minimo', 'Status'],
    ...inventoryItems.map(item => [
      item.qr_code,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.category_name}"`,
      item.cost_price,
      item.price,
      `${item.margin}%`,
      item.stock,
      item.min_stock,
      item.status
    ])
  ];

  let csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(';')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Estoque_Dripp_Conceito_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast('Relatório de estoque exportado em CSV com sucesso!');
}

// ==========================================
// 16. PÁGINA: LEITOR QR CODE / PDV (scanner.html)
// ==========================================
let html5QrScanner = null;
let currentScannedProduct = null;
let currentScannedOrder = null;
let isCameraScannerRunning = false;

async function initScannerPage() {
  const manualInput = document.getElementById('scanner-manual-input');
  if (manualInput) {
    manualInput.focus();
    manualInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleManualScan();
      }
    });
  }

  // Se houver parâmetro ?code= na URL
  const urlParams = new URLSearchParams(window.location.search);
  const initialCode = urlParams.get('code');
  if (initialCode) {
    if (manualInput) manualInput.value = initialCode;
    processScanCode(initialCode);
  }
}

async function handleManualScan() {
  const input = document.getElementById('scanner-manual-input');
  const code = (input?.value || '').trim();
  if (!code) {
    showToast('Digite ou aponte o leitor para um código.', 'warning');
    return;
  }
  await processScanCode(code);
}

function quickTestScan(code) {
  const input = document.getElementById('scanner-manual-input');
  if (input) input.value = code;
  processScanCode(code);
}

async function processScanCode(code) {
  const statusBadge = document.getElementById('scan-status-badge');
  if (statusBadge) {
    statusBadge.textContent = 'Buscando...';
    statusBadge.className = 'badge';
  }

  const res = await DrippAPI.lookupQR(code);

  const emptyState = document.getElementById('scan-empty-state');
  const prodCard = document.getElementById('scan-product-card');
  const ordCard = document.getElementById('scan-order-card');

  if (res && res.success && res.type === 'product' && res.product) {
    currentScannedProduct = res.product;
    currentScannedOrder = null;

    if (emptyState) emptyState.style.display = 'none';
    if (ordCard) ordCard.style.display = 'none';
    if (prodCard) prodCard.style.display = 'block';

    const p = res.product;
    const elImg = document.getElementById('res-prod-img');
    if (elImg) elImg.src = p.image || (p.images && p.images[0]) || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80';

    const elCat = document.getElementById('res-prod-cat');
    if (elCat) elCat.textContent = p.category_name || p.brand || 'STREETWEAR DE LUXO';

    const elName = document.getElementById('res-prod-name');
    if (elName) elName.textContent = p.name;

    const elSku = document.getElementById('res-prod-sku');
    if (elSku) elSku.textContent = `SKU / QR: ${p.qr_code}`;

    const elPrice = document.getElementById('res-prod-price');
    if (elPrice) elPrice.textContent = formatCurrency(p.price);

    const elCost = document.getElementById('res-prod-cost');
    if (elCost) elCost.textContent = `Custo: ${formatCurrency(p.cost_price || (p.price * 0.35))}`;

    const elStock = document.getElementById('res-prod-stock');
    if (elStock) elStock.textContent = `${p.stock} un.`;

    const elPill = document.getElementById('res-prod-status-pill');
    if (elPill) {
      const stock = Number(p.stock) || 0;
      const min = Number(p.min_stock) || 5;
      if (stock === 0) {
        elPill.innerHTML = '<span class="stock-pill out"><i class="fa-solid fa-circle-xmark"></i> Esgotado</span>';
      } else if (stock <= min) {
        elPill.innerHTML = '<span class="stock-pill low"><i class="fa-solid fa-triangle-exclamation"></i> Estoque Baixo</span>';
      } else {
        elPill.innerHTML = '<span class="stock-pill ok"><i class="fa-solid fa-circle-check"></i> Estoque Normal</span>';
      }
    }

    const editLink = document.getElementById('res-prod-edit-link');
    if (editLink) editLink.href = `produtos.html?action=edit&id=${p.id}`;

    if (statusBadge) {
      statusBadge.textContent = 'Peça Identificada (OK)';
      statusBadge.className = 'badge badge-gold';
    }

    showToast(`Produto encontrado: ${p.name}`);
    return;
  }

  if (res && res.success && res.type === 'order' && res.order) {
    currentScannedOrder = res.order;
    currentScannedProduct = null;

    if (emptyState) emptyState.style.display = 'none';
    if (prodCard) prodCard.style.display = 'none';
    if (ordCard) ordCard.style.display = 'block';

    const o = res.order;
    const elNum = document.getElementById('res-ord-number');
    if (elNum) elNum.textContent = `Pedido #${o.orderNumber}`;

    const elCust = document.getElementById('res-ord-customer');
    if (elCust) elCust.textContent = `Cliente: ${o.customerName}`;

    const elTot = document.getElementById('res-ord-total');
    if (elTot) elTot.textContent = `Total: ${formatCurrency(o.total)}`;

    const elStatus = document.getElementById('res-ord-status');
    if (elStatus) elStatus.textContent = o.status;

    if (statusBadge) {
      statusBadge.textContent = 'Pedido Identificado';
      statusBadge.className = 'badge badge-gold';
    }

    showToast(`Pedido #${o.orderNumber} localizado!`);
    return;
  }

  // Não encontrado
  if (statusBadge) {
    statusBadge.textContent = 'Código Não Encontrado';
    statusBadge.className = 'badge';
    statusBadge.style.background = '#EF4444';
  }
  showToast('Nenhum produto ou pedido correspondente encontrado.', 'error');
}

async function quickStockAdjust(action, qty = 1) {
  if (!currentScannedProduct) {
    showToast('Primeiro identifique um produto no leitor.', 'warning');
    return;
  }

  const res = await DrippAPI.quickStockAdjust(currentScannedProduct.id, action, qty);
  currentScannedProduct.stock = res?.newStock ?? (action === 'add' ? currentScannedProduct.stock + qty : Math.max(0, currentScannedProduct.stock - qty));

  const elStock = document.getElementById('res-prod-stock');
  if (elStock) elStock.textContent = `${currentScannedProduct.stock} un.`;

  const elPill = document.getElementById('res-prod-status-pill');
  if (elPill) {
    const stock = Number(currentScannedProduct.stock) || 0;
    const min = Number(currentScannedProduct.min_stock) || 5;
    if (stock === 0) {
      elPill.innerHTML = '<span class="stock-pill out"><i class="fa-solid fa-circle-xmark"></i> Esgotado</span>';
    } else if (stock <= min) {
      elPill.innerHTML = '<span class="stock-pill low"><i class="fa-solid fa-triangle-exclamation"></i> Estoque Baixo</span>';
    } else {
      elPill.innerHTML = '<span class="stock-pill ok"><i class="fa-solid fa-circle-check"></i> Estoque Normal</span>';
    }
  }

  showToast(action === 'add' ? `+${qty} unidade(s) adicionada(s) ao estoque!` : `-${qty} unidade(s) baixada(s) na venda PDV!`);
}

function toggleCameraScanner() {
  const btn = document.getElementById('btn-toggle-camera');
  const readerBox = document.getElementById('qr-reader-container');
  const visualBox = document.getElementById('scanner-visual-box');

  if (isCameraScannerRunning) {
    // Parar câmera
    if (html5QrScanner) {
      html5QrScanner.stop().then(() => {
        html5QrScanner.clear();
        isCameraScannerRunning = false;
        if (btn) btn.innerHTML = '<i class="fa-solid fa-video"></i> Iniciar Câmera';
        if (readerBox) readerBox.style.display = 'none';
        if (visualBox) visualBox.style.display = 'flex';
      }).catch(err => console.error(err));
    }
  } else {
    // Iniciar câmera via html5-qrcode
    if (typeof Html5Qrcode === 'undefined') {
      showToast('Biblioteca óptica carregando. Utilize a digitação rápida enquanto isso.', 'info');
      return;
    }

    if (readerBox) readerBox.style.display = 'block';
    if (visualBox) visualBox.style.display = 'none';
    if (btn) btn.innerHTML = '<i class="fa-solid fa-video-slash"></i> Parar Câmera';

    try {
      html5QrScanner = new Html5Qrcode("qr-reader-container");
      html5QrScanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          processScanCode(decodedText);
          toggleCameraScanner(); // Desliga após ler
        },
        () => {}
      ).then(() => {
        isCameraScannerRunning = true;
      }).catch(err => {
        console.warn('Câmera indisponível:', err);
        showToast('Câmera indisponível no navegador. Digite o código ou use os botões de teste.', 'warning');
        if (readerBox) readerBox.style.display = 'none';
        if (visualBox) visualBox.style.display = 'flex';
        if (btn) btn.innerHTML = '<i class="fa-solid fa-video"></i> Iniciar Câmera';
        isCameraScannerRunning = false;
      });
    } catch (err) {
      console.error(err);
      isCameraScannerRunning = false;
    }
  }
}

function printCurrentProductLabel() {
  if (!currentScannedProduct) {
    showToast('Bipe ou selecione um produto para imprimir a etiqueta.', 'warning');
    return;
  }
  window.print();
}

// ==========================================
// 17. PÁGINA: CLIQUES & ANALYTICS (analytics.html)
// ==========================================
let analyticsCharts = {};

async function initAnalyticsPage() {
  const data = await DrippAPI.getAnalytics(14);
  const summary = data?.summary || {};
  const funnel = data?.funnel || [];
  const daily = data?.dailyTimeline || [];
  const devices = data?.devices || [];
  const topProducts = data?.topClickedProducts || [];

  // KPIs
  const elViews = document.getElementById('an-total-views');
  if (elViews) elViews.textContent = summary.totalPageviews || 0;

  const elClicks = document.getElementById('an-total-clicks');
  if (elClicks) elClicks.textContent = summary.totalClicks || 0;

  const elCart = document.getElementById('an-cart-adds');
  if (elCart) elCart.textContent = summary.cartAdds || 0;

  const elCheck = document.getElementById('an-checkout-starts');
  if (elCheck) elCheck.textContent = summary.checkoutStarts || 0;

  const elWpp = document.getElementById('an-whatsapp-clicks');
  if (elWpp) elWpp.textContent = summary.whatsappClicks || 0;

  const elConv = document.getElementById('an-conv-rate');
  if (elConv) elConv.textContent = `${summary.conversionRate || 0}%`;

  // Funil
  if (funnel.length >= 5) {
    const fn1 = document.getElementById('fn-step-1');
    if (fn1) fn1.textContent = funnel[0].count;

    const fn2 = document.getElementById('fn-step-2');
    if (fn2) fn2.textContent = funnel[1].count;
    const fnr2 = document.getElementById('fn-rate-2');
    if (fnr2) fnr2.textContent = `${funnel[1].rate}% de retenção`;

    const fn3 = document.getElementById('fn-step-3');
    if (fn3) fn3.textContent = funnel[2].count;
    const fnr3 = document.getElementById('fn-rate-3');
    if (fnr3) fnr3.textContent = `${funnel[2].rate}% de intenção`;

    const fn4 = document.getElementById('fn-step-4');
    if (fn4) fn4.textContent = funnel[3].count;
    const fnr4 = document.getElementById('fn-rate-4');
    if (fnr4) fnr4.textContent = `${funnel[3].rate}% avançaram`;

    const fn5 = document.getElementById('fn-step-5');
    if (fn5) fn5.textContent = funnel[4].count;
    const fnr5 = document.getElementById('fn-rate-5');
    if (fnr5) fnr5.textContent = `${funnel[4].rate}% compras pagas`;
  }

  // Gráficos
  renderAnalyticsCharts(daily, devices);

  // Tabela de Produtos Mais Clicados
  const tbody = document.getElementById('top-clicked-products-tbody');
  if (tbody) {
    tbody.innerHTML = topProducts.map((p, idx) => `
      <tr>
        <td>
          <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; font-weight: 800; font-size: 0.85rem; background: ${idx === 0 ? 'var(--gold-primary)' : (idx === 1 ? '#E2E8F0' : (idx === 2 ? '#CD7F32' : 'rgba(255,255,255,0.06)'))}; color: #000;">
            ${idx + 1}
          </span>
        </td>
        <td><strong>${p.name}</strong></td>
        <td><strong style="color: var(--gold-primary);"><i class="fa-solid fa-arrow-pointer"></i> ${p.clicks}</strong> cliques</td>
        <td><strong>${p.share}%</strong> do tráfego</td>
        <td>
          <div style="background: rgba(255,255,255,0.08); border-radius: 10px; height: 8px; width: 140px; overflow: hidden;">
            <div style="background: var(--gold-gradient); height: 100%; width: ${Math.min(100, p.share * 3.2)}%;"></div>
          </div>
        </td>
        <td style="text-align: right; color: #10B981; font-weight: 600; font-size: 0.82rem;">
          <i class="fa-solid fa-lightbulb"></i> ${p.recommendation || 'Manter visibilidade'}
        </td>
      </tr>
    `).join('');
  }
}

function renderAnalyticsCharts(daily, devices) {
  if (typeof Chart === 'undefined') return;

  // 1. Linha do Tempo de Cliques
  const timelineCtx = document.getElementById('chartClicksTimeline');
  if (timelineCtx) {
    if (analyticsCharts.timeline) analyticsCharts.timeline.destroy();
    analyticsCharts.timeline = new Chart(timelineCtx, {
      type: 'line',
      data: {
        labels: daily.map(d => d.date),
        datasets: [{
          label: 'Cliques no Site',
          data: daily.map(d => d.count),
          borderColor: '#D4AF37',
          backgroundColor: 'rgba(212, 175, 55, 0.15)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#FFF',
          pointBorderColor: '#D4AF37',
          pointRadius: 4,
          pointHoverRadius: 7,
          borderWidth: 2.5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94a3b8' } },
          y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94a3b8' } }
        }
      }
    });
  }

  // 2. Dispositivos dos Usuários
  const devicesCtx = document.getElementById('chartDevicesBreakdown');
  if (devicesCtx) {
    if (analyticsCharts.devices) analyticsCharts.devices.destroy();
    analyticsCharts.devices = new Chart(devicesCtx, {
      type: 'doughnut',
      data: {
        labels: devices.map(d => d.device),
        datasets: [{
          data: devices.map(d => d.percentage),
          backgroundColor: ['#10B981', '#D4AF37', '#3B82F6'],
          borderColor: '#111827',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#E2E8F0', font: { size: 11 } } }
        }
      }
    });

    const legendStats = document.getElementById('device-legend-stats');
    if (legendStats) {
      legendStats.innerHTML = devices.map(d => `
        <span><strong>${d.percentage}%</strong> ${d.device.split('/')[0]}</span>
      `).join('');
    }
  }
}

// ==========================================
// 18. PÁGINA: GESTÃO DE CONTAS & AUDITORIA (contas.html)
// ==========================================
let staffAccountsList = [];
let activityLogsList = [];

async function initAccountsPage() {
  const [users, logs] = await Promise.all([
    DrippAPI.getAccounts(),
    DrippAPI.getActivityLogs()
  ]);

  staffAccountsList = users || [];
  activityLogsList = logs || [];

  updateAccountsKPIs();
  renderAccountsTable();
  renderAuditLogsTable();

  const form = document.getElementById('new-account-form');
  if (form) {
    form.addEventListener('submit', handleNewAccountSubmit);
  }
}

function updateAccountsKPIs() {
  const total = staffAccountsList.length;
  const admins = staffAccountsList.filter(a => a.role === 'admin').length;
  const managers = staffAccountsList.filter(a => a.role === 'manager').length;
  const sellers = staffAccountsList.filter(a => a.role === 'seller' || a.role === 'cashier').length;

  const elTot = document.getElementById('cnt-total-staff');
  if (elTot) elTot.textContent = total;

  const elAdm = document.getElementById('cnt-admins');
  if (elAdm) elAdm.textContent = admins;

  const elMgr = document.getElementById('cnt-managers');
  if (elMgr) elMgr.textContent = managers;

  const elSel = document.getElementById('cnt-sellers');
  if (elSel) elSel.textContent = sellers;
}

function renderAccountsTable() {
  const tbody = document.getElementById('accounts-table-tbody');
  if (!tbody) return;

  tbody.innerHTML = staffAccountsList.map(a => {
    let roleBadge = '<span class="role-badge seller">Vendedor</span>';
    if (a.role === 'admin') roleBadge = '<span class="role-badge admin"><i class="fa-solid fa-crown"></i> Admin Master</span>';
    else if (a.role === 'manager') roleBadge = '<span class="role-badge manager">Gerente de Loja</span>';
    else if (a.role === 'cashier') roleBadge = '<span class="role-badge cashier">Caixa PDV</span>';

    const avatarInitial = (a.name || 'U').slice(0, 2).toUpperCase();

    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(212, 175, 55, 0.2); color: var(--gold-primary); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem; border: 1px solid var(--border-gold);">
              ${avatarInitial}
            </div>
            <div>
              <strong style="color: #FFF;">${a.name}</strong>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Último acesso: ${a.lastLogin ? formatDate(a.lastLogin) : 'Hoje'}</div>
            </div>
          </div>
        </td>
        <td>${a.email}</td>
        <td>${a.phone || '(16) 99876-5432'}</td>
        <td>${roleBadge}</td>
        <td>
          <span class="badge" style="background: rgba(255,255,255,0.06); color: #94a3b8; font-size: 0.72rem;">
            ${(a.permissions || ['produtos', 'estoque']).join(', ')}
          </span>
        </td>
        <td><span class="badge" style="background: rgba(16,185,129,0.15); color: #10B981; font-weight: 700;">Ativo</span></td>
        <td style="text-align: right;">
          <button class="btn btn-secondary btn-sm" onclick="showToast('Permissões de ${a.name} verificadas.')">
            <i class="fa-solid fa-key"></i> Permissões
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderAuditLogsTable() {
  const tbody = document.getElementById('audit-logs-tbody');
  if (!tbody) return;

  tbody.innerHTML = activityLogsList.slice(0, 10).map(l => {
    let actionBadge = '<span class="badge" style="background: rgba(255,255,255,0.06); color: #FFF;">OPERAÇÃO</span>';
    if (l.action === 'LOGIN') actionBadge = '<span class="badge" style="background: rgba(59,130,246,0.15); color: #3B82F6;">LOGIN</span>';
    else if (l.action === 'STOCK_IN') actionBadge = '<span class="badge" style="background: rgba(16,185,129,0.15); color: #10B981;">ENTRADA ESTOQUE</span>';
    else if (l.action === 'QR_SCAN') actionBadge = '<span class="badge" style="background: rgba(212,175,55,0.15); color: var(--gold-primary);">LEITURA QR</span>';
    else if (l.action === 'PRODUCT_UPDATE') actionBadge = '<span class="badge" style="background: rgba(168,85,247,0.15); color: #A855F7;">EDIÇÃO PROD</span>';

    return `
      <tr>
        <td>${formatDate(l.date)}</td>
        <td><strong>${l.userName}</strong></td>
        <td>${actionBadge}</td>
        <td>${l.details}</td>
        <td style="color: var(--text-muted); font-family: monospace; font-size: 0.8rem;">${l.ip}</td>
      </tr>
    `;
  }).join('');
}

function openNewAccountModal() {
  const modal = document.getElementById('newAccountModal');
  if (modal) modal.classList.add('active');
}

function closeNewAccountModal() {
  const modal = document.getElementById('newAccountModal');
  if (modal) modal.classList.remove('active');
}

async function handleNewAccountSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('account-name')?.value.trim();
  const email = document.getElementById('account-email')?.value.trim();
  const phone = document.getElementById('account-phone')?.value.trim();
  const role = document.getElementById('account-role')?.value || 'seller';

  if (!name || !email) {
    showToast('Preencha os campos obrigatórios.', 'error');
    return;
  }

  const permissions = role === 'admin' ? ['all'] : (role === 'manager' ? ['products', 'inventory', 'orders', 'qr_scanner'] : ['orders', 'qr_scanner']);

  await DrippAPI.saveAccount({
    name,
    email,
    phone,
    role,
    permissions
  });

  showToast(`Colaborador ${name} cadastrado com sucesso!`);
  closeNewAccountModal();

  staffAccountsList = await DrippAPI.getAccounts();
  activityLogsList = await DrippAPI.getActivityLogs();
  updateAccountsKPIs();
  renderAccountsTable();
  renderAuditLogsTable();
}

// ==========================================
// 19. ROTEADOR AUTOMÁTICO DE PÁGINAS (AUTO-DISPATCH)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.toLowerCase();

  if (document.getElementById('inventory-table-body') || path.includes('estoque')) {
    initInventoryPage();
  } else if (document.getElementById('scanner-manual-input') || path.includes('scanner')) {
    initScannerPage();
  } else if (document.getElementById('an-total-views') || path.includes('analytics')) {
    initAnalyticsPage();
  } else if (document.getElementById('accounts-table-tbody') || path.includes('contas')) {
    initAccountsPage();
  } else if (document.getElementById('financialProfitComboChart') || path.includes('financeiro')) {
    initFinancialPage();
  }
});

