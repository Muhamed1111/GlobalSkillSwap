import React, { createContext, useState } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [myJobs, setMyJobs] = useState([]);

  const addJob = (job) => {
    console.log("✅ Dodajem posao:", job);
    setMyJobs((prev) => [...prev, { ...job, id: Date.now() }]);
  };

  return (
    <JobContext.Provider value={{ myJobs, addJob }}>
      {children}
    </JobContext.Provider>
  );
};
