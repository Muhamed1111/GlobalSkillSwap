import React, { useContext, useEffect, useState } from "react";
import "../style/ProfileSidebar.css";
import { AuthContext } from "../context/AuthContext";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.log("Invalid token:", err);
    return null;
  }
}

const ProfileSidebar = ({ active, onClose }) => {
  const { user: loggedUser, logout } = useContext(AuthContext);
  const [decodedUser, setDecodedUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = parseJwt(token);
      setDecodedUser(data);
    }
  }, []);

  // ✅ Ako imamo token, koristi podatke iz njega
  // Ako nemamo, koristi AuthContext fallback
  const userInfo = decodedUser || loggedUser;

  return (
    <div className={`profile-sidebar ${active ? "active" : ""}`}>
      <div className="profile-sidebar-header">
        <h2>👤 Tvoj profil</h2>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>

      <div className="profile-sidebar-content">
        <div className="profile-section">
          <img
            src="https://i.pravatar.cc/200?img=3"
            alt="Profile"
            className="profile-avatar"
          />
          <h3>{userInfo?.name || "Nepoznat korisnik"}</h3>
          <p>{userInfo?.sub || userInfo?.email || "Email nije pronađen"}</p>
          <p>{userInfo?.username || "Nema korisničkog imena"}</p>
        </div>

        <div className="stats">
          <div>
            <h4>320</h4>
            <p>Bodova</p>
          </div>
          <div>
            <h4>8</h4>
            <p>Časova</p>
          </div>
          <div>
            <h4>4.9 ⭐</h4>
            <p>Ocjena</p>
          </div>
        </div>

        <button className="edit-btn">✏️ Uredi profil</button>

        <div className="about-section">
          <h4>O meni</h4>
          <p>
            Frontend developer strastven prema učenju i dijeljenju znanja.
            Fokusiran na React, dizajn i moderni web razvoj.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
