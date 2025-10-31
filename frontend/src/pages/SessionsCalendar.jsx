import React, { useEffect, useMemo, useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, format, addMonths, subMonths } from "date-fns";
import { getMyCalendar, addCalendarEvent } from "../services/calendarApi";
import CalendarModal from "../components/Calendar";
import "../style/SessionsCalendar.css";

export default function SessionsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [events, setEvents] = useState([]); 
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDefaultDate, setModalDefaultDate] = useState("");

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const weekStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  
  useEffect(() => {
    const interval = eachDayOfInterval({ start: weekStart, end: weekEnd });
    setDays(interval);
  }, [currentDate]);

  
  useEffect(() => {
    const from = format(monthStart, "yyyy-MM-dd");
    const to   = format(monthEnd,   "yyyy-MM-dd");
    (async () => {
      try {
        const data = await getMyCalendar(from, to);
        const normalized = data.map(d => ({ date: d.date, title: d.title }));
        setEvents(normalized);
      } catch (e) {
        console.error("Greška pri dohvaćanju kalendara:", e);
      }
    })();
  }, [currentDate]);

  const eventsByDate = useMemo(() => {
    const map = {};
    for (const e of events) {
      (map[e.date] ||= []).push(e);
    }
    return map;
  }, [events]);

  const openAddModalFor = (day) => {
    setModalDefaultDate(format(day, "yyyy-MM-dd"));
    setModalOpen(true);
  };

  const handleAddEvent = async ({ title, date }) => {
    try {
      const saved = await addCalendarEvent({ title, date });
      setEvents(prev => [...prev, { date: saved.date, title: saved.title }]);
      setModalOpen(false);
      const toast = document.createElement("div");
      toast.className = "cal-toast";
      toast.innerText = "✅ Događaj dodat u kalendar";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2200);
    } catch (e) {
      alert("Greška: " + e.message);
    }
  };

  return (
    <div className="cal-wrap">
      <div className="cal-header">
        <button className="nav-btn" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>‹</button>
        <h2>{format(currentDate, "LLLL yyyy")}</h2>
        <button className="nav-btn" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>›</button>
      </div>

      <div className="cal-grid cal-grid-head">
        {["Pon","Uto","Sri","Čet","Pet","Sub","Ned"].map((d) => <div key={d} className="cal-cell head">{d}</div>)}
      </div>

      <div className="cal-grid">
        {days.map((day) => {
          const inMonth = isSameMonth(day, currentDate);
          const ymd = format(day, "yyyy-MM-dd");
          const dayEvents = eventsByDate[ymd] || [];
          return (
            <div key={ymd} className={`cal-cell day ${inMonth ? "" : "dim"}`} onDoubleClick={() => openAddModalFor(day)}>
              <div className="day-number">{format(day, "d")}</div>
              <div className="events-stack">
                {dayEvents.slice(0,3).map((ev, idx) => (
                  <div key={idx} className="event-pill" title={ev.title}>
                    {ev.title}
                  </div>
                ))}
                {dayEvents.length > 3 && <div className="more">+{dayEvents.length-3}</div>}
              </div>
            </div>
          );
        })}
      </div>

      <p className="cal-hint">💡 Dvoklik na dan za dodavanje događaja.</p>

      <CalendarModal
        open={modalOpen}
        defaultDate={modalDefaultDate}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddEvent}
      />
    </div>
  );
}
