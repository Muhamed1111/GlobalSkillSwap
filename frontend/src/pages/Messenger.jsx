import React, { useState } from "react";
import "../style/Messenger.css";

const friends = [
  {
    id: 1,
    name: "Ajdin Kurcovelkoski",
    lastMessage: "Ej, jesi tu?",
    time: "1:37 PM",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 2,
    name: "Muhamed Velicanstvenog",
    lastMessage: "Vidimo se sutra!",
    time: "1:25 PM",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "Semir Pionirski",
    lastMessage: "Hvala!",
    time: "1:13 PM",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
];

const dummyMessages = [
  { sender: "friend", text: "Hej, kako si?", time: "2:55 PM" },
  { sender: "me", text: "Odlično, ti?", time: "2:56 PM" },
  { sender: "friend", text: "Radim na novom projektu 💻", time: "2:58 PM" },
  { sender: "me", text: "Super! Pošalji mi detalje kasnije.", time: "2:59 PM" },
];

const Messenger = () => {
  const [selectedFriend, setSelectedFriend] = useState(friends[0]);
  const [messages] = useState(dummyMessages);

  return (
    <div className="messenger-container">
      {/* Sidebar with friends */}
      <div className="friends-sidebar">
        <div className="sidebar-header">Messenger</div>
        <input className="search-bar" placeholder="Search friends..." />
        <div className="friends-list">
          {friends.map((f) => (
            <div
              key={f.id}
              className={`friend-item ${
                selectedFriend.id === f.id ? "active" : ""
              }`}
              onClick={() => setSelectedFriend(f)}
            >
              <img src={f.avatar} alt={f.name} />
              <div className="friend-info">
                <span className="friend-name">{f.name}</span>
                <span className="friend-last">{f.lastMessage}</span>
              </div>
              <span className="friend-time">{f.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="chat-section">
        <div className="chat-header">
          <img src={selectedFriend.avatar} alt={selectedFriend.name} />
          <div>
            <h3>{selectedFriend.name}</h3>
            <p>Online</p>
          </div>
        </div>

        <div className="chat-body">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.sender === "me" ? "sent" : "received"}`}
            >
              <p>{msg.text}</p>
              <span className="msg-time">{msg.time}</span>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input type="text" placeholder="Type a message..." />
          <button>➤</button>
        </div>
      </div>

      {/* Right info panel */}
      <div className="info-panel">
        <img
          src={selectedFriend.avatar}
          alt={selectedFriend.name}
          className="info-avatar"
        />
        <h3>{selectedFriend.name}</h3>
        <p>📞 {selectedFriend.phone || "060-123-456"}</p>
        <p>📍 Sarajevo</p>
        <button className="mute-btn">🔕 Mute Notifications</button>
      </div>
    </div>
  );
};

export default Messenger;
