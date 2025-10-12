import React from "react";
import "./pricing.css";


const Pricing = () => {
  const plans = [
    {
      name: "Free Plan",
      price: "$0 / month",
      tagline: "Perfect for beginners exploring skill exchange.",
      features: [
        "Basic Skill Exchange between users",
        "Unlimited peer-to-peer connections",
        "Access to community forums & discussions",
      ],
      color: "#7c4dff",
    },
    {
      name: "Pro Plan",
      price: "$9 / month",
      tagline: "For active learners & mentors who want to grow faster.",
      features: [
        "AI Mentor Matching for best skill fit",
        "Verified Profile Badge for credibility",
        "Priority support and faster connections",
        "Detailed analytics on your exchanges",
      ],
      color: "#9d77ff",
    },
    {
      name: "Enterprise",
      price: "Custom pricing",
      tagline: "Tailored for organizations, academies, and learning hubs.",
      features: [
        "Team & Group Learning management tools",
        "Private skill-sharing network with security controls",
        "Dedicated success manager and onboarding support",
        "Integration with internal systems (Slack, Teams, etc.)",
      ],
      color: "#b388ff",
    },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title gradient-text">Pricing Plans</h1>
      <p className="page-desc">
        Choose a plan that fits your learning style and collaboration goals.
      </p>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div
            className="pricing-card"
            key={index}
            style={{
              borderTop: `4px solid ${plan.color}`,
              boxShadow: `0 0 20px rgba(130, 100, 255, 0.2)`,
            }}
          >
            <h2>{plan.name}</h2>
            <h3>{plan.price}</h3>
            <p className="plan-tagline">{plan.tagline}</p>
            <ul>
              {plan.features.map((f, i) => (
                <li key={i}>✅ {f}</li>
              ))}
            </ul>
            <button
              className="primary-btn"
              style={{ background: plan.color }}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
