// 1. بيانات الخدمات المحدثة لتشمل التخصصات (Categories) المستخدمة في الفلتر
const services = [
    { id: 1, type: "products", title: "نظام إداري", image: "./public/images/logo-nuqta.svg", category: "برمجيات", price: 2000, rating: 5 },
    { id: 2, type: "products", title: "موقع إلكتروني", image: "./public/images/logo-nuqta.svg", category: "تطوير الويب", price: 2000, rating: 4 },
    { id: 3, type: "products", title: "موقع تعريفي", image: "./public/images/logo-nuqta.svg", category: "تطوير الويب", price: 2000, rating: 5 },
    { id: 4, type: "work", title: "تأهيل لسوق العمل", image: "./public/images/logo-nuqta.svg", category: "التقنية", price: null, rating: 5 },
    { id: 5, type: "digital", title: "تطوير مواقع إلكتروني", image: "./public/images/logo-nuqta.svg", category: "تطوير الويب", price: null, rating: 5 }
];

// 2. عناصر الـ DOM
const tabs = document.querySelectorAll(".tab-btn");
const container = document.getElementById("services-container");

/**
 * وظيفة تبديل محتوى السايدبار بناءً على التبويب النشط
 */
function updateSidebarFilters(target) {
    const workFilters = document.getElementById("filter-group-work");
    const digitalFilters = document.getElementById("filter-group-digital");

    if (!workFilters || !digitalFilters) return;

    if (target === "work") {
        workFilters.classList.remove("hidden");
        digitalFilters.classList.add("hidden");
    } else {
        // تظهر القوائم المنسدلة لـ "خدمة رقمية" و "منتجات رقمية"
        workFilters.classList.add("hidden");
        digitalFilters.classList.remove("hidden");
    }
}

/**
 * وظيفة إنشاء HTML البطاقة (تميز بين المنتج والخدمة)
 */
function createCard(service) {
    // التحقق مما إذا كان العنصر منتجاً (له سعر) أم خدمة/تأهيل (طلب خدمة)
    const hasPrice = service.price !== null;
    const buttonText = hasPrice ? "أضف إلى السلة" : "طلب الخدمة";
    
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
                    ${hasPrice ? `
                    <div class="card-price-wrap">
                        <span class="card-price">${service.price}</span>
                        <span class="price-currency">ر.س</span>
                    </div>` : `
                    <div class="card-details-link">
                        <a href="#">التفاصيل <i class="fas fa-chevron-left"></i></a>
                    </div>`}
                </div>
                <button class="btn-primary-action" type="button">${buttonText}</button>
            </div>
        </article>`;
}

/**
 * وظيفة عرض الخدمات مع فلترة حسب النوع
 */
function renderServices(type) {
    if (!container) return;
    
    const filtered = services.filter(s => s.type === type);
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-data">لا توجد نتائج مطابقة لتصفيتك.</div>';
        return;
    }
    
    container.innerHTML = filtered.map(createCard).join("");
}

// 3. مستمعي الأحداث للتبويبات
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.tab;

        // تحديث حالة الأزرار النشطة (Active)
        tabs.forEach(t => {
            t.classList.remove("active");
            t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        // مزامنة السايدبار والبطاقات معاً
        updateSidebarFilters(target);
        renderServices(target);
    });
});

// 4. التشغيل الأولي (تبويب التأهيل هو الافتراضي بناءً على طلبك)
document.addEventListener("DOMContentLoaded", () => {
    // تحديد "تأهيل لسوق العمل" كبداية
    renderServices("work");
    updateSidebarFilters("work");
});