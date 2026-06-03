import { useEffect, useState } from "react";

import StudentBanner from "../components/StudentBanner";

import useStudent from "../hooks/useStudent";

import { db } from "../firebase";

import {
  collection,
  getDocs
} from "firebase/firestore";

export default function Intervention() {

  const { selectedStudent } =
    useStudent();

  const [recommendations,
    setRecommendations] =
    useState([]);

  const demoRecommendations = [
    "Provide fraction visualization exercises",
    "Conduct small-group remediation sessions",
    "Monitor weekly assessment performance",
    "Assign targeted practice worksheets"
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

          setRecommendations(
            latest.recommendations || []
          );
        }
      };

    loadData();

  }, [selectedStudent]);

  const finalRecommendations =
    recommendations.length > 0
      ? recommendations
      : demoRecommendations;

  return (
    <>
      <h1 className="page-title">
        Intervention Studio
      </h1>

      <StudentBanner />

      <p className="subtitle">
        Personalized support plans
        generated automatically.
      </p>

      <div className="bigcard">

        <h2>
          Teacher Action Plan
        </h2>

        <br />

        <ul
          style={{
            lineHeight: "2"
          }}
        >
          {finalRecommendations.map(
            (item, index) => (

              <li key={index}>
                {item}
              </li>

            )
          )}
        </ul>

      </div>

      <div className="bigcard">

        <h2>
          Parent Recommendations
        </h2>

        <br />

        <p>
          Encourage regular
          revision, guided reading,
          concept reinforcement,
          and positive study habits
          at home.
        </p>

      </div>

    </>
  );
}