import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import signInBg from "../../asserts/images/login.png";
import Button from "../../components/Button";
import { AuthContext } from "../../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    education: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Creating account...");
    try {
      await signup(form.name, form.surname, form.username, form.email, form.password, form.education);
      setMessage("✅ Account created successfully!");
      setTimeout(() => navigate("/home"), 700);
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${signInBg})`,
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
          width: "350px",
        }}
      >
        <h3 style={{ fontSize: "26px", marginBottom: "25px" }}>Create Account</h3>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <label>
              First Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </label>

            <label>
              Last Name
              <input
                type="text"
                name="surname"
                value={form.surname}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </label>

            <label>
              Username
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </label>

            <label>
              Education (optional)
              <input
                type="text"
                name="education"
                value={form.education}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </label>

            <Button text="Create Account" color="#e0d6a6ff" textColor="white" />

            {message && (
              <p style={{ color: "#FFD700", fontSize: "14px", marginTop: "10px" }}>{message}</p>
            )}

            <p style={{ marginTop: "15px" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#e8c428ff", fontWeight: "600" }}
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
