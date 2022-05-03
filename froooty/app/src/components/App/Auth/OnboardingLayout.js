import { Navigate, Outlet } from "react-router-dom";
import Container from "../../Design/Container";
import { useAuthContext } from "./AuthProvider";

const OnboardingLayout = () => {
    const { auth } = useAuthContext();

    if (!auth) {
        return (
            <Container>
                <Outlet />
            </Container>
        );
    }

    return <Navigate to="/" state={{ replace: true }} />;
};

export default OnboardingLayout;
