import { useState } from "react";
import useMutation from "../../../core/hooks/useMutation";
import Button from "../../Design/Button/Button";
import Container from "../../Design/Container/Container";
import Input from "../../Design/Input/Input";
import Title from "../../Design/Title/Title";

const LoginScreen = ({ onLogin }) => {
  const { isLoading, error, mutate } = useMutation();

  const [data, setData] = useState({
    username: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      data,
      onSuccess: (data) => {
        onLogin(data);
      },
    });
  };

  return (
    <Container>
      <Title>Inloggen</Title>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <label htmlFor="username">Username</label>
        <Input name="username" value={data.username} onChange={handleChange} />
        <Button type="submit" disabled={isLoading}>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginScreen;
