import React from "react";
import "../style/About.css";
import AboutBg from "../asserts/images/login.png"; // tvoja pozadinska slika

const About = () => {
  return (
    <div
      className="about-section"
      style={{ backgroundImage: `url(${AboutBg})` }}
    >
      <div className="about-overlay">
        <div className="about-content">
          <h1 className="gradient-text">About GlobalSkillSwap 🌍</h1>
          <p>
            <strong>GlobalSkillSwap</strong> je inovativna platforma koja spaja
            ljude širom svijeta kroz razmjenu znanja i vještina. Umjesto klasičnih
            plaćenih kurseva, ovdje dijeliš ono što znaš — i zauzvrat učiš od drugih.
          </p>
          <p>
            Sistem koristi <span className="highlight">SkillPoints</span> koje
            dobijaš kada predaješ, a trošiš kada učiš. Naš cilj je stvoriti globalnu
            zajednicu mentora i učenika koji rastu zajedno. 🚀
          </p>

          <div className="about-cards">
            <div className="about-card">
              <h3>🤝 Poveži se</h3>
              <p>Pronađi mentore i kolege iz cijelog svijeta.</p>
            </div>
            <div className="about-card">
              <h3>🎓 Nauči</h3>
              <p>Stekni vještine kroz interaktivne lekcije 1-na-1.</p>
            </div>
            <div className="about-card">
              <h3>🏆 Napreduj</h3>
              <p>Osvoji SkillPoints i penji se na globalnoj rang listi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
