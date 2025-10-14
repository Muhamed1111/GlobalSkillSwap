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
        <h1 className="gradient-text">Post job 💼</h1>
        <form className="create-job-form" onSubmit={handleSubmit}>
          <input
            name="jobTitle"
            placeholder="Job title"
            value={form.jobTitle}
            onChange={handleChange}
            required
          />
          <input
            name="companyName"
            placeholder="Company name"
            value={form.companyName}
            onChange={handleChange}
            required
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />
          <input
            name="employmentType"
            placeholder="Type of employement"
            value={form.employmentType}
            onChange={handleChange}
            required
          />
          <input
            name="salaryRange"
            placeholder="Salary"
            value={form.salaryRange}
            onChange={handleChange}
            required
          />
          <textarea
            name="jobDescription"
            placeholder="Job description..."
            value={form.jobDescription}
            onChange={handleChange}
          />
          <button type="submit" className="create-job-btn">
            📤 Post job
          </button>
        </form>

        {status === "success" && (
          <div className="success-popup">✅ Successfully posted!</div>
        )}
        
      </div>
    </div>
  );
};

export default Post;
