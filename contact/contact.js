document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth scrolling for any internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 2, 91, 0.95)'; /* Using --color-secondary value */
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });

    // 3. Simple animation for contact cards on hover (already handled by CSS, but can add JS logic if needed)
    const cards = document.querySelectorAll('.contact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Potential for more complex animations
        });
    });

    // 4. Form validation placeholder (if a form was added later)
    // Currently the design doesn't show a contact form, but if it did, logic would go here.
    
    console.log('Nuqta Suud - Contact Page Loaded Successfully');
});