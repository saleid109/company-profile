// ============================================
// بيانات الخدمات
// ============================================
const services = [
    { 
        id: 1, 
        type: "products", 
        title: "نظام إداري", 
        image: "./public/images/erp-system.jpg", 
        price: 2000, 
        rating: 5 
    },
    { 
        id: 2, 
        type: "products", 
        title: "تطوير المواقع", 
        image: "./public/images/web-dev.png.jpg",  // ← اسم غريب، تأكد منه
        price: 2000, 
        rating: 4 
    },
    { 
        id: 3, 
        type: "products", 
        title: "موقع تجاري", 
        image: "./public/images/ecommerce.jpg", 
        price: 2000, 
        rating: 5 
    },
    { 
        id: 4, 
        type: "work", 
        title: "تأهيل لسوق العمل", 
        image: "./public/images/work-rehab.jpg", 
        price: null, 
        rating: 5 
    },
    { 
        id: 5, 
        type: "digital", 
        title: "تطوير مواقع إلكترونية", 
        image: "./public/images/hero-main.jpg", 
        price: 1500, 
        rating: 5 
    },
];

// ============================================
// إعداد السايدبار لكل تبويب
// ============================================
const sidebarConfig = {
    // تأهيل لسوق العمل — يظهر فقط: الإدارة، التقنية، التصاميم
    work: ["filter-group-work"],

    // خدمة رقمية ومنتجات رقمية — يظهر: الويب، التطبيقات، التسويق، التراخيص، التقييم
    digital: ["filter-group-web", "filter-group-apps", "filter-group-marketing", "filter-group-licenses", "filter-group-rating"],
    products: ["filter-group-web", "filter-group-apps", "filter-group-marketing", "filter-group-licenses", "filter-group-rating"],
};

// ============================================
// DOM
// ============================================
const tabs = document.querySelectorAll(".tab-btn");
const container = document.getElementById("services-container");

// ============================================
// إنشاء بطاقة خدمة
// ============================================
function createCard(service) {
    const isWork = service.type === 'work';
    const hasPrice = !isWork && service.price !== null;

    const stars = [1,2,3,4,5].map(i =>
        `<i class="${i <= service.rating ? 'fas' : 'far'} fa-star"></i>`
    ).join('');

    return `
        <article class="services-card">
            <div class="card-img-wrapper">
                <img src="${service.image}" alt="${service.title}" loading="lazy">
            </div>
            <div class="card-body">
                <div class="card-label">${service.title}</div>

                <div class="card-footer-row">
                    <div class="card-stars">${stars}</div>
                    ${hasPrice ? `
                    <div class="card-price-wrap">
                        <span class="card-price">${service.price}</span>
                        <span class="price-currency">﷼</span>
                    </div>` : ''}
                </div>

                <div class="card-divider"></div>

                <button class="btn-add-cart" type="button">
                    ${isWork ? 'طلب الخدمة' : 'أضف إلى السلة'}
                </button>
                <a href="/service/${service.id}" class="card-details-link">التفاصيل &rsaquo;</a>
            </div>
        </article>`;
}
// ============================================
// عرض الخدمات
// ============================================
function renderServices(type) {
    if (!container) return;
    const filtered = services.filter(s => s.type === type);
    container.innerHTML = filtered.length
        ? filtered.map(createCard).join("")
        : '<div class="no-data">لا توجد خدمات متاحة حالياً.</div>';
}

// ============================================
// تبديل السايدبار حسب التبويب
// ============================================
function updateSidebar(type) {
    // قائمة ثابتة بكل الـ ids — أضمن من querySelectorAll
    const allFilterIds = [
        "filter-group-work",
        "filter-group-web",
        "filter-group-apps",
        "filter-group-marketing",
        "filter-group-licenses",
        "filter-group-rating"
    ];

    // إخفاء الكل أولاً
    allFilterIds.forEach(id => {
        document.getElementById(id)?.classList.add("hidden");
    });

    // إظهار المطلوب فقط
    (sidebarConfig[type] || []).forEach(id => {
        document.getElementById(id)?.classList.remove("hidden");
    });
}

// ============================================
// Accordion — فتح/إغلاق الفلاتر
// ============================================
document.querySelectorAll(".filter-group-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;
        const chevron = btn.querySelector(".chevron");
        content?.classList.toggle("open");
        chevron?.classList.toggle("open");
    });
});

// ============================================
// مسح الكل
// ============================================
document.querySelector(".btn-clear-filters")?.addEventListener("click", () => {
    document.querySelectorAll(".rating-checkbox, .filter-cb")
        .forEach(cb => cb.checked = false);
});

// ============================================
// التبويبات
// ============================================
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => {
            t.classList.remove("active");
            t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        updateSidebar(target);
        renderServices(target);
    });
});

// ============================================
// العرض الأولي — بدون DOMContentLoaded
// ============================================
const activeTab = document.querySelector(".tab-btn.active");
const initialType = activeTab?.dataset.tab || "work";
updateSidebar(initialType);
renderServices(initialType);

