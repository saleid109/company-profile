function toggleMenu() {
    const navLinks = document.querySelector('.navbar-links');
    const menuIcon = document.querySelector('.mobile-menu-icon i');

    // تبديل ظهور القائمة
    navLinks.classList.toggle('open');

    // تبديل شكل الأيقونة من (Bars) إلى (X) عند الفتح
    if (navLinks.classList.contains('open')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

/* === Accessibility: keyboard support for dropdowns and nav === */
(function () {
    function initNavAccessibility() {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dd => {
            const trigger = dd.querySelector('a');
            const submenu = dd.querySelector('ul'); // if a submenu exists

            // Ensure aria attributes exist
            trigger.setAttribute('aria-expanded', trigger.getAttribute('aria-expanded') || 'false');
            trigger.setAttribute('role', 'button');

            // Click toggles (only if submenu exists)
            trigger.addEventListener('click', (e) => {
                if (!submenu) return; // allow normal link behavior when no submenu
                e.preventDefault();
                const open = trigger.getAttribute('aria-expanded') === 'true';
                trigger.setAttribute('aria-expanded', String(!open));
                dd.classList.toggle('open', !open);
                if (!open) {
                    // focus first item in submenu
                    const firstMenuItem = submenu.querySelector('a');
                    if (firstMenuItem) firstMenuItem.focus();
                }
            });

            // Keyboard handling
            trigger.addEventListener('keydown', (e) => {
                if (!submenu) return; // nothing to toggle
                switch (e.key) {
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        trigger.click();
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        dd.classList.add('open');
                        trigger.setAttribute('aria-expanded', 'true');
                        const first = submenu.querySelector('a');
                        if (first) first.focus();
                        break;
                    case 'Escape':
                        dd.classList.remove('open');
                        trigger.setAttribute('aria-expanded', 'false');
                        trigger.focus();
                        break;
                }
            });

            // Close on focusout
            dd.addEventListener('focusout', (e) => {
                // if focus moved outside the dropdown
                if (!dd.contains(e.relatedTarget)) {
                    dd.classList.remove('open');
                    trigger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavAccessibility);
    } else {
        initNavAccessibility();
    }
})();

/* === Optional accessibility audit: run axe-core when '?audit=1' in URL (dev only) === */
(function () {
    try {
        if (location.search.indexOf('audit=1') > -1) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.11.2/axe.min.js';
            script.crossOrigin = 'anonymous';
            script.onload = function () {
                // run axe
                if (window.axe) {
                    window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2aa'] } })
                        .then(results => console.log('Axe results:', results))
                        .catch(err => console.error('Axe error:', err));
                }
            };
            document.head.appendChild(script);
        }
    } catch (err) {
        // ignore in production
        console.warn('Accessibility audit loader error', err);
    }
})();
const observeFields = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // تفعيل الحركة للبطاقات داخل القسم
                const cards = entry.target.querySelectorAll('.field-card');
                cards.forEach(card => card.classList.add('show'));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const section = document.querySelector('.fields-section');
    if (section) observer.observe(section);
};

document.addEventListener('DOMContentLoaded', observeFields);
function toggleMenu() {
    const navLinks = document.querySelector('.navbar-links');
    const menuIcon = document.querySelector('.mobile-menu-icon i');
    const body = document.body; // إضافة إشارة للـ body

    navLinks.classList.toggle('open');

    if (navLinks.classList.contains('open')) {
        menuIcon.classList.replace('fa-bars', 'fa-times');
        body.style.overflow = 'hidden'; // منع التمرير عند فتح القائمة
    } else {
        menuIcon.classList.replace('fa-times', 'fa-bars');
        body.style.overflow = 'auto'; // إعادة التمرير عند الإغلاق
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. تغيير الزر النشط
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. فلترة المشاريع
            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // إضافة تأثير ظهور ناعم
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});