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
document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".fields-section");

    if (!section) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll(".field-card");
                    cards.forEach((card) => card.classList.add("show"));

                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 },
    );

    observer.observe(section);
});

/* =========================================================
    قسم الخدمات (التبويبات الرئيسية + الفرعية)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const mainBtns = document.querySelectorAll(".main-btn");
    const subTabsContainers = document.querySelectorAll(".sub-tabs");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const subBtns = document.querySelectorAll(".sub-btn");

    // 1. تبديل التبويبات الرئيسية (المنتجات، الخدمات، التأهيل)
    mainBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            // تغيير زر الحالة النشطة
            mainBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            // إخفاء كل مجموعات الأزرار الفرعية
            subTabsContainers.forEach((container) => container.classList.remove("active"));

            // إظهار المجموعة المناسبة بناءً على data-main
            const targetId = `${btn.getAttribute("data-main")}-tabs`;
            const targetContainer = document.getElementById(targetId);
            if (targetContainer) {
                targetContainer.classList.add("active");

                // اختيار أول زر فرعي تلقائياً في المجموعة المفتوحة (اختياري)
                const firstSubBtn = targetContainer.querySelector(".sub-btn");
                if (firstSubBtn) firstSubBtn.click();
            }
        });
    });

    // 2. فلترة المعرض عند الضغط على الأزرار الفرعية
    subBtns.forEach((sBtn) => {
        sBtn.addEventListener("click", () => {
            // تغيير حالة الزر الفرعي النشط
            subBtns.forEach((b) => b.classList.remove("active"));
            sBtn.classList.add("active");

            const filter = sBtn.getAttribute("data-filter");

            galleryItems.forEach((item) => {
                if (item.getAttribute("data-category") === filter) {
                    item.style.display = "block";
                    setTimeout(() => item.classList.add("show"), 10);
                } else {
                    item.classList.remove("show");
                    item.style.display = "none";
                }
            });
        });
    });
});

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
