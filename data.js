// ========================
// PRODUCT DATA
// ========================
const PRODUCTS = [
  {
    id: 1, name: "APEX RUNNER", category: "footwear",
    price: 2999, origPrice: 3999,
    emoji: "👟", badge: "sale",
    rating: 4.8, reviews: 312,
    desc: "Lightweight mesh upper with responsive foam sole. Engineered for speed.",
    tags: ["running", "sports", "men"]
  },
  {
    id: 2, name: "ONYX HOODIE", category: "clothing",
    price: 1899, origPrice: null,
    emoji: "🖤", badge: "new",
    rating: 4.6, reviews: 187,
    desc: "400gsm heavyweight cotton fleece. Oversized cut. Washed black.",
    tags: ["casual", "unisex", "winter"]
  },
  {
    id: 3, name: "STEEL WATCH", category: "accessories",
    price: 8499, origPrice: 9999,
    emoji: "⌚", badge: "sale",
    rating: 4.9, reviews: 94,
    desc: "Brushed 316L stainless steel case. Sapphire crystal. 50m water-resistant.",
    tags: ["luxury", "men", "gifts"]
  },
  {
    id: 4, name: "CARGO PANT", category: "clothing",
    price: 2299, origPrice: null,
    emoji: "👖", badge: null,
    rating: 4.4, reviews: 256,
    desc: "6-pocket ripstop cargo pants. Adjustable waistband. Relaxed tapered fit.",
    tags: ["streetwear", "unisex"]
  },
  {
    id: 5, name: "MATTE SHADES", category: "accessories",
    price: 1499, origPrice: 1999,
    emoji: "🕶️", badge: "sale",
    rating: 4.7, reviews: 431,
    desc: "Polarized UV400 lenses. Matte black acetate frame. Feather-light.",
    tags: ["summer", "unisex"]
  },
  {
    id: 6, name: "CANVAS TOTE", category: "bags",
    price: 799, origPrice: null,
    emoji: "🎒", badge: "new",
    rating: 4.5, reviews: 178,
    desc: "12oz waxed canvas. Leather base reinforcement. Fits 15\" laptop.",
    tags: ["everyday", "unisex"]
  },
  {
    id: 7, name: "CREW SOCKS 3P", category: "accessories",
    price: 399, origPrice: 599,
    emoji: "🧦", badge: "sale",
    rating: 4.3, reviews: 642,
    desc: "Ribbed combed cotton crew socks. Pack of 3. Anti-odor finish.",
    tags: ["basics", "unisex"]
  },
  {
    id: 8, name: "FIELD JACKET", category: "clothing",
    price: 4999, origPrice: null,
    emoji: "🧥", badge: null,
    rating: 4.8, reviews: 89,
    desc: "Military-inspired field jacket. YKK zips. Chest and cargo pockets.",
    tags: ["outerwear", "unisex", "winter"]
  },
  {
    id: 9, name: "LEATHER BELT", category: "accessories",
    price: 1299, origPrice: 1699,
    emoji: "👔", badge: null,
    rating: 4.6, reviews: 203,
    desc: "Full-grain vegetable-tanned leather. Solid brass roller buckle.",
    tags: ["formal", "men"]
  },
  {
    id: 10, name: "SLIP-ON LOAFER", category: "footwear",
    price: 3499, origPrice: null,
    emoji: "👞", badge: "new",
    rating: 4.7, reviews: 145,
    desc: "Suede upper. Crepe rubber sole. Hand-stitched moccasin construction.",
    tags: ["smart-casual", "men"]
  },
  {
    id: 11, name: "WEEKEND BAG", category: "bags",
    price: 5999, origPrice: 7499,
    emoji: "🧳", badge: "sale",
    rating: 4.9, reviews: 67,
    desc: "20\" holdall. Full-grain leather handles. Shoulder strap included.",
    tags: ["travel", "unisex"]
  },
  {
    id: 12, name: "GRAPHIC TEE", category: "clothing",
    price: 899, origPrice: null,
    emoji: "👕", badge: null,
    rating: 4.2, reviews: 389,
    desc: "180gsm cotton. Water-based screen print. Preshrunk. Relaxed fit.",
    tags: ["casual", "unisex"]
  }
];

// Cart stored in localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('kartify-cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('kartify-cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
  });
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  saveCart(cart);
  showToast(`${product.emoji} ${product.name} added to cart`);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
}

function updateQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart(cart);
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function formatPrice(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function generateOrderId() {
  return 'KRT-' + Math.random().toString(36).substr(2, 8).toUpperCase();
}

// Toast notifications
function showToast(msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✓</span> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Render navbar (shared)
function renderNavbar(activePage) {
  const cart = getCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  return `
  <nav class="navbar">
    <a href="index.html" class="nav-logo">KARTI<span>FY</span></a>
    <div class="nav-links">
      <a href="index.html" class="nav-link ${activePage === 'shop' ? 'active' : ''}">Shop</a>
      <a href="index.html#new" class="nav-link">New In</a>
      <a href="index.html#sale" class="nav-link">Sale</a>
      <a href="cart.html" class="nav-cart-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.97-1.61L23 6H6"/></svg>
        Cart
        <span class="cart-badge cart-count">${count}</span>
      </a>
    </div>
  </nav>`;
}

function renderFooter() {
  return `
  <footer>
    <div class="footer">
      <div>
        <div class="footer-brand">KARTIFY</div>
        <p class="footer-sub">Bold fashion for bold people. No compromises, no nonsense.</p>
      </div>
      <div>
        <div class="footer-heading">Shop</div>
        <div class="footer-links">
          <a href="index.html" class="footer-link">All Products</a>
          <a href="#" class="footer-link">Clothing</a>
          <a href="#" class="footer-link">Footwear</a>
          <a href="#" class="footer-link">Accessories</a>
        </div>
      </div>
      <div>
        <div class="footer-heading">Help</div>
        <div class="footer-links">
          <a href="#" class="footer-link">Size Guide</a>
          <a href="#" class="footer-link">Returns</a>
          <a href="#" class="footer-link">Track Order</a>
          <a href="#" class="footer-link">Contact</a>
        </div>
      </div>
      <div>
        <div class="footer-heading">Legal</div>
        <div class="footer-links">
          <a href="#" class="footer-link">Privacy Policy</a>
          <a href="#" class="footer-link">Terms of Service</a>
          <a href="#" class="footer-link">Cookie Policy</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-bottom-text">© 2025 KARTIFY. ALL RIGHTS RESERVED.</span>
      <span class="footer-bottom-text">MADE WITH ⚡ IN INDIA</span>
    </div>
  </footer>`;
}
