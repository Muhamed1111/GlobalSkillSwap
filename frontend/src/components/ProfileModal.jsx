import React, { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import "../style/ProfileModal.css";


  const ProfileModal = ({ onClose, onChatOpen }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-card">
        <div className="modal-header">
          <h2>{user.name}</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="modal-body">
          <div className="modal-profile">
            <img src={user.avatar} alt="avatar" className="modal-avatar" />
            <div className="modal-info">
              <h3>🌟 Mentor | Web Developer</h3>
              <p>{user.bio}</p>
              <div className="modal-stats">
                <div><b>{user.points}</b><span>Bodova</span></div>
                <div><b>{user.lessons}</b><span>Časova</span></div>
                <div><b>{user.rating} ⭐</b><span>Ocjena</span></div>
                <button className="chat-btn" onClick={() => onChatOpen(user)}>
                  💬 Chat
                </button>              
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="edit-btn" onClick={() => {
            navi
            setIsEditing(true)}}>✏️ Uredi profil</button>
        </div>
      </div>

      {isEditing && (
        <EditProfileModal
          user={user}
          onCloseAll={() => {
            setIsEditing(false);
            onClose();
          }}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
};
export default ProfileModal;

