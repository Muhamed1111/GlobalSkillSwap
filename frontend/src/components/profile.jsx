import React, { useState, useEffect } from "react";
import "../style/profile.css";
const API_URL = "http://localhost:8080/api/follow";

const ProfileCard = ({ user, onChatOpen, onSendRequest }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to follow users!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${user.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setIsFollowing(true);
      } else {
        const text = await res.text();
        alert(text || "Failed to follow user");
      }
    } catch (err) {
      console.error("❌ Error following user:", err);
    }
  };

  const handleUnfollow = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setIsFollowing(false);
      } else {
        alert("Failed to unfollow user");
      }
    } catch (err) {
      console.error("❌ Error unfollowing user:", err);
    }
  };

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

      <div className="mentor-actions">
        {/* Chat */}
        <button className="chat-btn" onClick={() => onChatOpen(user)}>
          💬 Chat
        </button>

        {/* ✅ Skill Exchange Send Request */}
        <button
          className="request-btn"
          onClick={() => onSendRequest(user)}
        >
          📩 Request
        </button>

        {/* Follow / Unfollow */}
        {!isFollowing ? (
          <button className="follow-btn" onClick={handleFollow}>
            ➕ Follow
          </button>
        ) : (
          <button className="unfollow-btn" onClick={handleUnfollow}>
            ❌ Unfollow
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
