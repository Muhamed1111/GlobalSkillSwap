import React, { useEffect, useState } from "react";
import {
  getIncomingRequests,
  getOutgoingRequests,
  acceptRequest,
  declineRequest,
} from "../services/skillExchangeApi";
import "../style/SkillExchange.css";

export default function SkillExchange() {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showCalendarPrompt, setShowCalendarPrompt] = useState(false);

  const loadData = async () => {
    try {
      const inc = await getIncomingRequests();
      const out = await getOutgoingRequests();
      setIncoming(inc);
      setOutgoing(out);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAccept = async (id) => {
    try {
      const now = new Date().toISOString();
      const update = await acceptRequest(id, now);
      setSelectedRequest(update);
      setShowCalendarPrompt(true);
     // loadData();
    } catch (err) {
      console.error("❌ Error accepting request:", err);
      alert("Greška prilikom prihvatanja zahtjeva");
    }
  };

  const handleDecline = async (id) => {
    try {
      await declineRequest(id);
      loadData();
    } catch (err) {
      console.error("❌ Error declining request:", err);
      alert("Greška prilikom odbijanja zahtjeva");
    }
  };

  return (
    <div className="container">
      <h2>Skill Exchange Requests</h2>

      <div className="request-sections">
        <div>
          <h3>Incoming</h3>
          {incoming.length === 0 ? (
            <p>No incoming requests.</p>
          ) : (
            incoming.map((req) => (
              <div key={req.id} className="card-go">
                <p className="tags">From: {req.requesterName}</p>
                <p className="tags">Skill: {req.skillName}</p>
                <p className="tags">Message: {req.message}</p>

                <button
                  className="btn accept"
                  onClick={() => handleAccept(req.id)}
                >
                  ✅ Accept
                </button>

                <button
                  className="btn decline"
                  onClick={() => handleDecline(req.id)}
                >
                  ❌ Decline
                </button>
              </div>
            ))
          )}
        </div>
        <div>
          <h3>Outgoing</h3>
          {outgoing.length === 0 ? (
            <p>No outgoing requests.</p>
          ) : (
            outgoing.map((req) => (
              <div key={req.id} className="card-go">
                <p className="tags">To: {req.receiverName}</p>
                <p className="tags">Status: {req.status}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
