const SERVICE_LABELS = {
  backend: "Backend",
  supabase: "Supabase",
  groq: "Groq AI",
  gemini: "Gemini AI",
  whatsapp: "WhatsApp",
  vapi: "Vapi Calls"
};

function renderServiceGrid(services) {
  const grid = document.getElementById("service-grid");
  grid.innerHTML = "";

  Object.entries(SERVICE_LABELS).forEach(([key, label]) => {
    const isOnline = services[key];
    const row = document.createElement("div");
    row.className = "service-row";
    row.innerHTML = `
      <span>${label}</span>
      <span class="pill ${isOnline ? "pill-online" : "pill-offline"}">
        <span class="dot"></span>${isOnline ? "Online" : "Offline"}
      </span>
    `;
    grid.appendChild(row);
  });
}

function renderStats(stats) {
  document.getElementById("stat-messages-today").textContent = stats.messages_today;
  document.getElementById("stat-users-today").textContent = stats.users_today;
  document.getElementById("stat-total-messages").textContent = stats.total_messages;
}

async function initHomePage() {
  const data = await fetchStatus();
  renderServiceGrid(data.services);
  renderStats(data.stats);
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav("home");
  initCenterButton();
  initHomePage();
});
