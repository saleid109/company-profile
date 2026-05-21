// ============================================
// قاعدة بيانات الخدمات الموحدة
// ============================================
const productsData = {
    1: {
        title: "نظام إداري",
        price: "2,000",
        desc: "نظام إداري متكامل يساعدك على إدارة عملياتك بكفاءة عالية، مع لوحة تحكم شاملة وتقارير دقيقة.",
        image: "../public/images/erp-system.jpg", // تأكدي من صحة المسار
        includes: ["لوحة تحكم شاملة", "إدارة المستخدمين", "تقارير تفصيلية", "نسخ احتياطي"],
        faqs: [
            { q: "كيف طريقة سداد الرسوم؟", a: "عبر البطاقات الائتمانية أو التحويل البنكي." },
            { q: "هل يوجد دعم فني؟", a: "نعم، نوفر دعماً فنياً على مدار الساعة." }
        ]
    },
    2: {
        title: "موقع تعريفي لجمعية",
        price: "2,000",
        desc: "نصمّم لك موقعًا تعريفيًا يعكس هوية علامتك التجارية بأسلوب عصري وأنيق. يهدف الموقع إلى تعريف العملاء بخدماتك، تعزيز حضورك الرقمي، وزيادة فرص التواصل مع جمهورك المستهدف.",
        image: "../public/images/hero-main.jpg", // تأكدي من صحة المسار
        includes: ["تصميم متجاوب", "نموذج تواصل", "ربط التواصل الاجتماعي", "دعم فني شهر"],
        faqs: [
            { q: "كم مدة التصميم؟", a: "من أسبوعين إلى 4 أسابيع." },
            { q: "هل يشترط خبرة؟", a: "لا، لوحة التحكم سهلة جداً." }
        ]
    },
    3: {
        title: "موقع تجاري",
        price: "2,000",
        desc: "موقع تجاري متكامل لعرض منتجاتك وخدماتك مع بوابة دفع إلكتروني وإدارة سهلة للمنتجات.",
        image: "../public/images/ecommerce.jpg", // تأكدي من صحة المسار
        includes: ["سلة تسوق", "بوابة دفع", "إدارة منتجات", "تقارير مبيعات"],
        faqs: [
            { q: "هل يدعم الدفع الإلكتروني؟", a: "نعم، ندمج بوابات الدفع المعتمدة." }
        ]
    },
    4: {
        title: "تأهيل لسوق العمل",
        price: "مجاني",
        desc: "برنامج تدريبي مكثف لتأهيل الكفاءات الوطنية في مجال التسويق الرقمي والتقنية دعماً لرؤية المملكة 2030.",
        image: "../public/images/work-rehab.jpg", // تأكدي من صحة المسار
        includes: ["تدريب عملي", "مشاريع واقعية", "شهادة إتمام", "توجيه مهني"],
        faqs: [
            { q: "من هم المستهدفون؟", a: "الخريجون والباحثون عن عمل في المجال التقني." }
        ]
    },
    5: {
        title: "تطوير مواقع إلكترونية",
        price: "1,500",
        desc: "تطوير مواقع احترافية بأحدث التقنيات مع تصميم متجاوب وسرعة تحميل عالية لضمان أفضل تجربة مستخدم.",
        image: "../public/images/web-dev.jpg", // تأكدي من صحة المسار
        includes: ["React/Node.js", "SEO محسّن", "أداء عالي", "دعم مستمر"],
        faqs: [
            { q: "ما التقنيات المستخدمة؟", a: "نستخدم أحدث التقنيات العالمية مثل React و Node.js." }
        ]
    }
};

// ============================================
// منطق عرض البيانات بناءً على الـ ID
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || '2';
    const data = productsData[id];

    if (data) {
        // تحديث النصوص
        const titleEl = document.querySelector('.service-title');
        const priceEl = document.querySelector('.service-price');
        const descEl = document.querySelector('.service-desc');
        const imgEl = document.querySelector('.service-image');

        if (titleEl) titleEl.textContent = data.title;
        if (priceEl) priceEl.textContent = data.price;
        if (descEl) descEl.textContent = data.desc;
        if (imgEl) imgEl.src = data.image;

        // تحديث قائمة "يشمل"
        const includesList = document.querySelector('.service-includes');
        if (includesList) {
            includesList.innerHTML = data.includes.map(i => `<li>${i}</li>`).join('');
        }

        // تحديث الأسئلة الشائعة
        const faqList = document.querySelector('.pd-faqs');
        if (faqList) {
            faqList.innerHTML = data.faqs.map((f, idx) => `
                <li class="${idx === 0 ? 'open' : ''}">
                    <div class="faq-header">
                        <div class="faq-chevron"><i class="fas fa-chevron-down"></i></div>
                        <h4>${f.q}</h4>
                    </div>
                    <div class="faq-body"><p>${f.a}</p></div>
                </li>
            `).join('');
            setupAccordion();
        }
    }
});

function setupAccordion() {
    document.querySelectorAll('.faq-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains('open');

            document.querySelectorAll('.pd-faqs li').forEach(li => li.classList.remove('open'));

            if (!isOpen) item.classList.add('open');
        });
    });
}
//دالة لتبديل حالة السؤال في الأسئلة الشائعة
function toggleFaq(btn) {
    const item = btn.closest('.wd-faq-item');
    const answer = item.querySelector('.wd-faq-answer');
    const isOpen = answer.classList.contains('open');

    // أغلق جميع الإجابات + ارجع كل الأسهم
    document.querySelectorAll('.wd-faq-answer.open').forEach(el => {
        el.classList.remove('open');
    });
    document.querySelectorAll('.wd-faq-btn i').forEach(icon => {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    });

    // افتح المحدد وحرّك سهمه
    if (!isOpen) {
        answer.classList.add('open');
        btn.querySelector('i').classList.remove('fa-chevron-down');
        btn.querySelector('i').classList.add('fa-chevron-up');
    }
}