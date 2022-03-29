import { Route, Routes, useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import Loading from "../../../Design/Loading/Loading";
import EditStudent from "../EditStudent";
import StudentInfo from "./StudentInfo";

const StudentDetail = () => {
  const { id } = useParams();

  const {
    isLoading,
    error,
    invalidate,
    data: student,
  } = useFetch(`/students/${id}`);

  const handleUpdate = () => {
    invalidate();
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route
        path="edit"
        element={<EditStudent student={student} onUpdate={handleUpdate} />}
      />
      <Route index element={<StudentInfo student={student} />} />
    </Routes>
  );
};

export default StudentDetail;
