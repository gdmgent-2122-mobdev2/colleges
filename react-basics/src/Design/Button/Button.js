import "./Button.css";
import PropTypes from "prop-types";

const Button = ({ className, color = "primary", onClick, children }) => {
  return (
    <button className={`btn btn--${color} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary"]),
  onClick: PropTypes.func.isRequired,
};

export default Button;
