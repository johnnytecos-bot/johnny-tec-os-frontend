const QUICK_ACTIONS = [
  { label: "View live status", target: "index.html" },
  { label: "Open chats", target: "pages/chats.html" },
  { label: "View memory", target: "pages/memory.html" },
  { label: "Automations", target: "pages/automations.html" }
];

function initCenterButton() {
  const btn = document.getElementById("nav-center-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const existing = document.getElementById("quick-action-sheet");
    if (existing) {
      existing.remove();
      return;
    }

    const sheet = document.createElement("div");
    sheet.id = "quick-action-sheet";
    sheet.className = "quick-action-sheet";

    QUICK_ACTIONS.forEach((item) => {
      const option = document.createElement("button");
      option.className = "quick-action-option";
      option.textContent = item.label;
      option.addEventListener("click", () => {
        window.location.href = resolveNavTarget(item.target);
      });
      sheet.appendChild(option);
    });

    document.querySelector(".app-frame").appendChild(sheet);
  });
}
