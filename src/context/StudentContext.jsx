import { createContext, useState } from "react";

const StudentContext = createContext();

export function StudentProvider({ children }) {

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  return (
    <StudentContext.Provider
      value={{
        selectedStudent,
        setSelectedStudent
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export default StudentContext;