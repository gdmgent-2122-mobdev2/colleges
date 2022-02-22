import { useState } from "react";
import "./App.css";

const List = ({ children }) => {
  return <ul className="students">{children}</ul>;
};

const ListItem = ({ name, img }) => {
  return (
    <li className="students__item">
      <img src={img} alt={name} />
      <h3>{name}</h3>
    </li>
  );
};

const initialStudents = [
  {
    name: "Thibault Feraux",
    image:
      "https://arteveldehogeschool.instructure.com/images/messages/avatar-50.png",
  },
  {
    name: "Naboth Schulte",
    image:
      "https://arteveldehogeschool.instructure.com/images/thumbnails/1335700/KWP3Bt2idLLeSwTJKMNSY8VTLaE5bQpVN7fTWxSB",
  },
  {
    name: "Lisa De Boever",
    image:
      "https://arteveldehogeschool.instructure.com/images/thumbnails/534367/NjcBqqXRZjkedzGmy8OvoWeqQRwnkTwZqVpXxCvR",
  },
  {
    name: "Niels Minne",
    image:
      "https://arteveldehogeschool.instructure.com/images/messages/avatar-50.png",
  },
];

const App = () => {
  const [students, setStudents] = useState([...initialStudents]);

  const handleClick = () => {
    // setClicked(true);
  };
  return (
    <div className="App">
      <h1>Studenten ({students.length})</h1>
      <button onClick={handleClick}>Click</button>
      <List>
        {students.map((student) => (
          <ListItem
            key={student.name}
            name={student.name}
            img={student.image}
          />
        ))}
      </List>
    </div>
  );
};

export default App;
