const API_URL = "http://localhost:8080/api/auth";

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
