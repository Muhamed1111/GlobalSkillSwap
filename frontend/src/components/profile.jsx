import React from "react";
import "../style/profile.css";
import { useNotifications } from "../context/NotificationContext";

const ProfileCard = ({user, onChatOpen}) => {

  const { sendRequestToMentor } = useNotifications();


  return (
    <div className="mentor-card">
      <img src={user.avatar} alt={user.name} className="mentor-avatar" />
      <h3>{user.name}</h3>
      <p className="mentor-bio">{user.bio}</p>

      <div className="mentor-stats">
        <div>
          <span>{user.points}</span>
          <p>SkillPoints</p>
        </div>
        <div>
          <span>{user.lessons}</span>
          <p>Lessons</p>
        </div>
        <div>
          <span>⭐ {user.rating}</span>
          <p>Rating</p>
        </div>
      </div>

      {/* 💬 Dugme za otvaranje chat prozora */}
      <button
        className="chat-btn"
        onClick={() => onChatOpen(user)}
      >
        💬 Chat
      </button>
       <button className="request-btn" onClick={() => sendRequestToMentor(user.id)}>
                📩 Send request
      </button>
    </div>
  );
};

export default ProfileCard;

