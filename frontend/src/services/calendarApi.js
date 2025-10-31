import { authHeaders } from "./api";

const API_BASE = "http://localhost:8080"; 

export async function getMyCalendar(from, to) {
  const res = await fetch(
    `${API_BASE}/api/calendar/my?from=${from}&to=${to}`,
    {
      headers: authHeaders(),
    }
  );

  if (!res.ok) {
    const text = await res.text(); 
    console.error("Calendar fetch error response:", text);
    throw new Error("Greška pri dohvaćanju kalendara");
  }
  return res.json();
}

export async function addCalendarEvent({ title, date }) {
  const res = await fetch(`${API_BASE}/api/calendar/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ title, date }),
  });

  if (!res.ok) {
    const text = await res.text(); 
    console.error("Calendar add error response:", text);
    throw new Error("Greška pri dodavanju događaja");
  }

  return res.json();
}
