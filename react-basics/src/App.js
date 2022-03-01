import { useState } from "react";
import Les1 from "./Les1/Les1";
import Les2 from "./Les2/Les2";
import "./App.css";

const App = () => {
  const [currentCourse, setCurrentCourse] = useState("les2");

  let template;
  if (currentCourse === "les1") {
    template = <Les1 />;
  } else if (currentCourse === "les2") {
    template = <Les2 />;
  }

  return (
    <div className="app">
      <header className="header">
        <nav>
          <ul>
            <li>
              <button onClick={() => setCurrentCourse("les1")}>Les 1</button>
            </li>
            <li>
              <button onClick={() => setCurrentCourse("les2")}>Les 2</button>
            </li>
          </ul>
        </nav>
      </header>

      {template}
    </div>
  );
};

export default App;
