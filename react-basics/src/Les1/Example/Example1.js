import { useState } from "react";
import "./Example1.css";
import faker from "@faker-js/faker";

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

const Example1 = () => {
  const [students, setStudents] = useState(initialStudents);

  const handleClick = () => {
    const student = {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      image: `${faker.image.avatar()}`,
    };
    /* wrong, still the same array + initialStudents has changed */
    // students.push(student);
    // setStudents(students);
    // console.log(initialStudents);

    /* right, we create a new array, initialStudents hasn't changed */
    setStudents([...students, student]);
  };
  return (
    <div className="App">
      <h1>Studenten ({students.length})</h1>
      <button onClick={handleClick}>Voeg student toe</button>
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

export default Example1;
