import { useContext } from "react";

import StudentContext
from "../context/StudentContext";

export default function useStudent() {

  return useContext(
    StudentContext
  );

}