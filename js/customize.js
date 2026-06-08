/* ============================================================
   FANVERSE — customize.js  v2
   Features: 10 Anime + 18 TFI stickers, corner-handle resize,
   upload custom image, Front/Back dual canvas, combo pricing
   ============================================================ */

// ── Data ───────────────────────────────────────────────────
const ANIME_STICKERS = [
    { id: '103', name: 'Aizen', src: 'img/Aizen.jpeg' },
    { id: '106', name: 'Chainsaw Man', src: 'img/Chainsaw Man.jpeg' },
    { id: '111', name: 'Gojo Satoru', src: 'img/Gojo Saturo.jpeg' },
    { id: '112', name: 'Goku', src: 'img/Goku.jpeg' },
    { id: '114', name: 'Guts', src: 'img/Guts.jpeg' },
    { id: '118', name: 'Luffy', src: 'img/Luffy.jpeg' },
    { id: '120', name: 'Naruto', src: 'img/Naruto.jpeg' },
    { id: '126', name: 'Sung Jin Woo', src: 'img/Sung Jin woo.jpeg' },
    { id: '128', name: 'Zoro', src: 'img/Zoro.jpeg' },
];

const TFI_STICKERS = [
    { id: '101', name: '1 Nenokkadine', src: 'img/1 Nen okkadine.jpeg' },
    { id: '102', name: 'ASVR', src: 'img/ASVR.jpeg' },
    { id: '104', name: 'Ala Vaikuntha', src: 'img/Ala Vaikuntapuramloo.jpeg' },
    { id: '105', name: 'Atharentiki Daredi', src: 'img/Atharentiki Daredi.jpg' },
    { id: '107', name: 'DJ', src: 'img/DJ.jpeg' },
    { id: '108', name: 'Devara', src: 'img/Devara.jpeg' },
    { id: '109', name: 'Gabbar Singh', src: 'img/Gabbar Singh.jpeg' },
    { id: '110', name: 'Game Changer', src: 'img/Game Changer.jpeg' },
    { id: '113', name: 'Guntur Kaaram', src: 'img/Guntur Kaaram.jpeg' },
    { id: '115', name: 'Jai Lava Kusa', src: 'img/Jai Lava Kusa.jpeg' },
    { id: '116', name: 'Julayi', src: 'img/Julayi.jpeg' },
    { id: '117', name: 'Khaleja', src: 'img/Khaleja.jpeg' },
    { id: '119', name: 'NTR', src: 'img/NTR.jpeg' },
    { id: '121', name: 'OG', src: 'img/OG.jpeg' },
    { id: '122', name: 'Orange', src: 'img/Orange (2).jpeg' },
    { id: '123', name: 'Pawan Kalyan', src: 'img/Pawan Kalyan.jpeg' },
    { id: '124', name: 'RRR', src: 'img/RRR.jpeg' },
    { id: '125', name: 'Ram Charan', src: 'img/Ram charan.jpeg' },
    { id: '127', name: 'Varanasi', src: 'img/Varanasi.jpeg' },
    { id: '129', name: 'Baahubali', src: 'img/bahubali.png' },
    { id: '130', name: 'Rebel Star', src: 'img/rebelstar.png' },
    { id: '131', name: 'Salaar', src: 'img/salaar.png' },
];

const PRODUCTS = {
    tshirt: { front: 'img/base_tshirt.png', back: 'img/base_tshirt_back.png', name: 'T-Shirt', basePrice: 749 },
    hoodie: { front: 'img/base_hoodie.png', back: 'img/base_hoodie_back.png', name: 'Hoodie', basePrice: 1199 },
    sweatshirt: { front: 'img/base_sweatshirt.png', back: 'img/base_sweatshirt_back.png', name: 'Sweatshirt', basePrice: 1099 },
    polo: { front: 'img/base_polo.png', back: 'img/base_polo_back.png', name: 'Polo', basePrice: 849 },
    shirt: { front: 'img/base_halfshirt.png', back: 'img/base_halfshirt_back.png', name: 'Shirt', basePrice: 899 },
};
const COLORS = {
    tshirt: ['#ffffff', '#000000', '#8b5cf6', '#4f46e5', '#3b82f6', '#10b981', '#eab308', '#f97316', '#ef4444'],
    hoodie: ['#ffffff', '#000000', '#8b5cf6', '#4f46e5', '#3b82f6', '#10b981', '#eab308', '#f97316', '#ef4444'],
    sweatshirt: ['#ffffff', '#000000', '#8b5cf6', '#4f46e5', '#3b82f6', '#10b981', '#eab308', '#f97316', '#ef4444'],
    polo: ['#ffffff', '#000000', '#8b5cf6', '#4f46e5', '#3b82f6', '#10b981', '#eab308', '#f97316', '#ef4444'],
    shirt: ['#ffffff', '#000000', '#8b5cf6', '#4f46e5', '#3b82f6', '#10b981', '#eab308', '#f97316', '#ef4444'],
};
const HANDLE_SIZE = 10; // px, corner handle radius

// ── Active canvas tab: 'front' | 'back' ────────────────────
let activeView = 'front';

// ── Per-view state ──────────────────────────────────────────
const viewState = {
    front: {
        loaded: false,
        // Image Sticker
        sticker: null, stickerImg: new Image(), stickerPos: { x: 0, y: 0 }, stickerSize: 150, stickerRot: 0, stickerFlip: false,
        // Text Sticker
        textSticker: null, textImg: new Image(), textPos: { x: 0, y: 0 }, textSize: 150, textRot: 0, textFlip: false,

        activeElement: 'sticker', // 'sticker' or 'textSticker'
        dragging: false, resizing: false, resizeCorner: null
    },
    back: {
        loaded: false,
        sticker: null, stickerImg: new Image(), stickerPos: { x: 0, y: 0 }, stickerSize: 150, stickerRot: 0, stickerFlip: false,
        textSticker: null, textImg: new Image(), textPos: { x: 0, y: 0 }, textSize: 150, textRot: 0, textFlip: false,

        activeElement: 'sticker',
        dragging: false, resizing: false, resizeCorner: null
    }
};

let globalState = { product: 'tshirt', color: '#111111', size: 'M' };

// ── Canvas elements ─────────────────────────────────────────
let canvas, ctx;
const productImg = new Image(); let productLoaded = false;

function getVS() { return viewState[activeView]; }

// ── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('preview-canvas');
    ctx = canvas ? canvas.getContext('2d', { willReadFrequently: true }) : null;

    // Load URL params primarily
    const urlP = new URLSearchParams(window.location.search);
    const pParam = urlP.get('product');
    if (pParam && PRODUCTS[pParam]) {
        globalState.product = pParam;
        globalState.color = COLORS[pParam] ? COLORS[pParam][0] : '#ffffff';
    }

    loadProductImage();
    renderControls();
    renderStickerPanel('anime');
    updateSummary();
    bindCanvasEvents();
});

// ── Product image ───────────────────────────────────────────
function loadProductImage() {
    // Load base images based on product type
    const map = {
        'tshirt': { f: 'img/base_tshirt.png', b: 'img/base_tshirt_back.png' },
        'hoodie': { f: 'img/base_hoodie.png', b: 'img/base_hoodie_back.png' },
        'sweatshirt': { f: 'img/base_sweatshirt.png', b: 'img/base_sweatshirt_back.png' },
        'polo': { f: 'img/base_polo.png', b: 'img/base_polo_back.png' },
        'shirt': { f: 'img/base_halfshirt.png', b: 'img/base_halfshirt_back.png' },
        'pants': { f: 'img/pants_black.png', b: 'img/pants_black.png' }
    };

    const whiteMap = {
        'tshirt': { f: 'img/base_tshirt_white.png', b: 'img/base_tshirt_white_back.png' },
        'hoodie': { f: 'img/base_hoodie_white.png', b: 'img/base_hoodie_white_back.png' },
        'sweatshirt': { f: 'img/base_sweatshirt_white.png', b: 'img/base_sweatshirt_white_back.png' },
        'polo': { f: 'img/base_polo_white.png', b: 'img/base_polo_white_back.png' },
        'shirt': { f: 'img/base_halfshirt_white.png', b: 'img/base_halfshirt_white_back.png' }
    };

    const blackMap = {
        // T-shirt front is jpg, others are png
        'tshirt': { f: 'img/base_tshirt_black.jpg', b: 'img/base_tshirt_black_back.png' },
        'hoodie': { f: 'img/base_hoodie_black.png', b: 'img/base_hoodie_black_back.png' },
        'sweatshirt': { f: 'img/base_sweatshirt_black.png', b: 'img/base_sweatshirt_black_back.png' },
        'polo': { f: 'img/base_polo_black.png', b: 'img/base_polo_black_back.png' },
        'shirt': { f: 'img/base_halfshirt_black.png', b: 'img/base_halfshirt_black_back.png' }
    };

    let src = '';

    if (globalState.product !== 'pants') {
        const c = globalState.color.toLowerCase();
        if (c === '#ffffff' || c === '#fff') {
            src = activeView === 'back' ? whiteMap[globalState.product].b : whiteMap[globalState.product].f;
        } else if (c === '#000000' || c === '#000' || c === '#111111' || c === '#111') {
            src = activeView === 'back' ? blackMap[globalState.product].b : blackMap[globalState.product].f;
        } else {
            src = activeView === 'back' ? map[globalState.product].b : map[globalState.product].f;
        }
    } else {
        const colorMap = {
            '#111111': 'img/pants_black.png',
            '#000000': 'img/pants_black.png',
            '#263238': 'img/Black Jean.webp', // Also Black-ish
            '#1b5e20': 'img/Black Cotton.webp', // Placeholder matching original mapping
            '#1a237e': 'img/Blue Cotton.webp',
            '#880e4f': 'img/White Cotton.jpg', // Placeholder
            '#ffffff': 'img/White Jean.webp',
            '#f57f17': 'img/Biscuit Trouser.webp'
        };
        src = colorMap[globalState.color] || 'img/pants_black.png';
    }

    if (productImg.getAttribute('data-current-src') === src) {
        productLoaded = true;
        drawCanvas();
        return;
    }

    productLoaded = false;
    productImg.onload = () => { productLoaded = true; drawCanvas(); };
    productImg.onerror = () => { productLoaded = true; drawCanvas(); };
    productImg.src = src;
    productImg.setAttribute('data-current-src', src);
}

// ── Sticker & Text image loaders ────────────────────────────
function loadStickerImage(view, src, isText = false) {
    const vs = viewState[view];
    vs.loaded = false;

    const imgObj = isText ? vs.textImg : vs.stickerImg;

    imgObj.onload = () => { vs.loaded = true; if (view === activeView) drawCanvas(); };
    imgObj.onerror = () => { vs.loaded = true; if (view === activeView) drawCanvas(); };
    imgObj.src = src;
}

// ── Draw ────────────────────────────────────────────────────
function drawCanvas(hideHandles = false) {
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Color base
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, W, H);

    // Product image
    if (productLoaded && productImg.complete && productImg.naturalWidth > 0) {
        ctx.save();
        // Calculate aspect ratio to fit the image properly without totally squishing it
        const imgAspect = productImg.width / productImg.height;
        const canvasAspect = W / H;
        let pW = W, pH = H, pX = 0, pY = 0;

        // Let's just draw it center-covered style
        if (imgAspect > canvasAspect) {
            pH = H;
            pW = H * imgAspect;
            pX = -(pW - W) / 2;
        } else {
            pW = W;
            pH = W / imgAspect;
            pY = -(pH - H) / 2;
        }

        // Draw tinted image utilizing CSS filters
        if (['tshirt', 'hoodie', 'sweatshirt', 'polo', 'shirt'].includes(globalState.product)) {
            // Map hex colors to CSS filters to tint the Navy Blue base image
            // Calculate CSS filter dynamically from hex color to tint the Navy Blue base image (Hue ~230)
            let filterStr = 'none';
            const c = globalState.color.toLowerCase();

            // Convert Hex to RGB then to HSL to find hue offset
            const hexToHsl = (hex) => {
                let r = parseInt(hex.slice(1, 3), 16) / 255;
                let g = parseInt(hex.slice(3, 5), 16) / 255;
                let b = parseInt(hex.slice(5, 7), 16) / 255;
                let max = Math.max(r, g, b), min = Math.min(r, g, b);
                let h, s, l = (max + min) / 2;
                if (max === min) h = s = 0; // achromatic
                else {
                    let d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                }
                return [h * 360, s, l];
            };

            const [targetH, targetS, targetL] = hexToHsl(c);

            // Base image is roughly Hue: 230, Sat: 65, Lightness: 30
            const hueRotate = targetH - 230;

            if (c === '#ffffff' || c.toLowerCase() === '#fff') {
                // Now using direct high-quality white image, so no filter needed!
                filterStr = 'none';
            }
            else if (targetS < 0.1 && targetL < 0.2) {
                // Now using direct high-quality black image, so no filter needed!
                filterStr = 'none';
            }
            else if (c === '#1a237e') filterStr = 'none'; // Unaltered navy base
            else filterStr = `hue-rotate(${hueRotate}deg) saturate(${Math.min(targetS * 200 + 100, 300)}%) brightness(${targetL > 0.5 ? 120 : 80}%)`;

            ctx.filter = filterStr;
            ctx.drawImage(productImg, pX, pY, pW, pH);
            ctx.filter = 'none'; // reset filter
        } else {
            // For pants, just draw raw photo
            ctx.drawImage(productImg, pX, pY, pW, pH);
        }

        ctx.restore();
    }

    const vs = viewState[activeView];

    // Draw Image Sticker
    if (vs.loaded && vs.sticker && vs.stickerImg.complete && vs.stickerImg.naturalWidth > 0) {
        ctx.save();
        const cx = vs.stickerPos.x + vs.stickerSize / 2;
        const cy = vs.stickerPos.y + vs.stickerSize / 2;
        ctx.translate(cx, cy);
        ctx.rotate(vs.stickerRot * Math.PI / 180);
        if (vs.stickerFlip) ctx.scale(-1, 1);
        ctx.translate(-cx, -cy);

        // Visibility Enhance: If product color is very dark, add a white drop-shadow/glow to prevent logo invisibility
        const c = globalState.color.toLowerCase();
        const isDark = (c === '#000000' || c === '#111111' || c === '#263238' || c === '#111');
        if (isDark) {
            ctx.shadowColor = 'rgba(255,255,255,0.7)';
            ctx.shadowBlur = 10;
        }

        ctx.drawImage(vs.stickerImg, vs.stickerPos.x, vs.stickerPos.y, vs.stickerSize, vs.stickerSize);
        ctx.shadowBlur = 0; // reset glow after drawing sticker

        if (vs.stickerFlip) {
            // Revert flip so handles draw correctly
            ctx.translate(cx, cy);
            ctx.scale(-1, 1);
            ctx.translate(-cx, -cy);
        }

        if (!hideHandles && vs.activeElement === 'sticker') {
            ctx.strokeStyle = 'rgba(138,43,226,0.85)';
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 3]);
            ctx.strokeRect(vs.stickerPos.x - 2, vs.stickerPos.y - 2, vs.stickerSize + 4, vs.stickerSize + 4);
            drawCornerHandles(vs.stickerPos.x, vs.stickerPos.y, vs.stickerSize);
        }
        ctx.restore();
    }

    // Draw Text Sticker
    if (vs.loaded && vs.textSticker && vs.textImg.complete && vs.textImg.naturalWidth > 0) {
        ctx.save();
        const cx = vs.textPos.x + vs.textSize / 2;
        const cy = vs.textPos.y + vs.textSize / 2;
        ctx.translate(cx, cy);
        ctx.rotate(vs.textRot * Math.PI / 180);
        if (vs.textFlip) ctx.scale(-1, 1);
        ctx.translate(-cx, -cy);

        ctx.drawImage(vs.textImg, vs.textPos.x, vs.textPos.y, vs.textSize, vs.textSize);

        if (vs.textFlip) {
            ctx.translate(cx, cy);
            ctx.scale(-1, 1);
            ctx.translate(-cx, -cy);
        }

        if (!hideHandles && vs.activeElement === 'textSticker') {
            ctx.strokeStyle = 'rgba(138,43,226,0.85)';
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 3]);
            ctx.strokeRect(vs.textPos.x - 2, vs.textPos.y - 2, vs.textSize + 4, vs.textSize + 4);
            drawCornerHandles(vs.textPos.x, vs.textPos.y, vs.textSize);
        }
        ctx.restore();
    }
}

function drawCornerHandles(x, y, sz) {
    const corners = [[x, y], [x + sz, y], [x, y + sz], [x + sz, y + sz]];
    ctx.save();
    ctx.fillStyle = '#8a2be2';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    corners.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, HANDLE_SIZE, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    });
    ctx.restore();
}

// ── Canvas events (drag + corner resize + touch) ────────────
function bindCanvasEvents() {
    if (!canvas) return;

    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('mouseleave', onUp);

    canvas.addEventListener('touchstart', e => { e.preventDefault(); const t = e.touches[0]; onDown({ clientX: t.clientX, clientY: t.clientY }); }, { passive: false });
    canvas.addEventListener('touchmove', e => { e.preventDefault(); const t = e.touches[0]; onMove({ clientX: t.clientX, clientY: t.clientY }); }, { passive: false });
    canvas.addEventListener('touchend', e => { onUp(); });
}

function getCanvasPos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
}

function hitCorner(mx, my, x, y, sz) {
    const corners = [{ cx: x, cy: y, id: 'tl' }, { cx: x + sz, cy: y, id: 'tr' }, { cx: x, cy: y + sz, id: 'bl' }, { cx: x + sz, cy: y + sz, id: 'br' }];
    for (const c of corners) {
        if (Math.hypot(mx - c.cx, my - c.cy) <= HANDLE_SIZE + 4) return c.id;
    }
    return null;
}

function getRotatedPoint(mx, my, rectX, rectY, sz, angleDeg) {
    if (!angleDeg) return { x: mx, y: my };
    const cx = rectX + sz / 2;
    const cy = rectY + sz / 2;
    const angleRad = -angleDeg * Math.PI / 180;
    const dx = mx - cx;
    const dy = my - cy;
    const rx = dx * Math.cos(angleRad) - dy * Math.sin(angleRad);
    const ry = dx * Math.sin(angleRad) + dy * Math.cos(angleRad);
    return { x: rx + cx, y: ry + cy };
}

function onDown(e) {
    const vs = viewState[activeView];
    const { x: mx, y: my } = getCanvasPos(e);

    // Try textSticker
    if (vs.textSticker) {
        let pos = vs.textPos;
        let sz = vs.textSize;
        let rpt = getRotatedPoint(mx, my, pos.x, pos.y, sz, vs.textRot);
        let corner = hitCorner(rpt.x, rpt.y, pos.x, pos.y, sz);
        if (corner || (rpt.x >= pos.x && rpt.x <= pos.x + sz && rpt.y >= pos.y && rpt.y <= pos.y + sz)) {
            vs.activeElement = 'textSticker';
            if (corner) { vs.resizing = true; vs.resizeCorner = corner; vs.dragOffset = { x: rpt.x, y: rpt.y }; canvas.style.cursor = 'nwse-resize'; }
            else { vs.dragging = true; vs.dragOffset = { x: mx - pos.x, y: my - pos.y }; canvas.style.cursor = 'grabbing'; }
            updateSliderForActive(); drawCanvas(); return;
        }
    }

    // Try sticker
    if (vs.sticker) {
        let pos = vs.stickerPos;
        let sz = vs.stickerSize;
        let rpt = getRotatedPoint(mx, my, pos.x, pos.y, sz, vs.stickerRot);
        let corner = hitCorner(rpt.x, rpt.y, pos.x, pos.y, sz);
        if (corner || (rpt.x >= pos.x && rpt.x <= pos.x + sz && rpt.y >= pos.y && rpt.y <= pos.y + sz)) {
            vs.activeElement = 'sticker';
            if (corner) { vs.resizing = true; vs.resizeCorner = corner; vs.dragOffset = { x: rpt.x, y: rpt.y }; canvas.style.cursor = 'nwse-resize'; }
            else { vs.dragging = true; vs.dragOffset = { x: mx - pos.x, y: my - pos.y }; canvas.style.cursor = 'grabbing'; }
            updateSliderForActive(); drawCanvas(); return;
        }
    }
}

function updateSliderForActive() {
    const vs = viewState[activeView];
    const slider = document.getElementById('sticker-size');
    const slVal = document.getElementById('sticker-size-val');
    const rSlider = document.getElementById('sticker-rot');
    const rVal = document.getElementById('sticker-rot-val');

    if (!slider || !vs.activeElement) return;
    const sz = vs.activeElement === 'sticker' ? vs.stickerSize : vs.textSize;
    const rot = vs.activeElement === 'sticker' ? vs.stickerRot : vs.textRot;

    slider.value = sz;
    if (slVal) slVal.textContent = Math.round(sz) + 'px';

    if (rSlider) rSlider.value = rot;
    if (rVal) rVal.textContent = rot + '°';
}

function onMove(e) {
    const vs = viewState[activeView];
    const { x: mx, y: my } = getCanvasPos(e);
    const W = canvas.width, H = canvas.height;

    // We only drag/resize the currently active element
    const elType = vs.activeElement; // 'sticker' or 'textSticker'
    if (!elType) return;

    const posKey = elType === 'sticker' ? 'stickerPos' : 'textPos';
    const szKey = elType === 'sticker' ? 'stickerSize' : 'textSize';
    const rotKey = elType === 'sticker' ? 'stickerRot' : 'textRot';

    const rot = vs[rotKey];
    let sz = vs[szKey];
    let pos = vs[posKey];

    if (vs.resizing) {
        let rpt = getRotatedPoint(mx, my, pos.x, pos.y, sz, rot);
        const dx = rpt.x - vs.dragOffset.x;
        const dy = rpt.y - vs.dragOffset.y;
        vs.dragOffset = { x: rpt.x, y: rpt.y };
        const corner = vs.resizeCorner;
        const minSz = 30;

        if (corner === 'br') { sz = Math.max(minSz, sz + Math.max(dx, dy)); }
        else if (corner === 'tr') { sz = Math.max(minSz, sz + Math.max(dx, -dy)); pos.y -= Math.max(dx, -dy); }
        else if (corner === 'bl') { sz = Math.max(minSz, sz + Math.max(-dx, dy)); pos.x -= Math.max(-dx, dy); }
        else if (corner === 'tl') { const delta = -Math.min(dx, dy); sz = Math.max(minSz, sz + delta); pos.x -= delta; pos.y -= delta; }

        pos.x = Math.max(0, Math.min(W - sz, pos.x));
        pos.y = Math.max(0, Math.min(H - sz, pos.y));
        vs[szKey] = sz;

        updateSliderForActive();
        drawCanvas(); return;
    }

    if (vs.dragging) {
        pos.x = Math.max(0, Math.min(W - sz, mx - vs.dragOffset.x));
        pos.y = Math.max(0, Math.min(H - sz, my - vs.dragOffset.y));
        drawCanvas(); return;
    }

    // Hover cursor target active element primarily, then fallback
    canvas.style.cursor = 'default';
    if (vs[vs.activeElement]) {
        let rpt = getRotatedPoint(mx, my, pos.x, pos.y, sz, rot);
        const c = hitCorner(rpt.x, rpt.y, pos.x, pos.y, sz);
        if (c) {
            canvas.style.cursor = 'nwse-resize';
            return;
        }
        if (rpt.x >= pos.x && rpt.x <= pos.x + sz && rpt.y >= pos.y && rpt.y <= pos.y + sz) {
            canvas.style.cursor = 'grab';
            return;
        }
    }
}

function onUp() {
    const vs = viewState[activeView];
    vs.dragging = vs.resizing = false;
    vs.resizeCorner = null;
    canvas.style.cursor = 'default';
}

// ── Controls ────────────────────────────────────────────────
function renderControls() {
    // Product tabs
    document.querySelectorAll('.prod-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.product === globalState.product);
        btn.onclick = () => { globalState.product = btn.dataset.product; globalState.color = COLORS[globalState.product][0]; renderControls(); loadProductImage(); updateSummary(); };
    });

    // Colors
    const cw = document.getElementById('color-swatches');
    if (cw) {
        cw.innerHTML = COLORS[globalState.product].map(c => `
            <div class="color-swatch ${globalState.color === c ? 'active' : ''}" style="background:${c}; ${c === '#ffffff' ? 'border: 1px solid #ccc;' : ''}" title="${c}" onclick="selectColor('${c}')"></div>
        `).join('');
    }

    // Sizes
    document.querySelectorAll('.size-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.size === globalState.size);
        btn.onclick = () => { globalState.size = btn.dataset.size; renderControls(); updateSummary(); };
    });

    // View tabs
    document.querySelectorAll('.view-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === activeView);
        btn.onclick = () => { activeView = btn.dataset.view; renderControls(); loadProductImage(); drawCanvas(); updateSummary(); };
    });

    const slider = document.getElementById('sticker-size');
    const sliderV = document.getElementById('sticker-size-val');
    const rotSlider = document.getElementById('sticker-rot');
    const rotSliderV = document.getElementById('sticker-rot-val');

    if (slider) {
        const vs = getVS();
        const activeSz = vs.activeElement === 'textSticker' ? vs.textSize : vs.stickerSize;

        slider.value = activeSz || 100;
        if (sliderV) sliderV.textContent = slider.value + 'px';

        slider.oninput = () => {
            const val = parseInt(slider.value);
            if (vs.activeElement === 'textSticker') vs.textSize = val;
            else vs.stickerSize = val;

            if (sliderV) sliderV.textContent = val + 'px';
            drawCanvas();
        };
    }

    if (rotSlider) {
        const vs = getVS();
        const activeRot = vs.activeElement === 'textSticker' ? vs.textRot : vs.stickerRot;

        rotSlider.value = activeRot || 0;
        if (rotSliderV) rotSliderV.textContent = rotSlider.value + '°';

        rotSlider.oninput = () => {
            const val = parseInt(rotSlider.value);
            if (vs.activeElement === 'textSticker') vs.textRot = val;
            else vs.stickerRot = val;

            if (rotSliderV) rotSliderV.textContent = val + '°';
            drawCanvas();
        };
    }
}
function flipActiveItem() {
    const vs = getVS();
    if (vs.activeElement === 'textSticker') vs.textFlip = !vs.textFlip;
    else if (vs.activeElement === 'sticker') vs.stickerFlip = !vs.stickerFlip;
    drawCanvas();
}
window.flipActiveItem = flipActiveItem;
function selectColor(c) { globalState.color = c; renderControls(); loadProductImage(); drawCanvas(); }
window.selectColor = selectColor;

// ── Sticker Panel ───────────────────────────────────────────
let activeStickerTab = 'anime';

function renderStickerPanel(tab) {
    if (tab) activeStickerTab = tab;

    // Tabs
    document.querySelectorAll('.sticker-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === activeStickerTab);
        btn.onclick = () => renderStickerPanel(btn.dataset.tab);
    });

    const stickers = activeStickerTab === 'anime' ? ANIME_STICKERS : activeStickerTab === 'tfi' ? TFI_STICKERS : [];
    const grid = document.getElementById('sticker-grid');
    if (!grid) return;
    grid.innerHTML = stickers.map(s => `
    <div class="sticker-thumb ${getVS().sticker?.id === s.id ? 'selected' : ''}" onclick="selectSticker('${s.id}','${s.src}','${s.name}')">
      <img src="${s.src}" alt="${s.name}" onerror="this.src='img/tshirt_black.png'" />
      <span>${s.name}</span>
    </div>
  `).join('');
}

function selectSticker(id, src, name, isText = false) {
    const vs = getVS();
    if (isText) {
        vs.textSticker = { id, src, name };
        vs.textPos = { x: canvas.width / 2 - vs.textSize / 2, y: canvas.height / 2 - vs.textSize / 2 };
        vs.activeElement = 'textSticker';
        loadStickerImage(activeView, src, true);
    } else {
        vs.sticker = { id, src, name };
        vs.stickerPos = { x: canvas.width / 2 - vs.stickerSize / 2, y: Math.max(20, (canvas.height / 3) - vs.stickerSize / 2) };
        vs.activeElement = 'sticker';
        loadStickerImage(activeView, src, false);
    }

    renderStickerPanel();
    updateSummary();
}
window.selectSticker = selectSticker;

// ── Upload custom sticker ────────────────────────────────────
function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (window.showToast) window.showToast('Scanning image with FanVerse AI...', 'info');

    // Simulate AI Moderation
    const badNames = ['nude', 'naked', 'gore', 'blood', 'weapon', 'gun', 'knife', 'porn', 'sex'];
    const fileName = file.name.toLowerCase();

    setTimeout(() => {
        if (badNames.some(w => fileName.includes(w))) {
            if (window.showToast) window.showToast('Image rejected: Inappropriate content detected.', 'error');
            else alert('Image rejected: Inappropriate content detected.');
            e.target.value = ''; // reset
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            const src = ev.target.result;
            const id = 'custom-' + Date.now();
            selectSticker(id, src, 'Custom');
            // Show custom sticker in grid
            const thumb = document.createElement('div');
            thumb.className = 'sticker-thumb selected';
            thumb.innerHTML = `<img src="${src}" alt="Custom"/><span>Custom</span>`;
            thumb.onclick = () => selectSticker(id, src, 'Custom');
            document.getElementById('sticker-grid').prepend(thumb);
            if (window.showToast) window.showToast('Image approved by AI!', 'success');
        };
        reader.readAsDataURL(file);
    }, 1200);
}
window.handleUpload = handleUpload;

// ── Clear sticker ────────────────────────────────────────────
function clearSticker() {
    const vs = getVS();
    if (vs.activeElement === 'textSticker') {
        vs.textSticker = null;
        vs.textPos = { x: 0, y: 0 };
    } else if (vs.activeElement === 'sticker') {
        vs.sticker = null;
        vs.stickerPos = { x: 0, y: 0 };
    } else {
        vs.textSticker = null;
        vs.sticker = null;
    }
    vs.activeElement = null;
    drawCanvas(); renderStickerPanel(); updateSummary();
}
window.clearSticker = clearSticker;

// ── Remove BG ────────────────────────────────────────────────
function removeStickerBG() {
    const vs = getVS();
    if (!vs.loaded || !vs.sticker || !vs.stickerImg.complete || vs.activeElement !== 'sticker') {
        if (window.showToast) window.showToast('Please select an image sticker first.', 'error');
        return;
    }

    if (window.showToast) window.showToast('Removing background...', 'info');

    setTimeout(() => {
        const c = document.createElement('canvas');
        const imgObj = vs.stickerImg;
        c.width = imgObj.naturalWidth;
        c.height = imgObj.naturalHeight;
        const x = c.getContext('2d', { willReadFrequently: true });
        x.drawImage(imgObj, 0, 0);
        const imgData = x.getImageData(0, 0, c.width, c.height);
        const data = imgData.data;

        // Sample top-left pixel as background color reference
        const bgR = data[0], bgG = data[1], bgB = data[2];
        const threshold = 25;

        // Flood-Fill algorithm to only remove contiguous background pixels
        const visited = new Uint8Array(c.width * c.height);
        const queue = [0]; // start at 0,0
        visited[0] = 1;

        // BFS
        let head = 0;
        while (head < queue.length) {
            const idx = queue[head++];
            const x = idx % c.width;
            const y = Math.floor(idx / c.width);
            const p = (y * c.width + x) * 4;

            // Make it transparent
            data[p + 3] = 0;

            // Check neighbors
            const neighbors = [];
            if (x > 0) neighbors.push(idx - 1);
            if (x < c.width - 1) neighbors.push(idx + 1);
            if (y > 0) neighbors.push(idx - c.width);
            if (y < c.height - 1) neighbors.push(idx + c.width);

            for (let i = 0; i < neighbors.length; i++) {
                const nIdx = neighbors[i];
                if (!visited[nIdx]) {
                    const nP = nIdx * 4;
                    if (Math.abs(data[nP] - bgR) <= threshold &&
                        Math.abs(data[nP + 1] - bgG) <= threshold &&
                        Math.abs(data[nP + 2] - bgB) <= threshold &&
                        data[nP + 3] >= 200) { // skip already transparent pixels
                        visited[nIdx] = 1;
                        queue.push(nIdx);
                    }
                }
            }
        }
        x.putImageData(imgData, 0, 0);

        const newImg = new Image();
        newImg.onload = () => { vs.loaded = true; drawCanvas(); if (window.showToast) window.showToast('Background removed!', 'success'); };
        newImg.src = c.toDataURL('image/png');
        vs.stickerImg = newImg;
    }, 100);
}
window.removeStickerBG = removeStickerBG;

// ── Custom Text as Sticker ───────────────────────────────────
function addCustomText() {
    const textObj = document.getElementById('custom-text-input');
    const text = textObj ? textObj.value.trim() : '';
    if (!text) return;

    const BAD_WORDS = ['fuck', 'shit', 'bitch', 'asshole', 'cunt', 'dick', 'pussy', 'whore', 'slut', 'bastard'];
    const lowerText = text.toLowerCase();
    if (BAD_WORDS.some(word => lowerText.includes(word))) {
        if (window.showToast) window.showToast('Please avoid using vulgar or prohibited words.', 'error');
        else alert('Please avoid using vulgar or prohibited words.');
        return;
    }

    const color = document.getElementById('custom-text-color') ? document.getElementById('custom-text-color').value : '#ffffff';
    const font = document.getElementById('custom-text-font') ? document.getElementById('custom-text-font').value : 'Impact';

    const tcanvas = document.createElement('canvas');
    const tctx = tcanvas.getContext('2d');

    const fontStr = `bold 140px "${font}", sans-serif`;
    tctx.font = fontStr;
    const metrics = tctx.measureText(text);
    tcanvas.width = Math.max(200, Math.floor(metrics.width) + 80);
    tcanvas.height = 240;

    tctx.font = fontStr;
    tctx.fillStyle = color;
    tctx.textAlign = 'center';
    tctx.textBaseline = 'middle';

    tctx.shadowColor = 'rgba(0,0,0,0.5)';
    tctx.shadowBlur = 6;
    tctx.shadowOffsetY = 4;

    tctx.fillText(text, tcanvas.width / 2, tcanvas.height / 2);

    const src = tcanvas.toDataURL('image/png');
    const id = 'text-' + Date.now();
    selectSticker(id, src, `Text: ${text.substring(0, 8)}`, true);

    const thumb = document.createElement('div');
    thumb.className = 'sticker-thumb selected';
    thumb.innerHTML = `<img src="${src}" alt="Text"/><span>Text</span>`;
    thumb.onclick = () => selectSticker(id, src, `Text: ${text.substring(0, 8)}`, true);
    const grid = document.getElementById('sticker-grid');
    if (grid) grid.prepend(thumb);

    textObj.value = '';
}
window.addCustomText = addCustomText;

// ── Summary panel ────────────────────────────────────────────
function updateSummary() {
    const prod = PRODUCTS[globalState.product];
    const frontS = viewState.front.sticker;
    const frontT = viewState.front.textSticker;
    const backS = viewState.back.sticker;
    const backT = viewState.back.textSticker;

    const bothStickers = frontS && backS;
    const anySticker = frontS || backS;
    const hasText = frontT || backT;

    let stickerCost = 0;
    if (bothStickers) stickerCost = 299;
    else if (anySticker) stickerCost = 199;

    let base = prod.basePrice + stickerCost;
    let price = base + (hasText ? 150 : 0);

    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('sum-product', prod.name);
    set('sum-color', globalState.color);
    set('sum-size', globalState.size);
    const fStr = [frontS?.name, frontT?.name].filter(Boolean).join(' + ') || 'None';
    const bStr = [backS?.name, backT?.name].filter(Boolean).join(' + ') || 'None';
    set('sum-front', fStr);
    set('sum-back', bStr);
    set('sum-price', `₹${price.toLocaleString('en-IN')}`);

    if (bothStickers) {
        const mrpEl = document.getElementById('sum-mrp');
        if (mrpEl) { mrpEl.style.display = 'inline'; mrpEl.textContent = '₹' + (base + 200).toLocaleString('en-IN'); }
    } else {
        const mrpEl = document.getElementById('sum-mrp');
        if (mrpEl) mrpEl.style.display = 'none';
    }
}

// ── Add to Cart ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('add-to-cart-btn');

    async function finalizeCustomization(targetPage) {
            const prod = PRODUCTS[globalState.product];
            const frontS = viewState.front.sticker;
            const frontT = viewState.front.textSticker;
            const backS = viewState.back.sticker;
            const backT = viewState.back.textSticker;

            const bothStickers = frontS && backS;
            const anySticker = frontS || backS;
            const hasText = frontT || backT;

            let stickerCost = 0;
            if (bothStickers) stickerCost = 299;
            else if (anySticker) stickerCost = 199;

            let base = prod.basePrice + stickerCost;
            let price = base + (hasText ? 150 : 0);

            const fStr = [frontS?.name, frontT?.name].filter(Boolean).join(' + ') || 'None';
            const bStr = [backS?.name, backT?.name].filter(Boolean).join(' + ') || 'None';

            // Capture both sides by explicitly drawing the front then back synchronously
            const originalView = activeView;

            const captureSide = (viewStr, bgSrc) => {
                return new Promise(resolve => {
                    activeView = viewStr;
                    productImg.onload = () => {
                        drawCanvas(true);
                        resolve(canvas ? canvas.toDataURL('image/jpeg', 0.6) : bgSrc);
                    };
                    productImg.onerror = () => {
                        drawCanvas(true);
                        resolve(canvas ? canvas.toDataURL('image/jpeg', 0.6) : bgSrc);
                    };
                    productImg.src = bgSrc;
                });
            };

            if (window.showToast) window.showToast('Generating Preview...', 'info');

            const getSrc = (viewStr) => {
                const map = { 'tshirt': { f: 'img/base_tshirt.png', b: 'img/base_tshirt_back.png' }, 'hoodie': { f: 'img/base_hoodie.png', b: 'img/base_hoodie_back.png' }, 'sweatshirt': { f: 'img/base_sweatshirt.png', b: 'img/base_sweatshirt_back.png' }, 'polo': { f: 'img/base_polo.png', b: 'img/base_polo_back.png' }, 'shirt': { f: 'img/base_halfshirt.png', b: 'img/base_halfshirt_back.png' } };
                const whiteMap = { 'tshirt': { f: 'img/base_tshirt_white.png', b: 'img/base_tshirt_white_back.png' }, 'hoodie': { f: 'img/base_hoodie_white.png', b: 'img/base_hoodie_white_back.png' }, 'sweatshirt': { f: 'img/base_sweatshirt_white.png', b: 'img/base_sweatshirt_white_back.png' }, 'polo': { f: 'img/base_polo_white.png', b: 'img/base_polo_white_back.png' }, 'shirt': { f: 'img/base_halfshirt_white.png', b: 'img/base_halfshirt_white_back.png' } };
                const blackMap = { 'tshirt': { f: 'img/base_tshirt_black.jpg', b: 'img/base_tshirt_black_back.png' }, 'hoodie': { f: 'img/base_hoodie_black.png', b: 'img/base_hoodie_black_back.png' }, 'sweatshirt': { f: 'img/base_sweatshirt_black.png', b: 'img/base_sweatshirt_black_back.png' }, 'polo': { f: 'img/base_polo_black.png', b: 'img/base_polo_black_back.png' }, 'shirt': { f: 'img/base_halfshirt_black.png', b: 'img/base_halfshirt_black_back.png' } };
                if (globalState.product === 'pants') {
                    const colorMap = { '#111111': 'img/pants_black.png', '#000000': 'img/pants_black.png', '#263238': 'img/Black Jean.webp', '#1b5e20': 'img/Black Cotton.webp', '#1a237e': 'img/Blue Cotton.webp', '#880e4f': 'img/White Cotton.jpg', '#ffffff': 'img/White Jean.webp', '#f57f17': 'img/Biscuit Trouser.webp' };
                    return colorMap[globalState.color] || 'img/pants_black.png';
                }
                const c = globalState.color.toLowerCase();
                if (c === '#ffffff' || c === '#fff') return viewStr === 'back' ? whiteMap[globalState.product].b : whiteMap[globalState.product].f;
                if (c === '#000000' || c === '#000' || c === '#111111' || c === '#111') return viewStr === 'back' ? blackMap[globalState.product].b : blackMap[globalState.product].f;
                return viewStr === 'back' ? map[globalState.product].b : map[globalState.product].f;
            };

            const thumbFront = await captureSide('front', getSrc('front'));
            const thumbBack = await captureSide('back', getSrc('back'));

            activeView = originalView;
            loadProductImage(); // Restore properly

            const customState = {
                global: globalState,
                frontS: frontS ? { ...frontS, pos: viewState.front.stickerPos, size: viewState.front.stickerSize, rot: viewState.front.stickerRot, flip: viewState.front.stickerFlip } : null,
                frontT: frontT ? { ...frontT, pos: viewState.front.textPos, size: viewState.front.textSize, rot: viewState.front.textRot, flip: viewState.front.textFlip } : null,
                backS: backS ? { ...backS, pos: viewState.back.stickerPos, size: viewState.back.stickerSize, rot: viewState.back.stickerRot, flip: viewState.back.stickerFlip } : null,
                backT: backT ? { ...backT, pos: viewState.back.textPos, size: viewState.back.textSize, rot: viewState.back.textRot, flip: viewState.back.textFlip } : null,
            };

            const urlParams = new URLSearchParams(window.location.search);
            const editId = urlParams.get('edit');

            let isRainbowDeal = false;
            let rainbowColorName = '';
            let savedName = `Custom ${prod.name}`;

            if (editId) {
                const cart = JSON.parse(localStorage.getItem('fanverse_cart') || '[]');
                let existing = cart.find(i => i.id == editId);
                if (!existing) {
                    const pending = JSON.parse(localStorage.getItem('pending_customization'));
                    if (pending && pending.id == editId) existing = pending;
                }
                if (existing && existing.isRainbowDeal) {
                    isRainbowDeal = true;
                    rainbowColorName = existing.rainbowColorName;
                    savedName = existing.name;
                }
            }

            const finalColorStr = isRainbowDeal ? rainbowColorName : globalState.color;
            const meta = `${globalState.size} · ${finalColorStr} · Front:${fStr} · Back:${bStr}`;

            const pendingItem = {
                id: editId ? parseInt(editId) : Date.now(),
                name: savedName,
                price,
                imgFront: thumbFront,
                imgBack: thumbBack,
                img: thumbFront, // fallback
                meta,
                qty: 1,
                customState,
                isCustom: true,
                isRainbowDeal,
                rainbowColorName
            };

            localStorage.setItem('pending_customization', JSON.stringify(pendingItem));

            if (window.showToast) showToast('Redirecting...', 'success');
            setTimeout(() => window.location.href = targetPage + (editId ? '?edit=true' : ''), 400);
    }

    if (btn) btn.addEventListener('click', () => finalizeCustomization('final-preview.html'));

    // Load edit state if ?edit=id exists
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    if (editId) {
        const cart = JSON.parse(localStorage.getItem('fanverse_cart') || '[]');
        let item = cart.find(i => i.id == editId);
        if (!item) {
            const pending = JSON.parse(localStorage.getItem('pending_customization'));
            if (pending && pending.id == editId) item = pending;
        }
        if (item && item.customState) {
            globalState = item.customState.global;
            renderControls();

            setTimeout(() => {
                const cState = item.customState;
                if (cState.frontS) {
                    activeView = 'front';
                    selectSticker(cState.frontS.id, cState.frontS.src, cState.frontS.name, false);
                    viewState.front.stickerPos = cState.frontS.pos;
                    viewState.front.stickerSize = cState.frontS.size;
                    viewState.front.stickerRot = cState.frontS.rot || 0;
                    viewState.front.stickerFlip = cState.frontS.flip || false;
                }
                if (cState.frontT) {
                    activeView = 'front';
                    selectSticker(cState.frontT.id, cState.frontT.src, cState.frontT.name, true);
                    viewState.front.textPos = cState.frontT.pos;
                    viewState.front.textSize = cState.frontT.size;
                    viewState.front.textRot = cState.frontT.rot || 0;
                    viewState.front.textFlip = cState.frontT.flip || false;
                }
                if (cState.backS) {
                    activeView = 'back';
                    selectSticker(cState.backS.id, cState.backS.src, cState.backS.name, false);
                    viewState.back.stickerPos = cState.backS.pos;
                    viewState.back.stickerSize = cState.backS.size;
                    viewState.back.stickerRot = cState.backS.rot || 0;
                    viewState.back.stickerFlip = cState.backS.flip || false;
                }
                if (cState.backT) {
                    activeView = 'back';
                    selectSticker(cState.backT.id, cState.backT.src, cState.backT.name, true);
                    viewState.back.textPos = cState.backT.pos;
                    viewState.back.textSize = cState.backT.size;
                    viewState.back.textRot = cState.backT.rot || 0;
                    viewState.back.textFlip = cState.backT.flip || false;
                }
                activeView = 'front'; // return to front
                renderControls();
                drawCanvas();
                updateSummary();
            }, 300);
        }
    }
});
