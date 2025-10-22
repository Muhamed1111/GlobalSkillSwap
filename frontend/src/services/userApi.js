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

