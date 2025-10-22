import React, { useContext, useEffect, useState } from "react";
import "../style/ProfileSidebar.css";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";

// ✅ JWT parser ostaje u komponenti
export function parseJwt(token) {
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
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = parseJwt(token);
      setDecodedUser(data);
    }
  }, []);

  const userInfo = decodedUser || loggedUser;

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className={`profile-sidebar ${active ? "active" : ""}`}>
      <div className="profile-sidebar-header">
        <h2> Profil </h2>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
      </div>

      <div className="profile-sidebar-content">
        <div className="profile-avatar-section">
          <img
            src="https://i.pravatar.cc/200?img=3"
            alt="Profile"
            className="profile-avatar"
          />
          <h3>{userInfo?.name || "Nepoznat korisnik"}</h3>
          <p className="email">{userInfo?.sub || userInfo?.email || "Email nije pronađen"}</p>
          <p className="username">@{userInfo?.username || "korisnik"}</p>
        </div>

        <div className="profile-stats">
          <div>
            <h4>320</h4>
            <span>Bodova</span>
          </div>
          <div>
            <h4>8</h4>
            <span>Časova</span>
          </div>
          <div>
            <h4>4.9 ⭐</h4>
            <span>Ocjena</span>
          </div>
        </div>

        <button className="edit-btn" onClick={()=>setIsEditing(true)}>
          ✏️ Uredi profil
        </button>
      </div>

      {isEditing && (
  <EditProfileModal
    user={userInfo}
    onClose={() => setIsEditing(false)}
    onSave={(updatedUser) => setDecodedUser(updatedUser)}
  />
)}

      <Link to="/" className="logout-btn" onClick={handleLogout}>
        🚪 Odjavi se
      </Link>
    </div>
  );
};

export default ProfileSidebar;
