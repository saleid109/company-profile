/* =========================================================
    JavaScript لتفعيل القوائم المنسدلة - الجوال والآيباد
========================================================= */

// ✅ 1. فتح/إغلاق القائمة الجانبية في الجوال
function toggleMenu() {
    const navbar = document.querySelector('.navbar-links');
    const overlay = document.querySelector('.overlay');
    const icon = document.querySelector('.mobile-menu-icon i');
    
    if (navbar && overlay) {
        navbar.classList.toggle('open');
        overlay.classList.toggle('active');
        
        // تغيير الأيقونة
        if (icon) {
            if (navbar.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        }
    }
}

// ✅ 2. إغلاق القائمة عند النقر على الطبقة المعتمة
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            const navbar = document.querySelector('.navbar-links');
            const icon = document.querySelector('.mobile-menu-icon i');
            
            if (navbar) {
                navbar.classList.remove('open');
                this.classList.remove('active');
                
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }
});

// ✅ 3. فتح/إغلاق القوائم الفرعية (Mega Menu) في الجوال
document.addEventListener('DOMContentLoaded', function() {
    // فقط في الجوال (عرض أقل من 768px)
    if (window.innerWidth < 768) {
        const megaMenuLinks = document.querySelectorAll('.nav-menu li.has-mega > a');
        
        megaMenuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // منع الانتقال للرابط
                e.preventDefault();
                e.stopPropagation();
                
                // إضافة/إزالة class active
                this.classList.toggle('active');
                
                // فتح/إغلاق القائمة الفرعية
                const megaMenu = this.nextElementSibling;
                if (megaMenu && megaMenu.classList.contains('mega-menu-content')) {
                    megaMenu.classList.toggle('open');
                }
                
                // إغلاق القوائم الفرعية الأخرى
                megaMenuLinks.forEach(otherLink => {
                    if (otherLink !== this) {
                        otherLink.classList.remove('active');
                        const otherMenu = otherLink.nextElementSibling;
                        if (otherMenu) {
                            otherMenu.classList.remove('open');
                        }
                    }
                });
            });
        });
    }
});

// ✅ 4. إعادة ضبط القوائم عند تغيير حجم الشاشة
window.addEventListener('resize', function() {
    const navbar = document.querySelector('.navbar-links');
    const overlay = document.querySelector('.overlay');
    const megaMenus = document.querySelectorAll('.mega-menu-content');
    const megaLinks = document.querySelectorAll('.nav-menu li.has-mega > a');
    
    // إذا أصبحت الشاشة أكبر من 768px
    if (window.innerWidth >= 768) {
        if (navbar) navbar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        
        // إزالة جميع الـ classes من القوائم الفرعية
        megaMenus.forEach(menu => menu.classList.remove('open'));
        megaLinks.forEach(link => link.classList.remove('active'));
    }
});

// ✅ 5. منع scroll عند فتح القائمة الجانبية
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar-links');
    
    if (navbar) {
        // استخدام MutationObserver لمراقبة التغييرات
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (navbar.classList.contains('open')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                }
            });
        });
        
        observer.observe(navbar, { attributes: true });
    }
});

// ✅ 6. إغلاق القائمة عند النقر على أي رابط (ما عدا القوائم الفرعية)
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.nav-menu li:not(.has-mega) a');
    const navbar = document.querySelector('.navbar-links');
    const overlay = document.querySelector('.overlay');
    const icon = document.querySelector('.mobile-menu-icon i');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                if (navbar) navbar.classList.remove('open');
                if (overlay) overlay.classList.remove('active');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    });
});

// ✅ 7. دعم لوحة المفاتيح (Accessibility)
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar-links');
    const overlay = document.querySelector('.overlay');
    
    // ESC لإغلاق القائمة
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbar && navbar.classList.contains('open')) {
            navbar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
            
            const icon = document.querySelector('.mobile-menu-icon i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });
});

console.log('✅ Navigation scripts loaded successfully');