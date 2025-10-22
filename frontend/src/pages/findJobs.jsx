import React, { useContext, useState } from "react";
import { JobContext } from "../context/JobContext";
import { applyToJob } from "../services/jobApi";
import "../style/myjobs.css";

const FindJobs = () => {
  const { jobs } = useContext(JobContext);
  const [applied, setApplied] = useState({});

  const handleApply = async (jobId) => {
    try {
      await applyToJob(jobId);
      setApplied((prev) => ({ ...prev, [jobId]: true }));
    } catch (err) {
      alert("❌ You already applied or something went wrong!");
    }
  };

  return (
    <div className="my-jobs-wrapper">
      <h1 className="gradient-text">💼 Available Jobs</h1>

      {jobs.length === 0 ? (
        <p className="empty-text">No jobs available yet.</p>
      ) : (
        <div className="my-jobs-grid">
          {jobs.map((job) => (
            <div key={job.id} className="my-job-card">
              <h2>{job.title}</h2>
              <p><strong>🏢 Company:</strong> {job.companyName}</p>
              <p><strong>📍 Location:</strong> {job.location}</p>
              <p><strong>💼 Type:</strong> {job.employmentType}</p>
              <p><strong>💰 Salary:</strong> {job.salary} €</p>
              <p><strong>📝 Description:</strong> {job.description}</p>

              <button
                className="apply-btn"
                onClick={() => handleApply(job.id)}
                disabled={applied[job.id]}
              >
                {applied[job.id] ? "✅ Applied" : "📩 Apply"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindJobs;
