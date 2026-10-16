/**
 * DRIPP CONCEITO | MODA MASCULINA - URBAN & STREETWEAR
 * Main Application Script (app.js)
 * São Carlos - SP
 */

// ==========================================================================
// 1. DATABASE & INITIAL STATE (Streetwear Mock Data with API Fallback)
// ==========================================================================
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Camiseta Oversized Acid Wash 'Tokyo Underground'",
    slug: "camiseta-oversized-acid-wash-tokyo",
    category: "camisetas",
    categoryName: "Camisetas Oversized",
    price: 159.90,
    comparePrice: 199.90,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Preto Lavado", code: "#1C1C1E" },
      { name: "Grafite", code: "#3A3A3C" }
    ],
    rating: 4.9,
    reviewsCount: 38,
    badge: "MAIS VENDIDO",
    isNew: true,
    isFeatured: true,
    description: "Modelagem oversized autêntica, confeccionada em malha 100% algodão penteado fio 26.1 com gramatura premium de 240g/m². O processo de lavagem acid wash confere aspecto vintage e toque ultra macio. Gola canelada de 3cm com reforço ombro a ombro.",
    specs: {
      composicao: "100% Algodão Penteado",
      gramatura: "240 g/m²",
      modelagem: "Streetwear Boxy Oversized",
      origem: "Fabricado no Brasil - São Carlos, SP"
    }
  },
  {
    id: 2,
    name: "Moletom Hoodie Heavyweight 'Dripp Signature' Ouro",
    slug: "moletom-hoodie-heavyweight-dripp-signature",
    category: "hoodies",
    categoryName: "Hoodies & Moletons",
    price: 329.90,
    comparePrice: 389.90,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["P", "M", "G", "GG", "XGG"],
    colors: [
      { name: "Preto Vulcão", code: "#0A0A0C" },
      { name: "Cinza Mescla", code: "#94A3B8" }
    ],
    rating: 5.0,
    reviewsCount: 52,
    badge: "DESTAQUE",
    isNew: true,
    isFeatured: true,
    description: "O clássico moletom canguru streetwear redefinido. Algodão pesado 3 cabos 380g peluciado internamente, com capuz duplo estruturado e bordado frontal em alta densidade com relevo. Punhos largos e bolso frontal anatômico.",
    specs: {
      composicao: "70% Algodão 30% Poliéster Premium",
      gramatura: "380 g/m² Heavyweight",
      modelagem: "Drop Shoulder Relaxed",
      origem: "São Carlos - SP"
    }
  },
  {
    id: 3,
    name: "Calça Cargo Tática Ripstop 'Night Ops'",
    slug: "calca-cargo-tatica-ripstop-night-ops",
    category: "calcas",
    categoryName: "Calças Cargo",
    price: 249.90,
    comparePrice: 289.90,
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["38", "40", "42", "44", "46"],
    colors: [
      { name: "Preto", code: "#000000" },
      { name: "Verde Militar", code: "#2E3B2E" }
    ],
    rating: 4.8,
    reviewsCount: 29,
    badge: "NOVO",
    isNew: true,
    isFeatured: true,
    description: "Calça cargo confeccionada em tecido Ripstop ultra resistente anti-rasgo. Possui 6 bolsos funcionais com fechamento reforçado, ajuste na barra com cordão elástico e cintura com passantes e elástico embutido para conforto supremo.",
    specs: {
      composicao: "65% Poliéster 35% Algodão Ripstop",
      gramatura: "220 g/m²",
      modelagem: "Relaxed Fit com barra ajustável",
      origem: "Brasil"
    }
  },
  {
    id: 4,
    name: "Jaqueta Corta-Vento Windbreaker 'Reflex 3M'",
    slug: "jaqueta-corta-vento-windbreaker-reflex-3m",
    category: "corta-vento",
    categoryName: "Corta-Ventos & Jaquetas",
    price: 289.90,
    comparePrice: 349.90,
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Black / Gold", code: "#18181B" },
      { name: "Cinza Gelo", code: "#D1D5DB" }
    ],
    rating: 4.9,
    reviewsCount: 44,
    badge: "PROMOÇÃO",
    isNew: false,
    isFeatured: true,
    description: "Windbreaker 100% repelente à água com forro interno respirável em mesh. Detalhes em fita refletiva 3M nas mangas e capuz ajustável com puxadores personalizados. Zíper tratorado impermeabilizado.",
    specs: {
      composicao: "100% Poliamida resinada",
      gramatura: "Leve e compacto",
      modelagem: "Streetwear Regular",
      origem: "São Carlos - SP"
    }
  },
  {
    id: 5,
    name: "Camiseta Boxy Heavyweight 'São Carlos Street'",
    slug: "camiseta-boxy-heavyweight-sao-carlos",
    category: "camisetas",
    categoryName: "Camisetas Oversized",
    price: 149.90,
    comparePrice: 179.90,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Branco Neve", code: "#FFFFFF" },
      { name: "Preto", code: "#000000" }
    ],
    rating: 4.7,
    reviewsCount: 21,
    badge: "",
    isNew: false,
    isFeatured: false,
    description: "Modelagem Boxy com corte quadrado e ombros caídos. Estampa em silk screen premium localizada nas costas homenageando a cena urbana de São Carlos. Tecido de alta gramatura que não amassa fácil.",
    specs: {
      composicao: "100% Algodão Premium",
      gramatura: "260 g/m² Heavy",
      modelagem: "Boxy Cut",
      origem: "Brasil"
    }
  },
  {
    id: 6,
    name: "Bermuda Cargo Moletom 'Minimal Raw'",
    slug: "bermuda-cargo-moletom-minimal-raw",
    category: "bermudas",
    categoryName: "Bermudas Street",
    price: 139.90,
    comparePrice: 169.90,
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Chumbo", code: "#27272A" },
      { name: "Bege Areia", code: "#D4C7B5" }
    ],
    rating: 4.8,
    reviewsCount: 16,
    badge: "CONFORT",
    isNew: false,
    isFeatured: false,
    description: "Bermuda em moletinho premium 100% algodão sem felpa com barra desfiada e bolsos laterais cargo funcionais. Cintura com elástico largo e cadarço rústico cru.",
    specs: {
      composicao: "100% Algodão",
      gramatura: "300 g/m²",
      modelagem: "Above Knee Street",
      origem: "São Carlos - SP"
    }
  },
  {
    id: 7,
    name: "Boné Dad Hat 6 Panels 'Dripp Club' Bordado Ouro",
    slug: "bone-dad-hat-6-panels-dripp-club",
    category: "acessorios",
    categoryName: "Bonés & Acessórios",
    price: 99.90,
    comparePrice: 129.90,
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Único"],
    colors: [
      { name: "Preto", code: "#000000" },
      { name: "Cáqui", code: "#BDB09B" }
    ],
    rating: 5.0,
    reviewsCount: 47,
    badge: "HOT",
    isNew: true,
    isFeatured: false,
    description: "Boné strapback desestruturado 6 gomos em sarja pesada 100% algodão. Bordado frontal em fio dourado metalizado de alto relevo. Fivela de metal antioxidante gravada.",
    specs: {
      composicao: "100% Algodão Sarja Peletizada",
      fecho: "Strapback fivela metálica",
      origem: "Brasil"
    }
  },
  {
    id: 8,
    name: "Shoulder Bag Utility Cordura 'All Black'",
    slug: "shoulder-bag-utility-cordura-all-black",
    category: "acessorios",
    categoryName: "Bonés & Acessórios",
    price: 119.90,
    comparePrice: 149.90,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Único"],
    colors: [
      { name: "All Black", code: "#0A0A0C" }
    ],
    rating: 4.9,
    reviewsCount: 31,
    badge: "ESSENCIAL",
    isNew: false,
    isFeatured: false,
    description: "Bolsa transversal compacta em nylon balístico impermeável. Três compartimentos com zíperes vedados, alça ajustável com mosquetões de engate rápido e tag emborrachada Dripp Conceito.",
    specs: {
      composicao: "Nylon Balístico 600D",
      dimensoes: "20cm x 15cm x 6cm",
      origem: "Brasil"
    }
  },
  {
    id: 9,
    name: "Relógio DRIPP Skeleton Automatic 18K Gold & Safira",
    slug: "relogio-dripp-skeleton-automatic-18k-gold",
    category: "relogios",
    categoryName: "Relógios de Luxo & Iced Out",
    price: 1890.00,
    comparePrice: 2490.00,
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Único (42mm)"],
    colors: [
      { name: "Ouro 18K PVD", code: "#D4AF37" },
      { name: "Platinum Prata", code: "#E2E8F0" }
    ],
    rating: 5.0,
    reviewsCount: 42,
    badge: "OURO 18K",
    isNew: true,
    isFeatured: true,
    description: "O ápice do luxo rap internacional. Maquinário automático esqueleto com engrenagens à mostra, caixa esculpida em aço 316L banhada a ouro 18K PVD e cristal de safira anti-riscos.",
    specs: {
      mecanismo: "Automático Esqueleto 21 Jewels",
      resistencia: "5 ATM (50 metros)",
      material: "Aço Inox 316L Ouro 18K & Safira",
      origem: "Edição Limitada Numerada"
    }
  },
  {
    id: 10,
    name: "Relógio DRIPP Iced Out Baguette Pave Cravejado VVS",
    slug: "relogio-dripp-iced-out-baguette-pave-vvs",
    category: "relogios",
    categoryName: "Relógios de Luxo & Iced Out",
    price: 2290.00,
    comparePrice: 2890.00,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Único (44mm)"],
    colors: [
      { name: "Iced Platinum", code: "#CBD5E1" },
      { name: "Iced Gold 18K", code: "#EAB308" }
    ],
    rating: 5.0,
    reviewsCount: 67,
    badge: "ICED OUT",
    isNew: true,
    isFeatured: true,
    description: "Cravado artesanalmente com centenas de pedras lapidação Baguette 5A de brilho estonteante. A assinatura definitiva da cultura Luxury Rap nos palcos e eventos exclusivos.",
    specs: {
      pedras: "Zircônias Baguette VVS 5A",
      caixa: "44mm Aço Platinado",
      fecho: "Duplo Oculto Butterfly",
      origem: "Coleção Ice Vault"
    }
  },
  {
    id: 11,
    name: "Relógio Cronógrafo DRIPP Matte Carbon Black Edition",
    slug: "relogio-cronografo-dripp-matte-carbon-black",
    category: "relogios",
    categoryName: "Relógios de Luxo & Iced Out",
    price: 1390.00,
    comparePrice: 1690.00,
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Único (43mm)"],
    colors: [
      { name: "All Black Matte", code: "#111115" }
    ],
    rating: 4.9,
    reviewsCount: 28,
    badge: "STEALTH LUXURY",
    isNew: true,
    isFeatured: false,
    description: "Estética stealth minimalista com acabamento PVD preto fosco acetinado. Três subdials cronógrafos funcionais e pulseira anatômica em silicone vulcanizado resistente.",
    specs: {
      mecanismo: "Cronógrafo Quartz Suíço",
      acabamento: "Black PVD Matte",
      pulseira: "Silicone Vulcanizado Premium",
      origem: "Importado Exclusivo"
    }
  },
  {
    id: 12,
    name: "Boné Trucker DRIPP Luxury Rap Leather & 3D Gold",
    slug: "bone-trucker-dripp-luxury-rap-leather",
    category: "bones",
    categoryName: "Bonés & Headwear Luxo",
    price: 219.90,
    comparePrice: 279.90,
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Snapback Ajustável"],
    colors: [
      { name: "Preto Couro / Dourado", code: "#18181B" },
      { name: "All Black", code: "#09090B" }
    ],
    rating: 4.9,
    reviewsCount: 51,
    badge: "DESTAQUE",
    isNew: true,
    isFeatured: true,
    description: "Painel frontal em couro legítimo macio com bordado frontal DRIPP em alto relevo metálico ouro. Tela traseira respirável e fecho de latão regulável com gravação laser.",
    specs: {
      material: "Couro Legítimo & Tela Estruturada",
      aba: "Curva Moldável com Forro Suede",
      fecho: "Strapback com Fivela de Latão",
      origem: "São Carlos - SP"
    }
  },
  {
    id: 13,
    name: "Boné 5-Panel Velvet Chrome DRIPP Gothic Cross",
    slug: "bone-5-panel-velvet-chrome-dripp",
    category: "bones",
    categoryName: "Bonés & Headwear Luxo",
    price: 199.90,
    comparePrice: 249.90,
    images: [
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Strapback Ajustável"],
    colors: [
      { name: "Preto Ônix Veludo", code: "#121214" },
      { name: "Burgundy Vinho", code: "#4C0519" }
    ],
    rating: 4.8,
    reviewsCount: 39,
    badge: "LIMITED",
    isNew: true,
    isFeatured: false,
    description: "Modelo 5-panel em veludo cotelê denso com medalhão em liga metálica Gothic Cross cromada. Fecho traseiro em fita de gorgurão com fivela preta fosca.",
    specs: {
      material: "Veludo Cotelê Pesado 100% Algodão",
      detalhe: "Cruz Gótica em Liga de Zinco Cromada",
      origem: "Brasil"
    }
  },
  {
    id: 14,
    name: "Boné Fitted DRIPP São Carlos Limited Edition 7 1/4",
    slug: "bone-fitted-dripp-sao-carlos-limited",
    category: "bones",
    categoryName: "Bonés & Headwear Luxo",
    price: 239.90,
    comparePrice: 299.90,
    images: [
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["7 1/8", "7 1/4", "7 3/8", "7 1/2"],
    colors: [
      { name: "Preto com Aba Cinza", code: "#18181B" }
    ],
    rating: 5.0,
    reviewsCount: 34,
    badge: "GRAIL",
    isNew: true,
    isFeatured: true,
    description: "Modelagem fitted fechada clássica inspirada nas ligas americanas e adaptada para o cenário do rap nacional. Bordado comemorativo lateral e aba reta estruturada.",
    specs: {
      material: "Lã Mista & Sarja 100% Algodão",
      modelagem: "Fitted 6 Painéis Estruturado",
      origem: "Edição Especial 016 São Carlos"
    }
  },
  {
    id: 15,
    name: "Sneaker DRIPP High 'Phantom Platinum' Leather & Suede",
    slug: "sneaker-dripp-high-phantom-platinum",
    category: "tenis",
    categoryName: "Sneakers & Tênis Hype",
    price: 899.90,
    comparePrice: 1199.90,
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Platinum White / Ice", code: "#E2E8F0" },
      { name: "Onyx Black / Platinum", code: "#09090B" }
    ],
    rating: 5.0,
    reviewsCount: 88,
    badge: "HYPEBEAST",
    isNew: true,
    isFeatured: true,
    description: "Cano alto confeccionado à mão em couro nobre integral e recortes em suede aveludado. Detalhes em foil metálico e entressola costurada 360 graus com solado de alta aderência.",
    specs: {
      cabedal: "100% Couro Bovino Genuíno & Suede",
      palmilha: "EVA Anatômica com Gel no Calcanhar",
      solado: "Borracha Vulcanizada Cupsole",
      origem: "Fabricação Premium Nacional"
    }
  },
  {
    id: 16,
    name: "Sneaker Chunky DRIPP Skate Lux 'Onyx Gold'",
    slug: "sneaker-chunky-dripp-skate-lux-onyx-gold",
    category: "tenis",
    categoryName: "Sneakers & Tênis Hype",
    price: 789.90,
    comparePrice: 989.90,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: [
      { name: "All Black com Ouro", code: "#0F0F12" }
    ],
    rating: 4.9,
    reviewsCount: 47,
    badge: "POPULAR",
    isNew: true,
    isFeatured: false,
    description: "Silhueta chunky acolchoada com língua estofada e acabamentos em dourado escovado. Conforto incomparável para o uso diário ou para compor fits oversized impactantes.",
    specs: {
      cabedal: "Couro Sintético Nobuck & Mesh Respirável",
      solado: "Borracha Tratorada Antiderrapante",
      origem: "Brasil"
    }
  },
  {
    id: 17,
    name: "Sneaker Runner DRIPP Bionic Cyber Track 'Triple Black'",
    slug: "sneaker-runner-dripp-bionic-cyber-track",
    category: "tenis",
    categoryName: "Sneakers & Tênis Hype",
    price: 949.90,
    comparePrice: 1250.00,
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Triple Black 3M", code: "#050507" }
    ],
    rating: 5.0,
    reviewsCount: 63,
    badge: "TECHWEAR GRAIL",
    isNew: true,
    isFeatured: true,
    description: "Tênis futurista com exoesqueleto em TPU injetado e fios refletivos 3M que brilham sob a luz dos flashes. Entressola com amortecimento aerodinâmico.",
    specs: {
      tecnologia: "Mesh Knit Bionic com Exoesqueleto TPU",
      seguranca: "Fios Refletivos 3M Scotchlite",
      origem: "Importado"
    }
  },
  {
    id: 18,
    name: "Corrente Cubana DRIPP 14mm Cravejada Ice Gold 18K",
    slug: "corrente-cubana-dripp-14mm-cravejada-ice-gold",
    category: "acessorios",
    categoryName: "Jóias & Acessórios Cravejados",
    price: 599.90,
    comparePrice: 799.90,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["50cm (Choker)", "60cm (Standard)"],
    colors: [
      { name: "Ouro 18K Cravejado", code: "#D4AF37" },
      { name: "Ouro Branco Cravejado", code: "#E2E8F0" }
    ],
    rating: 5.0,
    reviewsCount: 95,
    badge: "ICED OUT",
    isNew: true,
    isFeatured: true,
    description: "A clássica Miami Cuban Link com elos maciços de 14mm banhados a ouro 18K e cravejados com mais de 800 zircônias cúbicas 5A brilhantes. Fecho duplo com trava de segurança personalizada.",
    specs: {
      largura: "14mm",
      banho: "Ouro 18K (10 Milésimos) + Verniz Cataforético",
      pedras: "Zircônias Cúbicas 5A Diamond Cut",
      garantia: "1 Ano de Garantia do Banho"
    }
  },
  {
    id: 19,
    name: "Óculos de Sol DRIPP Shield Cyclops Luxury Rap",
    slug: "oculos-de-sol-dripp-shield-cyclops",
    category: "acessorios",
    categoryName: "Jóias & Acessórios Cravejados",
    price: 349.90,
    comparePrice: 450.00,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Único"],
    colors: [
      { name: "Lente Dourada Espelhada", code: "#D4AF37" },
      { name: "Blackout Total", code: "#000000" }
    ],
    rating: 4.8,
    reviewsCount: 22,
    badge: "FUTURISTA",
    isNew: true,
    isFeatured: false,
    description: "Lente inteiriça curva com proteção solar UV400 e armação em acetato premium italiano. O acessório predileto de rappers e produtores em todo o país.",
    specs: {
      protecao: "100% Proteção UVA / UVB (UV400)",
      material: "Acetato Italiano & Policarbonato",
      origem: "Acompanha Case Rígido e Flanela"
    }
  },
  {
    id: 20,
    name: "Jaqueta Puffer DRIPP Glossy Vinyl Black Boxy Fit",
    slug: "jaqueta-puffer-dripp-glossy-vinyl-black",
    category: "hoodies",
    categoryName: "Outerwear & Hoodies Luxo",
    price: 689.90,
    comparePrice: 890.00,
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Preto Vinil Brilhante", code: "#000000" },
      { name: "Prata Chrome Espelhado", code: "#94A3B8" }
    ],
    rating: 5.0,
    reviewsCount: 76,
    badge: "WINTER GRAIL",
    isNew: true,
    isFeatured: true,
    description: "Jaqueta acolchoada volumosa inspirada nos vídeos de hip-hop de Nova York e Londres. Acabamento vinílico com brilho molhado, bolsos forrados em fleece e gola alta estruturada.",
    specs: {
      enchimento: "Pluma Sintética Térmica Ultra Leve",
      revestimento: "Vinil Poliéster Impermeável",
      modelagem: "Boxy Cropped Oversized",
      origem: "Edição Limitada de Inverno"
    }
  }
];

const VALID_COUPONS = {
  "DRIPP10": { type: "percent", value: 10, label: "10% de desconto" },
  "PRIMEIRACOMPRA": { type: "percent", value: 15, label: "15% de desconto de boas-vindas" },
  "FRETEGRATIS": { type: "shipping", value: 0, label: "Frete grátis liberado" },
  "SAOCARLOSVIP": { type: "percent", value: 20, label: "20% OFF Especial São Carlos" }
};

// ==========================================================================
// 2. HELPERS & FORMATTERS
// ==========================================================================
const Formatters = {
  currency(value) {
    const num = typeof value === 'number' ? value : parseFloat(value) || 0;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(num);
  },

  cpf(value) {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .substring(0, 14);
  },

  phone(value) {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2")
      .substring(0, 15);
  },

  cep(value) {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .substring(0, 9);
  }
};

// ==========================================================================
// 2.1 ANALYTICS & CLICK TRACKING SYSTEM
// ==========================================================================
const Analytics = {
  getSessionId() {
    let sid = sessionStorage.getItem('dripp_sid');
    if (!sid) {
      sid = 'sid_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
      sessionStorage.setItem('dripp_sid', sid);
    }
    return sid;
  },

  getDevice() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return 'mobile';
    if (/tablet|ipad/i.test(ua)) return 'tablet';
    return 'desktop';
  },

  track(eventType, data = {}) {
    try {
      const payload = {
        event_type: eventType,
        page_url: window.location.pathname + window.location.search,
        product_id: data.productId ? Number(data.productId) : null,
        product_name: data.productName || null,
        category: data.category || null,
        session_id: this.getSessionId(),
        device: this.getDevice(),
        referrer: document.referrer || '',
        metadata: data.metadata || { time: new Date().toISOString() }
      };

      // Gravar no localStorage para fallback em standalone/GitHub Pages
      const cached = JSON.parse(localStorage.getItem('dripp_analytics_events') || '[]');
      cached.unshift({ ...payload, created_at: new Date().toISOString() });
      if (cached.length > 200) cached.pop();
      localStorage.setItem('dripp_analytics_events', JSON.stringify(cached));

      // Enviar para o servidor se online (evita 404 no console em hosts estáticos como github.io)
      const isStaticHost = window.location.hostname.includes('github.io');
      if (!isStaticHost && window.location.protocol.startsWith('http')) {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      }
    } catch (e) {
      // Silencioso para não interromper navegação do usuário
    }
  }
};

// ==========================================================================
// 3. TOAST NOTIFICATION SYSTEM
// ==========================================================================
const Toast = {
  container: null,

  init() {
    let el = document.getElementById("toast-container");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast-container";
      el.className = "toast-container";
      document.body.appendChild(el);
    }
    this.container = el;
  },

  show(title, message, type = "info", duration = 4000) {
    this.init();

    const icons = {
      success: "fa-circle-check",
      error: "fa-circle-xmark",
      warning: "fa-triangle-exclamation",
      info: "fa-circle-info"
    };

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${icons[type] || icons.info} toast-icon"></i>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${message}</div>
      </div>
      <button class="toast-close" aria-label="Fechar">&times;</button>
      <div class="toast-progress"></div>
    `;

    const closeBtn = toast.querySelector(".toast-close");
    closeBtn.addEventListener("click", () => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      setTimeout(() => toast.remove(), 250);
    });

    this.container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(50px)";
        setTimeout(() => toast.remove(), 300);
      }
    }, duration);
  },

  success(title, msg) { this.show(title, msg, "success"); },
  error(title, msg) { this.show(title, msg, "error"); },
  warning(title, msg) { this.show(title, msg, "warning"); },
  info(title, msg) { this.show(title, msg, "info"); }
};

// ==========================================================================
// 4. API CLIENT (Wrapper with LocalStorage Fallback)
// ==========================================================================
class ApiClient {
  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
  }

  getHeaders() {
    const token = localStorage.getItem("dripp_token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...(options.headers || {})
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.warn(`[API] Fallback to client logic for ${endpoint}:`, err.message);
      return null;
    }
  }

  async getProducts() {
    const data = await this.request("/api/products");
    if (data && Array.isArray(data.products)) return data.products;
    if (data && Array.isArray(data)) return data;
    return MOCK_PRODUCTS;
  }

  async getFeaturedProducts() {
    const data = await this.request("/api/products/featured");
    if (data && Array.isArray(data.products)) return data.products;
    return MOCK_PRODUCTS.filter(p => p.isFeatured);
  }

  async getProductBySlug(slug) {
    const data = await this.request(`/api/products/${slug}`);
    if (data && data.product) return data.product;
    if (data && data.id) return data;
    return MOCK_PRODUCTS.find(p => p.slug === slug || p.id == slug) || null;
  }

  async lookupCep(rawCep) {
    const cleanCep = rawCep.replace(/\D/g, "");
    if (cleanCep.length !== 8) {
      throw new Error("CEP inválido. Digite 8 números.");
    }
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json();
    if (data.erro) {
      throw new Error("CEP não encontrado.");
    }
    return data;
  }
}

const api = new ApiClient();

// ==========================================================================
// 5. CART MANAGER (State + LocalStorage + Drawer sync)
// ==========================================================================
class CartManager {
  constructor() {
    this.items = this.load();
    this.appliedCoupon = this.loadCoupon();
    this.shippingCost = this.loadShipping();
    this.shippingMethod = "Retirada em Loja (São Carlos) - Grátis";
  }

  load() {
    try {
      const saved = localStorage.getItem("dripp_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  save() {
    localStorage.setItem("dripp_cart", JSON.stringify(this.items));
    this.updateBadges();
    this.renderDrawer();
  }

  loadCoupon() {
    try {
      const saved = localStorage.getItem("dripp_coupon");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  loadShipping() {
    try {
      const saved = localStorage.getItem("dripp_shipping");
      return saved ? parseFloat(saved) : 0;
    } catch (e) {
      return 0;
    }
  }

  addItem(product, size = "G", color = null, quantity = 1) {
    const chosenColor = color || (product.colors && product.colors[0] ? product.colors[0].name || product.colors[0] : "Preto");
    const chosenSize = size || (product.sizes && product.sizes[0] ? product.sizes[0] : "M");
    const cartId = `${product.id}-${chosenSize}-${chosenColor}`;

    const existingIndex = this.items.findIndex(item => item.cartId === cartId);
    const prodImg = (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop';

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        cartId,
        id: product.id,
        name: product.name,
        slug: product.slug || `prod-${product.id}`,
        price: parseFloat(product.price),
        image: prodImg,
        size: chosenSize,
        color: chosenColor,
        quantity: quantity
      });
    }

    this.save();
    Analytics.track('add_to_cart', {
      productId: product.id,
      productName: product.name,
      category: product.category,
      metadata: { size: chosenSize, color: chosenColor, price: product.price, quantity }
    });
    Toast.success("Adicionado ao Carrinho!", `${product.name} (${chosenSize}) foi incluído.`);
    this.openDrawer();
  }

  updateQuantity(cartId, delta) {
    const item = this.items.find(i => i.cartId === cartId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(cartId);
      return;
    }
    this.save();
  }

  removeItem(cartId) {
    const item = this.items.find(i => i.cartId === cartId);
    this.items = this.items.filter(i => i.cartId !== cartId);
    this.save();
    if (item) {
      Toast.info("Item removido", `${item.name} foi removido do carrinho.`);
    }
  }

  clear() {
    this.items = [];
    this.appliedCoupon = null;
    this.shippingCost = 0;
    localStorage.removeItem("dripp_cart");
    localStorage.removeItem("dripp_coupon");
    localStorage.removeItem("dripp_shipping");
    this.save();
  }

  getSubtotal() {
    return this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  getDiscount() {
    const subtotal = this.getSubtotal();
    if (!this.appliedCoupon) return 0;
    if (this.appliedCoupon.type === "percent" || this.appliedCoupon.type === "percentage") {
      return (subtotal * this.appliedCoupon.value) / 100;
    }
    return 0;
  }

  getTotal() {
    const subtotal = this.getSubtotal();
    const discount = this.getDiscount();
    let shipping = this.shippingCost;

    if (this.appliedCoupon && this.appliedCoupon.type === "shipping") {
      shipping = 0;
    }

    const total = subtotal - discount + shipping;
    return total > 0 ? total : 0;
  }

  getCount() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  async applyCoupon(code) {
    const clean = code.trim().toUpperCase();

    // Check with backend API if reachable
    try {
      const res = await api.request("/api/orders/apply-coupon", {
        method: "POST",
        body: JSON.stringify({ code: clean, subtotal: this.getSubtotal() })
      });
      if (res && res.success && res.coupon) {
        this.appliedCoupon = { code: clean, type: res.coupon.type, value: res.coupon.value, label: res.message };
        localStorage.setItem("dripp_coupon", JSON.stringify(this.appliedCoupon));
        Toast.success("Cupom Aplicado!", res.message);
        this.save();
        return true;
      }
    } catch (e) {
      // Fallback to static coupons
    }

    if (VALID_COUPONS[clean]) {
      this.appliedCoupon = { code: clean, ...VALID_COUPONS[clean] };
      localStorage.setItem("dripp_coupon", JSON.stringify(this.appliedCoupon));
      Toast.success("Cupom Aplicado!", VALID_COUPONS[clean].label);
      this.save();
      return true;
    } else {
      Toast.error("Cupom Inválido", "Verifique o código ou aproveite DRIPP10.");
      return false;
    }
  }

  removeCoupon() {
    this.appliedCoupon = null;
    localStorage.removeItem("dripp_coupon");
    Toast.info("Cupom removido", "O desconto foi retirado.");
    this.save();
  }

  setShipping(cost, method = "Envio Padrão") {
    this.shippingCost = cost;
    this.shippingMethod = method;
    localStorage.setItem("dripp_shipping", cost.toString());
    this.save();
  }

  updateBadges() {
    const badges = document.querySelectorAll(".cart-count-badge");
    const count = this.getCount();
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? "flex" : "none";
    });
  }

  openDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("drawer-backdrop");
    if (drawer && backdrop) {
      drawer.classList.add("active");
      backdrop.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  closeDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("drawer-backdrop");
    if (drawer && backdrop) {
      drawer.classList.remove("active");
      backdrop.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  renderDrawer() {
    const container = document.getElementById("cart-drawer-items");
    const subtotalEl = document.getElementById("cart-drawer-subtotal-val");
    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding: 3rem 1rem; color: var(--text-muted);">
          <i class="fa-solid fa-bag-shopping" style="font-size: 3rem; color: var(--color-accent); margin-bottom: 1rem;"></i>
          <h4 style="color:#FFFFFF; margin-bottom: 0.5rem;">SEU CARRINHO ESTÁ VAZIO</h4>
          <p style="font-size: 0.85rem; margin-bottom: 1.5rem;">Explore nossos lançamentos streetwear exclusivos.</p>
          <a href="loja.html" class="btn btn-primary btn-sm">VER PRODUTOS</a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = "R$ 0,00";
      return;
    }

    container.innerHTML = this.items.map(item => `
      <div class="cart-drawer-item">
        <img src="${item.image}" alt="${item.name}" class="cart-drawer-thumb">
        <div class="cart-drawer-info">
          <div class="cart-drawer-name">${item.name}</div>
          <div class="cart-drawer-meta">Tam: <strong>${item.size}</strong> | Cor: ${item.color}</div>
          <div class="cart-drawer-bottom">
            <div class="cart-qty-ctrl">
              <button class="cart-qty-btn" onclick="drippCart.updateQuantity('${item.cartId}', -1)">-</button>
              <span class="cart-qty-val">${item.quantity}</span>
              <button class="cart-qty-btn" onclick="drippCart.updateQuantity('${item.cartId}', 1)">+</button>
            </div>
            <span class="cart-drawer-price">${Formatters.currency(item.price * item.quantity)}</span>
          </div>
        </div>
        <button class="cart-remove-btn" onclick="drippCart.removeItem('${item.cartId}')" title="Remover item">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `).join("");

    if (subtotalEl) {
      subtotalEl.textContent = Formatters.currency(this.getSubtotal());
    }
  }
}

const drippCart = new CartManager();

// ==========================================================================
// 6. AUTH MANAGER (User session, Login, Register, Logout)
// ==========================================================================
class AuthManager {
  constructor() {
    this.user = this.loadUser();
  }

  loadUser() {
    try {
      const saved = localStorage.getItem("dripp_user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  isLoggedIn() {
    return !!this.user;
  }

  async login(email, password) {
    if (!email || !password) {
      Toast.error("Campos obrigatórios", "Informe seu e-mail e sua senha.");
      return false;
    }

    // Try backend API first
    try {
      const res = await api.request("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      if (res && res.success && res.user) {
        localStorage.setItem("dripp_user", JSON.stringify(res.user));
        if (res.token) localStorage.setItem("dripp_token", res.token);
        this.user = res.user;
        this.updateUserUI();
        Toast.success("Bem-vindo de volta!", `Olá, ${res.user.name}!`);
        return true;
      }
    } catch (e) {
      // Fallback
    }

    // Client-side fallback
    const dummyUser = {
      id: "usr_" + Date.now(),
      name: email.split("@")[0].toUpperCase(),
      email: email,
      phone: "(16) 99876-5432",
      cpf: "123.456.789-00",
      avatar: email.charAt(0).toUpperCase()
    };

    localStorage.setItem("dripp_user", JSON.stringify(dummyUser));
    localStorage.setItem("dripp_token", "jwt_dripp_" + Date.now());
    this.user = dummyUser;
    this.updateUserUI();
    Toast.success("Bem-vindo de volta!", `Olá, ${dummyUser.name}!`);
    return true;
  }

  async register(data) {
    if (!data.name || !data.email || !data.password) {
      Toast.error("Erro no cadastro", "Preencha todos os campos obrigatórios.");
      return false;
    }

    // Try backend API first
    try {
      const res = await api.request("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data)
      });
      if (res && res.success && res.user) {
        localStorage.setItem("dripp_user", JSON.stringify(res.user));
        if (res.token) localStorage.setItem("dripp_token", res.token);
        this.user = res.user;
        this.updateUserUI();
        Toast.success("Conta criada!", `Bem-vindo à DRIPP CONCEITO, ${res.user.name}!`);
        return true;
      }
    } catch (e) {
      // Fallback
    }

    const newUser = {
      id: "usr_" + Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone || "(16) 99999-0000",
      cpf: data.cpf || "000.000.000-00",
      avatar: data.name.charAt(0).toUpperCase()
    };

    localStorage.setItem("dripp_user", JSON.stringify(newUser));
    localStorage.setItem("dripp_token", "jwt_dripp_" + Date.now());
    this.user = newUser;
    this.updateUserUI();
    Toast.success("Conta criada!", `Bem-vindo à DRIPP CONCEITO, ${newUser.name}!`);
    return true;
  }

  logout() {
    this.user = null;
    localStorage.removeItem("dripp_user");
    localStorage.removeItem("dripp_token");
    this.updateUserUI();
    Toast.info("Sessão encerrada", "Você saiu da sua conta.");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 600);
  }

  updateUserUI() {
    const userDropdown = document.getElementById("header-user-dropdown");
    if (!userDropdown) return;

    if (this.isLoggedIn()) {
      userDropdown.innerHTML = `
        <div class="user-dropdown-header">
          <div class="user-dropdown-name">${this.user.name}</div>
          <div class="user-dropdown-email">${this.user.email}</div>
        </div>
        <a href="conta.html" class="user-dropdown-item">
          <i class="fa-solid fa-user"></i> Minha Conta
        </a>
        <a href="conta.html#pedidos" class="user-dropdown-item">
          <i class="fa-solid fa-box-open"></i> Meus Pedidos
        </a>
        <a href="carrinho.html" class="user-dropdown-item">
          <i class="fa-solid fa-bag-shopping"></i> Meu Carrinho
        </a>
        <button type="button" class="user-dropdown-item" style="width:100%; text-align:left; color: var(--error);" onclick="drippAuth.logout()">
          <i class="fa-solid fa-arrow-right-from-bracket" style="color:var(--error);"></i> Sair
        </button>
      `;
    } else {
      userDropdown.innerHTML = `
        <div class="user-dropdown-header">
          <div class="user-dropdown-name">CONTA DRIPP</div>
          <div class="user-dropdown-email">Acesse sua conta ou cadastre-se</div>
        </div>
        <a href="login.html" class="user-dropdown-item">
          <i class="fa-solid fa-arrow-right-to-bracket"></i> Entrar / Cadastrar
        </a>
        <a href="carrinho.html" class="user-dropdown-item">
          <i class="fa-solid fa-bag-shopping"></i> Meu Carrinho
        </a>
      `;
    }
  }
}

const drippAuth = new AuthManager();

// ==========================================================================
// 7. ORDER MANAGER (Simulated orders stored in localStorage & API sync)
// ==========================================================================
class OrderManager {
  static getOrders() {
    const defaultOrders = [
      {
        id: "DRP-9842",
        date: "12/10/2026",
        status: "Entregue",
        statusClass: "status-entregue",
        total: 329.90,
        itemsCount: 1,
        itemsSummary: "Moletom Hoodie Heavyweight 'Dripp Signature' (Tam: G)",
        paymentMethod: "PIX",
        trackingCode: "BR928374610SP"
      },
      {
        id: "DRP-9811",
        date: "04/10/2026",
        status: "Enviado",
        statusClass: "status-enviado",
        total: 409.80,
        itemsCount: 2,
        itemsSummary: "Camiseta Oversized Tokyo Drift + Calça Cargo Night Ops",
        paymentMethod: "Cartão de Crédito 3x",
        trackingCode: "BR819203847SP"
      }
    ];

    try {
      const saved = localStorage.getItem("dripp_orders");
      return saved ? JSON.parse(saved) : defaultOrders;
    } catch (e) {
      return defaultOrders;
    }
  }

  static addOrder(orderData) {
    const orders = this.getOrders();
    const newOrder = {
      id: "DRP-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleDateString("pt-BR"),
      status: "Aprovado",
      statusClass: "status-aprovado",
      ...orderData
    };
    orders.unshift(newOrder);
    localStorage.setItem("dripp_orders", JSON.stringify(orders));
    return newOrder;
  }
}

// ==========================================================================
// 8. GLOBAL UI & NAVIGATION CONTROLLERS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  drippCart.updateBadges();
  drippCart.renderDrawer();
  drippAuth.updateUserUI();

  // Rastreamento Automático de Analytics e Cliques do Site
  Analytics.track('page_view', { pageTitle: document.title });

  document.addEventListener('click', (e) => {
    // 1. Clique em produto
    const prodCard = e.target.closest('.product-card, .btn-quick-view, a[href*="produto.html"]');
    if (prodCard) {
      let pid = prodCard.dataset ? prodCard.dataset.id : null;
      if (!pid && prodCard.getAttribute('href')) {
        const match = prodCard.getAttribute('href').match(/id=(\d+)/);
        if (match) pid = match[1];
      }
      if (pid) {
        const prod = MOCK_PRODUCTS.find(p => p.id == pid);
        Analytics.track('product_click', {
          productId: pid,
          productName: prod ? prod.name : `Produto #${pid}`,
          category: prod ? prod.category : null
        });
      }
    }

    // 2. Clique em categoria
    const catCard = e.target.closest('.category-card, a[href*="cat="]');
    if (catCard) {
      const href = catCard.getAttribute('href') || '';
      const match = href.match(/cat=([^&]+)/);
      if (match) {
        Analytics.track('category_click', { category: match[1] });
      }
    }

    // 3. Clique no botão de WhatsApp VIP
    if (e.target.closest('a[href*="whatsapp.com"], .whatsapp-float, .btn-whatsapp-vip')) {
      Analytics.track('whatsapp_click', { action: 'open_vip_whatsapp' });
    }

    // 4. Clique em marketplaces (Shopee / Mercado Livre)
    if (e.target.closest('.marketplace-btn-shopee')) {
      Analytics.track('marketplace_click', { marketplace: 'Shopee' });
    }
    if (e.target.closest('.marketplace-btn-meli')) {
      Analytics.track('marketplace_click', { marketplace: 'Mercado Livre' });
    }

    // 5. Início de checkout
    if (e.target.closest('a[href*="checkout.html"], .btn-checkout-start')) {
      Analytics.track('begin_checkout', {
        itemsCount: drippCart.getCount(),
        total: drippCart.getTotal()
      });
    }
  });

  // Header scroll transition
  const header = document.querySelector(".site-header");
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  }

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobile-nav-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileClose = document.getElementById("mobile-drawer-close");
  const backdrop = document.getElementById("drawer-backdrop");

  if (mobileToggle && mobileDrawer && backdrop) {
    mobileToggle.addEventListener("click", () => {
      mobileDrawer.classList.add("active");
      backdrop.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    const closeMobile = () => {
      mobileDrawer.classList.remove("active");
      backdrop.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (mobileClose) mobileClose.addEventListener("click", closeMobile);
    backdrop.addEventListener("click", () => {
      closeMobile();
      drippCart.closeDrawer();
    });
  }

  // Cart Drawer open/close triggers
  const cartTriggers = document.querySelectorAll(".open-cart-drawer");
  const cartClose = document.getElementById("cart-drawer-close");
  cartTriggers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      drippCart.openDrawer();
    });
  });
  if (cartClose) {
    cartClose.addEventListener("click", () => drippCart.closeDrawer());
  }

  // User icon dropdown toggle
  const userBtn = document.getElementById("user-menu-btn");
  const userDropdown = document.getElementById("header-user-dropdown");
  if (userBtn && userDropdown) {
    userBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle("active");
    });
    document.addEventListener("click", (e) => {
      if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.remove("active");
      }
    });
  }

  // Autocomplete Search Bar
  const searchInputs = document.querySelectorAll(".dripp-search-input");
  searchInputs.forEach(input => {
    const dropdown = input.closest(".header-search")?.querySelector(".search-results-dropdown");
    if (!dropdown) return;

    input.addEventListener("input", (e) => {
      const term = e.target.value.trim().toLowerCase();
      if (term.length < 2) {
        dropdown.classList.remove("active");
        dropdown.innerHTML = "";
        return;
      }

      const matches = MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      ).slice(0, 5);

      if (matches.length === 0) {
        dropdown.innerHTML = `
          <div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
            Nenhum produto streetwear encontrado para "${term}".
          </div>
        `;
      } else {
        dropdown.innerHTML = matches.map(p => `
          <a href="produto.html?id=${p.id}" class="search-result-item">
            <img src="${p.images[0]}" alt="${p.name}" class="search-result-img">
            <div class="search-result-info">
              <div class="search-result-name">${p.name}</div>
              <div class="search-result-price">${Formatters.currency(p.price)}</div>
            </div>
          </a>
        `).join("") + `
          <div style="padding: 0.5rem 1rem; border-top: 1px solid var(--border-dark); text-align: center;">
            <a href="loja.html?q=${encodeURIComponent(term)}" style="font-size: 0.75rem; color: var(--color-accent); font-weight:700;">
              VER TODOS OS RESULTADOS &rarr;
            </a>
          </div>
        `;
      }
      dropdown.classList.add("active");
    });

    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const term = input.value.trim();
        if (term) {
          window.location.href = `loja.html?q=${encodeURIComponent(term)}`;
        }
      }
    });
  });

  // Newsletter Submit Forms
  const newsletterForms = document.querySelectorAll(".newsletter-form");
  newsletterForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input && input.value) {
        Toast.success("Inscrição Confirmada!", "Você recebeu o cupom PRIMEIRACOMPRA para 15% OFF.");
        input.value = "";
      }
    });
  });

  // Input Masks (CPF, Telefone, CEP)
  document.querySelectorAll("input[data-mask='cpf']").forEach(el => {
    el.addEventListener("input", (e) => e.target.value = Formatters.cpf(e.target.value));
  });
  document.querySelectorAll("input[data-mask='phone']").forEach(el => {
    el.addEventListener("input", (e) => e.target.value = Formatters.phone(e.target.value));
  });
  document.querySelectorAll("input[data-mask='cep']").forEach(el => {
    el.addEventListener("input", (e) => e.target.value = Formatters.cep(e.target.value));
  });
});

// ==========================================================================
// 9. QUICK VIEW MODAL COMPONENT
// ==========================================================================
function openQuickView(productId) {
  const product = MOCK_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  let modal = document.getElementById("quickview-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "quickview-modal";
    modal.className = "modal-overlay";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card">
      <button class="modal-close-btn" onclick="closeQuickView()">&times;</button>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; padding: 2rem;">
        <div>
          <img id="qv-main-img" src="${product.images[0]}" alt="${product.name}" style="width: 100%; height: 350px; object-fit: cover; border-radius: 4px; background: #000;">
        </div>
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 0.75rem; color: var(--color-accent); font-weight: 700; text-transform: uppercase; margin-bottom: 0.25rem;">${product.categoryName}</div>
            <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem; color: #FFF;">${product.name}</h3>
            <div style="font-size: 1.4rem; font-weight: 800; color: var(--color-accent); margin-bottom: 1rem;">${Formatters.currency(product.price)}</div>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem;">${product.description}</p>
            
            <div style="margin-bottom: 1rem;">
              <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Tamanho:</span>
              <div id="qv-size-group" style="display: flex; gap: 0.5rem; margin-top: 0.4rem;">
                ${product.sizes.map((s, idx) => `
                  <button type="button" class="size-pill ${idx === 0 ? 'active' : ''}" onclick="selectQuickViewSize(this, '${s}')">${s}</button>
                `).join("")}
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
            <button class="btn btn-primary btn-block" onclick="drippCart.addItem(MOCK_PRODUCTS.find(p => p.id === ${product.id}), window.currentQvSize || '${product.sizes[0]}'); closeQuickView();">
              <i class="fa-solid fa-bag-shopping"></i> ADICIONAR
            </button>
            <a href="produto.html?id=${product.id}" class="btn btn-secondary" style="padding: 0.8rem 1rem;">
              DETALHES
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeQuickView();
  });
  window.currentQvSize = product.sizes[0];
}

function selectQuickViewSize(btn, size) {
  document.querySelectorAll("#qv-size-group .size-pill").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  window.currentQvSize = size;
}

function closeQuickView() {
  const modal = document.getElementById("quickview-modal");
  if (modal) modal.classList.remove("active");
}

// Make accessible to window
window.Toast = Toast;
window.drippCart = drippCart;
window.drippAuth = drippAuth;
window.OrderManager = OrderManager;
window.MOCK_PRODUCTS = MOCK_PRODUCTS;
window.Formatters = Formatters;
window.api = api;
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.selectQuickViewSize = selectQuickViewSize;
window.Analytics = Analytics;
