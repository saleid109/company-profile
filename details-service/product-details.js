// ============================================
// قاعدة بيانات الخدمات الموحدة
// ============================================
const productsData = {
    1: {
        title: "نظام إداري",
        price: "2,000",
        desc: "نظام إداري متكامل يساعدك على إدارة عملياتك بكفاءة عالية، مع لوحة تحكم شاملة وتقارير دقيقة.",
        image: "../public/images/erp-system.jpg",
        includes: ["لوحة تحكم شاملة", "إدارة المستخدمين", "تقارير تفصيلية", "نسخ احتياطي"],
        faqs: [
            { q: "كيف طريقة سداد الرسوم؟", a: "عبر البطاقات الائتمانية أو التحويل البنكي." },
            { q: "هل يوجد دعم فني؟", a: "نعم، نوفر دعماً فنياً على مدار الساعة." }
        ]
    },
    2: {
        title: "موقع تعريفي لجمعية",
        price: "2,000",
        desc: "نصمّم لك موقعًا تعريفيًا يعكس هوية علامتك التجارية بأسلوب عصري وأنيق.",
        image: "../public/images/project1.png",
        includes: ["تصميم متجاوب", "نموذج تواصل", "ربط التواصل الاجتماعي", "دعم فني شهر"],
        faqs: [
            { q: "كم مدة التصميم؟", a: "من أسبوعين إلى 4 أسابيع." },
            { q: "هل يشترط خبرة؟", a: "لا، لوحة التحكم سهلة جداً." }
        ]
    },
    3: {
        title: "موقع تجاري",
        price: "2,000",
        desc: "موقع تجاري متكامل لعرض منتجاتك وخدماتك مع بوابة دفع إلكتروني.",
        image: "../public/images/ecommerce.jpg",
        includes: ["سلة تسوق", "بوابة دفع", "إدارة منتجات", "تقارير مبيعات"],
        faqs: [
            { q: "هل يدعم الدفع الإلكتروني؟", a: "نعم، ندمج بوابات الدفع المعتمدة." }
        ]
    },
    4: {
        title: "تأهيل لسوق العمل",
        price: "مجاني",
        desc: "برنامج تدريبي مكثف لتأهيل الكفاءات الوطنية في مجال التسويق الرقمي والتقنية.",
        image: "../public/images/work-rehab.jpg",
        includes: ["تدريب عملي", "مشاريع واقعية", "شهادة إتمام", "توجيه مهني"],
        faqs: [
            { q: "من هم المستهدفون؟", a: "الخريجون والباحثون عن عمل في المجال التقني." }
        ]
    },
    5: {
        title: "تطوير مواقع إلكترونية",
        price: "1,500",
        desc: "تطوير مواقع احترافية بأحدث التقنيات مع تصميم متجاوب وسرعة تحميل عالية.",
        image: "../public/images/hero-main.jpg",
        includes: ["React/Node.js", "SEO محسّن", "أداء عالي", "دعم مستمر"],
        faqs: [
            { q: "ما التقنيات المستخدمة؟", a: "نستخدم أحدث التقنيات العالمية." }
        ]
    }
};

// ============================================
// منطق عرض البيانات بناءً على الـ ID
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const data = productsData[id];

    if (data) {
        // تحديث العناصر في الصفحة
        document.querySelector('.service-title').textContent = data.title;
        document.querySelector('.service-price').textContent = data.price;
        document.querySelector('.service-desc').textContent = data.desc;
        document.querySelector('.service-image').src = data.image;

        // تحديث القوائم
        const includesList = document.querySelector('.service-includes');
        if (includesList) {
            includesList.innerHTML = data.includes.map(i => `<li>${i}</li>`).join('');
        }

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
    } else {
        // إذا لم يوجد ID، نعود لصفحة الخدمات
        // window.location.href = 'services.html';
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