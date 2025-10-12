import React from "react";
import "./ProfileSidebar.css";

const ProfileSidebar = ({ active, onClose }) => {
  return (
    <div className={`profile-sidebar ${active ? "active" : ""}`}>
      <div className="profile-sidebar-header">
        <h2>👤 Tvoj profil</h2>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
      </div>

      <div className="profile-sidebar-content">
        <div className="profile-section">
          <img
            src="https://i.pinimg.com/736x/b0/9e/ff/b09eff5c3f6fef96a21b0f474de01d43.jpg"
            alt="Profile"
            className="profile-avatar"
          />
          <h3>Ajdin Alihodžić</h3>
          <p>💼 Web Developer | Mentor</p>
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

