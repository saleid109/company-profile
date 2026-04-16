// بيانات الخدمات (  يمكن استبدالها ببيانات حقيقية من API في المستقبل)
const services = [
    {
        id: 1,
        type: "products",
        title: "نظام إداري",
        image: "./public/images/logo-nuqta.svg",
        category: "برمجيات",
        price: 2000,
        rating: 5
    },
    {
        id: 2,
        type: "products",
        title: "موقع إلكتروني",
        image: "./public/images/logo-nuqta.svg",
        category: "تطوير الويب",
        price: 2000,
        rating: 4
    },
    {
        id: 3,
        type: "products",
        title: "موقع تعريفي",
        image: "./public/images/logo-nuqta.svg",
        category: "تطوير الويب",
        price: 2000,
        rating: 5
    },
    {
        id: 4,
        type: "work",
        title: "تأهيل لسوق العمل",
        image: "./public/images/logo-nuqta.svg",
        category: "تدريب",
        price: null,
        rating: 5
    }
];

// عناصر الـ DOM
// عناصر الـ DOM
const tabs = document.querySelectorAll(".tab-btn");
const container = document.getElementById("services-container");

/**
 * وظيفة تبديل محتوى السايدبار بناءً على التبويب النشط
 * @param {string} target 
 */
function updateSidebarFilters(target) {
    // جلب حاويات الفلاتر المختلفة في السايدبار
    const workFilters = document.getElementById("filter-group-work");
    const digitalFilters = document.getElementById("filter-group-digital");

    if (!workFilters || !digitalFilters) return;

    if (target === "work") {
        // إظهار فلاتر التأهيل وإخفاء فلاتر الخدمات الرقمية
        workFilters.classList.remove("hidden");
        digitalFilters.classList.add("hidden");
    } else {
        // إظهار فلاتر الخدمات/المنتجات الرقمية وإخفاء فلاتر التأهيل
        workFilters.classList.add("hidden");
        digitalFilters.classList.remove("hidden");
    }
}

// تعديل مستمعي الأحداث للتبويبات
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.tab; // 'work', 'digital', أو 'products'

        // 1. تحديث حالة الأزرار (Active State)
        tabs.forEach((t) => {
            t.classList.remove("active");
            t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        // 2. تحديث الفلاتر في السايدبار (المنطق الجديد)
        updateSidebarFilters(target);

        // 3. إعادة رندر البطاقات في المحتوى الرئيسي
        renderServices(target);
    });
});

// العرض الأولي عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    // نفترض أن التبويب الافتراضي هو 'work'
    renderServices("work");
    updateSidebarFilters("work");
});
/**
 * وظيفة إنشاء بطاقة خدمة واحدة   
 * @param {Object} service 
 * @returns {string} HTML string
 */
function createCard(service) {
    const isProduct = service.type === 'products' || service.price !== null;
    
    return `
        <article class="services-card">
            <div class="card-img-wrapper">
                <img src="${service.image}" alt="${service.title}" loading="lazy">
            </div>
            <div class="card-body">
                <div class="card-label">${service.title}</div>
                
                <div class="card-footer-row">
                    <div class="card-stars">
                        ${Array(5).fill(0).map((_, i) => `<i class="${i < (service.rating || 0) ? 'fas' : 'far'} fa-star"></i>`).join('')}
                    </div>
                    ${isProduct ? `
                    <div class="card-price-wrap">
                        <span class="card-price">${service.price}</span>
                        <span class="price-currency"><i class="fas fa-coins"></i></span>
                    </div>` : ''}
                </div>
                
                <button class="btn-add-cart" type="button">أضف إلى السلة</button>
            </div>
        </article>
    `;
}

/**
 * وظيفة عرض الخدمات في الحاوية
 * @param {string} type 
 */
function renderServices(type) {
    if (!container) return;
    
    const filtered = services.filter(s => s.type === type);
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-data">لا توجد خدمات متاحة حالياً في هذا القسم.</div>';
        return;
    }
    
    container.innerHTML = filtered.map(createCard).join("");
}

// إضافة مستمعي الأحداث للتبويبات
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.tab;

        // تحديث حالة الأزرار
        tabs.forEach((t) => {
            t.classList.remove("active");
            t.setAttribute("aria-selected", "false");
        });

        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        // تحديث السايدبار المرتبط
        sidebars.forEach((sidebar) => {
            const isTarget = sidebar.dataset.sidebar === target;
            sidebar.classList.toggle("hidden", !isTarget);
        });

        // إعادة رندر الخدمات
        renderServices(target);
    });
});

// العرض الأولي
document.addEventListener("DOMContentLoaded", () => {
    renderServices("work");
});

