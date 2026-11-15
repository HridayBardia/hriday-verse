import { useState } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import VisitorCounter from "./VisitorCounter";
import "./styles/Contact.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setResponseMessage("Please fill in all fields before submitting.");
      return;
    }

    try {
      setStatus("loading");
      setResponseMessage("");

      const response = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setStatus("success");
        setResponseMessage(data.message || "Message delivered to Python Flask backend!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setResponseMessage(data.message || "Failed to deliver message to Python backend.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setResponseMessage("Unable to reach Python backend (port 5000). Ensure app.py is running!");
    }
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <div className="contact-header-wrap">
          <h3>Get In Touch</h3>
          <VisitorCounter variant="card" />
        </div>

        <div className="contact-flex">
          {/* Left Column: Direct Info */}
          <div className="contact-box contact-details">
            <h4>Email</h4>
            <p>
              <a href="mailto:hridaybardia@gmail.com" data-cursor="disable">
                hridaybardia@gmail.com
              </a>
            </p>

            <h4>Academic Base</h4>
            <p className="contact-muted">
              Jain University, Bangalore<br />
              B.Tech CSE (AI & ML)
            </p>

            <h4>Interests</h4>
            <p className="contact-muted">
              Ultimate Frisbee (Cutter) • Valorant (HAMPHRY GAMING) • Rashmirathi Poetry
            </p>

            <h4>Social</h4>
            <div className="contact-socials">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                Github <MdArrowOutward />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                LinkedIn <MdArrowOutward />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                Twitter / X <MdArrowOutward />
              </a>
            </div>
          </div>

          {/* Right Column: Live Python Backend Contact Form */}
          <div className="contact-box contact-form-wrapper">
            <div className="contact-form-card">
              <div className="contact-form-badge">
                <span className="dot-active"></span>
                <span>Python Flask Ingestion Endpoint</span>
              </div>
              <h4>Send a Direct Dispatch</h4>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    data-cursor="disable"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    data-cursor="disable"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Discuss collaboration, projects, or say hello..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    data-cursor="disable"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={status === "loading"}
                  data-cursor="disable"
                >
                  {status === "loading" ? (
                    <span className="btn-loading">
                      <span className="btn-spinner"></span> Dispatching to Python...
                    </span>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>

                {status === "success" && (
                  <div className="form-feedback success">
                    <IoCheckmarkCircleOutline className="feedback-icon" />
                    <span>{responseMessage}</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="form-feedback error">
                    <IoAlertCircleOutline className="feedback-icon" />
                    <span>{responseMessage}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="contact-footer">
          <div className="contact-credits">
            <h2>
              Designed and Engineered by <span>Hriday Bardia</span>
            </h2>
            <p className="contact-subtitle">
              Built with Next.js, React, Three.js, GSAP & Python Flask
            </p>
          </div>
          <h5>
            <MdCopyright /> {new Date().getFullYear()} Hriday Bardia. All Rights Reserved.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Contact;
