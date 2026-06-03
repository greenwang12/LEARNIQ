import { useEffect, useState } from "react";

import StudentBanner from "../components/StudentBanner";

import useStudent from "../hooks/useStudent";

import { db } from "../firebase";

import {
  collection,
  getDocs
} from "firebase/firestore";

export default function RootCause() {

  const { selectedStudent } =
    useStudent();

  const [rootCauses,
    setRootCauses] =
    useState([]);

  const demoRootCauses = [
    {
      cause:
        "Vocabulary Deficiency",
      percentage: 85
    },
    {
      cause:
        "Practice Deficiency",
      percentage: 70
    },
    {
      cause:
        "Attention Issues",
      percentage: 55
    },
    {
      cause:
        "Conceptual Weakness",
      percentage: 40
    }
  ];

  useEffect(() => {

    const loadData =
      async () => {

        if (!selectedStudent)
          return;

        const snap =
          await getDocs(
            collection(
              db,
              "assessments"
            )
          );

        const docs =
          snap.docs.map(
            doc => doc.data()
          );

        const studentData =
          docs.filter(
            d =>
              d.studentId ===
              selectedStudent.usn
          );

        if (
          studentData.length > 0
        ) {

          const latest =
            studentData[
              studentData.length - 1
            ];

          setRootCauses(
            latest.rootCauses || []
          );
        }
      };

    loadData();

  }, [selectedStudent]);

  const causes =
    rootCauses.length > 0
      ? rootCauses
      : demoRootCauses;

  return (
    <>
      <h1 className="page-title">
        Root Cause Engine
      </h1>

      <StudentBanner />

      <p className="subtitle">
        AI identifies underlying
        reasons behind learning
        difficulties.
      </p>

      <div className="bigcard">

        <h2>
          Root Cause Analysis
        </h2>

        <br />

        {causes.map((item) => (

          <div
            key={item.cause}
            style={{
              marginBottom:
                "25px"
            }}
          >

            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
                marginBottom:
                  "8px"
              }}
            >

              <strong>
                {item.cause}
              </strong>

              <span>
                {item.percentage}%
              </span>

            </div>

            <div
              style={{
                width: "100%",
                height: "14px",
                borderRadius:
                  "10px",
                background:
                  "rgba(255,255,255,.08)"
              }}
            >

              <div
                style={{
                  width:
                    `${item.percentage}%`,
                  height:
                    "100%",
                  borderRadius:
                    "10px",

                  background:
                    item.percentage >= 75
                      ? "#ff4d4f"
                      : item.percentage >= 50
                      ? "#faad14"
                      : "#52c41a"
                }}
              />

            </div>

          </div>

        ))}

      </div>

      <div className="bigcard">

        <h2>
          AI Findings
        </h2>

        <br />

        <p>
          Root causes are
          automatically generated
          from the latest student
          assessment.
        </p>

      </div>

    </>
  );
}