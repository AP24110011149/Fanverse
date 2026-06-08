/* ============================================================
   FANVERSE — cart.js
   ============================================================ */

const CART_KEY = 'fanverse_cart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  if (window.updateCartBadge) updateCartBadge();
}

function renderCart() {
  const cart = getCart();
  const listEl = document.getElementById('cart-list');
  const emptyEl = document.getElementById('cart-empty');
  if (!listEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    renderSummary(cart);
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';

  listEl.innerHTML = cart.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <img class="cart-thumb" src="${item.img || 'img/tshirt_black.png'}" alt="${item.name}" onerror="this.src='img/tshirt_black.png'" style="cursor:pointer;" onclick="window.location.href='customize.html?edit=${item.id}'" title="Click to Customize">
      <div class="cart-details">
        <div class="cart-item-name" style="cursor:pointer; color:var(--purple-light);" onclick="window.location.href='customize.html?edit=${item.id}'" title="Click to Customize">${item.name} <span style="font-size:0.7rem; color:#888;">(✎ Customize)</span></div>
        <div class="cart-item-meta">${item.meta || ''}</div>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num" id="qty-${item.id}">${item.qty || 1}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <div class="cart-price">₹${((item.price || 0) * (item.qty || 1)).toLocaleString('en-IN')}</div>
      <button class="remove-btn" onclick="removeItem(${item.id})" title="Remove">✕</button>
    </div>
  `).join('');

  renderSummary(cart);
}

function renderSummary(cart) {
  const subtotal = cart.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0);
  const gst = 0; // Removed GST
  const shipping = 0; // Completely free delivery

  let promo = 0;
  const msgEl = document.getElementById('promo-msg');
  if (window.appliedPromoCode === 'FAN10') {
    const now = new Date();
    const isFirstWeek = now.getDate() <= 7 || (now.getDate() === 30 && now.getMonth() === 2);

    if (isFirstWeek) {
      const discountRate = 0.10; // 10% discount
      const day = now.getDay();
      const dayColors = {
        1: ['violet'], 2: ['indigo'], 3: ['blue'], 4: ['green'],
        5: ['yellow'], 6: ['orange', 'black'], 0: ['red', 'white']
      };
      const validColors = dayColors[day] || [];

      cart.forEach(item => {
        const nameLower = (item.name || '').toLowerCase();
        const metaLower = (item.meta || '').toLowerCase();
        if (nameLower.includes('shirt') || nameLower.includes('hoodie')) {
          if (validColors.some(c => metaLower.includes(c) || nameLower.includes(c))) {
            promo += (item.price || 0) * (item.qty || 1) * discountRate;
          }
        }
      });

      if (msgEl) {
        if (promo > 0) {
          msgEl.textContent = "FAN10 applied! 10% off on today's matching VIBGYOR deals (1st Week Special).";
          msgEl.style.color = '#22c55e';
        } else {
          msgEl.textContent = 'Promo applied, but no matching daily deal items found in cart.';
          msgEl.style.color = '#f59e0b';
        }
      }
    } else {
      if (msgEl) {
        msgEl.textContent = 'The Rainbow Deal is only available during the first week of the month.';
        msgEl.style.color = '#ef4444';
      }
    }
  } else if (window.appliedPromoCode === 'FAN20') {
    const hasUsedFan20 = localStorage.getItem('hasUsedFan20');
    if (!hasUsedFan20) {
      promo = subtotal * 0.20;
      if (msgEl) {
        msgEl.textContent = "FAN20 applied! 20% off one-time discount.";
        msgEl.style.color = '#22c55e';
      }
    } else {
      promo = 0;
      if (msgEl) {
        msgEl.textContent = 'You have already used the FAN20 promo code.';
        msgEl.style.color = '#ef4444';
      }
    }
  }

  // Make sure promo doesn't exceed subtotal
  if (promo > subtotal) promo = subtotal;

  const total = subtotal + gst + shipping - promo;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('summary-subtotal', `₹${subtotal.toLocaleString('en-IN')}`);
  set('summary-gst', `₹${gst.toLocaleString('en-IN')}`);
  set('summary-shipping', 'FREE');

  const promoRow = document.getElementById('promo-row');
  if (promo > 0) {
    if (promoRow) promoRow.style.display = 'flex';
    set('summary-promo', `-₹${Math.round(promo).toLocaleString('en-IN')}`);
  } else {
    if (promoRow) promoRow.style.display = 'none';
  }

  set('summary-total', `₹${Math.round(total).toLocaleString('en-IN')}`);

  // Persist totals for checkout page
  localStorage.setItem('fanverse_checkout', JSON.stringify({ subtotal, gst, shipping, total, promo, appliedPromoCode: window.appliedPromoCode }));
}

window.appliedPromoCode = '';
window.applyPromo = function () {
  const codeInput = document.getElementById('promo-code');
  const msgEl = document.getElementById('promo-msg');
  if (!codeInput || !msgEl) return;

  const code = codeInput.value.trim().toUpperCase();

  if (code === 'FAN20') {
    if (localStorage.getItem('hasUsedFan20')) {
      msgEl.textContent = 'You have already used the FAN20 promo code.';
      msgEl.style.color = '#ef4444';
      window.appliedPromoCode = '';
      renderSummary(getCart());
      return;
    }
  } else if (code !== 'FAN10') {
    msgEl.textContent = 'Invalid promo code.';
    msgEl.style.color = '#ef4444';
    window.appliedPromoCode = '';
    renderSummary(getCart());
    return;
  }

  window.appliedPromoCode = code;
  renderSummary(getCart());
};

function changeQty(id, delta) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx === -1) return;
  const newQty = (cart[idx].qty || 1) + delta;
  if (newQty <= 0) {
    removeItem(id);
    return;
  }
  cart[idx].qty = newQty;
  saveCart(cart);
  renderCart();
}

function removeItem(id) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
  if (window.showToast) showToast('Item removed from cart', 'error');
}

window.changeQty = changeQty;
window.removeItem = removeItem;

// Auto-render on DOMContentLoaded
document.addEventListener('DOMContentLoaded', renderCart);
