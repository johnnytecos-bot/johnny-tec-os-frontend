const SERVICE_META = {
  backend: {
    label: "Backend",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="6" rx="1"/><rect x="3" y="14" width="18" height="6" rx="1"/><path d="M7 7h.01M7 17h.01"/></svg>`
  },
  supabase: {
    label: "Supabase",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>`
  },
  groq: {
    label: "Groq AI",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.5 3a4.5 4.5 0 0 0-4.5 4.5v9A4.5 4.5 0 0 0 9.5 21M14.5 3A4.5 4.5 0 0 1 19 7.5v9a4.5 4.5 0 0 1-4.5 4.5"/></svg>`
  },
  gemini: {
    label: "Gemini AI",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>`
  },
  whatsapp: {
    label: "WhatsApp",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.4 8.4 0 0 1-8.4 8.4H3l2.2-4.4A8.4 8.4 0 1 1 21 11.5z"/></svg>`
  },
  vapi: {
    label: "Vapi Calls",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.4c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg>`
  }
};

function renderServiceGrid(services) {
  const grid = document.getElementById("service-grid");
  grid.innerHTML = "";

  Object.entries(SERVICE_META).forEach(([key, meta]) => {
    const isOnline = services[key];
    const box = document.createElement("div");
    box.className = "card service-box";
    box.innerHTML = `
      <div class="service-icon" style="color:${isOnline ? "var(--online)" : "var(--offline)"}">${meta.icon}</div>
      <div class="service-name">${meta.label}</div>
      <span class="pill ${isOnline ? "pill-online" : "pill-offline"}">
        <span class="dot"></span>${isOnline ? "Online" : "Offline"}
      </span>
    `;
    grid.appendChild(box);
  });
}

function renderHero(services) {
  const allOnline = Object.values(services).every(Boolean);
  const title = document.getElementById("hero-title");
  const sub = document.getElementById("hero-sub");

  if (allOnline) {
    title.innerHTML = `All Systems <span class="accent">Operational</span>`;
    sub.textContent = "Johnny is ready to assist you 24/7.";
  } else {
    const offlineCount = Object.values(services).filter((v) => !v).length;
    title.innerHTML = `${offlineCount} Service${offlineCount > 1 ? "s" : ""} <span class="accent">Offline</span>`;
    sub.textContent = "Some connections still need to be set up.";
  }
}

function sparklinePath(seed) {
  // Deterministic decorative wave based on a seed value - not real time-series data yet
  const points = [4, 8, 6, 10, 7, 12, 9];
  const step = 100 / (points.length - 1);
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * step},${20 - p}`)
    .join(" ");
}

function renderStats(stats) {
  document.getElementById("stat-messages-today").textContent = stats.messages_today;
  document.getElementById("stat-users-today").textContent = stats.users_today;
  document.getElementById("stat-total-messages").textContent = stats.total_messages;
}

async function initHomePage() {
  const data = await fetchStatus();
  renderHero(data.services);
  renderServiceGrid(data.services);
  renderStats(data.stats);
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav("home");
  initCenterButton();
  initHomePage();
});
