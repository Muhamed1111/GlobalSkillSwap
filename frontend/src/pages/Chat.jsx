import React, { useState, useEffect } from "react";
import "./Chat.css";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { username: "Muha", text: "Ej, jesi tu?" },
    { username: "Ajdin", text: "Jesam, brate. Šta ima?" },
    { username: "Muha", text: "Radim na GlobalSkillSwap projektu 💪" },
    { username: "Ajdin", text: "Ludilo, samo naprijed!" },
  ]);
  const [username, setUsername] = useState("Muha");

  useEffect(() => {
    const chatBox = document.getElementById("chat-box");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMsg = { username, text: message };
      setMessages((prev) => [...prev, newMsg]);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">💬 Chat</h2>

      <div id="chat-box" className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.username === username ? "sent" : "received"
            }`}
          >
            <strong className="chat-username">{msg.username}:</strong>
            <span className="chat-text">{msg.text}</span>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="chat-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ime"
          className="chat-input-name"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Poruka..."
          className="chat-input-message"
        />
        <button type="submit" className="chat-send-btn">
          ➤
        </button>
      </form>
    </div>
  );
}

export default Chat;