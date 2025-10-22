import { API_MAIN ,authHeaders} from "./api";
export async function getAllJobs() {
  const res = await fetch(`${API_MAIN}/jobs`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return await res.json();
}

// promijeni ako deployaš backend


export const getMyJobs = async (token) => {
  const res = await fetch(`${API_MAIN}/jobs/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch your jobs");
  return await res.json();
};

export async function createJob(jobData) {
  const response = await fetch("http://localhost:8080/api/jobs", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(jobData),
  });


  if (!response.ok) {
    const msg = await response.text();
    console.error("Backend error:", msg);
    throw new Error("Failed to post job");
  }

  return response.json();
}


export async function applyToJob(jobId){
  const res = await fetch(`${API_MAIN}/jobs/${jobId}/apply`,{
    method:"POST",
    headers: authHeaders(),
  });
  if(!res.ok)throw new Error("Failed to apply");
  return await res.text();
}

export async function getApplicants(jobId){
  const res = await fetch(`${API_MAIN}/jobs/${jobId}/applicants`,{
    method: "GET",
    headers: authHeaders(),
  });
  if(!res.ok) throw new Error("Failed to fetch applicants");
  return await res.json()
}
export async function deleteJob(jobId){
  const res = await fetch(`${API_MAIN}/jobs/${jobId}`,{
    method: "DELETE",
    headers: authHeaders(),
  });
  if(!res.ok) throw new Error("Failed to delete job");
  return await res.text();
}