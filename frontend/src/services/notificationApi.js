
import { authHeaders } from "./api";

const BASE_URL = "http://localhost:8080/api";
export async function getNotifications() {
    const res = await fetch(`${BASE_URL}/notifications/me`, {
        method: "GET",
        headers: authHeaders(),
    });

    if (!res.ok) throw new Error(`Failed to fetch notifications (${res.status})`);
    return res.json();
}

export async function sendNotification(receiverId, type = "REQUEST") {
    const payload = {
        userId: receiverId,
        title: "Skill Exchange Request",
        type,
        redirectUrl: "/requests",
    };
    const res = await fetch(`${BASE_URL}/notifications/send`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Failed to send notification (${res.status})`);
    return res.json();
}

export async function deleteNotification(id) {
    const res = await fetch(`${BASE_URL}/notifications/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error(`Failed to delete notification (${res.status})`);
    return res.text();
}

export async function deleteAllNotifications() {
    const res = await fetch(`${BASE_URL}/notifications/me`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok)
        throw new Error(`Failed to delete all notifications (${res.status})`);
    return res.text();
}