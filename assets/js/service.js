/**
 * وظيفة تبديل التبويبات في قسم الخدمات
 * محدثة لتتوافق مع الهيكل المطور (Sticky Sidebar)
 */
function switchServiceTab(tab, clickedBtn) {
    // 1. تحديث حالة أزرار التبويبات (إضافة الكلاس النشط)
    document.querySelectorAll('.tabs-row .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    clickedBtn.classList.add('active');

    // 2. إدارة حاويات المحتوى (إخفاء الكل ثم إظهار المستهدف)
    const serviceGrids = ['tab-work', 'tab-digital', 'tab-products'];
    serviceGrids.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('hidden');
        }
    });

    const targetGrid = document.getElementById('tab-' + tab);
    if (targetGrid) {
        targetGrid.classList.remove('hidden');
        // تحسين: إعادة التمرير للأعلى قليلاً عند التبديل لضمان رؤية البطاقات من البداية
        window.scrollTo({
            top: targetGrid.closest('.services-section').offsetTop - 100,
            behavior: 'smooth'
        });
    }

    // 3. إدارة الفلاتر الجانبية (Sidebar)
    const sidebarWork = document.getElementById('sidebar-work');
    const sidebarDigital = document.getElementById('sidebar-digital');

    if (sidebarWork) sidebarWork.classList.add('hidden');
    if (sidebarDigital) sidebarDigital.classList.add('hidden');

    // ملاحظة: خدمة رقمية ومنتجات رقمية يتشاركان نفس الفلاتر كما في التصميم
    if (tab === 'work') {
        if (sidebarWork) sidebarWork.classList.remove('hidden');
    } else {
        if (sidebarDigital) sidebarDigital.classList.remove('hidden');
    }
}

//**
 * وظيفة تبديل التبويبات في قسم الخدمات
 * محدثة لتتوافق مع الهيكل المطور (Sticky Sidebar)
 */
function switchServiceTab(tab, clickedBtn) {
    // 1. تحديث حالة أزرار التبويبات (إضافة الكلاس النشط)
    document.querySelectorAll('.tabs-row .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    clickedBtn.classList.add('active');

    // 2. إدارة حاويات المحتوى (إخفاء الكل ثم إظهار المستهدف)
    const serviceGrids = ['tab-work', 'tab-digital', 'tab-products'];
    serviceGrids.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('hidden');
        }
    });

    const targetGrid = document.getElementById('tab-' + tab);
    if (targetGrid) {
        targetGrid.classList.remove('hidden');
        // تحسين: إعادة التمرير للأعلى قليلاً عند التبديل لضمان رؤية البطاقات من البداية
        window.scrollTo({
            top: targetGrid.closest('.services-section').offsetTop - 100,
            behavior: 'smooth'
        });
    }

    // 3. إدارة الفلاتر الجانبية (Sidebar)
    const sidebarWork = document.getElementById('sidebar-work');
    const sidebarDigital = document.getElementById('sidebar-digital');

    if (sidebarWork) sidebarWork.classList.add('hidden');
    if (sidebarDigital) sidebarDigital.classList.add('hidden');

    // ملاحظة: خدمة رقمية ومنتجات رقمية يتشاركان نفس الفلاتر كما في التصميم
    if (tab === 'work') {
        if (sidebarWork) sidebarWork.classList.remove('hidden');
    } else {
        if (sidebarDigital) sidebarDigital.classList.remove('hidden');
    }
}

/**
 * وظيفة تبديل حالة الفلتر (علامة الصح)
 */
function toggleFilter(el) {
    el.classList.toggle('active');
    const check = el.querySelector('.filter-check');
    if (check) {
        check.textContent = el.classList.contains('active') ? '✓' : '';
    }
}

