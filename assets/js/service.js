const services = [
    {
        title: "تطوير مواقع إلكترونية",
        category: "web-dev",
        rating: 5,
        image: "./public/images/serviceN.png",
        type: "work",
    },
    {
        title: "برمجة خاصة",
        category: "coding",
        rating: 4,
        image: "./public/images/serviceN.png",
        type: "digital",
        price: 2000,
    },
    {
        title: "قوالب جاهزة",
        category: "templates",
        rating: 5,
        image: "./public/images/serviceN.png",
        type: "products",
        price: 1500,
    },
];

function createCard(service) {
    return `
    <article class="services-card" data-category="${service.category}" data-rating="${service.rating}">
      
      <div class="card-img-wrapper">
        <img src="${service.image}" alt="${service.title}" loading="lazy">
      </div>

      <div class="card-body">

        <div class="card-meta">
          <h3 class="card-label">${service.title}</h3>

          ${service.type === "work"
            ? `<a href="service-detail.html" class="card-details-link">
         التفاصيل <i class="fas fa-chevron-left"></i>
            </a>`
            : `<span class="card-price">${service.price} ﷼</span>`
        }
        </div>

        ${service.type === "work"
            ? `<button class="btn-request-service">طلب الخدمة</button>`
            : `<button class="btn-add-cart">أضف إلى السلة</button>`
        }

    </div>
    </article>
  `;
}
function renderServices(type = "work") {
    const container = document.getElementById("services-container");

    const filtered = services.filter((service) => service.type === type);

    container.innerHTML = filtered.map(createCard).join("");
}

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-tab");

        tabs.forEach((t) => {
            t.classList.remove("active");
            t.setAttribute("aria-selected", "false");
        });

        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        sidebars.forEach((sidebar) => {
            sidebar.classList.toggle(
                "hidden",
                sidebar.getAttribute("data-sidebar") !== target,
            );
        });

        // أهم سطر
        renderServices(target);
    });
});

const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".cards-panel");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.tab;

        tabs.forEach((t) => {
            t.classList.remove("active");
            t.setAttribute("aria-selected", "false");
        });

        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        panels.forEach((panel) => {
            if (panel.id === "panel-" + target) {
                panel.classList.remove("hidden");
            } else {
                panel.classList.add("hidden");
            }
        });
    });
});
