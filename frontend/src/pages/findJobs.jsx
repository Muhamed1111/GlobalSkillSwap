import React, { useContext } from "react";
import { JobContext } from "../context/JobContext";
import "../style/myjobs.css";

const FindJobs = () => {
  const { jobs } = useContext(JobContext);

  return (
    <div className="my-jobs-wrapper">
      <h1 className="gradient-text">🧳 My Jobs</h1>

      {jobs.length === 0 ? (
        <p className="empty-text">You haven’t posted any jobs yet.</p>
      ) : (
        <div className="my-jobs-grid">
          {jobs.map((job) => (
            <div key={job.id} className="my-job-card">
              <h2>{job.title}</h2>
              <p><strong>🏢 Company:</strong> {job.companyName}</p>
              <p><strong>📍 Location:</strong> {job.location || "Not specified"}</p>
              <p><strong>💼 Type:</strong> {job.employmentType || "Unknown"}</p>
              <p><strong>💰 Salary:</strong> {job.salary ? `${job.salary} €` : "N/A"}</p>
              <p><strong>🕒 Posted:</strong> {new Date(job.postedAt).toLocaleDateString()}</p>
              <p className="job-description">
                <strong>📝 Description:</strong> {job.description || "No description provided."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindJobs;
