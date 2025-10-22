import React, { useEffect, useState, useContext } from "react";
import { getLedgerHistory, getMyScore } from "../services/pointsLedger";
import { AuthContext } from "../context/AuthContext";
import "../style/SkillPointsLedger.css";

export default function SkillPointsLedger() {
    const { user, loading } = useContext(AuthContext);
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (!loading && user) {
            getLedgerHistory()
                .then(setEntries)
                .catch((err) => setError(err.message));
            getMyScore().then((e) => setScore(e.score)).catch((err) => console.error(err));
        }
    }, [loading, user]);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Please log in to view your SkillPoints history.</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;


    console.log(score);
    return (
        <div className="ledger-container">
            <h2>SkillPoints Ledger</h2>
            <div className="score-card">
                <h3>Total SkillPoints</h3>
                <p className="score-value">+{score}</p>
            </div>
            {entries.length === 0 ? (
                <p>No SkillPoints transactions yet.</p>
            ) : (
                <table className="ledger-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Reason</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((e) => (
                            <tr key={e.id}>
                                <td>{new Date(e.createdAt).toLocaleString()}</td>
                                <td>{e.reason.replace("_", " ")}</td>
                                <td
                                    className={
                                        e.delta > 0 ? "delta-positive" : "delta-negative"
                                    }
                                >
                                    {e.delta > 0 ? `+${e.delta}` : e.delta}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
