import React, { useState } from "react";
import "../style/SendRequestModal.css"
const SendRequestModal = ({ user, onClose, onSend }) => {
  const [skill, setSkill] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!skill) return alert("Choose a skill!");
    onSend(skill, message);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Send Request to {user.name}</h3>

        <label>Skill you want to learn</label>
        <input
          type="text"
          placeholder="e.g., Web Development"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />

        <label>Message (optional)</label>
        <textarea
          placeholder="Explain your goal..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="send-btn" onClick={handleSubmit}>
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendRequestModal;
