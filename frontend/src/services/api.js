const API_URL = "http://localhost:8080/api/auth"; // ako deployaš backend, promijeni na URL servera

// LOGIN
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Login failed");
  const data = await response.json();

  // Backend vraća token u 'token' polju
  localStorage.setItem("token", data.token);
  return data.token;
};

// SIGNUP
export const signupUser = async (name, surname, username, email, password, education, isActive) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, surname, username, email, password, isActive,education }),
  });

  if (!response.ok) throw new Error("Signup failed");
  const data = await response.json();

  localStorage.setItem("token", data.token);
  return data.token;
};

// VERIFY TOKEN
export const verifyToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await fetch(`${API_URL}/verify`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Invalid token");
  return await response.text(); // backend vraća email iz tokena
};

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("token");
};
