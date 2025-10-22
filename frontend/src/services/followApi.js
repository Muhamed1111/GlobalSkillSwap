import { authHeaders } from "./api";

export async function followUser(userId) {
  const res = await fetch(`http://localhost:8080/api/follow/${userId}`, {
    method: "POST",
    headers: authHeaders(),
  });
  return res.json();
}

export async function unfollowUser(userId) {
  const res = await fetch(`http://localhost:8080/api/follow/${userId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res.text();
}

export async function getFollowers(userId) {
  const res = await fetch(`http://localhost:8080/api/follow/followers/${userId}`, {
    headers: authHeaders(),
  });
  return res.json();
}

export async function getFollowing(email) {
  const res = await fetch(`http://localhost:8080/api/follow/followed/${email}`, {
    headers: authHeaders(),
  });
  return res.json();
}
export async  function settingFollowing (userId){
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:8080/api/follow/following/check/${userId}`,{
  headers: authHeaders()
  })
  if(!res.ok) throw new Error ("Jeboga ti");
  return res.json();
}
