
/**
 * فتح وإغلاق قائمة الجوال والتحكم في الطبقة الظليلة
 */
function toggleMenu() {
    const navLinks = document.querySelector(".navbar-links");
    const menuIcon = document.querySelector(".mobile-menu-icon i");
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    if (!navLinks) return;

    navLinks.classList.toggle("open");
    if (overlay) overlay.classList.toggle('active');

    if (navLinks.classList.contains("open")) {
        if (menuIcon) menuIcon.className = "fas fa-times";
        body.classList.add('menu-open');
    } else {
        if (menuIcon) menuIcon.className = "fas fa-bars";
        body.classList.remove('menu-open');
    }
}

/* =========================================================
    2. وظائف فلترة الخدمات (Digital Services Filter)
========================================================= */

let currentMain = "products";
let currentSub = "web";

/**
 * فلترة كروت الخدمات بناءً على القسم الرئيسي والفرعي المختار
 */
function filterCards() {
    const cards = document.querySelectorAll(".service-card");
    let delay = 0;

    cards.forEach(card => {
        const match = card.dataset.main === currentMain && card.dataset.sub === currentSub;

        if (match) {
            card.style.display = "block";
            card.classList.remove("active");
            setTimeout(() => {
                card.classList.add("active");
            }, delay);
            delay += 100;
        } else {
            card.classList.remove("active");
            card.style.display = "none";
        }
    });
}

/**
 * تفعيل التبويب الرئيسي
 */
function activateMain(mainValue) {
    currentMain = mainValue;
    const mainTabs = document.querySelectorAll(".caet-btn");
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

/**
 * تفعيل التبويب الفرعي
 */
function activateSub(subValue) {
    currentSub = subValue;
    document.querySelectorAll(".sub-categories.active .sub-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.sub === subValue);
    });
    filterCards();
}

/* =========================================================
    3. القوائم المنسدلة للجوال (Mobile Mega Menu)
========================================================= */

/**
 * تفعيل القوائم الفرعية في الجوال
 */
function initMobileMegaMenu() {
    // تفعيل القوائم المنسدلة للجوال والايباد (أقل من 1025 بكسل)
    if (window.innerWidth > 1024) return;

    const dropdownLinks = document.querySelectorAll('.nav-menu li.dropdown > a');

    dropdownLinks.forEach(link => {
        // إزالة المستمعات القديمة لتجنب التكرار
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
    });

    // إضافة المستمعات الجديدة
    document.querySelectorAll('.nav-menu li.dropdown > a').forEach(link => {
        link.addEventListener('click', function (e) {
            // في الجوال والايباد، نريد النقر لفتح القائمة بدلاً من التحويم
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                e.stopPropagation();

                const parentLi = this.parentElement;
                const megaMenu = this.nextElementSibling;

                // تبديل الحالة
                const isOpen = megaMenu && (megaMenu.classList.contains('open') || megaMenu.classList.contains('active-mobile'));

                // إغلاق جميع القوائم الأخرى أولاً
                document.querySelectorAll('.nav-menu li.dropdown').forEach(li => {
                    if (li !== parentLi) {
                        li.querySelector('a').classList.remove('active');
                        const menu = li.querySelector('.mega-menu-content, .dropdown-menu');
                        if (menu) {
                            menu.classList.remove('open');
                            menu.classList.remove('active-mobile');
                        }
                    }
                });

                // تبديل حالة القائمة الحالية
                this.classList.toggle('active', !isOpen);
                if (megaMenu) {
                    megaMenu.classList.toggle('open', !isOpen);
                    megaMenu.classList.toggle('active-mobile', !isOpen);
                }
            }
        });
    });
}

/* =========================================================
    4. إحصائيات متحركة (Animated Statistics)
========================================================= */

/**
 * تحريك الأرقام في قسم الإحصائيات
 */
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

/* =========================================================
    5 & 6. سلايدر موحّد قابل لإعادة الاستخدام (Unified Carousel)
========================================================= */

/**
 * دالة موحّدة تُشغّل أي سلايدر بنفس المنطق
 * @param {Object} cfg - إعدادات السلايدر
 */
function initCarousel(cfg) {
    const section   = cfg.section   ? document.querySelector(cfg.section) : document;
    const track     = section.querySelector(cfg.track);
    const clip      = cfg.clip ? section.querySelector(cfg.clip) : null;
    const btnPrev   = section.querySelector(cfg.prev);
    const btnNext   = section.querySelector(cfg.next);
    const cards     = Array.from(track ? track.querySelectorAll(cfg.card) : []);

    if (!track || !btnPrev || !btnNext || cards.length === 0) return;

    let idx = 0;

    // عدد الكروت الظاهرة حسب عرض الشاشة
    function getVisible() {
        const w = window.innerWidth;
        if (w < 768)  return cfg.visibleSm  ?? 1;
        if (w < 1024) return cfg.visibleMd  ?? 2;
        return              cfg.visibleLg  ?? 3;
    }

    // حساب عرض الكرت مع مراعاة المسافات والأزرار
    function getCardWidth() {
        const rowEl    = cfg.rowSelector ? section.querySelector(cfg.rowSelector) : track.parentElement;
        const rowW     = rowEl.getBoundingClientRect().width;
        const btnW     = cfg.rowSelector
            ? (btnPrev.getBoundingClientRect().width + btnNext.getBoundingClientRect().width
               + (parseFloat(getComputedStyle(rowEl).gap) || 16) * 2)
            : 0;
        const gap      = parseFloat(getComputedStyle(track).gap) || 20;
        const visible  = getVisible();
        const clipW    = rowW - btnW;
        return (clipW - gap * (visible - 1)) / visible;
    }

    // رسم وضع السلايدر
    function render() {
        const gap     = parseFloat(getComputedStyle(track).gap) || 20;
        const cardW   = getCardWidth();
        const step    = cardW + gap;
        const maxIdx  = Math.max(0, cards.length - getVisible());

        if (idx > maxIdx) idx = maxIdx;

        cards.forEach(card => {
            card.style.width = cardW + 'px';
            card.style.flex  = `0 0 ${cardW}px`;
        });

        // دعم RTL: الإزاحة موجبة في كلا الحالتين (المحتوى يتحرك لليسار عند التقدم)
        track.style.transform = `translateX(${idx * step}px)`;

        btnPrev.disabled     = idx >= maxIdx;
        btnNext.disabled     = idx <= 0;
        btnPrev.style.opacity = btnPrev.disabled ? '0.3' : '1';
        btnNext.style.opacity = btnNext.disabled ? '0.3' : '1';
    }

    // زر السابق (في RTL: يتقدم للأمام)
    function goPrev() {
        const max = Math.max(0, cards.length - getVisible());
        if (idx < max) { idx++; render(); }
    }

    // زر التالي (في RTL: يرجع للخلف)
    function goNext() {
        if (idx > 0) { idx--; render(); }
    }

    btnPrev.addEventListener('click', goPrev);
    btnNext.addEventListener('click', goNext);

    // دعم اللمس
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
    }, { passive: true });

    // إعادة رسم عند تغيير حجم الشاشة مع debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { idx = 0; render(); }, 150);
    });

    // تشغيل مبدئي
    window.addEventListener('load', render);
    document.addEventListener('DOMContentLoaded', render);
    setTimeout(render, 200);
    setTimeout(render, 600);
}


/* — تهيئة سلايدر فريق العمل — */
initCarousel({
    track:       '#team-track',
    clip:        '.team-track-clip',
    prev:        '#btn-prev',
    next:        '#btn-next',
    card:        '.team-card',
    rowSelector: '.team-slider-row',
    visibleSm:   1,
    visibleMd:   2,
    visibleLg:   4,
});

/* — تهيئة سلايدر الفرق — */
initCarousel({
    section:     '.teams-group-section',
    track:       '.carousel-track',
    prev:        '.nav-btn.prev',
    next:        '.nav-btn.next',
    card:        '.group',
    visibleSm:   1,
    visibleMd:   2,
    visibleLg:   3,
});
/* =========================================================
    7. نظام التسجيل والدخول (Authentication)
========================================================= */

function openAuth(tab = 'login') {
    const overlay = document.getElementById('authOverlay');
    if (overlay) {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        const tabBtn = document.querySelectorAll('.auth-tab')[tab === 'login' ? 0 : 1];
        if (tabBtn) switchTab(tab, tabBtn);
    }
}

function closeAuth() {
    const overlay = document.getElementById('authOverlay');
    if (overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
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
    if (panel) {
        panel.classList.add('active');
        panel.hidden = false;
    }
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

/* =========================================================
    8. تهيئة الأحداث (DOMContentLoaded Initializations)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // إغلاق القائمة عبر الـ Overlay
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            const navLinks = document.querySelector(".navbar-links");
            if (navLinks && navLinks.classList.contains("open")) {
                toggleMenu();
            }
        });
    }

    // إغلاق القائمة بالـ ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navLinks = document.querySelector(".navbar-links");
            if (navLinks && navLinks.classList.contains("open")) {
                toggleMenu();
            }
            closeAuth();
        }
    });

    // تهيئة القوائم المنسدلة للجوال
    initMobileMegaMenu();

    // إعادة تهيئة عند تغيير حجم الشاشة
    window.addEventListener('resize', () => {
        initMobileMegaMenu();
    });

    // تهيئة سلايدر المشاريع (Swiper)
    if (typeof Swiper !== "undefined") {
        new Swiper(".projects-swiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            pagination: { el: ".swiper-pagination", clickable: true },
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 33 },
            },
        });
    }

    // Intersection Observer للحركات
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    const elementsToReveal = document.querySelectorAll(
        '.service-card, .feature-item, .field-card, .stat-card, .hero-content'
    );
    elementsToReveal.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // ربط أزرار التبويبات
    document.querySelectorAll(".caet-btn").forEach(btn => {
        btn.addEventListener("click", () => activateMain(btn.dataset.main));
    });

    document.querySelectorAll(".sub-btn").forEach(btn => {
        btn.addEventListener("click", () => activateSub(btn.dataset.sub));
    });

    // التشغيل الأولي للفلترة
    activateMain("products");

    // تهيئة الإحصائيات
    const statItems = document.querySelectorAll('.stat-item');
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                item.classList.add('revealed');
                const numberEl = item.querySelector('.stat-number');
                const target = parseInt(numberEl.dataset.target);
                animateNumber(numberEl, target);
                observer.unobserve(item);
            }
        });
    }, { threshold: 0.3 });

    statItems.forEach(item => statsObserver.observe(item));

    // إغلاق القائمة عند النقر على الروابط العادية
    document.querySelectorAll('.nav-menu li:not(.has-mega) a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                const navbar = document.querySelector('.navbar-links');
                const overlay = document.querySelector('.overlay');
                if (navbar && navbar.classList.contains('open')) {
                    toggleMenu();
                }
            }
        });
    });
});

console.log('✅ All scripts loaded successfully');

//=======================================

// تحقق من وجود عناصر معينة قبل تنفيذ الكود الخاص بها



