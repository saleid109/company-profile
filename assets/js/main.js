/* =========================================================
    1. إدارة القائمة (الجوال والطبقة الظليلة)
========================================================= */
function toggleMenu() {
    const navLinks = document.querySelector(".navbar-links");
    const menuIcon = document.querySelector(".mobile-menu-icon i");
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    navLinks.classList.toggle("open");
    
    // دعم الطبقة الظليلة إذا وجدت
    if (overlay) overlay.classList.toggle('active');

    // تغيير شكل الأيقونة ومنع التمرير
    if (navLinks.classList.contains("open")) {
        if (menuIcon) menuIcon.classList.replace("fa-bars", "fa-times");
        body.style.overflow = "hidden";
        body.classList.add('menu-open');
    } else {
        if (menuIcon) menuIcon.classList.replace("fa-times", "fa-bars");
        body.style.overflow = "auto";
        body.classList.remove('menu-open');
    }
}

/* =========================================================
    2. وظائف الخدمات والفلترة (الرئيسية والفرعية)
========================================================= */
let currentMain = "products";
let currentSub = "web";

function filterCards() {
    const cards = document.querySelectorAll(".service-card");
    cards.forEach(card => {
        const match = card.dataset.main === currentMain && card.dataset.sub === currentSub;
        card.classList.toggle("active", match);
    });
}

function activateMain(mainValue) {
    currentMain = mainValue;
    const mainTabs = document.querySelectorAll(".cat-btn");
    const subGroups = document.querySelectorAll(".sub-categories");

    mainTabs.forEach(btn => {
        const isActive = btn.dataset.main === mainValue;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-selected", isActive);
    });

    subGroups.forEach(group => {
        const match = group.dataset.parent === mainValue;
        group.classList.toggle("active", match);

        if (match) {
            const firstSub = group.querySelector(".sub-btn");
            if (firstSub) {
                currentSub = firstSub.dataset.sub;
                group.querySelectorAll(".sub-btn").forEach(b => b.classList.remove("active"));
                firstSub.classList.add("active");
            }
        }
    });
    filterCards();
}

function activateSub(subValue) {
    currentSub = subValue;
    document.querySelectorAll(".sub-categories.active .sub-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.sub === subValue);
    });
    filterCards();
}

/* =========================================================
    3. تهيئة الأحداث عند تحميل الصفحة (DOMContentLoaded)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    
    // --- إغلاق القائمة عند الضغط على الطبقة الظليلة ---
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            const navLinks = document.querySelector(".navbar-links");
            if (navLinks.classList.contains("open")) toggleMenu();
        });
    }

    // --- دعم الوصول (Accessibility) للمنسدلات ---
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dd) => {
        const trigger = dd.querySelector("a");
        if (!trigger) return;

        trigger.setAttribute("aria-expanded", "false");
        trigger.setAttribute("role", "button");

        trigger.addEventListener("click", (e) => {
            const submenu = dd.querySelector(".mega-menu-content") || dd.querySelector("ul");
            if (!submenu) return;
            e.preventDefault();
            const isOpen = trigger.getAttribute("aria-expanded") === "true";
            trigger.setAttribute("aria-expanded", String(!isOpen));
            dd.classList.toggle("open", !isOpen);
        });
    });

    // --- تشغيل Swiper (سلايدر المشاريع) ---
    if (typeof Swiper !== "undefined") {
        new Swiper(".projects-swiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            pagination: { el: ".swiper-pagination", clickable: true },
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 33 },
            },
        });
    }

    // --- نظام ظهور العناصر عند التمرير (Intersection Observer) ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    const elementsToReveal = document.querySelectorAll('.service-card, .feature-item, .field-card, .stat-card, .hero-content');
    elementsToReveal.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // --- ربط أزرار التبويبات (Tabs) ---
    document.querySelectorAll(".cat-btn").forEach(btn => {
        btn.addEventListener("click", () => activateMain(btn.dataset.main));
    });

    document.querySelectorAll(".sub-btn").forEach(btn => {
        btn.addEventListener("click", () => activateSub(btn.dataset.sub));
    });

    // تشغيل أولي للخدمات
    activateMain("products");
});