import React from "react";
import signInBg from "../../asserts/images/login.png";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div
      className="sign-in"
      style={{
        backgroundImage: `url(${signInBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        margin: "0px",
      }}
    >
      <div
        className="sign-in-card"
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: "40px",
          borderRadius: "15px",
          color: "white",
          textAlign: "center",
          boxShadow: "0 4px 25px rgba(0,0,0,0.6)",
          width: "85vw",
          height: "85vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              fontWeight: "700",
              color: "#f5d142",
            }}
          >
            Create Your Global Skill Swap Profile
          </h2>
          <p style={{ fontSize: "14px" }}>
            Already have an account?{" "}
            <Link
              to="/appwrite/login"
              style={{
                color: "#e8c428ff",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Log In
            </Link>
          </p>
        </div>

        <hr style={{ margin: "20px 0", opacity: 0.3 }} />

        {/* Forma podijeljena po sekcijama */}
        <form
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px 40px",
            textAlign: "left",
          }}
        >
          {/* 🔹 PERSONAL INFORMATION */}
          <div style={{ gridColumn: "1 / span 2" }}>
            <h3 style={sectionTitle}>Personal Information</h3>
          </div>

          <label style={labelStyle}>
            First Name
            <input type="text" placeholder="John" required style={inputStyle} />
          </label>

          <label style={labelStyle}>
            Last Name
            <input type="text" placeholder="Doe" required style={inputStyle} />
          </label>

          <label style={labelStyle}>
            Nickname / Username
            <input
              type="text"
              placeholder="@john_doe"
              required
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Profile Picture
            <input
              type="file"
              accept="image/*"
              style={{
                ...inputStyle,
                backgroundColor: "rgba(255,255,255,0.1)",
                padding: "6px",
              }}
            />
          </label>

          <label style={labelStyle}>
            Email
            <input
              type="email"
              placeholder="example@mail.com"
              required
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Date of Birth
            <input type="date" required style={inputStyle} />
          </label>

          <label style={labelStyle}>
            Password
            <input
              type="password"
              placeholder="••••••"
              required
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Confirm Password
            <input
              type="password"
              placeholder="••••••"
              required
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Time Zone
            <input type="text" placeholder="CET / GMT+1" style={inputStyle} />
          </label>

          <label style={labelStyle}>
            Languages
            <input
              type="text"
              placeholder="English, Bosnian, Turkish..."
              style={inputStyle}
            />
          </label>

          {/* 🔹 SKILL DETAILS */}
          <div style={{ gridColumn: "1 / span 2" }}>
            <h3 style={sectionTitle}>Skill Details</h3>
          </div>

          <label style={labelStyle}>
            Skills you offer
            <input
              type="text"
              placeholder="Web Development, Design, Marketing..."
              required
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Skills you want to learn
            <input
              type="text"
              placeholder="Python, Video Editing..."
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Years of Experience
            <input
              type="number"
              min="0"
              placeholder="e.g. 3"
              required
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Short Bio
            <textarea
              placeholder="Tell us about yourself, your background, and what motivates you..."
              rows="3"
              style={textAreaStyle}
            />
          </label>

          {/* 🔹 PROFESSIONAL BACKGROUND */}
          <div style={{ gridColumn: "1 / span 2" }}>
            <h3 style={sectionTitle}>Professional Background</h3>
          </div>

          <label style={labelStyle}>
            Education
            <input
              type="text"
              placeholder="Faculty of Electrical Engineering, Sarajevo"
              required
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Years Active in Profession
            <input
              type="number"
              min="0"
              placeholder="e.g. 2"
              style={inputStyle}
            />
          </label>

          {/* 🔹 LINKS / PORTFOLIO */}
          <div style={{ gridColumn: "1 / span 2" }}>
            <h3 style={sectionTitle}>Portfolio & Links</h3>
          </div>

          <label style={labelStyle}>
            GitHub or Portfolio link
            <input
              type="url"
              placeholder="https://github.com/username"
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            LinkedIn or YouTube link
            <input
              type="url"
              placeholder="https://linkedin.com/in/username"
              style={inputStyle}
            />
          </label>
        </form>

        <div style={{ marginTop: "30px" }}>
          <Button
            color="#e8c428ff"
            text="Create Account"
            padding="12px 20px"
            fontSize="1.3rem"
            borderRadius="10px"
            textColor="white"
            hoverColor="#d8b205ff"
            transition="0.35s ease"
          />
        </div>
      </div>
    </div>
  );
};

/* ✅ Pomoćni stilovi */
const labelStyle = { fontSize: "15px", textAlign: "left" };
const sectionTitle = {
  color: "#e8c428",
  fontWeight: "600",
  margin: "10px 0",
  fontSize: "18px",
  textAlign: "left",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
  paddingBottom: "5px",
};
const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
};
const textAreaStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
  resize: "none",
};

export default SignIn;
