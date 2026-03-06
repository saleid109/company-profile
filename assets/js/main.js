

//إدارة القائمة والملاحة (Navigation & Menu)============
/**
 * دالة فتح وإغلاق قائمة الجوال والتحكم في الطبقة الظليلة
 */
function toggleMenu() {
    const navLinks = document.querySelector(".navbar-links");
    const menuIcon = document.querySelector(".mobile-menu-icon i");
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    navLinks.classList.toggle("open");
    if (overlay) overlay.classList.toggle('active');

    if (navLinks.classList.contains("open")) {
        if (menuIcon) menuIcon.classList.replace("fa-bars", "fa-times");
        body.classList.add('menu-open');
    } else {
        if (menuIcon) menuIcon.classList.replace("fa-times", "fa-bars");
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

    // ---. مراقب الظهور للحركات (Intersection Observer) ---
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

    // --- . ربط أزرار التبويبات بالوظائف ---
    document.querySelectorAll(".cat-btn").forEach(btn => {
        btn.addEventListener("click", () => activateMain(btn.dataset.main));
    });

    document.querySelectorAll(".sub-btn").forEach(btn => {
        btn.addEventListener("click", () => activateSub(btn.dataset.sub));
    });

    // --- . التشغيل الأولي للفلترة ---
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
(function () {
    const track = document.getElementById('team-track');
    const clip  = document.querySelector('.team-track-clip');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    if (!track || !clip || !btnPrev || !btnNext) return;

    const cards = track.querySelectorAll('.team-card');
    let idx = 0;

    function getVisible() {
        if (window.innerWidth <= 768)  return 1;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    }

    function getStep() {
        const gap = parseInt(getComputedStyle(track).gap) || 24;
        return cards[0].offsetWidth + gap;
    }

    function getStartOffset() {
        const visible = getVisible();
        if (visible === 1) {
            // موبايل: مركّز
            return (clip.offsetWidth - cards[0].offsetWidth) / 2;
        }
        // تابلت وديسكتوب: يبدأ من الحافة
        return 0;
    }

    function update() {
        const offset = getStartOffset();
        const translateX = offset - (idx * getStep());
        track.style.transform = `translateX(${translateX}px)`;

        const maxIdx = Math.max(0, cards.length - getVisible());
        btnPrev.disabled = idx <= 0;
        btnNext.disabled = idx >= maxIdx;
    }

    btnNext.addEventListener('click', () => {
        if (idx < cards.length - getVisible()) { idx++; update(); }
    });
    btnPrev.addEventListener('click', () => {
        if (idx > 0) { idx--; update(); }
    });

    window.addEventListener('resize', () => { idx = 0; update(); });
    update();
})();


/* --- قسم الفرق --- */
(function () {
    const section = document.querySelector('.teams-group-section');
    if (!section) return;

    const track = section.querySelector('.carousel-track');
    const prevBtn = section.querySelector('.nav-btn.prev');
    const nextBtn = section.querySelector('.nav-btn.next');
    const cards = section.querySelectorAll('.group');
    let currentIndex = 0;
    const gap = 24;
    const VISIBLE = 3; // ← ثابت دائماً

    function getCardWidth() {
        return cards[0].offsetWidth + gap;
    }/* --- فريق العمل --- */
(function () {
    const track   = document.getElementById('team-track');
    const clip    = document.querySelector('.team-track-clip');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    if (!track || !clip || !btnPrev || !btnNext) return;

    const cards = track.querySelectorAll('.team-card');
    let idx = 0;

    function getVisible() {
        if (window.innerWidth <= 768)  return 1;
        if (window.innerWidth <= 1024) return 2; // ← تابلت: كرتان كاملتان
        return 4;
    }

    function getStep() {
        const gap = parseInt(getComputedStyle(track).gap) || 24;
        return cards[0].offsetWidth + gap;
    }

    function getStartOffset() {
        const w = window.innerWidth;
        const clipW = clip.offsetWidth;
        const cardW = cards[0].offsetWidth;
        const gap   = parseInt(getComputedStyle(track).gap) || 24;

        if (w <= 768) {
            // موبايل: مركّز الكرت الواحد
            return (clipW - cardW) / 2;
        }
        if (w <= 1024) {
            // تابلت: كرتان مع مسافة صغيرة من الحافة
            const totalTwo = cardW * 2 + gap;
            return (clipW - totalTwo) / 2;
        }
        // ديسكتوب: من الحافة
        return 0;
    }

    function update() {
        const translateX = getStartOffset() - (idx * getStep());
        track.style.transform = `translateX(${translateX}px)`;

        const maxIdx = Math.max(0, cards.length - getVisible());
        btnPrev.disabled = idx <= 0;
        btnNext.disabled  = idx >= maxIdx;
    }

    btnNext.addEventListener('click', () => {
        if (idx < cards.length - getVisible()) { idx++; update(); }
    });
    btnPrev.addEventListener('click', () => {
        if (idx > 0) { idx--; update(); }
    });

    window.addEventListener('resize', () => { idx = 0; update(); });
    requestAnimationFrame(update);
})();

    function updateCarousel() {
        const maxIndex = Math.max(0, cards.length - VISIBLE);
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        track.style.transform = `translateX(${currentIndex * getCardWidth()}px)`;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    nextBtn.addEventListener('click', () => {
        const maxIndex = cards.length - VISIBLE;
        if (currentIndex < maxIndex) { currentIndex++; updateCarousel(); }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) { currentIndex--; updateCarousel(); }
    });

    window.addEventListener('resize', updateCarousel);
    window.addEventListener('load', updateCarousel);
    setTimeout(updateCarousel, 300);
})();



// ===== فتح وإغلاق =====
function openAuth(tab = 'login') {
    document.getElementById('authOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    switchTab(tab, document.querySelectorAll('.auth-tab')[tab === 'login' ? 0 : 1]);
}

function closeAuth() {
    document.getElementById('authOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

function handleOverlayClick(e) {
    if (e.target === document.getElementById('authOverlay')) closeAuth();
}

// إغلاق بـ Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAuth();
});

// ===== تبديل التبويبات =====
function switchTab(name, btn) {
    document.querySelectorAll('.auth-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    document.querySelectorAll('.auth-panel').forEach(p => {
        p.classList.remove('active');
        p.hidden = true; // لإخفاء العنصر من الوصول والتركيز
    });

    const panel = document.getElementById('panel-' + name);
    panel.classList.add('active');
    panel.hidden = false; // لإظهاره وجعله متاحاً للتركيز
}

// ===== معالجة النماذج =====
function handleLogin(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.auth-submit');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>جاري التحقق...</span>';
    btn.disabled = true;
    // هنا تضع طلب API الخاص بك
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> <span>تم بنجاح!</span>';
        btn.style.background = '#16a34a';
        setTimeout(closeAuth, 1000);
    }, 1500);
}

function handleRegister(e) {
    e.preventDefault();
    const pass = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    if (pass !== confirm) {
        alert('كلمتا المرور غير متطابقتين');
        return;
    }
    const btn = e.target.querySelector('.auth-submit');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>جاري الإنشاء...</span>';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> <span>تم إنشاء الحساب!</span>';
        btn.style.background = '#16a34a';
        setTimeout(closeAuth, 1000);
    }, 1500);
}
