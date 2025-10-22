import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getNotifications,
  sendNotification,
  deleteNotification,
} from "../services/notificationApi";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Dohvati token iz localStorage
  const token = localStorage.getItem("token");

  // 🔹 Učitaj notifikacije trenutnog korisnika
  const fetchNotifications = async (userId) => {
    if (!token || !userId) return;
    try {
      setLoading(true);
      const data = await getNotifications(userId); // backend prima userId mentora
      setNotifications(data);
    } catch (err) {
      console.error("❌ Greška pri dohvaćanju notifikacija:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Pošalji zahtjev mentoru
  const sendRequestToMentor = async (mentorId) => {
    try {
      const data = await sendNotification(mentorId); // token se dodaje unutar api.js
      setNotifications((prev) => [data, ...prev]);
      console.info("✅ Zahtjev uspješno poslan!");
    } catch (err) {
      console.error("❌ Greška pri slanju zahtjeva:", err);
      setError("Greška pri slanju zahtjeva.");
    }
  };

  // 🔹 Obriši notifikaciju
  const removeNotification = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("❌ Greška pri brisanju notifikacije:", err);
      setError("Greška pri brisanju notifikacije.");
    }
  };

  // 🔹 Automatski učitaj notifikacije nakon mounta (ako već znaš ID)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      fetchNotifications(parsedUser.id);
    }
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        error,
        fetchNotifications,
        sendRequestToMentor,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
