import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Global Skill Swap!</h1>
      <p>Click below to access the login page.</p>
      <Link to="/appwrite/login">
        <button
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go to Login
        </button>
      </Link>
    </div>
  );
};

export default Home;
