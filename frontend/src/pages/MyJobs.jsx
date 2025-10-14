import React, { useContext } from "react";
import { JobContext } from "../context/JobContext";
import "./myjobs.css";

const MyJobs = () => {
  const { myJobs } = useContext(JobContext);

  return (
    <div className="my-jobs-wrapper">
      <h1 className="gradient-text">🧳 My jobs</h1>
      {myJobs.length === 0 ? (
        <p className="empty-text"> No jobs to show!</p>
      ) : (
        <div className="my-jobs-grid">
          {myJobs.map((job) => (
            <div key={job.id} className="my-job-card">
              <h2>{job.jobTitle}</h2>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Location:</strong> {job.location }</p>
              <p><strong>Type:</strong> {job.employmentType }</p>
              <p><strong>Salary:</strong> {job.salaryRange}</p>
              <p><strong>Description:</strong> {job.jobDescription}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
