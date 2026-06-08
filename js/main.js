/* ============================================================
   FANVERSE — main.js  (Shared across all pages)
   ============================================================ */

// ── Navbar scroll effect ──────────────────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── Hamburger mobile menu ─────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

// ── Update cart badge ─────────────────────────────────────
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('fanverse_cart') || '[]');
  const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}
updateCartBadge();

// ── Scroll reveal animation ───────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Toast notification system ─────────────────────────────
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = type === 'success' ? '✅' : '❌';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

window.showToast = showToast;
window.updateCartBadge = updateCartBadge;

// ── Nav search (products page) ────────────────────────────
const navSearchInput = document.querySelector('.nav-search input');
if (navSearchInput) {
  navSearchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.product-card[data-name]').forEach(card => {
      const name = card.dataset.name.toLowerCase();
      card.style.display = name.includes(query) ? '' : 'none';
    });
  });
}

// ── Add to Cart (from product cards) ─────────────────────
function addToCartSimple(name, price, img, meta = '') {
  const cart = JSON.parse(localStorage.getItem('fanverse_cart') || '[]');
  const existing = cart.find(i => i.name === name && i.meta === meta);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ id: Date.now(), name, price, img, meta, qty: 1 });
  }
  localStorage.setItem('fanverse_cart', JSON.stringify(cart));
  updateCartBadge();
  showToast(`${name} added to cart!`);
}
window.addToCartSimple = addToCartSimple;

// ── Auth UI & Logout ─────────────────────────────────────
function updateAuthUI() {
  const saved = JSON.parse(localStorage.getItem('fanverseUser'));
  if (!saved || !saved.fname) return;

  // Check if desktop nav is already initialized
  const desktopName = document.getElementById('nav-desktop-name');
  if (desktopName) {
    desktopName.textContent = `👤 Hi, ${saved.fname}`;

    // Update mobile nav name
    const mobileName = document.getElementById('nav-mobile-name');
    if (mobileName) mobileName.textContent = `👤 Hi, ${saved.fname}`;
    return;
  }

  // Update desktop nav first time
  document.querySelectorAll('.btn-ghost').forEach(btn => {
    if (btn.textContent.includes('Logout')) {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.gap = '12px';
      wrapper.innerHTML = `
                <a id="nav-desktop-name" href="account.html" style="text-decoration:none; font-weight:600; color:var(--purple-light); font-size:0.9rem;">👤 Hi, ${saved.fname}</a>
                <button class="btn btn-ghost btn-sm" onclick="logout()" style="font-size:0.8rem;">Logout</button>
            `;
      btn.parentNode.replaceChild(wrapper, btn);
    }
  });

  // Update mobile nav first time
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    if (a.textContent.includes('Logout')) {
      a.outerHTML = `<a id="nav-mobile-name" href="account.html" style="color:var(--purple-light);">👤 Hi, ${saved.fname}</a><a href="#" onclick="logout()">🚪 Logout</a>`;
    }
  });
}
document.addEventListener('DOMContentLoaded', updateAuthUI);

window.logout = function () {
  localStorage.removeItem('fanverseLoggedIn');
  sessionStorage.removeItem('fanverseLoggedIn');
  window.location.href = 'index.html';
};
