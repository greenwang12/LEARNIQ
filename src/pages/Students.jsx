/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import { db } from "../firebase";
import useStudent from "../hooks/useStudent";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

export default function Students() {

  const {
    selectedStudent,
    setSelectedStudent,
  } = useStudent();

  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [grade, setGrade] = useState("");

  const [students, setStudents] =
    useState([]);

  const [successMsg, setSuccessMsg] =
    useState("");

  const loadStudents = async () => {

    const snap = await getDocs(
      collection(db, "students")
    );

    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const addStudent = async () => {

    if (!name || !usn || !grade) {

      alert(
        "Enter Name, Student ID and Grade"
      );

      return;
    }

    await addDoc(
      collection(db, "students"),
      {
        name,
        usn,
        grade,

        latestScore: 0,
        riskLevel: "Low",
        topGap: "None",
        assessments: 0,

        createdAt:
          serverTimestamp(),
      }
    );

    setName("");
    setUsn("");
    setGrade("");

    setSuccessMsg(
      "✅ Student Added Successfully"
    );

    loadStudents();
  };

  return (
    <>

      <h1 className="page-title">
        Student Management
      </h1>

      <p className="subtitle">
        Central student database powering
        every LEARNIQ module.
      </p>

      {selectedStudent && (

        <div className="bigcard">

          <h2>
            Current Selected Student
          </h2>

          <br />

          <h3>
            👤 {selectedStudent.name}
          </h3>

          <p>
            🆔 {selectedStudent.usn}
          </p>

          <p>
            🎓 Grade {selectedStudent.grade}
          </p>

        </div>

      )}

      <div className="bigcard">

        <h2>
          Add Student
        </h2>

        <br />

        <input
          className="student-input"
          placeholder="Student Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br />
        <br />

        <input
          className="student-input"
          placeholder="Student ID / USN"
          value={usn}
          onChange={(e) =>
            setUsn(e.target.value)
          }
        />

        <br />
        <br />

        <input
          className="student-input"
          placeholder="Grade"
          value={grade}
          onChange={(e) =>
            setGrade(e.target.value)
          }
        />

        <br />
        <br />

        <button
          className="student-btn"
          onClick={addStudent}
        >
          Add Student
        </button>

      </div>

      <div className="bigcard">

        <h2>
          Student Database
          ({students.length})
        </h2>

        <br />

        {successMsg && (

          <div
            style={{
              background:
                "rgba(0,255,120,.15)",

              border:
                "1px solid rgba(0,255,120,.4)",

              color:
                "#7CFF9D",

              padding:
                "15px",

              borderRadius:
                "12px",

              marginBottom:
                "20px",

              fontWeight:
                "600",
            }}
          >
            {successMsg}
          </div>

        )}

        {students.length === 0 ? (

          <p>
            No students found.
          </p>

        ) : (

          <div
            style={{
              display: "grid",
              gap: "20px",
            }}
          >

            {students
              .sort((a, b) =>
                a.name.localeCompare(
                  b.name
                )
              )
              .map((student) => (

                <div
                  key={student.id}
                  style={{
                    background:
                      "rgba(255,255,255,0.05)",

                    borderRadius:
                      "18px",

                    padding:
                      "25px",

                    border:
                      selectedStudent?.id ===
                      student.id
                        ? "2px solid #6c8cff"
                        : "1px solid rgba(255,255,255,0.1)",
                  }}
                >

                  <h2>
                    👤 {student.name}
                  </h2>

                  <p>
                    {student.usn}
                  </p>

                  <p>
                    Grade {student.grade}
                  </p>

                  <hr
                    style={{
                      margin:
                        "15px 0",
                    }}
                  />

                  <p>
                    📊 Latest Score:
                    {" "}
                    {student.latestScore || 0}%
                  </p>

                  <p>
                    Risk Level:
                    {" "}
                    {student.riskLevel || "Low"}
                  </p>

                  <p>
                    Top Learning Gap:
                    {" "}
                    {student.topGap || "None"}
                  </p>

                  <p>
                    Assessments:
                    {" "}
                    {student.assessments || 0}
                  </p>

                  <button
                    className="student-btn"
                    style={{
                      marginTop:
                        "15px",
                    }}
                    onClick={() => {

                      setSelectedStudent(
                        student
                      );

                      setSuccessMsg(
                        "✅ Selected Successfully"
                      );

                    }}
                  >
                    {selectedStudent?.id ===
                    student.id
                      ? "Selected"
                      : "Select Student"}
                  </button>

                </div>

              ))}

          </div>

        )}

      </div>

    </>
  );
}