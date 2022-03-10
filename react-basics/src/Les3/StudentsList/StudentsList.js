import { useEffect, useState } from "react";
import Container from "../Design/Container/Container";
import Input from "../Design/Input/Input";
import List from "../Design/List/List";
import ListItem from "../Design/List/ListItem";
import Title from "../Design/Title/Title";
import StudentDetail from "./StudentDetail/StudentDetail";

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
      <Title>Studenten ({students.length})</Title>
      <Input
        type="search"
        name="search"
        value={search}
        onChange={handleChange}
      />
      <Container>
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
      </Container>
    </div>
  );
};

export default StudentsList;
