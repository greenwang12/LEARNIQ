import { useState } from "react";
import { analyzeAnswerSheet } from "../services/visionAI";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import StudentBanner from "../components/StudentBanner";
import useStudent from "../hooks/useStudent";

export default function Dashboard() {
  const { selectedStudent } = useStudent();

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (!allowedTypes.includes(selected.type)) {
      setError(
        "Only JPG, PNG, and PDF files are allowed."
      );
      return;
    }

    setError("");
    setFile(selected);
  };

  const handleAnalyze = async () => {
    if (!selectedStudent) {
      alert("Please select a student first.");
      return;
    }

    if (!file) {
      alert("Please upload a scanned answer sheet.");
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const base64File = reader.result;

          const response =
            await analyzeAnswerSheet(base64File);

          console.log(
            "AI RESPONSE:",
            response
          );

          const assessmentData = {
            studentId:
              selectedStudent.usn,

            studentName:
              selectedStudent.name,

            grade:
              selectedStudent.grade,

            score:
              response?.score || 0,

            learningGaps:
              response?.learningGaps || [],

            rootCauses:
              response?.rootCauses || [],

            explainabilityFactors:
              response?.explainabilityFactors || [],

            recommendations:
              response?.recommendations || [],

            summary:
              response?.summary || "",

            fileName:
              file.name,

            createdAt:
              serverTimestamp(),
          };

          await addDoc(
            collection(
              db,
              "assessments"
            ),
            assessmentData
          );

          setResult(response);
        } catch (err) {
          console.error(err);
          setError(
            "Failed to analyze answer sheet."
          );
        } finally {
          setLoading(false);
        }
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="page-title">
        LEARNIQ AI
      </h1>

      <StudentBanner />

      <p className="subtitle">
        Upload a scanned answer sheet and
        automatically identify learning gaps,
        root causes, and intervention
        strategies.
      </p>

      <div className="bigcard">
        <h2>
          Answer Sheet Analysis
        </h2>

        {selectedStudent ? (
          <div className="student-box success">
            <strong>
              Selected Student
            </strong>

            <p>
              👤 {selectedStudent.name}
            </p>

            <p>
              🆔 {selectedStudent.usn}
            </p>

            <p>
              🎓 Grade{" "}
              {selectedStudent.grade}
            </p>

            <p>
              ✅ Ready for Analysis
            </p>
          </div>
        ) : (
          <div className="student-box warning">
            ⚠️ No Student Selected
            <br />
            Go to Student Management and
            select a student.
          </div>
        )}

        <input
          type="file"
          accept=".pdf,image/*"
          onChange={handleFileChange}
        />

        {file && (
          <p>
            Selected File: {file.name}
          </p>
        )}

        {error && (
          <p
            style={{
              color: "red",
              marginTop: "10px",
            }}
          >
            {error}
          </p>
        )}

        <br />

        <button
          className="student-btn"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading
            ? "Analyzing..."
            : "Analyze with LEARNIQ AI"}
        </button>
      </div>

      {loading && (
        <div className="bigcard">
          <h2>
            Processing Scanned Answer Sheet...
          </h2>

          <p>
            Extracting answers,
            evaluating performance,
            identifying learning gaps,
            root causes, and generating
            intervention strategies.
          </p>
        </div>
      )}

      {result && (
        <div className="bigcard">
          <h2>
            AI Assessment Report
          </h2>

          <h3>
            Overall Score
          </h3>

          <p>
            {result.score}%
          </p>

          <h3>
            Learning Gaps
          </h3>

          <ul>
            {(result.learningGaps || []).map(
              (item, index) => (
                <li key={index}>
                  {typeof item === "object"
                    ? JSON.stringify(item)
                    : item}
                </li>
              )
            )}
          </ul>

          <h3>
            Root Causes
          </h3>

          <ul>
            {(result.rootCauses || []).map(
              (item, index) => (
                <li key={index}>
                  {typeof item === "object"
                    ? JSON.stringify(item)
                    : item}
                </li>
              )
            )}
          </ul>

          <h3>
            Explainability Factors
          </h3>

          {(result.explainabilityFactors ||
            []).length > 0 ? (
            result.explainabilityFactors.map(
              (item, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <strong>
                      {item.factor}
                    </strong>

                    <span>
                      {item.percentage}%
                    </span>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "20px",
                      background: "#ddd",
                      borderRadius: "10px",
                      overflow:
                        "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${item.percentage}%`,
                        height: "100%",
                        background:
                          "linear-gradient(90deg,#00c853,#64dd17)",
                      }}
                    />
                  </div>
                </div>
              )
            )
          ) : (
            <p>
              No explainability data
              available.
            </p>
          )}

          <h3>
            Recommendations
          </h3>

          <ul>
            {(result.recommendations || []).map(
              (item, index) => (
                <li key={index}>
                  {typeof item === "object"
                    ? JSON.stringify(item)
                    : item}
                </li>
              )
            )}
          </ul>

          <h3>
            Summary
          </h3>

          <p>
            {result.summary}
          </p>
        </div>
      )}
    </div>
  );
}