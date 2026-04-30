// ============================================
// إعداد السايدبار لكل تبويب
// ============================================
const sidebarConfig = {
    work: ["filter-group-work"],
    products: [
        "filter-group-web",
        "filter-group-apps", 
        "filter-group-marketing",
        "filter-group-licenses"
    ],
};

// ============================================
// DOM
// ============================================
const tabs = document.querySelectorAll(".tab-btn");
const container = document.getElementById("portfolios-container");

// ============================================
// عرض البطاقات حسب التبويب
// ============================================
function renderPortfolios(type) {
    const allCards = document.querySelectorAll(".portfolio-card");
    let hasVisibleCards = false;

    allCards.forEach(card => {
        if (card.dataset.type === type) {
            card.style.display = "flex";
            hasVisibleCards = true;
        } else {
            card.style.display = "none";
        }
    });

    // رسالة "لا توجد أعمال" إذا كان القسم فارغاً
    const noDataMsg = container?.querySelector(".no-data");
    if (!hasVisibleCards) {
        if (!noDataMsg) {
            container?.insertAdjacentHTML('beforeend', '<div class="no-data">لا توجد أعمال متاحة حالياً.</div>');
        }
    } else {
        noDataMsg?.remove();
    }
}

// ============================================
// تبديل السايدبار حسب التبويب
// ============================================
function updateSidebar(type) {
    const allFilterIds = [
    "filter-group-work",
    "filter-group-web",
    "filter-group-apps",
    "filter-group-marketing",
    "filter-group-licenses",
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
    document.querySelectorAll(".filter-cb").forEach(cb => cb.checked = false);
    document.querySelectorAll('input[name="filter-rate"]').forEach(r => r.checked = false);
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
        renderPortfolios(target);
    });
});

// ============================================
// العرض الأولي
// ============================================
const activeTab = document.querySelector(".tab-btn.active");
const initialType = activeTab?.dataset.tab || "work";
updateSidebar(initialType);
renderPortfolios(initialType);