import { useNavigate } from "react-router-dom";

import {
  BrainCircuit,
  BarChart3,
  Target,
  TrendingUp
} from "lucide-react";

export default function Landing() {

  const navigate =
    useNavigate();

  return (

    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 40px",
      }}
    >

      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}
      >

        {/* Left Side */}

        <div>

          <div
            style={{
              display: "inline-block",
              padding:
                "8px 16px",
              borderRadius: "999px",
              background:
                "rgba(108,140,255,.12)",
              color: "#6c8cff",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            AI-Powered Learning Intelligence
          </div>

          <h1
            style={{
              fontSize: "64px",
              fontWeight: "800",
              lineHeight: "1.1",
              marginBottom: "24px",
            }}
          >
            Transform
            <br />
            Answer Sheets
            <br />
            Into Learning
            Intelligence
          </h1>

          <p
            style={{
              fontSize: "18px",
              opacity: 0.8,
              lineHeight: "1.8",
              maxWidth: "550px",
              marginBottom: "35px",
            }}
          >
            Detect learning gaps,
            uncover root causes,
            generate personalized
            interventions and track
            student growth through
            Explainable AI.
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
            }}
          >

            <button
              className="student-btn"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Analyze Now
            </button>

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              style={{
                padding:
                  "12px 24px",
                borderRadius:
                  "12px",
                background:
                  "transparent",
                border:
                  "1px solid rgba(255,255,255,.2)",
                color: "white",
                cursor: "pointer",
              }}
            >
              View Dashboard
            </button>

          </div>

          <div
            style={{
              display: "flex",
              gap: "40px",
              marginTop: "50px",
            }}
          >

            <div>
              <h2>95%</h2>
              <span>
                Accuracy
              </span>
            </div>

            <div>
              <h2>10K+</h2>
              <span>
                Assessments
              </span>
            </div>

            <div>
              <h2>24/7</h2>
              <span>
                AI Engine
              </span>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div>

          <div
            className="bigcard"
            style={{
              padding: "30px",
            }}
          >

            <div
              style={{
                display: "grid",
                gap: "25px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "15px",
                }}
              >

                <BrainCircuit
                  size={32}
                />

                <div>

                  <h3>
                    AI Analysis
                  </h3>

                  <p>
                    Detect learning
                    gaps instantly
                  </p>

                </div>

              </div>

              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "15px",
                }}
              >

                <BarChart3
                  size={32}
                />

                <div>

                  <h3>
                    Heatmaps
                  </h3>

                  <p>
                    Visual learning
                    analytics
                  </p>

                </div>

              </div>

              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "15px",
                }}
              >

                <Target
                  size={32}
                />

                <div>

                  <h3>
                    Intervention
                  </h3>

                  <p>
                    Personalized
                    action plans
                  </p>

                </div>

              </div>

              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "15px",
                }}
              >

                <TrendingUp
                  size={32}
                />

                <div>

                  <h3>
                    Progress
                  </h3>

                  <p>
                    Track growth
                    over time
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}