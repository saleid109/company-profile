// ============================================
// بيانات الخدمات
// ============================================
const services = [
    {
        id: 1, type: "products", title: "نظام إداري",
        image: "./public/images/erp-system.jpg",
        detailsUrl: `./details-service/Product details.html?id=1`
,
        price: 2000, rating: 5
    },

    {
        id: 2, type: "products", title: "موقع تعريفي",
        image: "./public/images/web-dev.jpg",
        detailsUrl: `./details-service/Product details.html?id=2`,
        price: 2000, rating: 4
    },

    {
        id: 3, type: "products", title: "موقع تجاري",
        image: "./public/images/ecommerce.jpg",
        detailsUrl: `./details-service/Product details.html?id=3`,
        price: 2000, rating: 5
    },

    {
        id: 4, type: "work", title: "تأهيل لسوق العمل",
        image: "./public/images/work-rehab.jpg",
        detailsUrl: "./details-service/work-details.html",
        price: null, rating: 5
    },

    {
        id: 5, type: "digital", title: "تطوير مواقع إلكترونية",
        image: "./public/images/hero-main.jpg",
        detailsUrl: "./details-service/product-details.html?id=5",
        price: 1500, rating: 5
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

    const stars = [1, 2, 3, 4, 5].map(i =>
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
                        <span class="price-currency"> <svg xmlns="http://www.w3.org/2000/svg" width="19" height="22" viewBox="0 0 19 22" fill="none">
<path d="M11.3787 19.2525L18.2987 17.6942C18.2187 18.5517 18.0089 19.3791 17.6693 20.1762L10.7653 21.7345C10.8364 20.8656 11.0409 20.0383 11.3787 19.2525ZM17.6693 15.4983L10.7653 17.0567V12.3817L8.61067 12.8718V15.4672C8.61067 15.6995 8.55022 15.9111 8.42933 16.1018L7.30667 17.867C7.008 18.3241 6.608 18.6056 6.10667 18.7113L0 20.0968C0.08 19.2374 0.289778 18.4101 0.629333 17.6148L6.45333 16.2945V13.3478L1.01867 14.5747C1.09867 13.7152 1.30756 12.8936 1.64533 12.1097L6.45333 11.0103V1.92667C7.06133 1.14089 7.78044 0.498667 8.61067 0V10.5343L10.7653 10.0413V3.07133C11.3751 2.28744 12.0889 1.64522 12.9067 1.14467V9.5625L18.2987 8.3385C18.2187 9.19795 18.0089 10.0253 17.6693 10.8205L12.9067 11.9028V14.2262L18.2987 13.0163C18.2187 13.8852 18.0089 14.7126 17.6693 15.4983Z" fill="#F1B709"/>
</svg></span>
                    </div>` : ''}
                </div>

                <div class="card-divider"></div>

                <button class="btn-add-cart" type="button">
                    ${isWork ? 'طلب الخدمة' : 'أضف إلى السلة'}
                </button>
                <a href="${service.detailsUrl}" class="card-details-link">التفاصيل &rsaquo;</a>

            </div>
        </article>`;
}
// ============================================
// عرض الخدمات
// ======================<a href="${service.detailsUrl}" class="card-details-link">التفاصيل &rsaquo;</a>======================
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

