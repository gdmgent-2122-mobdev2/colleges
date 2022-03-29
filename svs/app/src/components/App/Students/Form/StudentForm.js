import { useState } from "react";
import Button from "../../../Design/Button/Button";
import Input from "../../../Design/Input/Input";

const StudentForm = ({ onSubmit, isDisabled, label, initialData = {} }) => {
  const [data, setData] = useState({
    name: "",
    surname: "",
    ...initialData,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <Input name="name" value={data.name} onChange={handleChange} />
      <label htmlFor="surname">Surname</label>
      <Input name="surname" value={data.surname} onChange={handleChange} />
      <Button type="submit" disabled={isDisabled}>
        {label}
      </Button>
    </form>
  );
};

export default StudentForm;
