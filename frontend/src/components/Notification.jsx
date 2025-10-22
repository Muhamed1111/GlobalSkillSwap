import React, { useEffect, useState } from "react";
import "../style/Notification.css";
import {
  getNotifications,
  deleteNotification,
  deleteAllNotifications,
} from "../services/notificationApi";
export let notifyNumber = 0;
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotifications(); 
        setNotifications(data);
      } catch (err) {
        console.error("❌ Error loading notifications:", err);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("❌ Error deleting notification:", err);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to clear all notifications?"))
      return;
    try {
      await deleteAllNotifications();
      setNotifications([]);
    } catch (err) {
      console.error("❌ Error deleting all notifications:", err);
    }
  };

  if (loading)
    return <p className="loading">Loading notifications...</p>;
  if (error)
    return <p className="error">{error}</p>;


notifyNumber = notifications.length;

  return (
    <div className="notification-window">
      <div className="notification-header">
        <div className="header-left">
          Notifications <span>({notifications.length})</span>
        </div>
        {notifications.length > 0 && (
          <button className="clear-btn" onClick={handleDeleteAll}>
            Clear All
          </button>
        )}
      </div>

      <div className="not-body">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`notification-item ${n.read ? "" : "unread"}`}
            >
              <div className="notification-content">
                <div className="notification-title">{n.title}</div>
                <div className="notification-text">{n.message}</div>

                {n.redirectUrl && (
                  <a
                    href={n.redirectUrl}
                    className="notification-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Details
                  </a>
                )}
              </div>

              <div className="notification-meta">
                <span className="notification-time">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(n.id)}
                >
                  ✖
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No notifications yet 📭</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
