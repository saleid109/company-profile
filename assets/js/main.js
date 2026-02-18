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
            if(firstBtn) firstBtn.click();
        });
    });

    // كود الفلترة للأزرار الفرعية (كما سبق)
    document.querySelectorAll(".sub-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".sub-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            // تنفيذ فلترة معرض الصور هنا...
        });
    });
});
/* =========================================================
    قسم الخدمات (التبويبات الرئيسية + الفرعية)
========================================================= */

function switchCategory(event, categoryId) {
    // 1. إخفاء كل محتويات الأقسام
    const contents = document.querySelectorAll('.category-content');
    contents.forEach(content => content.classList.remove('active'));

    // 2. إلغاء تفعيل كل أزرار القائمة الرئيسية
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });

    // 3. تفعيل القسم والزر المختار
    document.getElementById(categoryId).classList.add('active');
    event.currentTarget.classList.add('active');
    event.currentTarget.setAttribute('aria-selected', 'true');
}

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
