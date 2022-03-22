import { Link, useParams } from "react-router-dom";
import useApi from "../../../core/hooks/useApi";
import Button from "../../Design/Button/Button";
import Loading from "../../Design/Loading/Loading";

const StudentDetail = () => {
  const { id } = useParams();

  const { isLoading, error, data: student } = useApi(`/students/${id}`);

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Link to="/">&lt; Back</Link>
      <div className="flex flex-end">
        <Button color="primary" href="edit">
          Edit
        </Button>
      </div>
      <div>
        <img src={student.image} alt={student.name} />
        <h1>{student.name}</h1>
        <p>{student.username}</p>
      </div>
    </div>
  );
};

export default StudentDetail;
