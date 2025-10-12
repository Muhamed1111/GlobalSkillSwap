import React from "react";
import "./profile.css";

const ProfileCard = ({ user }) => {
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
    </div>
  );
};

export default ProfileCard;
