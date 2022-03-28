import "./Header.css";
import PropTypes from "prop-types";
import Container from "../Container/Container";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Header = ({ onLogout }) => {
  return (
    <header className="header">
      <Container>
        <Link to="/">
          <h1 className="header__title">SVS</h1>
        </Link>
        <Button color="alert" onClick={onLogout}>
          Logout
        </Button>
      </Container>
    </header>
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Header;
