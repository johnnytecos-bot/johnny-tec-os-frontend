function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function renderContacts(contacts, filterText = "") {
  const list = document.getElementById("contact-list");
  const filtered = contacts.filter((c) =>
    c.contact_name.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filtered.length === 0) {
    list.innerHTML = `<div class="empty-state">No conversations yet.<br/>Once someone messages your WhatsApp number, they'll show up here.</div>`;
    return;
  }

  list.innerHTML = "";
  filtered.forEach((c) => {
    const row = document.createElement("div");
    row.className = "contact-row";
    row.innerHTML = `
      <div class="contact-avatar">${initials(c.contact_name)}</div>
      <div class="contact-info">
        <div class="contact-top-row">
          <span class="contact-name">${c.contact_name}</span>
          <span class="contact-time">${formatTime(c.last_timestamp)}</span>
        </div>
        <div class="contact-preview">
          ${c.last_role === "assistant" ? '<span class="from-ai">Johnny:</span>' : ""}
          <span>${c.last_message}</span>
        </div>
      </div>
    `;
    row.addEventListener("click", () => {
      window.location.href = `chat-detail.html?contact=${encodeURIComponent(c.contact_name)}`;
    });
    list.appendChild(row);
  });
}

async function initChatsPage() {
  const contacts = await fetchContacts();
  renderContacts(contacts);

  document.getElementById("chat-search").addEventListener("input", (e) => {
    renderContacts(contacts, e.target.value);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav("chats");
  initCenterButton();
  initChatsPage();
});
