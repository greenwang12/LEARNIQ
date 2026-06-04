import useStudent from "../hooks/useStudent";

export default function StudentBanner() {

  const { selectedStudent } =
    useStudent();

  if (!selectedStudent) {

    return (

      <div className="bigcard">

        <h2>
          No Student Selected
        </h2>

        <p>
          Go to Student Management
          and select a student.
        </p>

      </div>

    );
  }

  return (

    <div className="bigcard">

      <h2>
        Current Student
      </h2>

      <br />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px"
        }}
      >

        <div>
          <strong>Name</strong>
          <br />
          {selectedStudent.name || "-"}
        </div>

        <div>
          <strong>ID</strong>
          <br />
          {selectedStudent.usn || "-"}
        </div>

        <div>
          <strong>Grade</strong>
          <br />
          {selectedStudent.grade || "-"}
        </div>

        <div>
          <strong>Latest Score</strong>
          <br />
          {selectedStudent.latestScore ?? 0}%
        </div>

        <div>
          <strong>Risk Level</strong>
          <br />
          {selectedStudent.riskLevel || "Low"}
        </div>

        <div>
          <strong>Top Gap</strong>
          <br />
          {selectedStudent.topGap || "None"}
        </div>

        <div>
          <strong>Assessments</strong>
          <br />
          {selectedStudent.assessments ?? 0}
        </div>

      </div>

    </div>

  );
}