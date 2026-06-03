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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function Analysis() {

  const { selectedStudent } =
    useStudent();

  const [heatmapData,
    setHeatmapData] =
    useState([]);

  const demoHeatmapData = [
    { topic: "Vocabulary", value: 85 },
    { topic: "Grammar", value: 65 },
    { topic: "Reading", value: 78 },
    { topic: "Writing", value: 45 },
    { topic: "Mathematics", value: 30 },
    { topic: "Science", value: 55 }
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

          setHeatmapData(
            latest.learningGaps || []
          );
        }
      };

    loadData();

  }, [selectedStudent]);

  const finalData =
    heatmapData.length > 0
      ? heatmapData
      : demoHeatmapData;

  return (
    <>
      <h1 className="page-title">
        Learning Gap Heatmap
      </h1>

      <StudentBanner />

      <p className="subtitle">
        AI identifies learning
        deficiencies across
        subjects and concepts.
      </p>

      <div className="bigcard">

        <h2>
          Learning Gap Analysis
        </h2>

        <br />

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <BarChart
            data={finalData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="topic"
            />

            <YAxis />

            <Tooltip />
<Bar
  dataKey="value"
  radius={[8, 8, 0, 0]}
>
  {finalData.map((entry, index) => (

    <Cell
      key={index}
      fill={
        entry.value >= 75
          ? "#ff4d4f"
          : entry.value >= 50
          ? "#faad14"
          : "#52c41a"
      }
    />

  ))}
</Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="bigcard">

        <h2>
          AI Insight
        </h2>

        <br />

        <p>
          Learning gaps are
          automatically generated
          from the latest student
          assessment. If no
          assessment exists,
          demo data is shown.
        </p>

      </div>

    </>
  );
}