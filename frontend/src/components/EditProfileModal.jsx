import React, { useState, useEffect } from "react";
import "../style/EditProfileModal.css";
import { updateProfile } from "../services/profileApi";


const EditProfileModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    education: "",
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateProfile(formData);
      alert("✅ Profil uspješno ažuriran!");
      onSave(updated); // osvježi parent (ProfileSidebar)
      onClose();
    } catch (err) {
      console.error("❌ Greška pri ažuriranju:", err);
      alert("Došlo je do greške prilikom čuvanja promjena.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="edit-modal"
        onClick={(e) => e.stopPropagation()} // spriječi zatvaranje klikom unutra
      >
        <h2>✏️ Uredi profil</h2>

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Obrazovanje</label>
          <input
            name="education"
            value={formData.education || ""}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button type="submit" className="save-btn">💾 Sačuvaj</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              ✖ Otkaži
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
