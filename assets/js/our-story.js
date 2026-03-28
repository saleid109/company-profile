
// قسم خاص بصفحة قصتنا فقط، لا يتم تحميله في الصفحات الأخرى

/* أنيميشن الظهور */
if (document.querySelector('.timeline-item')) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.timeline-item').forEach(item => {
        timelineObserver.observe(item);
    });
}