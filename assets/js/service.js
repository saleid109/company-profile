/**
 * تبديل التبويبات في قسم الخدمات
 */
function switchServiceTab(tab, clickedBtn) {
    // 1. إزالة active من كل الأزرار
    document.querySelectorAll('.tabs-row .tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    clickedBtn.classList.add('active');
    clickedBtn.setAttribute('aria-selected', 'true');

    // 2. إخفاء كل التبويبات وإظهار المستهدف
    ['tab-work', 'tab-digital', 'tab-products'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    const targetGrid = document.getElementById('tab-' + tab);
    if (targetGrid) {
        targetGrid.classList.remove('hidden');
    }

    // 3. إدارة الفلاتر الجانبية
    ['sidebar-work', 'sidebar-digital', 'sidebar-apps'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    if (tab === 'work') {
        document.getElementById('sidebar-work')?.classList.remove('hidden');
    } else {
        document.getElementById('sidebar-digital')?.classList.remove('hidden');
        document.getElementById('sidebar-apps')?.classList.remove('hidden');
    }
}

/**
 * تبديل حالة مجموعة الفلتر (فتح/إغلاق)
 */
function toggleFilterGroup(fieldset) {
    if (fieldset) fieldset.classList.toggle('collapsed');
}

/**
 * مسح جميع الفلاتر
 */
function clearAllFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[type="radio"]').forEach(rb => rb.checked = false);
}

/**
 * تهيئة الصفحة عند التحميل
 */
document.addEventListener('DOMContentLoaded', () => {
    const firstBtn = document.getElementById('btn-work');
    if (firstBtn) switchServiceTab('work', firstBtn);
});