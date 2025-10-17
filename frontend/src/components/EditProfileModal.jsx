import React, { useState } from "react";
import "../style/ProfileModal.css"
const EditProfileModal = ({ user, onCloseAll, onClose }) => {
  const [form, setForm] = useState(user);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-card small">
        <div className="modal-header">
          <h2>Uredi profil</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="modal-body edit-form">
          <label>Ime:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />

          <label>Opis:</label>
          <textarea name="bio" rows={4} value={form.bio} onChange={handleChange}></textarea>
        </div>

        <div className="modal-footer">
          <button className="save-btn" onClick={onCloseAll}>💾 Save Changes</button>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;
