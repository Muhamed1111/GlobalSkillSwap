import React from "react";
import "./Notification.css";

const Notification = () => {
  const notifications = [
    {
      time: "12:48",
      text: "You applied for a new job. Now you can chat with your mentor.",
      link: "link-to-your-mentor-profile",
      status: "unread",
    },
    {
      time: "11:32",
      text: "Your mentor accepted your session request!",
      link: "link-to-chat",
      status: "read",
    },
  ];

  return (
    <div className="notification-window">
      <div className="notification-header">
        Notifications <span>({notifications.length})</span>
      </div>
      <div className="not-body">
        {notifications.map((n, i) => (
          <div
            key={i}
            className={`notification-item ${n.status === "unread" ? "unread" : ""}`}
          >
            <div className="notification-text">{n.text}</div>
            <a href={n.link} className="notification-link">
              View Details
            </a>
            <div className="notification-time">{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;

