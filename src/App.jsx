import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Analysis from "./pages/Analysis";
import RootCause from "./pages/RootCause";
import ExplainableAI from "./pages/ExplainableAI";
import Intervention from "./pages/Intervention";
import Progress from "./pages/Progress";

import "./App.css";

function AppContent() {

  const location =
    useLocation();

  return (

    <div className="page">

      {location.pathname !== "/" && (
        <Sidebar />
      )}

      <div className="content">

        <Routes>

          <Route
            path="/"
            element={<Landing />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/students"
            element={<Students />}
          />

          <Route
            path="/analysis"
            element={<Analysis />}
          />

          <Route
            path="/rootcause"
            element={<RootCause />}
          />

          <Route
            path="/xai"
            element={<ExplainableAI />}
          />

          <Route
            path="/intervention"
            element={<Intervention />}
          />

          <Route
            path="/progress"
            element={<Progress />}
          />

        </Routes>

        {location.pathname !== "/" && (

          <footer className="footer">
            © 2026 LEARNIQ.
            All Rights Reserved.
          </footer>

        )}

      </div>

    </div>

  );
}

export default function App() {

  return (

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>

  );
}