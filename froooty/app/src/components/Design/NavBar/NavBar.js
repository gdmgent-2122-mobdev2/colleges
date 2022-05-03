import { Link } from "react-router-dom";

const NavBar = ({ children, onLogout }) => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Froooty
                </Link>
                <div>{children}</div>
                <button onClick={onLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default NavBar;
