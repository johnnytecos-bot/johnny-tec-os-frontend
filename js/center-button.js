const QUICK_ACTIONS = [
  { label: "View live status", action: () => (window.location.href = "index.html") },
  { label: "Open chats", action: () => (window.location.href = "pages/chats.html") },
  { label: "View memory", action: () => (window.location.href = "pages/memory.html") },
  { label: "Automations", action: () => (window.location.href = "pages/automations.html") }
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
      option.addEventListener("click", item.action);
      sheet.appendChild(option);
    });

    document.querySelector(".app-frame").appendChild(sheet);
  });
}
