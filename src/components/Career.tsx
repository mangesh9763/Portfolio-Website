import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> highlights
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science</h4>
                <h5>SGGS Institute, Nanded</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Computer Science and Engineering student with a CGPA of 6.51/10,
              focused on full-stack development, real-time systems, and
              hardware-integrated applications.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Top 5 CSE Project</h4>
                <h5>Final year project expo</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Built LaalPari, a low-cost bus tracking system under Rs 800, and
              represented the department with a live ESP32 and GPS-based demo.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Robotics and drone training</h4>
                <h5>Arduino and flight systems</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Worked on line follower robots, soccer robocars, robo sumo, and
              completed drone workshop training on quadcopter and hexacopter
              control systems.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Sports and event leadership</h4>
                <h5>Zenith and college competitions</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Coordinated Zenith Marathon activities and crowd management,
              represented college in volleyball and table tennis, and played in
              the Senior State Volleyball Championship.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
