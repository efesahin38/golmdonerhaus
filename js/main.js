function assetPath(path) {
  const base = window.__SITE_BASE__ || "";
  return base + path.replace(/^\//, "");
}

function renderMenu() {
  const nav = document.getElementById("menu-nav");
  const imageEl = document.getElementById("menu-category-image");
  const titleEl = document.getElementById("menu-category-title");
  const listEl = document.getElementById("menu-category-list");
  if (!nav || !imageEl || !titleEl || !listEl) return;

  const showCategory = (catId) => {
    const cat = MENU_CATEGORIES.find((c) => c.id === catId) || MENU_CATEGORIES[0];
    imageEl.classList.add("is-changing");
    const img = new Image();
    img.onload = () => {
      imageEl.src = assetPath(cat.image);
      imageEl.classList.remove("is-changing");
    };
    img.src = assetPath(cat.image);
    imageEl.alt = cat.name;
    titleEl.textContent = cat.name;
    listEl.innerHTML = cat.items
      .map(
        (item) => `
        <li class="menu-item">
          <div class="menu-item-info">
            <span class="menu-item-name">${item.name}</span>
            ${item.desc ? `<span class="menu-item-desc">${item.desc}</span>` : ""}
          </div>
          <span class="menu-item-price">${item.price}</span>
        </li>`
      )
      .join("");
    nav.querySelectorAll(".menu-pill").forEach((p) => {
      p.classList.toggle("active", p.dataset.category === cat.id);
    });
  };

  nav.innerHTML = MENU_CATEGORIES.map(
    (cat, i) =>
      `<button type="button" class="menu-pill${i === 0 ? " active" : ""}" data-category="${cat.id}">${cat.icon} ${cat.name}</button>`
  ).join("");

  nav.querySelectorAll(".menu-pill").forEach((pill) => {
    pill.addEventListener("click", () => showCategory(pill.dataset.category));
  });

  showCategory(MENU_CATEGORIES[0].id);
}

function setupNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");

  const onScroll = () => {
    header?.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener("click", () => {
    const open = nav?.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      nav?.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });

  document.querySelectorAll("[data-order]").forEach((el) => {
    el.setAttribute("href", ORDER_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  setupNav();
});
