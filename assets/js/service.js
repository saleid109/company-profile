// ============================================
// بيانات الخدمات
// ============================================
const productsData = {
    1: {
        title: "نظام إداري",
        price: "2000",
        desc: "نظام إداري متكامل...",
        image: "../public/images/erp-system.jpg",
        includes: ["لوحة تحكم شاملة", "إدارة المستخدمين", "تقارير وإحصائيات", "دعم فني مستمر"],
        compareFeatures: [
            { name: "الدعم الفني",       us: true,  them: true  },
            { name: "تقديم استشارات",   us: true,  them: true  },
            { name: "دراسة مشروع",      us: true,  them: true  },
            { name: "دعم تشغيل",        us: true,  them: false },
            { name: "ضمان الجودة",      us: true,  them: false },
            { name: "دعم ما بعد التسليم", us: true, them: false },
        ],
        faqs: [
            { q: "كيف طريقة سداد الرسوم؟",   a: "يمكن الدفع عبر البطاقات الائتمانية أو التحويل البنكي." },
            { q: "كم مدة التسليم؟",           a: "تتراوح مدة التسليم بين 2 إلى 4 أسابيع حسب المتطلبات." },
            { q: "هل يوجد دعم بعد التسليم؟", a: "نعم، نوفر دعماً فنياً لمدة شهر كامل بعد التسليم." },
            { q: "هل يمكن تعديل النظام لاحقاً؟", a: "نعم، النظام مرن وقابل للتوسعة في أي وقت." },
        ]
    },
    2: {
        title: "موقع تعريفي",
        price: "2000",
        desc: "نصمّم لك موقعًا تعريفيًا يعكس هوية علامتك التجارية...",
        image: "../public/images/web-dev.jpg",
        includes: [
            "تصميم صفحة رئيسية + صفحات (عنّا، خدماتنا، تواصل معنا)",
            "نموذج تواصل مخصص",
            "ربط بحسابات التواصل الاجتماعي",
            "تصميم متجاوب للجوال والأجهزة اللوحية",
            "استخدام لوحة تحكم لتحديث المحتوى (عند الطلب)",
            "دعم فني لمدة شهر بعد التسليم"
        ],
        compareFeatures: [
            { name: "الدعم الفني",          us: true, them: true  },
            { name: "تقديم استشارات",       us: true, them: true  },
            { name: "دراسة مشروع",          us: true, them: true  },
            { name: "دعم تشغيل",            us: true, them: false },
            { name: "تصميم مخصص",           us: true, them: false },
            { name: "دعم ما بعد التسليم",   us: true, them: false },
        ],
        faqs: [
            { q: "كيف طريقة سداد الرسوم؟",        a: "يمكن الدفع عبر البطاقات الائتمانية أو البنك الإلكتروني." },
            { q: "كم مدة تصميم الموقع؟",           a: "تتراوح المدة بين أسبوعين إلى 4 أسابيع حسب الصفحات المطلوبة." },
            { q: "من هم الفئة المستهدفة؟",         a: "الشركات والجمعيات التي تحتاج حضوراً رقمياً احترافياً." },
            { q: "هل يشترط خبرة تقنية للإدارة؟",  a: "لا، لوحة التحكم سهلة ولا تحتاج خبرة برمجية." },
            { q: "هل يوجد دعم من مرشدين؟",        a: "نعم، نوفر دعماً فنياً كاملاً خلال فترة الضمان." },
        ]
    },
    3: {
        title: "موقع تجاري",
        price: "2000",
        desc: "موقع تجاري متكامل لعرض منتجاتك وخدماتك...",
        image: "../public/images/ecommerce.jpg",
        includes: ["تصميم صفحة المنتجات", "سلة تسوق متكاملة", "بوابة دفع إلكتروني", "لوحة إدارة المنتجات"],
        compareFeatures: [
            { name: "الدعم الفني",        us: true, them: true  },
            { name: "تقديم استشارات",     us: true, them: true  },
            { name: "دراسة مشروع",        us: true, them: true  },
            { name: "بوابة دفع",          us: true, them: false },
            { name: "لوحة تحكم متكاملة", us: true, them: false },
            { name: "دعم ما بعد التسليم", us: true, them: false },
        ],
        faqs: [
            { q: "كيف طريقة سداد الرسوم؟",     a: "يمكن الدفع عبر البطاقات الائتمانية أو التحويل البنكي." },
            { q: "كم مدة تطوير الموقع التجاري؟", a: "من 3 إلى 6 أسابيع حسب عدد المنتجات والمتطلبات." },
            { q: "هل يدعم الدفع الإلكتروني؟",   a: "نعم، ندمج بوابات الدفع السعودية المعتمدة." },
            { q: "هل يمكن إضافة منتجات لاحقاً؟", a: "نعم، لوحة التحكم تتيح إضافة وتعديل المنتجات بسهولة." },
        ]
    },
    5: {
        title: "تطوير مواقع إلكترونية",
        price: "1500",
        desc: "تطوير مواقع احترافية بأحدث التقنيات...",
        image: "../public/images/hero-main.jpg",
        includes: ["تطوير بأحدث التقنيات", "تصميم متجاوب", "سرعة تحميل عالية", "تحسين محركات البحث SEO"],
        compareFeatures: [
            { name: "الدعم الفني",    us: true, them: true  },
            { name: "استشارات تقنية", us: true, them: false },
            { name: "دراسة مشروع",   us: true, them: true  },
            { name: "SEO محسّن",      us: true, them: false },
            { name: "أداء عالي",      us: true, them: false },
            { name: "دعم مستمر",      us: true, them: false },
        ],
        faqs: [
            { q: "كيف طريقة سداد الرسوم؟",         a: "يمكن الدفع عبر البطاقات الائتمانية أو التحويل البنكي." },
            { q: "ما التقنيات المستخدمة؟",          a: "نستخدم أحدث التقنيات مثل React وNode.js وغيرها." },
            { q: "هل يدعم محركات البحث؟",           a: "نعم، كل موقع نطوره محسّن لـ SEO من الأساس." },
            { q: "هل يمكن تطوير الموقع لاحقاً؟",   a: "نعم، نصمم البنية لتكون قابلة للتوسع." },
        ]
    }
};
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

