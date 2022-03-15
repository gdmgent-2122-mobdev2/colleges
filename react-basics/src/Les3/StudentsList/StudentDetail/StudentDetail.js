import "./StudentDetail.css";
import Detail from "../../../Design/Detail/Detail";
import GithubDetail from "../GithubDetail/GithubDetail";

const StudentDetail = ({ student, onClose }) => {
  return (
    <Detail onClose={onClose}>
      <h2 className="student-detail__title">{student.name}</h2>
      {student.username && <GithubDetail username={student.username} />}
    </Detail>
  );
};

export default StudentDetail;
