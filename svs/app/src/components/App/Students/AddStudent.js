import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Design/Button/Button";
import Input from "../../Design/Input/Input";
import Title from "../../Design/Title/Title";

const AddStudent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState({
    name: "",
    surname: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/students`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json();
      })
      .then(() => {
        navigate("/students");
      })
      .catch((error) => {
        setLoading(false);
        setError(String(error));
      });
  };

  return (
    <>
      <Link to="/">&lt; Back</Link>
      <Title>Add student</Title>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <Input name="name" value={data.name} onChange={handleChange} />
        <label htmlFor="surname">Surname</label>
        <Input name="surname" value={data.surname} onChange={handleChange} />
        <Button type="submit" disabled={loading}>
          Create
        </Button>
      </form>
    </>
  );
};

export default AddStudent;
