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

document.addEventListener("DOMContentLoaded", function () {
    const mainTabsContainer = document.querySelector(".main-tabs");
    const mainBtns = document.querySelectorAll(".main-btn");
    const allTabPanels = document.querySelectorAll(".tab-panel");
    const allSubTabsContainers = document.querySelectorAll(".sub-tabs");

    // دالة لإظهار لوحة تبويب وإخفاء الأخرى
    function showTabPanel(panelId) {
        allTabPanels.forEach(panel => {
            panel.classList.remove("active");
            panel.setAttribute("hidden", "true");
            panel.setAttribute("tabindex", "-1"); // جعل اللوحات غير النشطة غير قابلة للتركيز
        });
        // إخفاء جميع حاويات التبويبات الفرعية بشكل صريح
        allSubTabsContainers.forEach(subTabs => {
            subTabs.classList.remove("active");
        });
        const activePanel = document.getElementById(panelId);
        if (activePanel) {
            activePanel.classList.add("active");
            activePanel.removeAttribute("hidden");
            activePanel.setAttribute("tabindex", "0"); // جعل اللوحة النشطة قابلة للتركيز
            activePanel.focus(); // نقل التركيز إلى لوحة التبويب النشطة

            // تفعيل أول تبويب فرعي إذا كانت اللوحة النشطة تحتوي على تبويبات فرعية
            const subTabsContainer = activePanel.querySelector(".sub-tabs");
            if (subTabsContainer) {
                subTabsContainer.classList.add("active"); // إظهار حاوية التبويبات الفرعية
                const firstSubBtn = subTabsContainer.querySelector(".sub-btn");
                if (firstSubBtn && !firstSubBtn.classList.contains("active")) {
                    firstSubBtn.click(); // تفعيل أول تبويب فرعي تلقائيًا
                }
            }
        }
    }

    // تهيئة التبويبات الرئيسية عند التحميل
    const initialActiveMainBtn = document.querySelector(".main-btn.active");
    if (initialActiveMainBtn) {
        showTabPanel(initialActiveMainBtn.getAttribute("aria-controls"));
    } else if (mainBtns.length > 0) {
        mainBtns[0].classList.add("active");
        mainBtns[0].setAttribute("aria-selected", "true");
        showTabPanel(mainBtns[0].getAttribute("aria-controls"));
    }

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
    document.querySelectorAll(".tab-panel .sub-tabs").forEach(subTabsContainer => {
        subTabsContainer.addEventListener("click", function (event) {
            const clickedSubBtn = event.target.closest(".sub-btn");
            if (!clickedSubBtn) return;

            subTabsContainer.querySelectorAll(".sub-btn").forEach((btn) => {
                btn.classList.remove("active");
                btn.setAttribute("aria-selected", "false");
            });

            clickedSubBtn.classList.add("active");
            clickedSubBtn.setAttribute("aria-selected", "true");

            const targetSubPanelId = clickedSubBtn.getAttribute("aria-controls");
            const parentPanel = clickedSubBtn.closest(".tab-panel"); // لوحة التبويب الرئيسية الحالية

            if (parentPanel) {
                // إخفاء جميع لوحات المحتوى الفرعية (gallery) داخل اللوحة الرئيسية
                parentPanel.querySelectorAll(".services-gallery.tab-panel").forEach(panel => {
                    panel.classList.remove("active");
                    panel.setAttribute("hidden", "true");
                    panel.setAttribute("tabindex", "-1");
                });
                // إظهار لوحة التبويب الفرعية المطابقة
                const targetSubPanel = document.getElementById(targetSubPanelId);
                if (targetSubPanel) {
                    targetSubPanel.classList.add("active");
                    targetSubPanel.removeAttribute("hidden");
                    targetSubPanel.setAttribute("tabindex", "0");
                    targetSubPanel.focus();
                }
            }
            // إظهار لوحة التبويب الفرعية المطابقة
            const targetSubPanel = document.getElementById(targetSubPanelId);
            if (targetSubPanel) {
                targetSubPanel.classList.add("active");
                targetSubPanel.removeAttribute("hidden");
                targetSubPanel.setAttribute("tabindex", "0");
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

  // لجعل لوحات التبويب قابلة للتركيز بواسطة لوحة المفاتيح (عند الحاجة)
  // هذا الجزء يتم التعامل معه الآن داخل دالة showTabPanel

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
