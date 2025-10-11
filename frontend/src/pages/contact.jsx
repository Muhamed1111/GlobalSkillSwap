import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(
        "service_db6kzx5", // ✅ tvoj Service ID
        "template_contactus", // ✅ tvoj Template ID
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "kr4wFcWA9SQJQIkG1" // ✅ tvoj Public Key
      )
      .then(
        () => {
          setStatus("success");
          setForm({ name: "", email: "", message: "" });
          setTimeout(() => setStatus(""), 4000);
        },
        () => setStatus("error")
      );
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        <h1 className="contact-title gradient-text">Get in Touch 💬</h1>
        <p className="contact-sub">
          Have a question, idea, or collaboration proposal?  
          We’d love to hear from you — let’s connect and build something great together!
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="contact-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="contact-input"
            />
          </div>

          <textarea
            name="message"
            placeholder="Write your message..."
            value={form.message}
            onChange={handleChange}
            required
            className="contact-textarea"
          ></textarea>

          <button
            type="submit"
            className={`contact-btn ${
              status === "sending" ? "loading" : ""
            }`}
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Message 🚀"}
          </button>

          {status === "success" && (
            <div className="success-popup">✅ Message sent successfully!</div>
          )}
          {status === "error" && (
            <div className="error-popup">❌ Failed to send. Try again later.</div>
          )}
        </form>
      </div>

      <div className="contact-info-panel">
        <h2>📞 Contact Information</h2>
        <p><strong>Name:</strong> Muhamed Mujić</p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:muhamedmujic173@gmail.com" className="contact-link">
            muhamedmujic173@gmail.com
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href="tel:+38762113969" className="contact-link">
            +387 62 113 969
          </a>
        </p>
        <p>
          <strong>Partner:</strong>{" "}
          <a href="mailto:ajdin227@gmail.com" className="contact-link">
            ajdin227@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
