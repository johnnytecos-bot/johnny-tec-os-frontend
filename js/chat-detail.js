function getContactFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("contact") || "";
}

function formatBubbleTime(isoString) {
  return new Date(isoString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDayLabel(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) return "Today";
  return date.toLocaleDateString([], { month: "long", day: "numeric" });
}

function renderMessages(messages) {
  const thread = document.getElementById("message-thread");

  if (messages.length === 0) {
    thread.innerHTML = `<div class="empty-state">No messages yet with this contact.</div>`;
    return;
  }

  thread.innerHTML = "";
  let lastDay = null;

  messages.forEach((msg) => {
    const day = formatDayLabel(msg.created_at);
    if (day !== lastDay) {
      const divider = document.createElement("div");
      divider.className = "day-divider";
      divider.textContent = day;
      thread.appendChild(divider);
      lastDay = day;
    }

    const row = document.createElement("div");
    row.className = `message-row ${msg.role === "assistant" ? "from-ai" : "from-user"}`;
    row.innerHTML = `
      <div class="bubble">
        ${msg.content}
        <div class="bubble-time">${formatBubbleTime(msg.created_at)}</div>
      </div>
    `;
    thread.appendChild(row);
  });

  thread.scrollTop = thread.scrollHeight;
}

async function initChatDetailPage() {
  const contact = getContactFromUrl();
  document.getElementById("chat-detail-name").textContent = contact || "Unknown contact";

  const messages = await fetchContactMessages(contact);
  renderMessages(messages);
}

document.addEventListener("DOMContentLoaded", () => {
  initChatDetailPage();
});
  
