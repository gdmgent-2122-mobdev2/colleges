import { useState } from "react";
import "./Oefening1.css";
import faker from "@faker-js/faker";

const Circle = ({ color, width, height }) => {
  return (
    <div
      className="circle"
      style={{
        backgroundColor: color,
        width: `${width}px`,
        height: `${height}px`,
      }}
    ></div>
  );
};

const initialCircles = [
  {
    width: 50,
    height: 50,
    color: "#DDE94A",
  },
  {
    width: 100,
    height: 100,
    color: "#7ED3A9",
  },
  {
    width: 42,
    height: 42,
    color: "#D37ED0",
  },
  {
    width: 10,
    height: 10,
    color: "orange",
  },
];

const Oefening1 = () => {
  const [circles, setCircles] = useState(initialCircles);

  const handleClick = () => {
    // TODO
  };
  return (
    <div className="App">
      <h1>Cirkels ({circles.length})</h1>
      <button onClick={handleClick}>Voeg cirkel toe</button>
      {circles.map((circle, i) => (
        <Circle
          key={i}
          color={circle.color}
          width={circle.width}
          height={circle.height}
        />
      ))}
    </div>
  );
};

export default Oefening1;
