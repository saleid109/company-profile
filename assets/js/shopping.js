/**
 * cart.js – سلة التسوق
 * متوافق مع قارئات الشاشة (ARIA live regions)
 */

'use strict';

/* ─── ثوابت ─── */
const VALID_COUPONS = {
  NUQTA10: 10,   // 10% خصم
  SAVE20:  20,   // 20% خصم
  VIP50:   50,   // 50% خصم
};

/* ─── حالة التطبيق ─── */
let appliedDiscount = 0;   // نسبة الخصم المطبقة

/* ═══════════════════════════════════════
   الإعلان الصوتي للمساعدات (ARIA Live)
═══════════════════════════════════════ */
function announce(message) {
  const region = document.getElementById('liveRegion');
  if (!region) return;
  region.textContent = '';
  // تأخير قصير لإعادة تشغيل القارئ
  requestAnimationFrame(() => { region.textContent = message; });
}

/* ═══════════════════════════════════════
   حساب الإجمالي
═══════════════════════════════════════ */
function recalcTotals() {
  const items = document.querySelectorAll('.cart-item:not(.removing)');
  let subtotal = 0;

  items.forEach(item => {
    const price = parseFloat(item.dataset.price) || 0;
    const qty   = parseInt(item.querySelector('.qty-input')?.value) || 1;
    const itemTotal = price * qty;

    // تحديث سعر البند الفردي
    const totalVal = item.querySelector('.item-total-val');
    if (totalVal) totalVal.textContent = itemTotal.toLocaleString('ar-SA');

    subtotal += itemTotal;
  });

  // الخصم
  const discountAmount = Math.round(subtotal * appliedDiscount / 100);
  const total = subtotal - discountAmount;

  // تحديث الـ DOM
  setText('subtotalVal', subtotal.toLocaleString('ar-SA'));
  setText('totalVal',    total.toLocaleString('ar-SA'));

  // صف الخصم
  const discountRow = document.getElementById('discountRow');
  if (discountRow) {
    if (appliedDiscount > 0) {
      discountRow.hidden = false;
      setText('discountVal', discountAmount.toLocaleString('ar-SA'));
    } else {
      discountRow.hidden = true;
    }
  }

  // تحديث aria-label زر الإتمام
  const checkoutBtn = document.querySelector('.btn-checkout');
  if (checkoutBtn) {
    checkoutBtn.setAttribute('aria-label', `إتمام الطلب، الإجمالي ${total.toLocaleString('ar-SA')} ريال سعودي`);
  }

  // تحديث عداد السلة في الهيدر
  const badge = document.querySelector('.cart-badge');
  if (badge) badge.textContent = items.length;

  // إظهار حالة فارغة
  toggleEmptyState(items.length === 0);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/* ═══════════════════════════════════════
   حالة السلة الفارغة
═══════════════════════════════════════ */
function toggleEmptyState(isEmpty) {
  const empty = document.getElementById('cartEmpty');
  const list  = document.getElementById('cartItemsList');
  const summary = document.querySelector('.order-summary');

  if (empty)   empty.hidden   = !isEmpty;
  if (list)    list.hidden    = isEmpty;
  if (summary) summary.hidden = isEmpty;
}

/* ═══════════════════════════════════════
   تغيير الكمية بالأزرار
═══════════════════════════════════════ */
function changeQty(btn, delta) {
  const item  = btn.closest('.cart-item');
  const input = item.querySelector('.qty-input');
  if (!input) return;

  let val = parseInt(input.value) || 1;
  val = Math.max(1, Math.min(99, val + delta));
  input.value = val;

  updateQtyUI(item, input);

  const title = item.querySelector('.item-title')?.textContent.trim() || 'المنتج';
  announce(`الكمية أصبحت ${val} للمنتج: ${title}`);
}

/* ═══════════════════════════════════════
   تغيير الكمية بالكتابة المباشرة
═══════════════════════════════════════ */
function updateQtyDirect(input) {
  const item = input.closest('.cart-item');
  let val = parseInt(input.value) || 1;
  val = Math.max(1, Math.min(99, val));
  input.value = val;
  updateQtyUI(item, input);
}

function updateQtyUI(item, input) {
  // تفعيل/تعطيل زر الطرح
  const minusBtn = item.querySelector('.qty-minus');
  if (minusBtn) minusBtn.disabled = parseInt(input.value) <= 1;
  recalcTotals();
}

/* ═══════════════════════════════════════
   حذف منتج
═══════════════════════════════════════ */
function removeItem(btn) {
  const item  = btn.closest('.cart-item');
  const title = item.querySelector('.item-title')?.textContent.trim() || 'المنتج';

  // تأكيد
  if (!confirm(`هل تريد حذف "${title}" من السلة؟`)) return;

  // تحريك الإزالة
  item.classList.add('removing');
  announce(`تم حذف ${title} من السلة`);

  item.addEventListener('animationend', () => {
    item.remove();
    recalcTotals();
  }, { once: true });

  // fallback لو الـ animation لم تعمل
  setTimeout(() => {
    if (item.parentNode) {
      item.remove();
      recalcTotals();
    }
  }, 400);
}

/* ═══════════════════════════════════════
   تطبيق كود الخصم
═══════════════════════════════════════ */
function applyCoupon() {
  const input = document.getElementById('couponInput');
  const msg   = document.getElementById('couponMsg');
  if (!input || !msg) return;

  const code = input.value.trim().toUpperCase();

  if (!code) {
    showCouponMsg('يرجى إدخال كود الخصم أولًا.', 'error');
    input.focus();
    return;
  }

  if (VALID_COUPONS[code] !== undefined) {
    appliedDiscount = VALID_COUPONS[code];
    showCouponMsg(`تم تطبيق خصم ${appliedDiscount}% بنجاح! ✓`, 'success');
    input.disabled = true;
    input.setAttribute('aria-invalid', 'false');
    announce(`تم تطبيق كود الخصم، خصم ${appliedDiscount} بالمئة`);
    recalcTotals();
  } else {
    showCouponMsg('كود الخصم غير صحيح. حاول مجددًا.', 'error');
    input.setAttribute('aria-invalid', 'true');
    input.select();
    announce('كود الخصم غير صحيح');
  }
}

function showCouponMsg(text, type) {
  const msg = document.getElementById('couponMsg');
  if (!msg) return;
  msg.textContent = text;
  msg.className   = `coupon-msg ${type}`;
}

/* ═══════════════════════════════════════
   القائمة الجانبية (موبايل / تابلت)
═══════════════════════════════════════ */
function toggleMobileMenu(btn) {
  const menu    = document.getElementById('nav-menu');
  const isOpen  = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
  btn.querySelector('i').className = isOpen ? 'fas fa-times' : 'fas fa-bars';
}

/* ═══════════════════════════════════════
   Enter على حقل الكوبون
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const couponInput = document.getElementById('couponInput');
  if (couponInput) {
    couponInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') applyCoupon();
    });
  }

  // الحساب الأولي
  recalcTotals();

  // إغلاق القائمة عند النقر خارجها
  document.addEventListener('click', e => {
    const nav  = document.querySelector('.main-nav');
    const menu = document.getElementById('nav-menu');
    const btn  = document.querySelector('.mobile-menu-btn');
    if (nav && !nav.contains(e.target) && menu?.classList.contains('open')) {
      menu.classList.remove('open');
      btn?.setAttribute('aria-expanded', 'false');
      if (btn) btn.querySelector('i').className = 'fas fa-bars';
    }
  });

  // Escape لإغلاق القائمة
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const menu = document.getElementById('nav-menu');
      const btn  = document.querySelector('.mobile-menu-btn');
      if (menu?.classList.contains('open')) {
        menu.classList.remove('open');
        btn?.setAttribute('aria-expanded', 'false');
        if (btn) btn.querySelector('i').className = 'fas fa-bars';
        btn?.focus();
      }
    }
  });
});