const NAV_ITEMS = [
  { id: "home", label: "Home", target: "index.html" },
  { id: "chats", label: "Chats", target: "pages/chats.html" },
  { id: "center", label: "", target: null },
  { id: "automations", label: "Automations", target: "pages/automations.html" },
  { id: "memory", label: "Memory", target: "pages/memory.html" }
];

const NAV_ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>`,
  chats: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.4 8.4 0 0 1-8.4 8.4H3l2.2-4.4A8.4 8.4 0 1 1 21 11.5z"/></svg>`,
  automations: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>`,
  memory: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg>`
};

// Works whether the site is hosted at a domain root or a subpath (e.g. GitHub Pages project sites)
function resolveNavTarget(target) {
  const insidePages = window.location.pathname.includes("/pages/");
  if (!insidePages) return target;
  return target.startsWith("pages/") ? target.replace("pages/", "") : `../${target}`;
}

function renderNav(activePage) {
  const nav = document.createElement("div");
  nav.className = "bottom-nav";

  NAV_ITEMS.forEach((item) => {
    if (item.id === "center") {
      const btn = document.createElement("button");
      btn.className = "nav-center";
      btn.id = "nav-center-btn";
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>`;
      nav.appendChild(btn);
      return;
    }

    const btn = document.createElement("button");
    btn.className = "nav-item" + (item.id === activePage ? " active" : "");
    btn.innerHTML = `${NAV_ICONS[item.id]}<span>${item.label}</span>`;
    btn.addEventListener("click", () => {
      if (item.target) window.location.href = resolveNavTarget(item.target);
    });
    nav.appendChild(btn);
  });

  document.querySelector(".app-frame").appendChild(nav);
}
