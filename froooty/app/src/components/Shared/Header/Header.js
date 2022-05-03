import { useAuthContext } from "../../App/Auth/AuthProvider";
import NavBar from "../../Design/NavBar/NavBar";

const Header = () => {
    const { logout } = useAuthContext();
    return <NavBar onLogout={logout} />;
};

export default Header;
