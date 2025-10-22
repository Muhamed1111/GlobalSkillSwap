import React, { useEffect, useState } from "react";
import "../style/Follow.css";
import { parseJwt } from "../components/ProfileSidebar";

const API_URL = "http://localhost:8080/api/follow";

const Follow = () => {
  const [activeTab, setActiveTab] = useState("followers");
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  // 🔹 Dekodiraj token i dohvati trenutnog korisnika
  const currentUser = parseJwt(token);
  const currentUserId = currentUser?.id || currentUser?.sub; // koristi id ako postoji, u suprotnom sub

  console.log("🔹 Current user:", currentUser);

  // 🔹 Učitaj followere / following kad se promijeni tab
  useEffect(() => {
    if (!token || !currentUserId) {
      console.warn("⚠️ Missing token or currentUserId, skipping fetch");
      return;
    }

    const url =
      activeTab === "followers"
        ? `${API_URL}/followers/${currentUserId}`
        : `${API_URL}/following/${currentUserId}`;

    console.log("📡 Fetching:", url);
    console.log("🧩 Token:", token?.substring(0, 30) + "...");


    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Received users:", data);
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("❌ Error loading follow data:", err));
  }, [activeTab, token, currentUserId]);

   



  return (
    <div className="follow-page">
      <h1 className="follow-title">Connections</h1>

      <div className="follow-tabs">
        <button
          className={activeTab === "followers" ? "tab active" : "tab"}
          onClick={() => setActiveTab("followers")}
        >
          👥 Followers
        </button>
        <button
          className={activeTab === "following" ? "tab active" : "tab"}
          onClick={() => setActiveTab("following")}
        >
          🔗 Following
        </button>
      </div>

      <div className="follow-table">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="follow-card">
              <img
                src={user.avatar || "https://i.pravatar.cc/150"}
                alt={user.name}
                className="follow-avatar"
              />
              <div className="follow-info">
                <h3>{user.name}</h3>
                <p>@{user.username}</p>
                <p className="email">{user.email}</p>
              </div>

              {activeTab === "following" ? (
                <button className="unfollow-btn">Unfollow</button>
              ) : (
                <button className="follow-back-btn">Follow back</button>
              )}
            </div>
          ))
        ) : (
          <p className="no-results">
            {activeTab === "followers"
              ? "No followers yet 😢"
              : "You are not following anyone yet 😅"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Follow;