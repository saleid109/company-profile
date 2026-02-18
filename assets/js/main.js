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
document.addEventListener("DOMContentLoaded", function () {
    const mainTabsContainer = document.querySelector(".main-tabs");
    const mainBtns = document.querySelectorAll(".main-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    // دالة لإظهار لوحة تبويب وإخفاء الأخرى
    function showTabPanel(panelId) {
        tabPanels.forEach(panel => {
            panel.classList.remove("active");
            panel.setAttribute("hidden", "true");
        });
        const activePanel = document.getElementById(panelId);
        if (activePanel) {
            activePanel.classList.add("active");
            activePanel.removeAttribute("hidden");
            // نقل التركيز إلى لوحة التبويب النشطة أو أول عنصر تفاعلي فيها
            activePanel.focus(); // قد تحتاج إلى جعل لوحة التبويب قابلة للتركيز (tabindex="-1")
        }
    }

    // دالة لفلترة عناصر المعرض (تستخدم للتبويبات الفرعية)
    function filterGalleryItems(containerId, category) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const items = container.querySelectorAll(".gallery-item");
        items.forEach((item) => {
            item.classList.remove("show");
            if (item.dataset.category === category) {
                item.classList.add("show");
            }
        });
    }

    // تهيئة التبويبات الرئيسية عند التحميل
    mainBtns.forEach((btn) => {
        if (btn.classList.contains("active")) {
            showTabPanel(btn.getAttribute("aria-controls"));
        }
    });

    // عند الضغط على زر تبويب رئيسي
    mainTabsContainer.addEventListener("click", function (event) {
        const clickedBtn = event.target.closest(".main-btn");
        if (!clickedBtn) return;

        mainBtns.forEach((btn) => {
            btn.classList.remove("active");
            btn.setAttribute("aria-selected", "false");
        });

        clickedBtn.classList.add("active");
        clickedBtn.setAttribute("aria-selected", "true");

        const targetPanelId = clickedBtn.getAttribute("aria-controls");
        showTabPanel(targetPanelId);

        // إعادة تهيئة التبويبات الفرعية إذا كانت موجودة في اللوحة الجديدة
        const activePanel = document.getElementById(targetPanelId);
        const subTabsContainer = activePanel ? activePanel.querySelector(".sub-tabs") : null;
        if (subTabsContainer) {
            const firstSubBtn = subTabsContainer.querySelector(".sub-btn");
            if (firstSubBtn) {
                firstSubBtn.click(); // تفعيل أول تبويب فرعي تلقائيًا
            }
        }
    });

    // دعم التنقل بلوحة المفاتيح للتبويبات الرئيسية
    mainTabsContainer.addEventListener("keydown", function (event) {
        const currentActiveBtn = mainTabsContainer.querySelector(".main-btn.active");
        let nextBtn = null;

        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            const btns = Array.from(mainBtns);
            const currentIndex = btns.indexOf(currentActiveBtn);

            if (event.key === "ArrowRight") {
                nextBtn = btns[(currentIndex + 1) % btns.length];
            } else if (event.key === "ArrowLeft") {
                nextBtn = btns[(currentIndex - 1 + btns.length) % btns.length];
            }

            if (nextBtn) {
                nextBtn.focus();
                nextBtn.click();
            }
        }
    });

    // عند الضغط على زر تبويب فرعي (داخل لوحة تبويب رئيسية)
    document.querySelectorAll(".sub-tabs").forEach(subTabsContainer => {
        subTabsContainer.addEventListener("click", function (event) {
            const clickedSubBtn = event.target.closest(".sub-btn");
            if (!clickedSubBtn) return;

            subTabsContainer.querySelectorAll(".sub-btn").forEach((btn) => {
                btn.classList.remove("active");
                btn.setAttribute("aria-selected", "false");
            });

            clickedSubBtn.classList.add("active");
            clickedSubBtn.setAttribute("aria-selected", "true");

            const filterCategory = clickedSubBtn.dataset.filter;
            const parentPanel = clickedSubBtn.closest(".tab-panel"); // لوحة التبويب الرئيسية الحالية
            if (parentPanel) {
                // إخفاء جميع لوحات التبويب الفرعية داخل اللوحة الرئيسية
                parentPanel.querySelectorAll(".services-gallery.tab-panel").forEach(panel => {
                    panel.classList.remove("active");
                    panel.setAttribute("hidden", "true");
                });
                // إظهار لوحة التبويب الفرعية المطابقة
                const targetSubPanel = document.getElementById(clickedSubBtn.getAttribute("aria-controls"));
                if (targetSubPanel) {
                    targetSubPanel.classList.add("active");
                    targetSubPanel.removeAttribute("hidden");
                    targetSubPanel.focus();
                }
            }
        });

        // دعم التنقل بلوحة المفاتيح للتبويبات الفرعية
        subTabsContainer.addEventListener("keydown", function (event) {
            const currentActiveSubBtn = subTabsContainer.querySelector(".sub-btn.active");
            let nextSubBtn = null;

            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                const subBtns = Array.from(subTabsContainer.querySelectorAll(".sub-btn"));
                const currentIndex = subBtns.indexOf(currentActiveSubBtn);

                if (event.key === "ArrowRight") {
                    nextSubBtn = subBtns[(currentIndex + 1) % subBtns.length];
                } else if (event.key === "ArrowLeft") {
                    nextSubBtn = subBtns[(currentIndex - 1 + subBtns.length) % subBtns.length];
                }

                if (nextSubBtn) {
                    nextSubBtn.focus();
                    nextSubBtn.click();
                }
            }
        });
    });

    // لجعل لوحات التبويب قابلة للتركيز بواسطة لوحة المفاتيح
    tabPanels.forEach(panel => {
        panel.setAttribute("tabindex", "0");
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
