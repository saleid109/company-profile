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
