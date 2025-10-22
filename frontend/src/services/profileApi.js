import { authHeaders } from "./api";


export async function updateProfile(userData) {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:8080/api/me/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) throw new Error("Greška pri ažuriranju profila");
  return response.json();
}
