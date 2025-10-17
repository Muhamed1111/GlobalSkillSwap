import React from "react";
import "../style/howItWorks.css";

const HowItWorks = () => {
  const steps = [
    {
      num: "1️⃣",
      title: "Create Your Profile",
      desc: "Add your skills and the ones you’d love to learn. Build your profile and show others your expertise and interests.",
      img: "https://images.unsplash.com/photo-1616628188502-0d1b6509a57e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      num: "2️⃣",
      title: "Find a Match",
      desc: "Use AI-powered matching to discover learners and mentors who share your passion and complement your skill goals.",
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
    },
    {
      num: "3️⃣",
      title: "Exchange Skills",
      desc: "Collaborate in real time. Teach what you know, learn what you don’t — grow together through interactive sessions.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      num: "4️⃣",
      title: "Earn SkillPoints",
      desc: "Get rewarded for every exchange. Earn SkillPoints, boost your reputation, and unlock special features.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      num: "5️⃣",
      title: "Grow Together",
      desc: "Join a global network of lifelong learners — united by curiosity, collaboration, and mutual growth.",
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title gradient-text">How It Works</h1>
      <p className="page-desc">
        A simple process to connect, learn, and grow with people across the world.
      </p>

      <div className="steps-grid">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div
              className="step-bg"
              style={{ backgroundImage: `url(${step.img})` }}
            ></div>
            <div className="step-content">
              <span className="step-number">{step.num}</span>
              <h2>{step.title}</h2>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
