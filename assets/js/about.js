

//قسم خاص بصفحة من نحن فقط،ى




/* أنيميشن الظهور */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in, .slide-in-right, .slide-in-left').forEach(el => observer.observe(el));

/* سلايدر الشهادات */
const certs = [
    { icon: 'fas fa-certificate', title: 'شهادة الجهة الحكومية', desc: 'نقطة صعود معتمدة من الجهات الرسمية في المملكة العربية السعودية وفق أعلى معايير الجودة والامتثال.' },
    { icon: 'fas fa-stamp', title: 'ترخيص وزارة التجارة', desc: 'حاصلون على ترخيص رسمي من وزارة التجارة السعودية لممارسة نشاط تطوير البرمجيات والحلول التقنية.' },
    { icon: 'fas fa-award', title: 'شهادة الجودة ISO', desc: 'نلتزم بمعايير الجودة الدولية في جميع خدماتنا ومنتجاتنا، ضماناً لأعلى مستويات رضا العملاء.' },
    { icon: 'fas fa-shield-alt', title: 'عضوية هيئة الاتصالات', desc: 'أعضاء معتمدون في هيئة الاتصالات وتقنية المعلومات بالمملكة العربية السعودية.' },
    { icon: 'fas fa-trophy', title: 'شهادة التميز التقني', desc: 'حصلنا على شهادة التميز التقني تقديراً لإسهاماتنا في تطوير قطاع التقنية بالمملكة.' },
];
let certIdx = 0;
function updateCert() {
    const c = certs[certIdx];
    const v = document.getElementById('cert-visual');
    v.style.opacity = '0';
    setTimeout(() => {
        document.getElementById('cert-icon').className = c.icon;
        document.getElementById('cert-title').textContent = c.title;
        document.getElementById('cert-desc').textContent = c.desc;
        document.getElementById('cert-count').textContent = (certIdx + 1) + ' / ' + certs.length;
        v.setAttribute('aria-label', 'شهادة ' + (certIdx + 1) + ' من ' + certs.length + ': ' + c.title);
        v.style.opacity = '1'; v.style.transition = 'opacity .4s ease';
    }, 280);
}
function nextCert() { certIdx = (certIdx + 1) % certs.length; updateCert(); }
function prevCert() { certIdx = (certIdx - 1 + certs.length) % certs.length; updateCert(); }
setInterval(nextCert, 4500);
document.getElementById('cert-next').addEventListener('click', nextCert);
document.getElementById('cert-prev').addEventListener('click', prevCert);
updateCert();


