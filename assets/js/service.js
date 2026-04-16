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
const tabs = document.querySelectorAll(".tab-btn");
const sidebars = document.querySelectorAll(".sidebar-filters");
const container = document.getElementById("services-container");

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

