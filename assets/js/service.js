const tabs = document.querySelectorAll(".tab-btn");
const sidebars = document.querySelectorAll(".sidebar-filters");

function renderServices(type) {
    const container = document.getElementById("services-container");

    const filtered = services.filter(s => s.type === type);

    container.innerHTML = filtered.map(createCard).join("");
}

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.tab;

        tabs.forEach((t) => {
            t.classList.remove("active");
            t.setAttribute("aria-selected", "false");
        });

        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        sidebars.forEach((sidebar) => {
            sidebar.classList.toggle(
                "hidden",
                sidebar.dataset.sidebar !== target
            );
        });

        renderServices(target);
    });
});

renderServices("work");