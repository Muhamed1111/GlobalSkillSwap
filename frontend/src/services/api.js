const API_URL = "http://localhost:8080/api/auth";
const API_MAIN = "http://localhost:8080/api"
// --- LOGIN ---
export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Login failed");

  if (data.token) localStorage.setItem("token", data.token);
  return data;
}

// --- SIGNUP ---
export async function signupUser(name, surname, username, email, password, education, isActive = true) {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, surname, username, email, password, education, isActive }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Signup failed");

  if (data.token) localStorage.setItem("token", data.token);
  return data;
}

// --- VERIFY TOKEN ---
export async function verifyToken() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await fetch(`${API_URL}/verify`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Invalid token");

  return data.email; // vraća email korisnika
}

// --- LOGOUT ---
export function logoutUser() {
  localStorage.removeItem("token");
}
function authHeaders() {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export async function getMyScore() {
  const res = await fetch(`${API_MAIN}/me/score`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch score");
  return res.json();
}

export async function getSkills() {
  const res = await fetch(`${API_MAIN}/skills`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}
export async function getLeaderBoard(){
  const res = await fetch("http://localhost:8080/api/me/leaderboard",{
    headers:authHeaders(),
  })
  if(!res.ok) throw new Error("Failed to fetch leaderboard");
  return res.json();
} 

export async function getMentors(){
  const token = localStorage.getItem("token");
  const res = await fetch ("http://localhost:8080/api/me/leaderboard",{
    headers:{Authorization: `Bearer ${token}`},
  });
  if(!res.ok) throw new Error("Failed to fetch mentors");
  return res.json();
}



export async function getAllJobs() {
  const res = await fetch(`${API_MAIN}/jobs`, {
    method: "GET",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return await res.json();
}

// promijeni ako deployaš backend


export const getMyJobs = async (token) => {
  const res = await fetch(`${API_MAIN}/jobs/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch your jobs");
  return await res.json();
};

export async function createJob(jobData) {
  const response = await fetch("http://localhost:8080/api/jobs", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(jobData),
  });


  if (!response.ok) {
    const msg = await response.text();
    console.error("Backend error:", msg);
    throw new Error("Failed to post job");
  }

  return response.json();
}


// === 🔔 NOTIFICATIONS API ===

// 🔹 Dohvati sve notifikacije za prijavljenog korisnika
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

