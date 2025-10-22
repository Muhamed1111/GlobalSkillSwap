import { API_MAIN ,authHeaders} from "./api";
export const getAllUsers = async () =>{ 
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/api/users/all",{
        headers: {
            Authorization : `Bearer ${token}`
        },
        
    })

    if(!res.ok){
        throw new Error("Fetch failed");
    }
    return await res.json();
}
export const getMyId = async () =>{ 
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/api/users/myId",{
        headers: {
            Authorization : `Bearer ${token}`
        },
        
    })

    if(!res.ok){
        throw new Error("Fetch failed");
    }
    return await res.json();
}
export const getCurrentUser = async () => { 
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/api/users/me",{
        headers: {
            Authorization : `Bearer ${token}`
        },
        
    })

    if(!res.ok){
        throw new Error("Fetch failed");
    }
    return await res.json();
}

export async function getSkills() {
  const res = await fetch(`${API_MAIN}/skills`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}


export async function getMentors(){
  const token = localStorage.getItem("token");
  const res = await fetch ("http://localhost:8080/api/me/leaderboard",{
    headers:{Authorization: `Bearer ${token}`},
  });
  if(!res.ok) throw new Error("Failed to fetch mentors");
  return res.json();
}