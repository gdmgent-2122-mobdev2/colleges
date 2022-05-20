import Button from "../../../Design/Buttons/Button";
import { BiTrash } from "react-icons/bi";
import PropTypes from "prop-types";

const DeleteButton = ({ onSuccess, id, scope, ...rest }) => {
    return (
        <Button color="danger" onClick={() => {}} {...rest}>
            <BiTrash />
        </Button>
    );
};

DeleteButton.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["sm", "lg", "md"]),
};

export default DeleteButton;
