
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
        link.addEventListener('click', function(e) {
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
    5. سلايدر فريق العمل (Team Slider)
========================================================= */

(function initTeamSlider() {
    const track = document.getElementById('team-track');
    const clip = document.querySelector('.team-track-clip');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    
    if (!track || !clip || !btnPrev || !btnNext) return;

    const cards = Array.from(track.querySelectorAll('.team-card'));
    let idx = 0;

    function getVisible() {
        const w = window.innerWidth;
        if (w < 768) return 1;
        if (w <= 1024) return 2;
        return 4;
    }

    function getCardW() {
        const sliderRow = document.querySelector('.team-slider-row');
        const rowW = sliderRow.getBoundingClientRect().width;
        const btnW = btnPrev.getBoundingClientRect().width + btnNext.getBoundingClientRect().width;
        const rowGap = parseFloat(getComputedStyle(sliderRow).gap) || 16;
        const gap = parseFloat(getComputedStyle(track).gap) || 20;
        const visible = getVisible();
        const clipW = rowW - btnW - (rowGap * 2);
        return (clipW - gap * (visible - 1)) / visible;
    }

    function render() {
        const gap = parseFloat(getComputedStyle(track).gap) || 20;
        const cardW = getCardW();
        const step = cardW + gap;
        const max = Math.max(0, cards.length - getVisible());

        if (idx > max) idx = max;

        cards.forEach(card => card.style.width = cardW + 'px');
        track.style.transform = `translateX(${idx * step}px)`;

        btnPrev.disabled = idx >= max;
        btnNext.disabled = idx <= 0;
    }

    btnPrev.addEventListener('click', () => {
        const max = Math.max(0, cards.length - getVisible());
        if (idx < max) { idx++; render(); }
    });

    btnNext.addEventListener('click', () => {
        if (idx > 0) { idx--; render(); }
    });

    window.addEventListener('resize', () => { idx = 0; render(); });
    window.addEventListener('load', render);
    document.addEventListener('DOMContentLoaded', render);
    setTimeout(render, 200);
    setTimeout(render, 600);
})();

/* =========================================================
    6. سلايدر الفرق (Teams Carousel)
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
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    }

    function getGap() {
        const width = window.innerWidth;
        if (width < 640) return 12;
        if (width < 768) return 16;
        if (width < 1024) return 20;
        return 24;
    }

    function updateCarousel() {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);

        if (currentIndex > maxIndex) currentIndex = maxIndex;

        const wrapperWidth = track.parentElement.getBoundingClientRect().width;
        const currentGap = getGap();
        const cardW = (wrapperWidth - (currentGap * (visibleCards - 1))) / visibleCards;
        
        cards.forEach(card => {
            card.style.width = cardW + 'px';
            card.style.flex = `0 0 ${cardW}px`;
        });

        const offset = currentIndex * (cardW + currentGap);
        track.style.transform = `translateX(${offset}px)`;

        updateButtons(maxIndex);
    }

    function updateButtons(maxIndex) {
        prevBtn.disabled = currentIndex >= maxIndex;
        nextBtn.disabled = currentIndex <= 0;
        
        prevBtn.style.opacity = prevBtn.disabled ? '0.3' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.3' : '1';
    }

    function goToPrev() {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    }

    function goToNext() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    function handleResize() {
        currentIndex = 0;
        updateCarousel();
    }

    // دعم اللمس
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? goToNext() : goToPrev();
        }
    }, { passive: true });

    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 150);
    });

    window.addEventListener('load', updateCarousel);
    document.addEventListener('DOMContentLoaded', updateCarousel);
    setTimeout(updateCarousel, 100);
    setTimeout(updateCarousel, 300);
    setTimeout(updateCarousel, 600);
})();

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
