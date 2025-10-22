import { authHeaders,API_MAIN } from "./api";

export async function getMyScore() {
  const res = await fetch(`${API_MAIN}/me/score`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch score");
  return res.json();
}
export async function getLeaderBoard(){
  const res = await fetch("http://localhost:8080/api/me/leaderboard",{
    headers:authHeaders(),
  })
  if(!res.ok) throw new Error("Failed to fetch leaderboard");
  return res.json();
} 
export const getLedgerHistory = async () =>{
  const token = localStorage.getItem("token");
  if(!token) throw new Error("No token found");
  const res = await fetch ("http://localhost:8080/api/mypoints/ledger",{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  });
  if(!res.ok)throw new Error("Failed to fetch ledger history");
  return await res.json();
}

// === ACHIEVEMENTS API ===

export const getUserAchievements = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found!");

  const res = await fetch("http://localhost:8080/api/me/achievements", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error("Unauthorized: Invalid or expired token");
  }

  if (!res.ok) throw new Error("Failed to fetch achievements");
  return await res.json();
};

// 🔹 Otključaj achievement po ID-u
export const unlockAchievement = async (achievementId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:8080/api/me/achievements/unlock/${achievementId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to unlock achievement");
  }

  return await res.json();
};
