export const sendMessage = async (receiverId, content) => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:8080/api/chat/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      receiverId: receiverId,
      content: content,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Backend error:", err);
    throw new Error("Greška u slanju poruke");
  }
  return await res.json();
};

export const getConversation = async (receiverId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:8080/api/chat/${receiverId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Backend error:", err);
    throw new Error("Greška pri dohvatanju poruka");
  }
  return await res.json();
};
