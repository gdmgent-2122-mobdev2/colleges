import { useState } from "react";
import initialStudents from "../../data/students";

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

const StudentsFilter = () => {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  let filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Studenten ({students.length})</h1>
      <input
        type="search"
        name="search"
        value={search}
        onChange={handleChange}
      />
      <List>
        {filteredStudents.map((student) => (
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

export default StudentsFilter;
