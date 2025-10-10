import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Chart = () => {

  const data = [
    { skill: "Web Development", exchanges: 120 },
    { skill: "Graphic Design", exchanges: 95 },
    { skill: "Video Editing", exchanges: 78 },
    { skill: "Language Tutoring", exchanges: 65 },
    { skill: "Data Analysis", exchanges: 52 },
  ];

  const skillsCopy = [...data];

  skillsCopy.sort((a, b) => {
    if (a.exchanges > b.exchanges) return -1;
    if (a.exchanges < b.exchanges) return 1;
    return 0;
  });


  const topFive = skillsCopy.slice(0, 5);



  return (
    <div
      style={{
        background: "linear-gradient(90deg, #190e53ff, #8f70ff)",
        padding: "20px",
        //boxShadow: "0 0 15px rgba(255,215,0,0.2)",
        color: "#FFD700",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "15px", color: "#FFD700", fontWeight: "700" }}>
        🔝 Top 5 Exchanged Skills
      </h3>

      {/* ResponsiveContainer da graf automatski zauzima širinu roditelja */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={topFive}
          margin={{ top: 20,  right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,215,0,0.2)" />
          <XAxis
            dataKey="skill"
            stroke="#FFD700"
            tick={{ fill: "#FFD700", fontSize: 12 }}
          />
          <YAxis stroke="#FFD700" tick={{ fill: "#FFD700" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 1, 33, 0.8)",
              color: "#FFD700",
              borderRadius: "8px",
              border: "1px solid rgba(255,215,0,0.3)",
            }}
          />
          <Legend
            wrapperStyle={{
              color: "#FFD700",
              fontSize: 12,
              paddingTop: 10,
            }}
          />
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#8B8000" />
            </linearGradient>
          </defs>
          <Bar
            dataKey="exchanges"
            fill="url(#goldGradient)"
            barSize={40}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
