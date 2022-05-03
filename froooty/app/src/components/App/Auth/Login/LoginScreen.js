import { useState } from "react";
import useMutation from "../../../../core/hooks/useMutation";
import Button from "../../../Design/Button";
import Container from "../../../Design/Container";
import FormGroup from "../../../Design/Form/FormGroup";
import Input from "../../../Design/Form/Input";
import Label from "../../../Design/Form/Label";
import { useAuthContext } from "../AuthProvider";

const LoginScreen = () => {
    const { login } = useAuthContext();

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (e) => {
        e.preventDefault();

        mutate(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            data,
            onSuccess: (data) => {
                login(data);
            },
        });
    };

    return (
        <Container>
            <h1>Inloggen</h1>
            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button type="submit" disabled={isLoading}>
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default LoginScreen;
