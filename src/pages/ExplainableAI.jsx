import { useEffect, useState } from "react";

import StudentBanner from "../components/StudentBanner";

import useStudent from "../hooks/useStudent";

import { db } from "../firebase";

import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";

export default function ExplainableAI() {

  const { selectedStudent } =
    useStudent();

  const [factors,
    setFactors] =
    useState([]);

  const demoFactors = [
    {
      factor: "Fraction Errors",
      percentage: 45
    },
    {
      factor: "Attention Issues",
      percentage: 30
    },
    {
      factor: "Vocabulary Gap",
      percentage: 20
    },
    {
      factor: "Other Factors",
      percentage: 5
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

          setFactors(
            latest.explainabilityFactors || []
          );
        }
      };

    loadData();

  }, [selectedStudent]);

  const finalData =
    factors.length > 0
      ? factors
      : demoFactors;

  const COLORS = [
    "#6c8cff",
    "#ff7a45",
    "#52c41a",
    "#faad14"
  ];

  return (
    <>
      <h1 className="page-title">
        Explainability Studio
      </h1>

      <StudentBanner />

      <p className="subtitle">
        Transparent reasoning behind
        every AI recommendation.
      </p>

      <div className="bigcard">

        <h2>
          Why Was This Flagged?
        </h2>

        <br />

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <PieChart>

            <Pie
              data={finalData}
              dataKey="percentage"
              nameKey="factor"
              outerRadius={140}
              label
            >

              {finalData.map(
                (entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                        COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="bigcard">

        <h2>
          AI Reasoning
        </h2>

        <br />

        <p>
          The AI highlights the
          strongest contributing
          factors behind the
          student's performance.
          Real assessment data
          automatically replaces
          demo data.
        </p>

      </div>

    </>
  );
}