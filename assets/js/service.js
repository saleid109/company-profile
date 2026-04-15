/**
*   - تفاعلية صفحة الخدمات
*     تبديل علامات التبويب، وإظهار/إخفاء الفلاتر، وتحديثات إمكانية الوصول.

*/

document.addEventListener('DOMContentLoaded', () => {
// الحالة الابتدائية: عرض علامة التبويب الأولى فقط وشريطها الجانبي المقابل
initializePage();

});


/**
* تهيئة حالة الصفحة عند التحميل
*/
function initializePage() {
// إخفاء جميع الأشرطة الجانبية باستثناء الشريط الأول (العمل)
const sidebars = ['sidebar-work', 'sidebar-digital', 'sidebar-apps']; sidebars.forEach(id => {
const el = document.getElementById(id);
if (el) {
if (id === 'sidebar-work') {
el.classList.remove('hidden');
} else {
el.classList.add('hidden');
}
}
});


/ إخفاء جميع لوحات التبويب باستثناء الأولى
const panels = ['panel-work', 'panel-digital', 'panel-products'];

panels.forEach(id => {
const el = document.getElementById(id);
if (el) {
if (id === 'panel-work') {
el.classList.remove('hidden');
} else {
el.classList.add('hidden');
}
}
});

}

/**
* التبديل بين علامات تبويب الخدمات
* @param {string} tabName - اسم علامة التبويب المراد التبديل إليها (العمل، الرقمي، المنتجات)
* @param {HTMLElement} clickedBtn - عنصر الزر الذي تم النقر عليه
*/
function switchServiceTab(tabName, clickedBtn) {
// 1. تحديث حالة الأزرار (المرئية وإمكانية الوصول)
const allTabBtns = document.querySelectorAll('.tab-btn');

allTabBtns.forEach(btn => {
btn.classList.remove('active');
btn.setAttribute('aria-selected', 'false');
});
clickedBtn.classList.add('active');
clickedBtn.setAttribute('aria-selected', 'true');

// 2. تحديث رؤية لوحات التبويب
const panels = {
'work': 'panel-work',
'digital': 'panel-digital',
'products': 'panel-products'
};

Object.values(panels).forEach(id => {
const panel = document.getElementById(id);
if (panel) panel.classList.add('hidden');
});

const activePanel = document.getElementById(panels[tabName]);

if (activePanel) activePanel.classList.remove('hidden');


// 3. تحديث رؤية فلاتر الشريط الجانبي
// المنطق: 'work' يُظهر الشريط الجانبي الخاص بالعمل، والباقي يُظهر الشريط الجانبي الخاص بالتطبيقات الرقمية
const sidebarWork = document.getElementById('sidebar-work');

const sidebarDigital = document.getElementById('sidebar-digital');
const sidebarApps = document.getElementById('sidebar-apps');

if (tabName === 'work') {
sidebarWork?.classList.remove('hidden');
sidebarDigital?.classList.add('hidden');
sidebarApps?.classList.add('hidden');
} else {
sidebarWork?.classList.add('hidden');
sidebarDigital?.classList.remove('hidden');
sidebarApps?.classList.remove('hidden');

}
}

/**
* تبديل رؤية مجموعات التصفية (نمط الأكورديون)
* @param {HTMLElement} legendElement - مفتاح التصفية أو الزر الذي يُفعّل التبديل
*/
function toggleFilterGroup(legendElement) {
const filterGroup = legendElement.closest('.filter-group');
if (filterGroup) {
filterGroup.classList.toggle('collapsed');

// تحديث حالة ARIA الموسعة إن وجدت
const button = legendElement.querySelector('button') || legendElement;

if (button.hasAttribute('aria-expanded')) {
const isExpanded = button.getAttribute('aria-expanded') === 'true';
button.setAttribute('aria-expanded', !isExpanded);
}
}
}

/**
* مسح جميع عوامل التصفية المحددة في الشريط الجانبي
*/
function clearAllFilters() {
const sidebar = document.querySelector('.sidebar');
if (sidebar) {
const inputs = sidebar.querySelectorAll('input[type="checkbox"], input[type="radio"]');
inputs.forEach(input => {
input.checked = false;
});
}
}