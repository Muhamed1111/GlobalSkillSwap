import React, { useState, useEffect } from "react";
import "../style/profile.css";
import { useNotifications } from "../context/NotificationContext";

const API_URL = "http://localhost:8080/api/follow"; // prilagodi po potrebi

const ProfileCard = ({ user, onChatOpen }) => {
  const { sendRequestToMentor } = useNotifications();
  const [isFollowing, setIsFollowing] = useState(false);

  // ✅ Učitaj stanje praćenja (da li već pratiš ovog usera)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user?.id) return;

    fetch(`${API_URL}/following/check/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.ok ? res.json() : false)
      .then((data) => setIsFollowing(data.following))
      .catch(() => setIsFollowing(false));
  }, [user?.id]);

  // ✅ Funkcija za Follow
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

  // ✅ Funkcija za Unfollow
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
        {/* 💬 Chat */}
        <button className="chat-btn" onClick={() => onChatOpen(user)}>
          💬 Chat
        </button>

        {/* 📩 Request */}
        <button
          className="request-btn"
          onClick={() => sendRequestToMentor(user.id)}
        >
          📩 Send request
        </button>

        {/* 👥 Follow / Unfollow */}
        {isFollowing ? (
          <button className="unfollow-btn" onClick={handleUnfollow}>
            ❌ Unfollow
          </button>
        ) : (
          <button className="follow-btn" onClick={handleFollow}>
            ➕ Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
