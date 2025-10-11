import React from "react";
import "./resources.css";

const Resources = () => {
  const resources = [
    {
      title: "Getting Started with Skill Exchange",
      desc: "Learn the basics of GlobalSkillSwap — how to build your profile, connect, and start exchanging skills instantly.",
      icon: "📘",
      img: "https://images.unsplash.com/photo-1498079022511-d15614cb1c02?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Present Your Skills Effectively",
      desc: "Master the art of showcasing your expertise through impactful profiles and skill descriptions that attract learners.",
      icon: "🎯",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Becoming a Great Mentor",
      desc: "Discover how to guide others effectively, share your knowledge confidently, and create meaningful mentorships.",
      icon: "🤝",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Communication Tips for Online Learning",
      desc: "Boost collaboration through clear and engaging online communication — make every exchange productive and fun.",
      icon: "💬",
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Success Stories from Our Community",
      desc: "Read inspiring journeys of users who built new careers, friendships, and skills through GlobalSkillSwap.",
      icon: "🏆",
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title gradient-text">Learning Resources</h1>
      <p className="page-desc">
        Explore expert guides, user stories, and pro tips to get the most out of your skill exchange journey.
      </p>

      <div className="resources-grid">
        {resources.map((r, index) => (
          <div className="resource-card" key={index}>
            <div
              className="resource-img"
              style={{ backgroundImage: `url(${r.img})` }}
            ></div>
            <div className="resource-content">
              <h2>{r.icon} {r.title}</h2>
              <p>{r.desc}</p>
              <button className="learn-btn">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
