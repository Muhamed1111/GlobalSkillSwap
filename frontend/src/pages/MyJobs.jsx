import React, { useContext, useState } from "react";
import { JobContext } from "../context/JobContext";
import { getApplicants } from "../services/jobApi";
import "../style/myjobs.css";

const MyJobs = () => {
  const { myJobs, removeJob, fetchMyJobs } = useContext(JobContext);
  const [applicants, setApplicants] = useState({});
  const [loading, setLoading] = useState(false);

  // 🗑️ Brisanje posla
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await removeJob(id);
      fetchMyJobs();
    } catch (err) {
      alert("❌ Failed to delete job!");
    }
  };

  // 👥 Pregled prijavljenih kandidata
  const handleViewApplicants = async (id) => {
    setLoading(true);
    try {
      const data = await getApplicants(id);
      setApplicants((prev) => ({ ...prev, [id]: data }));
    } catch {
      alert("❌ Failed to fetch applicants!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-jobs-wrapper">
      <h1 className="gradient-text">🧳 My Jobs</h1>

      {myJobs.length === 0 ? (
        <p className="empty-text">You haven’t posted any jobs yet.</p>
      ) : (
        <div className="my-jobs-grid">
          {myJobs.map((job) => (
            <div key={job.id} className="my-job-card">
              <h2>{job.title}</h2>
              <p><strong>🏢 Company:</strong> {job.companyName}</p>
              <p><strong>📍 Location:</strong> {job.location}</p>
              <p><strong>💼 Type:</strong> {job.employmentType}</p>
              <p><strong>💰 Salary:</strong> {job.salary} €</p>
              <p><strong>🕒 Posted:</strong> 
                {job.postedAt
                  ? new Date(job.postedAt).toLocaleDateString()
                  : "N/A"}
              </p>
              <p><strong>📝 Description:</strong> {job.description}</p>

              <div className="job-actions">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(job.id)}
                >
                  🗑️ Delete
                </button>
                <button
                  className="view-btn"
                  onClick={() => handleViewApplicants(job.id)}
                >
                  👥 View Applicants
                </button>
              </div>

              {loading && <p>Loading applicants...</p>}

              {applicants[job.id] && (
                <div className="applicant-list">
                  <h4>Applicants:</h4>
                  {applicants[job.id].length === 0 ? (
                    <p>No one has applied yet.</p>
                  ) : (
                    <ul>
                      {applicants[job.id].map((app) => (
                        <li key={app.id}>
                          <strong>{app.user?.name}</strong> –{" "}
                          {app.user?.email || "no email"}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
