import { Link, useNavigate } from "react-router-dom";
import useMutation from "../../../core/hooks/useMutation";
import Title from "../../Design/Title/Title";
import StudentForm from "./Form/StudentForm";

const EditStudent = ({ student, onUpdate }) => {
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation();

  const handleSubmit = (data) => {
    mutate(`${process.env.REACT_APP_API_URL}/students/${student._id}`, {
      method: "PATCH",
      data,
      onSuccess: () => {
        onUpdate();
        navigate(`/students/${student._id}`);
      },
    });
  };

  return (
    <>
      <Link to="/">&lt; Back</Link>
      <Title>Edit student</Title>
      {error && <p>{error}</p>}
      <StudentForm
        onSubmit={handleSubmit}
        isDisabled={isLoading}
        label="Save"
        initialData={student}
      />
    </>
  );
};

export default EditStudent;
