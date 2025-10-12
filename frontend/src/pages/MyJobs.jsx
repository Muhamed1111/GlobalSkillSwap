import React, { useContext } from "react";
import { JobContext } from "../context/JobContext";
import "./myjobs.css";

const MyJobs = () => {
  const { myJobs } = useContext(JobContext);

  return (
    <div className="my-jobs-wrapper">
      <h1 className="gradient-text">🧳 Moji poslovi</h1>
      {myJobs.length === 0 ? (
        <p className="empty-text">Nema još objavljenih poslova.</p>
      ) : (
        <div className="my-jobs-grid">
          {myJobs.map((job) => (
            <div key={job.id} className="my-job-card">
              <h2>{job.jobTitle}</h2>
              <p><strong>Kompanija:</strong> {job.companyName}</p>
              <p><strong>Lokacija:</strong> {job.location || "Nije navedeno"}</p>
              <p><strong>Tip:</strong> {job.employmentType || "Nije navedeno"}</p>
              <p><strong>Plata:</strong> {job.salaryRange || "Nije navedeno"}</p>
              <p><strong>Opis:</strong> {job.jobDescription || "Nema opisa"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
