import GithubDetail from "../GithubDetail/GithubDetail";

const StudentDetail = ({ student, onClose }) => {
  return (
    <div style={{ width: "50%" }}>
      <button onClick={onClose}>X</button>
      <img src={student.image} alt={student.name} />
      <h1>{student.name}</h1>
      <p>{student.username}</p>
      {student.username && <GithubDetail username={student.username} />}
    </div>
  );
};

export default StudentDetail;
