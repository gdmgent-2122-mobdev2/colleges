import { Navigate, Route, Routes } from "react-router-dom";
import Container from "../Design/Container/Container";
import AddStudent from "./Students/AddStudent";
import StudentDetail from "./Students/Detail/StudentDetail";
import StudentsOverview from "./Students/StudentsOverview";

const App = () => {
  return (
    <Container>
      <Routes>
        <Route path="/students" element={<StudentsOverview />} />
        <Route path="/students/:id/*" element={<StudentDetail />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/" element={<Navigate to="/students" />} />
      </Routes>
    </Container>
  );
};

export default App;
