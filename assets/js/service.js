document.addEventListener('DOMContentLoaded', () => {
    // فقط تهيئة الـ sidebar بدون لمس البطاقات
    document.getElementById('sidebar-digital')?.classList.add('hidden');
    document.getElementById('sidebar-apps')?.classList.add('hidden');
    document.getElementById('sidebar-work')?.classList.remove('hidden');
});

function switchServiceTab(tab, clickedBtn) {
    // الأزرار
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    clickedBtn.classList.add('active');
    clickedBtn.setAttribute('aria-selected', 'true');

    // البطاقات
    ['tab-work', 'tab-digital', 'tab-products'].forEach(id => {
        document.getElementById(id)?.classList.add('hidden');
    });
    document.getElementById('tab-' + tab)?.classList.remove('hidden');

    // الفلاتر
    ['sidebar-work', 'sidebar-digital', 'sidebar-apps'].forEach(id => {
        document.getElementById(id)?.classList.add('hidden');
    });
    if (tab === 'work') {
        document.getElementById('sidebar-work')?.classList.remove('hidden');
    } else {
        document.getElementById('sidebar-digital')?.classList.remove('hidden');
        document.getElementById('sidebar-apps')?.classList.remove('hidden');
    }
}

function toggleFilterGroup(fieldset) {
    fieldset?.classList.toggle('collapsed');
}

function clearAllFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[type="radio"]').forEach(rb => rb.checked = false);
}