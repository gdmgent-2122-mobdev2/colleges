import { useEffect, useState } from "react";
import StudentDetail from "./StudentDetail/StudentDetail";

const List = ({ children }) => {
  return (
    <ul style={{ width: "50%" }} className="students">
      {children}
    </ul>
  );
};

const ListItem = ({ name, img, onClick }) => {
  return (
    <li className="students__item" onClick={onClick}>
      <img src={img} alt={name} />
      <h3>{name}</h3>
    </li>
  );
};

const StudentsList = () => {
  const [students, setStudents] = useState();
  const [error, setError] = useState();
  const [search, setSearch] = useState("");
  const [currentStudent, setCurrentStudent] = useState();

  useEffect(() => {
    let isCurrent = true;
    fetch("http://localhost:3000/data/students.json")
      .then((data) => data.json())
      .then((array) => isCurrent && setStudents(array))
      .catch((error) => isCurrent && setError(String(error)));

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    document.title = currentStudent ? currentStudent.name : "Students";
  }, [currentStudent]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleStudentClick = (student) => {
    setCurrentStudent(student);
  };

  if (error) {
    return (
      <div className="app">
        <p>{error}</p>
      </div>
    );
  }

  if (!students) {
    return (
      <div className="app">
        <p>Laden</p>
      </div>
    );
  }

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
      <div style={{ display: "flex" }}>
        <List>
          {filteredStudents.map((student) => (
            <ListItem
              onClick={() => handleStudentClick(student)}
              key={student.name}
              name={student.name}
              img={student.image}
            />
          ))}
        </List>
        {currentStudent && (
          <StudentDetail
            onClose={() => handleStudentClick(null)}
            student={currentStudent}
          />
        )}
      </div>
    </div>
  );
};

export default StudentsList;
