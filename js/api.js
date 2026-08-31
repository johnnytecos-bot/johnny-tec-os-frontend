const BACKEND_URL = "https://johnny-tec-os.onrender.com";

async function fetchStatus() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/status`);
    if (!response.ok) throw new Error("Backend responded with an error");
    return await response.json();
  } catch (err) {
    // Backend unreachable entirely - everything reads as offline
    return {
      services: {
        backend: false,
        supabase: false,
        groq: false,
        gemini: false,
        whatsapp: false,
        vapi: false
      },
      stats: {
        messages_today: 0,
        users_today: 0,
        total_messages: 0
      }
    };
  }
}
