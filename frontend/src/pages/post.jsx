import React, { useState, useContext } from "react";
import { JobContext } from "../context/JobContext";
import "../style/post.css";

const Post = () => {
  const { addJob } = useContext(JobContext);
  const [form, setForm] = useState({
    title: "",
    companyName: "",
    location: "",
    employmentType: "",
    salary: "",
    description: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.companyName) {
      setStatus("error");
      return;
    }

    try {
      await addJob(form);
      setStatus("success");
      setForm({
        title: "",
        companyName: "",
        location: "",
        employmentType: "",
        salary: "",
        description: "",
      });
      setTimeout(() => setStatus(""), 2000);
    } catch (err) {
      console.error("❌ Error while posting job:", err);
      setStatus("error");
    }
  };

  return (
    <div className="create-job-wrapper">
      <div className="create-job-card">
        <h1 className="gradient-text">Post Job 💼</h1>

        <form className="create-job-form" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Job title"
            value={form.title}
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
          />
          <input
            name="employmentType"
            placeholder="Type of employment"
            value={form.employmentType}
            onChange={handleChange}
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary (€)"
            value={form.salary}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Job description..."
            value={form.description}
            onChange={handleChange}
            rows={5}
          />

          <button type="submit" className="create-job-btn">
            📤 Post job
          </button>
        </form>

        {status === "success" && (
          <div className="status success">✅ Successfully posted!</div>
        )}
        {status === "error" && (
          <div className="status error">⚠️ Please fill all required fields.</div>
        )}
      </div>
    </div>
  );
};

export default Post;
