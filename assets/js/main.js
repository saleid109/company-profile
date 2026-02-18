/* =========================================================
   1️⃣ قائمة الموبايل (فتح / إغلاق + منع التمرير)
========================================================= */
function toggleMenu() {
    const navLinks = document.querySelector('.navbar-links');
    const menuIcon = document.querySelector('.mobile-menu-icon i');
    const body = document.body;

    // تبديل حالة القائمة
    navLinks.classList.toggle('open');

    // إذا كانت مفتوحة
    if (navLinks.classList.contains('open')) {
        menuIcon.classList.replace('fa-bars', 'fa-times');
        body.style.overflow = 'hidden'; // منع التمرير
    } else {
        menuIcon.classList.replace('fa-times', 'fa-bars');
        body.style.overflow = 'auto'; // إعادة التمرير
    }
}


/* =========================================================
   2️⃣ دعم الوصول (Accessibility) للقائمة المنسدلة
========================================================= */
(function () {

    function initNavAccessibility() {

        const dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach(dd => {

            const trigger = dd.querySelector('a');
            const submenu = dd.querySelector('ul');

            if (!trigger) return;

            trigger.setAttribute('aria-expanded', 'false');
            trigger.setAttribute('role', 'button');

            // عند الضغط
            trigger.addEventListener('click', (e) => {

                if (!submenu) return;

                e.preventDefault();

                const isOpen = trigger.getAttribute('aria-expanded') === 'true';

                trigger.setAttribute('aria-expanded', String(!isOpen));
                dd.classList.toggle('open', !isOpen);

            });

            // دعم لوحة المفاتيح
            trigger.addEventListener('keydown', (e) => {

                if (!submenu) return;

                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    trigger.click();
                }

                if (e.key === 'Escape') {
                    dd.classList.remove('open');
                    trigger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    document.addEventListener('DOMContentLoaded', initNavAccessibility);

})();


/* =========================================================
   3️⃣ مراقبة قسم المجالات (IntersectionObserver)
========================================================= */
document.addEventListener('DOMContentLoaded', function () {

    const section = document.querySelector('.fields-section');

    if (!section) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const cards = entry.target.querySelectorAll('.field-card');
                cards.forEach(card => card.classList.add('show'));

                observer.unobserve(entry.target);
            }

        });

    }, { threshold: 0.1 });

    observer.observe(section);
});


/* =========================================================
   4️⃣ قسم الخدمات (التبويبات الرئيسية + الفرعية)
========================================================= */
document.addEventListener('DOMContentLoaded', function () {

    const mainBtns = document.querySelectorAll('.main-btn');
    const subTabs = document.querySelectorAll('.sub-tabs');
    const subBtns = document.querySelectorAll('.sub-btn');
    const items = document.querySelectorAll('.gallery-item');

    // دالة فلترة العناصر
    function filterItems(category) {
        items.forEach(item => {
            item.classList.remove('show');
            if (item.dataset.category === category) {
                item.classList.add('show');
            }
        });
    }

    // دالة إخفاء جميع العناصر
    function hideItems() {
        items.forEach(item => item.classList.remove('show'));
    }

    // عند الضغط على زر رئيسي
    mainBtns.forEach(btn => {

        btn.addEventListener('click', function () {

            // إزالة active من الجميع
            mainBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // إخفاء كل التبويبات الفرعية
            subTabs.forEach(tab => tab.classList.remove('active'));
            subBtns.forEach(b => b.classList.remove('active'));

            const type = this.dataset.main;

            if (type === 'service') {
                document.getElementById('service-tabs').classList.add('active');
                hideItems();
            }

            else if (type === 'training') {
                document.getElementById('training-tabs').classList.add('active');
                hideItems();
            }

            else if (type === 'products') {
                filterItems('products');
            }

        });

    });

    // عند الضغط على زر فرعي
    subBtns.forEach(btn => {

        btn.addEventListener('click', function () {

            subBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            filterItems(this.dataset.filter);

        });

    });

});


/* =========================================================
   5️⃣ تفعيل سلايدر المشاريع (Swiper)
========================================================= */
document.addEventListener('DOMContentLoaded', function () {

    if (typeof Swiper === "undefined") return;

    new Swiper('.projects-swiper', {

        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
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
            }
        }

    });

});
