import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavBar = ({ navItems = [], onLogout }) => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Froooty
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {navItems.map((navItem) => (
                            <li className="nav-item" key={navItem.href}>
                                <Link
                                    className={`nav-link ${
                                        navItem.isActive ? "active" : ""
                                    }`}
                                    to={navItem.href}>
                                    {navItem.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={onLogout}>Logout</button>
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    onLogout: PropTypes.func.isRequired,
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string,
            isActive: PropTypes.bool,
            label: PropTypes.string,
        })
    ).isRequired,
};

export default NavBar;
