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

