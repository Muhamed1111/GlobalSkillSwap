import {authHeaders} from "./api";

export async function getNotifications(userId) {
  const res = await fetch(`http://localhost:8080/api/notifications/user/${userId}`, {
    method: "GET",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}

// 🔹 Pošalji novu notifikaciju (student -> mentor)
export async function sendNotification(receiverId, type = "REQUEST") {
  const token = localStorage.getItem("token");
  console.log(token);
  const payload = {
    userId: receiverId, // mentor ID
    title: "Skill Exchange Request",
    type,
    redirectUrl: "/requests",
  };

  const res = await fetch("http://localhost:8080/api/notifications/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to send notification");
  return res.json();
}

// 🔹 Obriši notifikaciju
export async function deleteNotification(id) {
  const res = await fetch(`http://localhost:8080/api/notifications/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete notification");
  return res.text();
}