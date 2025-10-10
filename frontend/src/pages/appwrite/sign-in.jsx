import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import signInBg from "../../asserts/images/login.png";
import Button from "../../components/Button";
import "./signIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 

  
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

       
        <form className="sign-in-form">
          
          {step === 1 && (
            <>
              <h3 className="section-title">Personal Information</h3>

              <label>
                First Name
                <input type="text" placeholder="John" required />
              </label>

              <label>
                Last Name
                <input type="text" placeholder="Doe" required />
              </label>

              <label>
                Nickname / Username
                <input type="text" placeholder="@john_doe" required />
              </label>

              <label>
                Profile Picture
                <input type="file" accept="image/*" className="file-input" />
              </label>

              <label>
                Email
                <input type="email" placeholder="example@mail.com" required />
              </label>

              <label>
                Date of Birth
                <input type="date" required />
              </label>

              <label>
                Password
                <input type="password" placeholder="••••••" required />
              </label>

              <label>
                Confirm Password
                <input type="password" placeholder="••••••" required />
              </label>
            </>
          )}

         
          {step === 2 && (
            <>
              <h3 className="section-title">Skill Details</h3>

              <label>
                Skills you offer
                <input type="text" placeholder="Web Development, Design..." required />
              </label>

              <label>
                Skills you want to learn
                <input type="text" placeholder="Python, Video Editing..." />
              </label>

              <label>
                Years of Experience
                <input type="number" min="0" placeholder="e.g. 3" />
              </label>

              <label>
                Short Bio
                <textarea placeholder="Tell us about yourself..." />
              </label>
            </>
          )}

          
          {step === 3 && (
            <>
              <h3 className="section-title">Professional Background</h3>

              <label>
                Education
                <input
                  type="text"
                  placeholder="Faculty of Electrical Engineering, Sarajevo"
                  required
                />
              </label>

              <label>
                Years Active in Profession
                <input type="number" min="0" placeholder="e.g. 2" />
              </label>
            </>
          )}

          
          {step === 4 && (
            <>
              <h3 className="section-title">Portfolio & Links</h3>

              <label>
                GitHub or Portfolio link
                <input type="url" placeholder="https://github.com/username" />
              </label>

              <label>
                LinkedIn or YouTube link
                <input type="url" placeholder="https://linkedin.com/in/username" />
              </label>

              <p className="final-text">
                ✅ Review your details before creating your account.
              </p>
            </>
          )}
        </form>

       
        <div className="step-buttons">
          {step > 1 && (
            <button
              className="btnn-style"
              onClick={(e) => {
                e.preventDefault(); 
                prevStep(); 
              }}
            >Back</button>
          )}

          {step < 4 ? (
            <button className="btn-style"
              onClick={(e) => {
                e.preventDefault(); 
                nextStep(); 
              }}
            >Next</button>
          ) : (
            <Button
              color="#d4af37"
              text="Create Account"
              padding="14px 24px"
              fontSize="1.2rem"
              borderRadius="10px"
              textColor="black"
              hoverColor="#f1c232"
              transition="0.35s ease"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login"); 
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
