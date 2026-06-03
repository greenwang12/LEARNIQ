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
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function Progress() {

  const { selectedStudent } =
    useStudent();

  const [progressData,
    setProgressData] =
    useState([]);

  const demoData = [
    {
      assessment: "Test 1",
      score: 48
    },
    {
      assessment: "Test 2",
      score: 56
    },
    {
      assessment: "Test 3",
      score: 67
    },
    {
      assessment: "Test 4",
      score: 78
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
          docs
            .filter(
              d =>
                d.studentId ===
                selectedStudent.usn
            )
            .map(
              (item, index) => ({
                assessment:
                  `Test ${index + 1}`,

                score:
                  item.score || 0
              })
            );

        if (
          studentData.length > 0
        ) {
          setProgressData(
            studentData
          );
        }
      };

    loadData();

  }, [selectedStudent]);

  const finalData =
    progressData.length > 0
      ? progressData
      : demoData;

  return (
    <>
      <h1 className="page-title">
        Progress Intelligence
      </h1>

      <StudentBanner />

      <p className="subtitle">
        Monitor improvement
        over time.
      </p>

      <div className="bigcard">

        <h2>
          Performance Growth
        </h2>

        <br />

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <LineChart
            data={finalData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="assessment"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#6c8cff"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      <div className="bigcard">

        <h2>
          AI Observation
        </h2>

        <br />

        <p>
          Performance trends are
          automatically generated
          from assessment history.
          When new answer sheets
          are analyzed, this graph
          updates automatically.
        </p>

      </div>

    </>
  );
}