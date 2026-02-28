/* =========================================================
    1. إدارة القائمة والملاحة (Navigation & Menu)
========================================================= */

/**
 * دالة فتح وإغلاق قائمة الجوال والتحكم في الطبقة الظليلة
 */
function toggleMenu() {
    const navLinks = document.querySelector(".navbar-links");
    const menuIcon = document.querySelector(".mobile-menu-icon i");
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    navLinks.classList.toggle("open");

    // دعم الطبقة الظليلة (Overlay) إذا وجدت
    if (overlay) overlay.classList.toggle('active');

    // تبديل الأيقونة والتحكم في تمرير الصفحة
    if (navLinks.classList.contains("open")) {
        if (menuIcon) menuIcon.classList.replace("fa-bars", "fa-times");
        body.style.overflow = "hidden"; // منع التمرير عند فتح القائمة
        body.classList.add('menu-open');
    } else {
        if (menuIcon) menuIcon.classList.replace("fa-times", "fa-bars");
        body.style.overflow = "auto"; // إعادة التمرير عند الإغلاق
        body.classList.remove('menu-open');
    }
}

/* =========================================================
    2. وظائف فلترة الخدمات (Digital Services Filter)
========================================================= */

// متغيرات التحكم الافتراضية
let currentMain = "products";
let currentSub = "web";

/**
 * فلترة كروت الخدمات بناءً على القسم الرئيسي والفرعي المختتار
 * تم إضافة تأثير ظهور متتابع (Delay) لتحسين تجربة المستخدم
 */
function filterCards() {
    const cards = document.querySelectorAll(".service-card");
    let delay = 0;

    cards.forEach(card => {
        const match = card.dataset.main === currentMain && card.dataset.sub === currentSub;

        if (match) {
            card.style.display = "block";
            // إزالة الكلاس ثم إضافته بعد تأخير لتفعيل الأنيميشن
            card.classList.remove("active");
            setTimeout(() => {
                card.classList.add("active");
            }, delay);
            delay += 100; // زيادة التأخير لكل كرت تالٍ
        } else {
            card.classList.remove("active");
            card.style.display = "none";
        }
    });
}

/**
 * تفعيل التبويب الرئيسي وإظهار مجموعته الفرعية
 */
function activateMain(mainValue) {
    currentMain = mainValue;
    const mainTabs = document.querySelectorAll(".cat-btn");
    const subGroups = document.querySelectorAll(".sub-categories");

    // تحديث حالة الأزرار الرئيسية
    mainTabs.forEach(btn => {
        const isActive = btn.dataset.main === mainValue;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-selected", isActive);
    });

    // إظهار المجموعات الفرعية المناسبة
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

/**
 * تفعيل التبويب الفرعي داخل المجموعة النشطة
 */
function activateSub(subValue) {
    currentSub = subValue;
    document.querySelectorAll(".sub-categories.active .sub-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.sub === subValue);
    });
    filterCards();
}

/* =========================================================
    3. تهيئة الأحداث (Initializations & Event Listeners)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // --- أ. إدارة إغلاق القائمة عبر الـ Overlay ---
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            const navLinks = document.querySelector(".navbar-links");
            if (navLinks.classList.contains("open")) toggleMenu();
        });
    }

    // --- ب. دعم الوصول للقوائم المنسدلة (Dropdown Accessibility) ---
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

    // --- ج. تهيئة سلايدر المشاريع (Swiper Slider) ---
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

    // --- د. مراقب الظهور للحركات (Intersection Observer) ---
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

    // --- هـ. ربط أزرار التبويبات بالوظائف ---
    document.querySelectorAll(".cat-btn").forEach(btn => {
        btn.addEventListener("click", () => activateMain(btn.dataset.main));
    });

    document.querySelectorAll(".sub-btn").forEach(btn => {
        btn.addEventListener("click", () => activateSub(btn.dataset.sub));
    });

    // --- و. التشغيل الأولي للفلترة ---
    activateMain("products");
});

//احصائيات
// ======= إحصائيات: ظهور + عداد احترافي =======

document.addEventListener("DOMContentLoaded", () => {

    const statItems = document.querySelectorAll('.stat-item');

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const item = entry.target;
                item.classList.add('revealed');

                const numberEl = item.querySelector('.stat-number');
                const target = parseInt(numberEl.dataset.target);

                animateNumber(numberEl, target);

                observer.unobserve(item); // يعمل مرة واحدة فقط
            }

        });
    }, { threshold: 0.3 });

    statItems.forEach(item => statsObserver.observe(item));

    function animateNumber(element, target) {

        let current = 0;
        const duration = 1800;
        const frameRate = 1000 / 60;
        const totalFrames = duration / frameRate;
        const increment = target / totalFrames;

        const counter = setInterval(() => {
            current += increment;

            if (current >= target) {
                current = target;
                clearInterval(counter);
            }

            element.textContent = "+" + Math.floor(current).toLocaleString('en-US');

        }, frameRate);
    }

});
/* --- فريق العمل --- */
(function() {
    const track = document.getElementById('team-track');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    if (!track || !btnPrev || !btnNext) return;

    const cards = track.querySelectorAll('.team-card');
    const VISIBLE = 4;
    let idx = 0;

    function getW() {
        const gap = parseInt(getComputedStyle(track).gap) || 24;
        return cards[0].offsetWidth + gap;
    }

    function update() {
        track.style.transform = `translateX(${idx * getW()}px)`;
        btnPrev.disabled = idx === 0;
        btnNext.disabled = idx >= cards.length - VISIBLE;
    }

    btnNext.addEventListener('click', () => {
        if (idx < cards.length - VISIBLE) { idx++; update(); }
    });
    btnPrev.addEventListener('click', () => {
        if (idx > 0) { idx--; update(); }
    });

    window.addEventListener('resize', update);
    update();
})();


/* --- قسم الفرق --- */

/* --- قسم الفرق --- */
(function() {
    const section = document.querySelector('.teams-group-section');
    if (!section) return;

    const track = section.querySelector('.carousel-track');
    const prevBtn = section.querySelector('.nav-btn.prev');
    const nextBtn = section.querySelector('.nav-btn.next');
    const cards = section.querySelectorAll('.group');
    let currentIndex = 0;
    const gap = 24;

    function getVISIBLE() {
        const wrapperWidth = section.querySelector('.carousel-wrapper').offsetWidth;
        const cardWidth = cards[0].offsetWidth;
        return Math.floor(wrapperWidth / (cardWidth + gap));
    }

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const maxIndex = Math.max(0, cards.length - getVISIBLE());
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        // ← موجب بدل سالب لأن RTL
        track.style.transform = `translateX(${currentIndex * (cardWidth + gap)}px)`;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    nextBtn.addEventListener('click', () => {
        const maxIndex = Math.max(0, cards.length - getVISIBLE());
        if (currentIndex < maxIndex) { currentIndex++; updateCarousel(); }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) { currentIndex--; updateCarousel(); }
    });

    window.addEventListener('resize', updateCarousel);
    setTimeout(updateCarousel, 100);
})();