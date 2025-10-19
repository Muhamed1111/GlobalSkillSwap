import React, { createContext, useState, useEffect } from "react";
import { getMyJobs, createJob, getAllJobs, deleteJob } from "../services/api";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [myJobs, setMyJobs] = useState([]);
  const [jobs,setJobs] = useState([]);

  const fetchAllJobs  = async () =>{
    try{
      const data = await getAllJobs();
      setJobs(data);   
    }catch(err){
      console.error("❌ Error fetching jobs:", err);
    }
  }



  const fetchMyJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const data = await getMyJobs(token);
      setMyJobs(data);
    } catch (err) {
      console.error("❌ Error fetching jobs:", err);
    }
  };

  const addJob = async (jobData) => {
    try {
      const token = localStorage.getItem("token");
      await createJob(jobData, token);
      await fetchMyJobs();
    } catch (err) {
      console.error("❌ Error adding job:", err);
    }
  };
  const removeJob= async(jobId)=>{
    try{
      const token = localStorage.getItem("token");
      await deleteJob(jobId,token);
      await fetchMyJobs();
    }catch (err){
      console.error("❌ Error deleting job:", err);
    }
  }

  useEffect(() => {
    fetchMyJobs();
  }, []);
  useEffect(()=>{
    fetchAllJobs();
  },[])
  return (
    <JobContext.Provider value={{ myJobs, addJob, jobs ,removeJob,fetchMyJobs,fetchAllJobs}}>
      {children}
    </JobContext.Provider>
  );
};
