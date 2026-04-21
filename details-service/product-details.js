const productsData = {
    1: {
        title: "نظام إداري",
        price: "2000",
        desc: "نظام إداري متكامل...",
        image: "../public/images/erp-system.jpg",
        includes: ["لوحة تحكم شاملة", "إدارة المستخدمين", "تقارير وإحصائيات", "دعم فني مستمر"],
        compareFeatures: [
            { name: "الدعم الفني",       us: true,  them: true  },
            { name: "تقديم استشارات",   us: true,  them: true  },
            { name: "دراسة مشروع",      us: true,  them: true  },
            { name: "دعم تشغيل",        us: true,  them: false },
            { name: "ضمان الجودة",      us: true,  them: false },
            { name: "دعم ما بعد التسليم", us: true, them: false },
        ],
        faqs: [
            { q: "كيف طريقة سداد الرسوم؟",   a: "يمكن الدفع عبر البطاقات الائتمانية أو التحويل البنكي." },
            { q: "كم مدة التسليم؟",           a: "تتراوح مدة التسليم بين 2 إلى 4 أسابيع حسب المتطلبات." },
            { q: "هل يوجد دعم بعد التسليم؟", a: "نعم، نوفر دعماً فنياً لمدة شهر كامل بعد التسليم." },
            { q: "هل يمكن تعديل النظام لاحقاً؟", a: "نعم، النظام مرن وقابل للتوسعة في أي وقت." },
        ]
    },
    2: {
        title: "موقع تعريفي",
        price: "2000",
        desc: "نصمّم لك موقعًا تعريفيًا يعكس هوية علامتك التجارية...",
        image: "../public/images/web-dev.jpg",
        includes: [
            "تصميم صفحة رئيسية + صفحات (عنّا، خدماتنا، تواصل معنا)",
            "نموذج تواصل مخصص",
            "ربط بحسابات التواصل الاجتماعي",
            "تصميم متجاوب للجوال والأجهزة اللوحية",
            "استخدام لوحة تحكم لتحديث المحتوى (عند الطلب)",
            "دعم فني لمدة شهر بعد التسليم"
        ],
        compareFeatures: [
            { name: "الدعم الفني",          us: true, them: true  },
            { name: "تقديم استشارات",       us: true, them: true  },
            { name: "دراسة مشروع",          us: true, them: true  },
            { name: "دعم تشغيل",            us: true, them: false },
            { name: "تصميم مخصص",           us: true, them: false },
            { name: "دعم ما بعد التسليم",   us: true, them: false },
        ],
        faqs: [
            { q: "كيف طريقة سداد الرسوم؟",        a: "يمكن الدفع عبر البطاقات الائتمانية أو البنك الإلكتروني." },
            { q: "كم مدة تصميم الموقع؟",           a: "تتراوح المدة بين أسبوعين إلى 4 أسابيع حسب الصفحات المطلوبة." },
            { q: "من هم الفئة المستهدفة؟",         a: "الشركات والجمعيات التي تحتاج حضوراً رقمياً احترافياً." },
            { q: "هل يشترط خبرة تقنية للإدارة؟",  a: "لا، لوحة التحكم سهلة ولا تحتاج خبرة برمجية." },
            { q: "هل يوجد دعم من مرشدين؟",        a: "نعم، نوفر دعماً فنياً كاملاً خلال فترة الضمان." },
        ]
    },
    3: {
        title: "موقع تجاري",
        price: "2000",
        desc: "موقع تجاري متكامل لعرض منتجاتك وخدماتك...",
        image: "../public/images/ecommerce.jpg",
        includes: ["تصميم صفحة المنتجات", "سلة تسوق متكاملة", "بوابة دفع إلكتروني", "لوحة إدارة المنتجات"],
        compareFeatures: [
            { name: "الدعم الفني",        us: true, them: true  },
            { name: "تقديم استشارات",     us: true, them: true  },
            { name: "دراسة مشروع",        us: true, them: true  },
            { name: "بوابة دفع",          us: true, them: false },
            { name: "لوحة تحكم متكاملة", us: true, them: false },
            { name: "دعم ما بعد التسليم", us: true, them: false },
        ],
        faqs: [
            { q: "كيف طريقة سداد الرسوم؟",     a: "يمكن الدفع عبر البطاقات الائتمانية أو التحويل البنكي." },
            { q: "كم مدة تطوير الموقع التجاري؟", a: "من 3 إلى 6 أسابيع حسب عدد المنتجات والمتطلبات." },
            { q: "هل يدعم الدفع الإلكتروني؟",   a: "نعم، ندمج بوابات الدفع السعودية المعتمدة." },
            { q: "هل يمكن إضافة منتجات لاحقاً؟", a: "نعم، لوحة التحكم تتيح إضافة وتعديل المنتجات بسهولة." },
        ]
    },
    5: {
        title: "تطوير مواقع إلكترونية",
        price: "1500",
        desc: "تطوير مواقع احترافية بأحدث التقنيات...",
        image: "../public/images/hero-main.jpg",
        includes: ["تطوير بأحدث التقنيات", "تصميم متجاوب", "سرعة تحميل عالية", "تحسين محركات البحث SEO"],
        compareFeatures: [
            { name: "الدعم الفني",    us: true, them: true  },
            { name: "استشارات تقنية", us: true, them: false },
            { name: "دراسة مشروع",   us: true, them: true  },
            { name: "SEO محسّن",      us: true, them: false },
            { name: "أداء عالي",      us: true, them: false },
            { name: "دعم مستمر",      us: true, them: false },
        ],
        faqs: [
            { q: "كيف طريقة سداد الرسوم؟",         a: "يمكن الدفع عبر البطاقات الائتمانية أو التحويل البنكي." },
            { q: "ما التقنيات المستخدمة؟",          a: "نستخدم أحدث التقنيات مثل React وNode.js وغيرها." },
            { q: "هل يدعم محركات البحث؟",           a: "نعم، كل موقع نطوره محسّن لـ SEO من الأساس." },
            { q: "هل يمكن تطوير الموقع لاحقاً؟",   a: "نعم، نصمم البنية لتكون قابلة للتوسع." },
        ]
    }
};

const id = new URLSearchParams(window.location.search).get('id');
const data = productsData[id];

if (!data) {
    window.location.href = "../service.html";
} else {
    // العناصر الأساسية
    document.querySelector('.pd-title').textContent  = data.title;
    document.querySelector('.pd-price').textContent  = data.price;
    document.querySelector('.pd-desc').textContent   = data.desc;
    document.querySelector('.pd-image').src          = data.image;
    document.querySelector('.pd-includes').innerHTML =
        data.includes.map(i => `<li>${i}</li>`).join('');

    // جدول المقارنة
    document.querySelector('.pd-compare-body').innerHTML =
        data.compareFeatures.map(f => `
            <tr>
                <td class="feature-name">${f.name}</td>
                <td class="featured-us">
                    <span class="${f.us ? 'icon-check-gold' : 'icon-x'}">${f.us ? '✔' : '✖'}</span>
                </td>
                <td class="others-cell">
                    <span class="${f.them ? 'icon-check-gray' : 'icon-x'}">${f.them ? '✔' : '✖'}</span>
                </td>
            </tr>`).join('');

    // الأسئلة الشائعة
    document.querySelector('.pd-faqs').innerHTML =
        data.faqs.map(f => `
            <li>
                <div class="choose-text">
                    <h4>${f.q}</h4>
                    <p>${f.a}</p>
                </div>
            </li>`).join('');
}