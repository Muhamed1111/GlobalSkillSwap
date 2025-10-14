import React, { useState, useContext } from "react";
import loginBg from "../../asserts/images/login.png";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("⏳ Logging in...");
    try {
      await login(email, password);
      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/home"), 700);
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "120px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "40px",
          borderRadius: "10px",
          color: "white",
          textAlign: "center",
          width: "320px",
        }}
      >
        <h3 style={{ fontSize: "26px", marginBottom: "25px" }}>Login</h3>

        <form onSubmit={handleLogin}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <label>
              Email
              <input
                type="text"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="•••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </label>

            <Button text="Log In" color="#e0d6a6ff" textColor="white" />

            {message && (
              <p style={{ color: "#FFD700", fontSize: "14px" }}>{message}</p>
            )}

            <p style={{ marginTop: "15px" }}>
              Don’t have an account?{" "}
              <Link
                to="/sign-up"
                style={{ color: "#e8c428ff", fontWeight: "600" }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
