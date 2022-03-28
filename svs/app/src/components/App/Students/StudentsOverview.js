import Loading from "../../Design/Loading/Loading";
import List from "../../Design/List/List";
import ListItem from "../../Design/List/ListItem";
import Button from "../../Design/Button/Button";
import useFetch from "../../../core/hooks/useFetch";

const StudentsOverview = () => {
  const { isLoading, error, data: students } = useFetch("/students");

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-end">
        <Button color="primary" href="add">
          Add
        </Button>
      </div>
      <List>
        {students.map((student) => (
          <ListItem
            href={`/students/${student._id}`}
            key={student._id}
            img={student.image}
            name={`${student.name} ${student.surname}`}
          />
        ))}
      </List>
    </>
  );
};

export default StudentsOverview;
