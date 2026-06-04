import {
  Link,
  useLocation
} from "react-router-dom";

export default function Sidebar({
  menuOpen,
  setMenuOpen
}) {

  const location =
    useLocation();

  const menu = [
    {
      name: "Student Management",
      path: "/students"
    },
    {
      name: "Analysis Center",
      path: "/dashboard"
    },
    {
      name: "Learning Gap Heatmap",
      path: "/analysis"
    },
    {
      name: "Root Cause Engine",
      path: "/rootcause"
    },
    {
      name: "Explainability Studio",
      path: "/xai"
    },
    {
      name: "Intervention Studio",
      path: "/intervention"
    },
    {
      name: "Progress Intelligence",
      path: "/progress"
    }
  ];

  return (
    <>

      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setMenuOpen(false)
          }
        />
      )}

      <div
        className={`sidebar ${
          menuOpen
            ? "open"
            : ""
        }`}
      >

        <div>

          <h2>
            LEARNIQ
          </h2>

          <div className="sidebar-tag">
            AI Learning Intelligence
            Platform
          </div>

          {menu.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={
                location.pathname ===
                item.path
                  ? "active-link"
                  : ""
              }
              onClick={() =>
                setMenuOpen(false)
              }
            >
              {item.name}
            </Link>

          ))}

        </div>

      </div>

    </>
  );
}