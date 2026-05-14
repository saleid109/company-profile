/* =========================================================
    1. قائمة الجوال
========================================================= */
function toggleMenu() {
    const navLinks = document.querySelector(".navbar-links");
    const menuIcon = document.querySelector(".mobile-menu-icon i");
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    if (!navLinks) return;

    const isOpen = navLinks.classList.toggle("open");

    if (overlay) overlay.classList.toggle('active', isOpen);
    if (menuIcon) menuIcon.className = isOpen ? "fas fa-times" : "fas fa-bars";

    body.classList.toggle('menu-open', isOpen);
    body.style.overflow = isOpen ? 'hidden' : 'auto';
}

/* =========================================================
    2. فلترة الخدمات
========================================================= */
let currentMain = "products";
let currentSub = "web";

function filterCards() {
    const cards = document.querySelectorAll(".service-card");
    let delay = 0;

    cards.forEach(card => {
        const match = card.dataset.main === currentMain && card.dataset.sub === currentSub;
        if (match) {
            card.style.display = "block";
            card.classList.remove("active");
            setTimeout(() => card.classList.add("active"), delay);
            delay += 100;
        } else {
            card.classList.remove("active");
            card.style.display = "none";
        }
    });
}

function activateMain(mainValue) {
    currentMain = mainValue;

    document.querySelectorAll(".caet-btn").forEach(btn => {
        const isActive = btn.dataset.main === mainValue;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-selected", isActive);
    });

    document.querySelectorAll(".sub-categories").forEach(group => {
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
    3. Mega Menu للجوال والتابلت
========================================================= */
function initMobileMegaMenu() {
    if (window.innerWidth > 1025) return;

    // إزالة المستمعات القديمة
    document.querySelectorAll('.nav-menu li.dropdown > a').forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
    });

    // إضافة مستمعات جديدة
    document.querySelectorAll('.nav-menu li.dropdown > a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const megaMenu = this.nextElementSibling;
            if (!megaMenu) return;

            const isOpen = megaMenu.classList.contains('open');

            // إغلاق الكل أولاً
            document.querySelectorAll('.mega-menu-content').forEach(m => m.classList.remove('open'));
            document.querySelectorAll('.nav-menu li.dropdown > a').forEach(a => a.classList.remove('active'));

            // فتح المطلوب
            if (!isOpen) {
                megaMenu.classList.add('open');
                this.classList.add('active');
            }
        });
    });

    // إغلاق عند النقر خارج القائمة
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.has-mega')) {
            document.querySelectorAll('.mega-menu-content').forEach(m => m.classList.remove('open'));
        }
    });
}

/* =========================================================
    4. الإحصائيات المتحركة
========================================================= */
function animateNumber(element, target) {
    let current = 0;
    const frameRate = 1000 / 60;
    const totalFrames = 1800 / frameRate;
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

/* =========================================================
    5. الزر العائم — بـ class بدل style
========================================================= */
let scrollTimeout;

function handleFloatingBtn() {
    if (scrollTimeout) return;

    scrollTimeout = setTimeout(() => {
        const btn = document.querySelector('.floating-consult-btn');
        if (!btn) return;

        // فقط في الجوال والتابلت
        if (window.innerWidth > 1024) return;

        btn.classList.toggle('show', window.scrollY > 250);
        scrollTimeout = null;
    }, 100);
}

/* =========================================================
    6. سلايدر الفرق
========================================================= */
(function initTeamsCarousel() {
    const section = document.querySelector('.teams-group-section');
    if (!section) return;

    const track = section.querySelector('.carousel-track');
    const prevBtn = section.querySelector('.nav-btn.prev');
    const nextBtn = section.querySelector('.nav-btn.next');
    const cards = section.querySelectorAll('.group');

    if (!track || !prevBtn || !nextBtn || cards.length === 0) return;

    let currentIndex = 0;

    function getVisibleCards() {
        const w = window.innerWidth;
        if (w < 768) return 1;
        if (w < 1024) return 2;
        return 3;
    }

    function getGap() {
        const w = window.innerWidth;
        if (w < 640) return 12;
        if (w < 768) return 16;
        if (w < 1024) return 20;
        return 24;
    }

    function updateCarousel() {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        const wrapperWidth = track.parentElement.getBoundingClientRect().width;
        const gap = getGap();
        const cardW = (wrapperWidth - gap * (visibleCards - 1)) / visibleCards;

        cards.forEach(card => {
            card.style.width = cardW + 'px';
            card.style.flex = `0 0 ${cardW}px`;
        });

        track.style.transform = `translateX(${currentIndex * (cardW + gap)}px)`;

        prevBtn.disabled = currentIndex >= maxIndex;
        nextBtn.disabled = currentIndex <= 0;
        prevBtn.style.opacity = prevBtn.disabled ? '0.3' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.3' : '1';
    }

    prevBtn.addEventListener('click', () => {
        const maxIndex = Math.max(0, cards.length - getVisibleCards());
        if (currentIndex < maxIndex) { currentIndex++; updateCarousel(); }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex > 0) { currentIndex--; updateCarousel(); }
    });

    // دعم اللمس
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextBtn.click();
            else prevBtn.click();
        }
    }, { passive: true });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { currentIndex = 0; updateCarousel(); }, 150);
    });

    // تشغيل أولي
    window.addEventListener('load', updateCarousel);
    setTimeout(updateCarousel, 100);
})();

/* =========================================================
    7. نظام التسجيل والدخول
========================================================= */
function openAuth(tab = 'login') {
    const overlay = document.getElementById('authOverlay');
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    const tabBtn = document.querySelectorAll('.auth-tab')[tab === 'login' ? 0 : 1];
    if (tabBtn) switchTab(tab, tabBtn);
}

function closeAuth() {
    const overlay = document.getElementById('authOverlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

function handleOverlayClick(e) {
    if (e.target === document.getElementById('authOverlay')) closeAuth();
}

function switchTab(name, btn) {
    document.querySelectorAll('.auth-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    document.querySelectorAll('.auth-panel').forEach(p => {
        p.classList.remove('active');
        p.hidden = true;
    });

    const panel = document.getElementById('panel-' + name);
    if (panel) { panel.classList.add('active'); panel.hidden = false; }
}

function handleLogin(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.auth-submit');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>جاري التحقق...</span>';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> <span>تم بنجاح!</span>';
        btn.style.background = '#16a34a';
        setTimeout(closeAuth, 1000);
    }, 1500);
}

function handleRegister(e) {
    e.preventDefault();
    if (document.getElementById('reg-password').value !== document.getElementById('reg-confirm').value) {
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

/* =========================================================
    8. تهيئة كل الأحداث — DOMContentLoaded
========================================================= */
document.addEventListener("DOMContentLoaded", () => {

    // إغلاق القائمة عبر الـ Overlay
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (document.querySelector(".navbar-links")?.classList.contains("open")) {
                toggleMenu();
            }
        });
    }

    // إغلاق بـ ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (document.querySelector(".navbar-links")?.classList.contains("open")) toggleMenu();
            closeAuth();
        }
    });

    // Mega Menu
    initMobileMegaMenu();
    window.addEventListener('resize', initMobileMegaMenu);

    // سلايدر المشاريع
    if (typeof Swiper !== "undefined") {
        new Swiper(".projects-swiper", {
            slidesPerView: 1, spaceBetween: 20,
            loop: true, grabCursor: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            navigation: { nextEl: ".projects-swiper .swiper-button-next", prevEl: ".projects-swiper .swiper-button-prev" },
            pagination: { el: ".projects-swiper .swiper-pagination", clickable: true },
            breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3, spaceBetween: 33 } },
        });

        new Swiper(".team-swiper", {
            slidesPerView: 1, spaceBetween: 24,
            grabCursor: true, loop: true, speed: 700,
            autoplay: { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true },
            navigation: { nextEl: ".team-swiper .swiper-button-next", prevEl: ".team-swiper .swiper-button-prev" },
            breakpoints: { 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } },
        });
    }

    // Reveal Animation
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.15 });

    document.querySelectorAll('.service-card, .feature-item, .field-card, .stat-card, .hero-content')
        .forEach(el => { el.classList.add('reveal'); revealObserver.observe(el); });

    // أزرار الخدمات
    document.querySelectorAll(".caet-btn").forEach(btn => {
        btn.addEventListener("click", () => activateMain(btn.dataset.main));
    });
    document.querySelectorAll(".sub-btn").forEach(btn => {
        btn.addEventListener("click", () => activateSub(btn.dataset.sub));
    });
    activateMain(currentMain);

    // الإحصائيات
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                const el = entry.target.querySelector('.stat-number');
                const target = parseInt(el.dataset.target);
                animateNumber(el, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.stat-item').forEach(item => statsObserver.observe(item));

    // إغلاق القائمة عند النقر على الروابط
    document.querySelectorAll('.nav-menu li:not(.has-mega) a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768 && document.querySelector('.navbar-links')?.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // ===== الزر العائم =====
    window.addEventListener('scroll', handleFloatingBtn);

    // ظهور ذكي بعد 4 ثوان إذا ما نزل المستخدم
    setTimeout(() => {
        const btn = document.querySelector('.floating-consult-btn');
        if (btn && window.scrollY < 100) btn.classList.add('show');
    }, 4000);

});

console.log('✅ Main.js loaded - Clean Version');
// =========================================================
// 9. نظام الـ Drawer للجوال
(function () {
    const openBtn = document.getElementById('drawerOpen');
    const closeBtn = document.getElementById('drawerClose');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('drawerOverlay');

    if (!drawer) return;

    /* --- فتح --- */
    function openDrawer() {
        drawer.classList.add('open');
        overlay.classList.add('active');
        openBtn?.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';   /* منع التمرير خلف الـ drawer */
    }

    /* --- إغلاق --- */
    function closeDrawer() {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        openBtn?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    openBtn?.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    overlay?.addEventListener('click', closeDrawer);

    /* --- إغلاق بـ Escape --- */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeDrawer();
    });

    /* --- Sub Menu Toggles --- */
    drawer.querySelectorAll('.drawer-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const sub = this.closest('.drawer-item').querySelector('.drawer-submenu');
            const isOpen = sub.classList.toggle('open');
            this.setAttribute('aria-expanded', isOpen);
        });
    });
})();
