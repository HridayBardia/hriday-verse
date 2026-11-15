import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Lead Portal Architect</h4>
                <h5>FestOS • IIM Indore Epinoia 2026</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Architected the official centralized event management and accommodation portal for IIM Indore Epinoia 2026. Built real-time hostel allocation algorithms, Supabase database schemas, and role-based access control.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathon Finalist & Innovator</h4>
                <h5>PrivMed & JanSetu • NIT Surathkal / SIH</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Developed PrivMed, a zero-knowledge decentralized medical record vault for NIT Surathkal Hackathon, and JanSetu, an AI-powered Digital Public Infrastructure platform for Smart India Hackathon.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in CSE (AI & ML)</h4>
                <h5>Jain University</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Pursuing undergraduate specialization in Artificial Intelligence and Machine Learning. Active builder in bio-inspired cryptography, LLM/RAG systems, competitive gaming (Valorant as HAMPHRY GAMING), and Ultimate Frisbee deep cutter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
