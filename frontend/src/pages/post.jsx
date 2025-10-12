import React, { useState, useContext } from "react";
import { JobContext } from "../context/JobContext";
import "./post.css";

const Post = () => {
  const { addJob } = useContext(JobContext);
  const [form, setForm] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    employmentType: "",
    salaryRange: "",
    jobDescription: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.jobTitle || !form.companyName) {
      setStatus("error");
      return;
    }

    addJob(form);
    setForm({
      jobTitle: "",
      companyName: "",
      location: "",
      employmentType: "",
      salaryRange: "",
      jobDescription: "",
    });
    setStatus("success");
    setTimeout(() => setStatus(""), 2000);
  };

  return (
    <div className="create-job-wrapper">
      <div className="create-job-card">
        <h1 className="gradient-text">Postavi novi posao 💼</h1>
        <form className="create-job-form" onSubmit={handleSubmit}>
          <input
            name="jobTitle"
            placeholder="Naziv posla"
            value={form.jobTitle}
            onChange={handleChange}
          />
          <input
            name="companyName"
            placeholder="Kompanija"
            value={form.companyName}
            onChange={handleChange}
          />
          <input
            name="location"
            placeholder="Lokacija"
            value={form.location}
            onChange={handleChange}
          />
          <input
            name="employmentType"
            placeholder="Tip zaposlenja"
            value={form.employmentType}
            onChange={handleChange}
          />
          <input
            name="salaryRange"
            placeholder="Plata"
            value={form.salaryRange}
            onChange={handleChange}
          />
          <textarea
            name="jobDescription"
            placeholder="Opis posla..."
            value={form.jobDescription}
            onChange={handleChange}
          />
          <button type="submit" className="create-job-btn">
            📤 Objavi posao
          </button>
        </form>

        {status === "success" && (
          <div className="success-popup">✅ Posao dodan u My Jobs!</div>
        )}
        {status === "error" && (
          <div className="error-popup">⚠️ Popuni obavezna polja!</div>
        )}
      </div>
    </div>
  );
};

export default Post;
