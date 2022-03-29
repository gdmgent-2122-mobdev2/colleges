import Header from "../../Design/Header/Header";
import { useAuthContext } from "../AuthContainer";

const AppHeader = () => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return <Header onLogout={handleLogout} />;
};

export default AppHeader;
