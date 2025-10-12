import React from "react";
import "./industries.css";

const Industries = () => {
  const industries = [
    {
      title: "IT & Development",
      icon: "💻",
      desc: "Programming, AI, Web, and Data Science.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Art & Design",
      icon: "🎨",
      desc: "Graphic design, music, illustration, and creative direction.",
      img: "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Education & Language",
      icon: "📚",
      desc: "Language tutoring, math, science, and more.",
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Business & Marketing",
      icon: "💼",
      desc: "Entrepreneurship, SEO, branding, and strategy.",
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Lifestyle & Personal Growth",
      icon: "🌱",
      desc: "Fitness, cooking, mindfulness, and productivity.",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Photography & Videography",
      icon: "📸",
      desc: "Capture and edit visuals that tell powerful stories.",
      img: "https://images.unsplash.com/photo-1502920917128-1aa500764b43?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Writing & Communication",
      icon: "✍️",
      desc: "Creative writing, copywriting, storytelling, and content creation.",
      img: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Finance & Economics",
      icon: "💰",
      desc: "Investing, budgeting, trading, and financial literacy.",
      img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title gradient-text">Industries We Empower</h1>
      <p className="page-desc">
        Explore skill-sharing opportunities across various fields.
      </p>

      <div className="industries-grid">
        {industries.map((item, index) => (
          <div key={index} className="industry-card">
            <div
              className="industry-bg"
              style={{ backgroundImage: `url(${item.img})` }}
            ></div>
            <div className="industry-content">
              <h2>{item.icon} {item.title}</h2>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Industries;
