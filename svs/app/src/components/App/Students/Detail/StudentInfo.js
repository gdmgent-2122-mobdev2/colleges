import { Link } from "react-router-dom";
import { formatName } from "../../../../core/modules/students/utils";
import Button from "../../../Design/Button/Button";

const StudentInfo = ({ student }) => {
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
        <h1>{formatName(student)}</h1>
        <p>{student.username}</p>
      </div>
    </div>
  );
};

export default StudentInfo;
