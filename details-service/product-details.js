// ============================================
// بيانات المنتجات
// ============================================
const productsData = {
    1: {
        title: "نظام إداري",
        price: "2,000",
        desc: "نظام إداري متكامل يساعدك على إدارة عملياتك بكفاءة عالية، مع لوحة تحكم شاملة وتقارير دقيقة.",
        image: "../public/images/erp-system.jpg",
        includes: [
            "لوحة تحكم شاملة",
            "إدارة المستخدمين والصلاحيات",
            "تقارير وإحصائيات تفصيلية",
            "نسخ احتياطي تلقائي",
            "دعم فني مستمر"
        ],
        compareFeatures: [
            { name: "الدعم الفني",           us: true,  them: true  },
            { name: "تقديم استشارات",        us: true,  them: true  },
            { name: "دراسة مشروع",           us: true,  them: true  },
            { name: "دعم تشغيل",             us: true,  them: false },
            { name: "ضمان الجودة",           us: true,  them: false },
            { name: "دعم ما بعد التسليم",    us: true,  them: false },
        ],
        faqs: [
            { q: "كيف طريقة سداد الرسوم؟",       a: "يمكن الدفع عبر البطاقات الائتمانية أو التحويل البنكي." },
            { q: "كم مدة التسليم؟",               a: "تتراوح مدة التسليم بين 2 إلى 4 أسابيع حسب المتطلبات." },
            { q: "هل يوجد دعم بعد التسليم؟",     a: "نعم، نوفر دعماً فنياً لمدة شهر كامل بعد التسليم." },
            { q: "هل يمكن تعديل النظام لاحقاً؟", a: "نعم، النظام مرن وقابل للتوسعة في أي وقت." },
        ]
    },
    2: {
        title: "موقع تعريفي لجمعية",
        price: "2,000",
        desc: "نصمّم لك موقعًا تعريفيًا يعكس هوية علامتك التجارية بأسلوب عصري وأنيق. يهدف الموقع إلى تعريف العملاء بخدماتك، تعزيز حضورك الرقمي، وزيادة فرص التواصل مع جمهورك المستهدف. جميع المواقع التي ننفذها متجاوبة مع جميع الأجهزة، وسهلة التحديث، وتراعي أفضل معايير تجربة المستخدم (UX).",
        image: "../public/images/project1.png",
        includes: [
            "تصميم صفحة رئيسية + صفحات (عنّا، خدماتنا، تواصل معنا)",
            "نموذج تواصل مخصص",
            "ربط بحسابات التواصل الاجتماعي",
            "تصميم متجاوب للجوال والأجهزة اللوحية",
            "استخدام لوحة تحكم لتحديث المحتوى (عند الطلب)",
            "دعم فني لمدة شهر بعد التسليم"
        ],
        compareFeatures: [
            { name: "الدعم الفني",           us: true, them: true  },
            { name: "تقديم استشارات",        us: true, them: true  },
            { name: "دراسة مشروع",           us: true, them: true  },
            { name: "دعم تشغيل",             us: true, them: false },
            { name: "تصميم مخصص",            us: true, them: false },
            { name: "دعم ما بعد التسليم",    us: true, them: false },
        ],
        faqs: [
            { q: "كيف طريقة سداد الرسوم؟",           a: "يمكن الدفع عبر البطاقات الائتمانية أو البنك الإلكتروني." },
            { q: "كم مدة تصميم الموقع؟",             a: "تتراوح المدة بين أسبوعين إلى 4 أسابيع حسب الصفحات المطلوبة." },
            { q: "من هم الفئة المستهدفة من البرنامج؟", a: "الشركات والجمعيات التي تحتاج حضوراً رقمياً احترافياً." },
            { q: "هل يشترط خبرة تقنية للإدارة؟",     a: "لا، لوحة التحكم سهلة الاستخدام ولا تحتاج خبرة برمجية." },
            { q: "هل يوجد دعم من مرشدين خلال فترة التعلم؟", a: "نعم، نوفر دعماً فنياً كاملاً خلال فترة الضمان." },
        ]
    },
    3: {
        title: "موقع تجاري",
        price: "2,000",
        desc: "موقع تجاري متكامل لعرض منتجاتك وخدماتك بأفضل صورة مع بوابة دفع إلكتروني وإدارة سهلة للمنتجات.",
        image: "../public/images/ecommerce.jpg",
        includes: [
            "تصميم صفحة المنتجات",
            "سلة تسوق متكاملة",
            "بوابة دفع إلكتروني",
            "لوحة إدارة المنتجات",
            "دعم فني لمدة شهر بعد التسليم"
        ],
        compareFeatures: [
            { name: "الدعم الفني",           us: true, them: true  },
            { name: "تقديم استشارات",        us: true, them: true  },
            { name: "دراسة مشروع",           us: true, them: true  },
            { name: "بوابة دفع",             us: true, them: false },
            { name: "لوحة تحكم متكاملة",    us: true, them: false },
            { name: "دعم ما بعد التسليم",    us: true, them: false },
        ],
        faqs: [
            { q: "كيف طريقة سداد الرسوم؟",        a: "يمكن الدفع عبر البطاقات الائتمانية أو التحويل البنكي." },
            { q: "كم مدة تطوير الموقع التجاري؟",  a: "من 3 إلى 6 أسابيع حسب عدد المنتجات والمتطلبات." },
            { q: "هل يدعم الدفع الإلكتروني؟",    a: "نعم، ندمج بوابات الدفع السعودية المعتمدة." },
            { q: "هل يمكن إضافة منتجات لاحقاً؟", a: "نعم، لوحة التحكم تتيح إضافة وتعديل المنتجات بسهولة." },
        ]
    },
    5: {
        title: "تطوير مواقع إلكترونية",
        price: "1,500",
        desc: "تطوير مواقع احترافية بأحدث التقنيات مع تصميم متجاوب وسرعة تحميل عالية.",
        image: "../public/images/hero-main.jpg",
        includes: [
            "تطوير بأحدث التقنيات",
            "تصميم متجاوب لجميع الأجهزة",
            "سرعة تحميل عالية",
            "تحسين محركات البحث SEO",
            "دعم فني لمدة شهر"
        ],
        compareFeatures: [
            { name: "الدعم الفني",       us: true, them: true  },
            { name: "استشارات تقنية",   us: true, them: false },
            { name: "دراسة مشروع",      us: true, them: true  },
            { name: "SEO محسّن",         us: true, them: false },
            { name: "أداء عالي",         us: true, them: false },
            { name: "دعم مستمر",         us: true, them: false },
        ],
        faqs: [
            { q: "كيف طريقة سداد الرسوم؟",          a: "يمكن الدفع عبر البطاقات الائتمانية أو التحويل البنكي." },
            { q: "ما التقنيات المستخدمة؟",           a: "نستخدم أحدث التقنيات مثل React وNode.js وغيرها." },
            { q: "هل يدعم محركات البحث؟",            a: "نعم، كل موقع نطوره محسّن لـ SEO من الأساس." },
            { q: "هل يمكن تطوير الموقع لاحقاً؟",    a: "نعم، نصمم البنية لتكون قابلة للتوسع." },
        ]
    }
};

// ============================================
// رمز الريال السعودي SVG
// ============================================
const sarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="22" viewBox="0 0 19 22" fill="none">
<path d="M11.3787 19.2525L18.2987 17.6942C18.2187 18.5517 18.0089 19.3791 17.6693 20.1762L10.7653 21.7345C10.8364 20.8656 11.0409 20.0383 11.3787 19.2525ZM17.6693 15.4983L10.7653 17.0567V12.3817L8.61067 12.8718V15.4672C8.61067 15.6995 8.55022 15.9111 8.42933 16.1018L7.30667 17.867C7.008 18.3241 6.608 18.6056 6.10667 18.7113L0 20.0968C0.08 19.2374 0.289778 18.4101 0.629333 17.6148L6.45333 16.2945V13.3478L1.01867 14.5747C1.09867 13.7152 1.30756 12.8936 1.64533 12.1097L6.45333 11.0103V1.92667C7.06133 1.14089 7.78044 0.498667 8.61067 0V10.5343L10.7653 10.0413V3.07133C11.3751 2.28744 12.0889 1.64522 12.9067 1.14467V9.5625L18.2987 8.3385C18.2187 9.19795 18.0089 10.0253 17.6693 10.8205L12.9067 11.9028V14.2262L18.2987 13.0163C18.2187 13.8852 18.0089 14.7126 17.6693 15.4983Z" fill="#F1B709"/>
</svg>`;

// ============================================
// قراءة ID من الـ URL
// ============================================
const id   = new URLSearchParams(window.location.search).get('id');
const data = productsData[id];

if (!data) {
    window.location.href = "../service.html";
} else {

    // --- العنوان والسعر والوصف والصورة ---
    document.querySelector('.service-title')?.setAttribute && null; // safety
    const titleEl = document.querySelector('.heroo-title, .service-title');
    if (titleEl) titleEl.textContent = data.title;

    const priceEl = document.querySelector('.service-price');
    if (priceEl) priceEl.textContent = data.price;

    const descEl = document.querySelector('.service-desc, .hero-description');
    if (descEl) descEl.textContent = data.desc;

    const imgEl = document.querySelector('.hereao-image, .service-image');
    if (imgEl) imgEl.src = data.image;

    // --- قائمة "يشمل" ---
    const includesEl = document.querySelector('.service-includes, .pd-includes');
    if (includesEl) {
        includesEl.innerHTML = data.includes.map(i => `<li>${i}</li>`).join('');
    }

    // --- جدول المقارنة ---
    const compareBody = document.querySelector('.pd-compare-body');
    if (compareBody) {
        compareBody.innerHTML = data.compareFeatures.map(f => `
            <tr>
                <td class="feature-name">${f.name}</td>
                <td class="featured-us">
                    <span class="${f.us ? 'icon-check-gold' : 'icon-x'}">${f.us ? '✔' : '✖'}</span>
                </td>
                <td class="others-cell">
                    <span class="${f.them ? 'icon-check-gray' : 'icon-x'}">${f.them ? '✔' : '✖'}</span>
                </td>
            </tr>`).join('');
    }

    // --- الأسئلة الشائعة (Accordion) ---
    const faqsEl = document.querySelector('.pd-faqs');
    if (faqsEl) {
        faqsEl.innerHTML = data.faqs.map((f, idx) => `
            <li data-faq="${idx}">
                <div class="faq-header">
                    <div class="faq-chevron"><i class="fas fa-chevron-down"></i></div>
                    <h4>${f.q}</h4>
                </div>
                <div class="faq-body">
                    <p>${f.a}</p>
                </div>
            </li>`).join('');

        // Accordion logic
        faqsEl.addEventListener('click', e => {
            const item = e.target.closest('li[data-faq]');
            if (!item) return;
            const isOpen = item.classList.contains('open');

            // أغلق الكل
            faqsEl.querySelectorAll('li').forEach(li => li.classList.remove('open'));

            // افتح المضغوط إن لم يكن مفتوحاً
            if (!isOpen) item.classList.add('open');
        });

        // افتح السؤال الأول تلقائياً
        faqsEl.querySelector('li')?.classList.add('open');
    }
}