import { authHeaders } from "./api";

const API_URL = "http://localhost:8080/api/exchange";

export async function sendExchangeRequest(receiverId, skill, message, preferredTime) {
  const res = await fetch(`${API_URL}/request`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ receiverId, skill, message, preferredTime }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getIncomingRequests() {
  const res = await fetch(`${API_URL}/incoming`, { headers: authHeaders() });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getOutgoingRequests() {
  const res = await fetch(`${API_URL}/outgoing`, { headers: authHeaders() });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
export async function acceptRequest(id, when) {
  const url = when
    ? `${API_URL}/${id}/accept?when=${encodeURIComponent(when)}`
    : `${API_URL}/${id}/accept`;

  const res = await fetch(url, {
    method: "PUT",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function declineRequest(id) {
  const res = await fetch(`${API_URL}/${id}/decline`, {
    method: "PUT",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.text();
}
export async function scheduledRequest(id,dateTime) {
  const res = await fetch(`${API_URL}/${id}/scheduled?at=${dateTime}`, {
    method : "PUT",
    headers: authHeaders(),
  })
  if(!res.ok){
    console.error("Cant schedule right now")
    throw new Error("Error say",await res.text());
  }
  return res.json();
}