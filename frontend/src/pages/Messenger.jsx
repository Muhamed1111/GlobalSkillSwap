import React, { useEffect, useState } from "react";
import { getAllUsers, getMyId } from "../services/userApi";
import { getConversation, sendMessage } from "../services/chatApi";
import "../style/Messenger.css";

const Messenger = () => {
  const [users, setUsers] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [tokenId, setTokenId] = useState(null);

  // 🔹 Dohvati sve korisnike iz baze
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        if (data.length > 0) setSelectedFriend(data[0]);
      } catch (err) {
        console.error("❌ Greška pri dohvatanju korisnika:", err);
      }
    };
    loadUsers();
  }, []);

  // 🔹 Dohvati trenutnog usera (iz tokena) — tek nakon što su korisnici spremni
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const id = await getMyId(); // npr. 13
        setTokenId(id);
        if (users.length > 0) {
          const foundUser = users.find((u) => u.id === id);
          if (foundUser) {
            setCurrentUser(foundUser);
            console.log("✅ Trenutni korisnik:", foundUser);
          } else {
            console.warn("⚠️ Nema korisnika s ID-om:", id);
          }
        }
      } catch (err) {
        console.error("❌ Token nije validan:", err);
      }
    };
    loadCurrentUser();
  }, [users]); // ⬅️ čeka da se `users` učitaju

  // 🔹 Dohvati konverzaciju sa selektovanim korisnikom
  useEffect(() => {
    if (!selectedFriend) return;
    const loadMessages = async () => {
      try {
        const data = await getConversation(selectedFriend.id);
        setMessages(data);
      } catch (err) {
        console.error("❌ Greška pri dohvatanju poruka:", err);
      }
    };
    loadMessages();
  }, [selectedFriend]);

  // 🔹 Slanje poruke
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedFriend) return;
    try {
      const msg = await sendMessage(selectedFriend.id, newMessage);
      setMessages((prev) => [...prev, msg]);
      setNewMessage("");
    } catch (err) {
      console.error("❌ Greška pri slanju poruke:", err);
    }
  };

  return (
    <div className="messenger-container">
      {/* === Sidebar sa listom korisnika === */}
      <div className="friends-sidebar">
        <div className="sidebar-header">Messenger</div>
        <input className="search-bar" placeholder="Search users..." />
        <div className="friends-list">
          {users.map((u) => (
            <div
              key={u.id}
              className={`friend-item ${
                selectedFriend?.id === u.id ? "active" : ""
              }`}
              onClick={() => setSelectedFriend(u)}
            >
              <img src={`https://i.pravatar.cc/150?u=${u.email}`} alt={u.name} />
              <div className="friend-info">
                <span className="friend-name">
                  {u.name} {u.surname}
                </span>
                <span className="friend-last">{u.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === Glavni chat === */}
      <div className="chat-section">
        {selectedFriend ? (
          <>
            <div className="chat-header">
              <img
                src={`https://i.pravatar.cc/150?u=${selectedFriend.email}`}
                alt={selectedFriend.name}
              />
              <div>
                <h3>
                  {selectedFriend.name} {selectedFriend.surname}
                </h3>
                <p>Online</p>
              </div>
            </div>

            <div className="chat-body">
              {messages.length === 0 ? (
                <p className="no-messages">Nema poruka još.</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`chat-message ${
                      msg.senderId === tokenId ? "sent" : "received"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <span className="msg-time">
                      {new Date(msg.sentAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend}>➤</button>
            </div>
          </>
        ) : (
          <div className="no-chat">Select a user to start chatting</div>
        )}
      </div>

      {/* === Info panel === */}
      {selectedFriend && (
        <div className="info-panel">
          <img
            src={`https://i.pravatar.cc/150?u=${selectedFriend.email}`}
            alt={selectedFriend.name}
            className="info-avatar"
          />
          <h3>
            {selectedFriend.name} {selectedFriend.surname}
          </h3>
          <p>{selectedFriend.email}</p>
          <p>📍 Sarajevo</p>
          <button className="mute-btn">🔕 Mute Notifications</button>
        </div>
      )}
    </div>
  );
};

export default Messenger;
