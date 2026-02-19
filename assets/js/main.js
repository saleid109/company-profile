/* =========================================================
    قائمة الموبايل (فتح / إغلاق + منع التمرير)
========================================================= */
function toggleMenu() {
    const navLinks = document.querySelector(".navbar-links");
    const menuIcon = document.querySelector(".mobile-menu-icon i");
    const body = document.body;

    // تبديل حالة القائمة
    navLinks.classList.toggle("open");

    // إذا كانت مفتوحة
    if (navLinks.classList.contains("open")) {
        menuIcon.classList.replace("fa-bars", "fa-times");
        body.style.overflow = "hidden"; // منع التمرير
    } else {
        menuIcon.classList.replace("fa-times", "fa-bars");
        body.style.overflow = "auto"; // إعادة التمرير
    }
}

/* ========================================================= دعم الوصول (Accessibility) للقائمة المنسدلة
========================================================= */
(function () {
    function initNavAccessibility() {
        const dropdowns = document.querySelectorAll(".dropdown");

        dropdowns.forEach((dd) => {
            const trigger = dd.querySelector("a");
            const submenu = dd.querySelector("ul");

            if (!trigger) return;

            trigger.setAttribute("aria-expanded", "false");
            trigger.setAttribute("role", "button");

            // عند الضغط
            trigger.addEventListener("click", (e) => {
                if (!submenu) return;

                e.preventDefault();

                const isOpen = trigger.getAttribute("aria-expanded") === "true";

                trigger.setAttribute("aria-expanded", String(!isOpen));
                dd.classList.toggle("open", !isOpen);
            });

            // دعم لوحة المفاتيح
            trigger.addEventListener("keydown", (e) => {
                if (!submenu) return;

                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    trigger.click();
                }

                if (e.key === "Escape") {
                    dd.classList.remove("open");
                    trigger.setAttribute("aria-expanded", "false");
                }
            });
        });
    }

    document.addEventListener("DOMContentLoaded", initNavAccessibility);
})();

/* ========================================================= مراقبة قسم المجالات (IntersectionObserver)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".category-card");
    const tabContainers = document.querySelectorAll(".sub-tabs-container");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            // 1. تمييز البطاقة النشطة
            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");

            // 2. إظهار الأزرار الفرعية المناسبة
            const target = card.dataset.main;
            tabContainers.forEach(container => {
                container.style.display = container.id === `${target}-tabs` ? "flex" : "none";
            });

            // تفعيل أول زر فرعي تلقائياً
            const firstBtn = document.getElementById(`${target}-tabs`).querySelector('.sub-btn');
            if (firstBtn) firstBtn.click();
        });
    });

    // كود الفلترة للأزرار الفرعية (كما سبق)
    document.querySelectorAll(".sub-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".sub-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            // تنفيذ فلترة معرض الصور هنا...
        });
    });
});
/* =========================================================
    قسم الخدمات (التبويبات الرئيسية + الفرعية)
========================================================= */
const mainTabs = document.querySelectorAll(".cat-btn");
const subGroups = document.querySelectorAll(".sub-categories");
const subTabs = document.querySelectorAll(".sub-btn");
const cards = document.querySelectorAll(".service-card");

let currentMain = "products";
let currentSub = "web";

/* تفعيل التبويب الرئيسي */
function activateMain(mainValue) {
    currentMain = mainValue;

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
            currentSub = firstSub.dataset.sub;

            group.querySelectorAll(".sub-btn").forEach(b =>
                b.classList.remove("active")
            );
            firstSub.classList.add("active");
        }
    });

    filterCards();
}

/* تفعيل التبويب الفرعي */
function activateSub(subValue) {
    currentSub = subValue;

    document.querySelectorAll(".sub-categories.active .sub-btn")
        .forEach(btn => {
            btn.classList.toggle("active", btn.dataset.sub === subValue);
        });

    filterCards();
}

/* فلترة الكروت */
function filterCards() {
    cards.forEach(card => {
        const match =
            card.dataset.main === currentMain &&
            card.dataset.sub === currentSub;

        card.classList.toggle("active", match);
    });
}

/* Events */
mainTabs.forEach(btn => {
    btn.addEventListener("click", () =>
        activateMain(btn.dataset.main)
    );
});

subTabs.forEach(btn => {
    btn.addEventListener("click", () =>
        activateSub(btn.dataset.sub)
    );
});

/* تشغيل أولي */
activateMain("products");


/* =========================================================
    تفعيل سلايدر المشاريع (Swiper)
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    if (typeof Swiper === "undefined") return;
    document.addEventListener('DOMContentLoaded', function () {

        const mainBtns = document.querySelectorAll('.main-btn');
        const subTabs = document.getElementById('digital-tabs');
        const subBtns = document.querySelectorAll('.sub-btn');
        const items = document.querySelectorAll('.gallery-item');

        let currentMain = null;

        // فلترة مزدوجة (رئيسي + فرعي)
        function filterItems(main, sub) {
            items.forEach(item => {
                item.classList.remove('show');

                if (
                    item.dataset.main === main &&
                    item.dataset.sub === sub
                ) {
                    item.classList.add('show');
                }
            });
        }

        // عند الضغط على زر رئيسي
        mainBtns.forEach(btn => {

            btn.addEventListener('click', function () {

                mainBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                currentMain = this.dataset.main;

                // إظهار الأزرار الفرعية للمنتجات والخدمات فقط
                if (currentMain === 'products' || currentMain === 'service') {
                    subTabs.classList.add('active');
                } else {
                    subTabs.classList.remove('active');
                }

                // إخفاء جميع العناصر إلى أن يختار فرعي
                items.forEach(item => item.classList.remove('show'));
            });

        });

        // عند الضغط على زر فرعي
        subBtns.forEach(btn => {

            btn.addEventListener('click', function () {

                subBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const subType = this.dataset.sub;

                if (currentMain) {
                    filterItems(currentMain, subType);
                }

            });

        });

    });

    new Swiper(".projects-swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 33,
            },
        },
    });
});

//للتعرف على الكروت

document.addEventListener("DOMContentLoaded", function() {
    // إعداد مراقب الظهور (Intersection Observer)
    const revealOption = {
        threshold: 0.15 // يظهر العنصر عندما يظهر 15% منه على الشاشة
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOption);

    // العناصر التي نريد تطبيق الحركة عليها
    const elementsToReveal = document.querySelectorAll(
        '.service-card, .feature-item, .field-card, .stat-card, .hero-content'
    );

    elementsToReveal.forEach(el => {
        el.classList.add('reveal'); // إضافة كلاس الإخفاء الأولي
        revealObserver.observe(el);
    });
});

function toggleMenu() {
    const navbar = document.querySelector('.navbar-links');
    const overlay = document.querySelector('.overlay');

    navbar.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

/* إغلاق عند الضغط على الخلفية */
document.querySelector('.overlay').addEventListener('click', function() {
    document.querySelector('.navbar-links').classList.remove('open');
    this.classList.remove('active');
    document.body.classList.remove('menu-open');
});



