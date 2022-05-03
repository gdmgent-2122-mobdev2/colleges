import PropTypes from "prop-types";

const Button = ({
    children,
    onClick,
    color = "primary",
    type = "button",
    disabled = false,
}) => {
    return (
        <button
            className={`btn btn-${color}`}
            onClick={onClick}
            type={type}
            disabled={disabled}>
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["button", "reset", "submit"]),
    disabled: PropTypes.bool,
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "light",
        "outline-light",
        "outline-primary",
        "outline-secondary",
        "danger",
    ]),
};

export default Button;
