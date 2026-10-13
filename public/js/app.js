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
