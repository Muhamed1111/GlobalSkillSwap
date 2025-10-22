import React, { useEffect, useState } from "react";
import { getUserAchievements } from "../services/pointsLedger";
import "../style/Achievements.css";

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [rank, setRank] = useState("Novice");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getUserAchievements();
        setAchievements(data);

        const unlockedCount = data.filter((a) => a.unlocked).length;
        const totalCount = data.length || 1;

        // 🔹 XP = broj otključanih * 120 (arbitrarna vrijednost)
        const newXp = unlockedCount * 120;
        setXp(newXp);

        // 🔹 Level se skalira od 1 do 10
        const maxLevel = 10;
        const newLevel = (unlockedCount / totalCount) * maxLevel;
        setLevel(newLevel.toFixed(1));

        // 🔹 Rank baziran na levelu
        if (newLevel < 2) setRank("Novice");
        else if (newLevel < 4) setRank("Learner");
        else if (newLevel < 6) setRank("Advanced");
        else if (newLevel < 8) setRank("Expert");
        else setRank("Skill Master");

        // 🔹 Progress bar do 100%
        setProgress((newLevel / maxLevel) * 100);
      } catch (error) {
        console.error("❌ Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <div className="achievements-page">
        <div className="achievements-hero">
          <h1>🏆 Loading your achievements...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="achievements-page">
      <div className="achievements-hero">
        <h1>🏆 Your Achievements</h1>
        <p>
          Level {level} – <span className="highlight">{rank}</span>
        </p>

        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>

        <small>{xp} XP earned</small>
      </div>

      <div className="achievements-grid">
        {achievements.map((ua) => (
          <div
            key={ua.id}
            className={`badge ${ua.unlocked ? "unlocked" : "locked"}`}
          >
            <div className="badge-inner">
              <img
                src={
                  ua.achievement?.icon ||
                  "https://cdn-icons-png.flaticon.com/512/1828/1828970.png"
                }
                alt={ua.achievement?.title}
              />
              <h3>{ua.achievement?.title}</h3>
              <p>{ua.achievement?.description}</p>
              {!ua.unlocked && <span className="locked-overlay">🔒</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;
