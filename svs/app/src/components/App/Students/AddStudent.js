import { Link, useNavigate } from "react-router-dom";
import useMutation from "../../../core/hooks/useMutation";
import Title from "../../Design/Title/Title";
import StudentForm from "./Form/StudentForm";

const AddStudent = () => {
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation();

  const handleSubmit = (data) => {
    mutate(`${process.env.REACT_APP_API_URL}/students`, {
      method: "POST",
      data,
      onSuccess: () => {
        navigate(`/students`);
      },
    });
  };

  return (
    <>
      <Link to="/">&lt; Back</Link>
      <Title>Add student</Title>
      {error && <p>{error}</p>}
      <StudentForm
        onSubmit={handleSubmit}
        isDisabled={isLoading}
        label="Create"
      />
    </>
  );
};

export default AddStudent;
