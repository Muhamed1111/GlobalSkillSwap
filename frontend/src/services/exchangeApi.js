import { authHeaders } from "./api";

const BASE_URL = "http://localhost:8080/api/exchange";

export async function sendSkillRequest(receiverId, skill, message) {
  const res = await fetch(`${BASE_URL}/request`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ receiverId, skill, message })
  });
  if (!res.ok) throw new Error("Failed to send request");
  return res.json();
}
