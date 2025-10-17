import "../style/objectives.css";

const Objectives = () => {
  const cards = [
    {
      title: "Global Collaboration",
      desc: "Connect people across the world to share knowledge, culture, and ideas.",
      icon: "🌍",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Equal Opportunities",
      desc: "Everyone can teach and learn something valuable, regardless of background.",
      icon: "💡",
      img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Lifelong Learning",
      desc: "Promote continuous learning through mentorship and community interaction.",
      icon: "📈",
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title gradient-text">Our Mission & Objectives</h1>
      <p className="page-desc">
        GlobalSkillSwap was created to bridge the gap between learners and mentors worldwide. 
        Our mission is to democratize access to skills through direct knowledge exchange — without borders, fees, or limitations.
      </p>

      <div className="card-grid">
        {cards.map((card, index) => (
          <div key={index} className="objective-card">
            <img src={card.img} alt={card.title} className="objective-img" />
            <div className="objective-content">
              <h2>{card.icon} {card.title}</h2>
              <p>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Objectives;
