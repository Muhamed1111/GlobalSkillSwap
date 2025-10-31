import React, { useState } from "react";
import "../style/Calendar.css";

export default function CalendarModal({ open, onClose, onSubmit, defaultDate }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(defaultDate || "");

  if (!open) return null;

  return (
    <div className="calmodal-backdrop" onClick={onClose}>
      <div className="calmodal-card" onClick={(e) => e.stopPropagation()}>
        <h3>Dodaj događaj</h3>
        <label>
          Naslov
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="npr. Java lesson with Muhamed" />
        </label>
        <label>
          Datum
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <div className="calmodal-actions">
          <button onClick={onClose} className="btn-secondary">Otkaži</button>
          <button onClick={() => onSubmit({ title, date })} className="btn-primary">Spremi</button>
        </div>
      </div>
    </div>
  );
}
