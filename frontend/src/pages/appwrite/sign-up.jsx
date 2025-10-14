import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import signInBg from "../../asserts/images/login.png";
import Button from "../../components/Button";
import { AuthContext } from "../../context/AuthContext";
import "./signIn.css";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const [step, setStep] = useState(1);

  // korisnički podaci
  const [form, setForm] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    education: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword)
      return alert("Passwords do not match!");

    try {
      await signup(form.name, form.surname, form.username, form.email, form.password);
      alert("Account created successfully!");
      navigate("/home");
    } catch (err) {
      alert("Signup failed: " + err.message);
    }
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      input:focus, textarea:focus {
        border-color: #FFD700 !important;
        background: rgba(255, 215, 0, 0.15) !important;
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
        outline: none;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const nextStep = () => setStep((s) => Math.min(4, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div
      className="sign-in"
      style={{
        backgroundImage: `
          radial-gradient(circle at center, rgba(255, 215, 0, 0.15), rgba(0, 0, 0, 0.9)),
          url(${signInBg})
        `,
      }}
    >
      <div className="sign-in-card">
        <div className="sign-in-header">
          <h2>Create Your Global Skill Swap Profile</h2>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="gold-link">
              Log In
            </Link>
          </p>
        </div>

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>

        <form className="sign-in-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <h3 className="section-title">Personal Information</h3>

              <label>
                First Name
                <input name="name" type="text" value={form.name} onChange={handleChange} required />
              </label>

              <label>
                Last Name
                <input name="surname" type="text" value={form.surname} onChange={handleChange} required />
              </label>

              <label>
                Nickname / Username
                <input name="username" type="text" value={form.username} onChange={handleChange} required />
              </label>

              <label>
                Email
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </label>

              <label>
                Password
                <input name="password" type="password" value={form.password} onChange={handleChange} required />
              </label>

              <label>
                Confirm Password
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />
              </label>
            </>
          )}
        </form>

        <div className="step-buttons">
          {step > 1 && (
            <Button color="#555" text="Back" onClick={(e) => { e.preventDefault(); prevStep(); }} />
          )}

          {step < 4 ? (
            <Button text="Next" color="linear-gradient(90deg,#d4af37,#f5d142)" onClick={(e) => { e.preventDefault(); nextStep(); }} />
          ) : (
            <Button text="Create Account" color="linear-gradient(90deg,#d4af37,#f5d142)" onClick={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
