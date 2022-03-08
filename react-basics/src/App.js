import { useEffect, useState } from "react";
import Les1 from "./Les1/Les1";
import Les2 from "./Les2/Les2";
import "./App.css";
import Les3 from "./Les3/Les3";

const COURSES = [
  {
    key: "les1",
    label: "Les 1",
  },
  {
    key: "les2",
    label: "Les 2",
  },
  {
    key: "les3",
    label: "Les 3",
  },
];

const App = () => {
  const [currentCourse, setCurrentCourse] = useState(
    localStorage.getItem("course") || "les1"
  );

  let template;
  switch (currentCourse) {
    case "les1":
      template = <Les1 />;
      break;
    case "les2":
      template = <Les2 />;
      break;
    case "les3":
      template = <Les3 />;
      break;
    default:
      template = null;
  }

  useEffect(() => {
    localStorage.setItem("course", currentCourse);
  }, [currentCourse]);

  return (
    <div className="app">
      <header className="header">
        <nav>
          <ul>
            {COURSES.map((course) => (
              <li
                key={course.key}
                className={currentCourse === course.key ? "active" : ""}
              >
                <button onClick={() => setCurrentCourse(course.key)}>
                  {course.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {template}
    </div>
  );
};

export default App;
