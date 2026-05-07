document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scroll
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {

            const href = this.getAttribute('href');

            if (href !== '#') {

                const targetElement = document.querySelector(href);

                if (targetElement) {

                    e.preventDefault();

                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.main-nav');

    if (navbar) {

        window.addEventListener('scroll', () => {

            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(0, 2, 91, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.backgroundColor = 'transparent';
                navbar.style.boxShadow = 'none';
            }
        });

    }

    console.log('Nuqta Suud - Contact Page Loaded Successfully');

});

// تحديد إحداثيات مركز الخريطة (خط الطول والعرض)
const map = L.map('map').setView([24.7136, 46.6753], 10); // إحداثيات الرياض كمثال

// إضافة شكل الخريطة من OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// إضافة علامة للمركز الأول
const marker1 = L.marker([24.7136, 46.6753]).addTo(map);
marker1.bindPopup("<b>الفرع الرئيسي</b><br>نقطة صعود - الرياض").openPopup();

// إضافة علامة للمركز الثاني
const marker2 = L.marker([24.7742, 46.7385]).addTo(map);
marker2.bindPopup("<b>فرع التدريب</b><br>حي الصحافة");
