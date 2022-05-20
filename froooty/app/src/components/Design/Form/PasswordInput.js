import PropTypes from "prop-types";
import Button from "../Buttons/Button";
import Input from "./Input";
import InputGroup from "./InputGroup";
import { BiShow } from "react-icons/bi";

const PasswordInput = (props) => {
    return (
        <InputGroup>
            <Input type="password" {...props}>
                <Button color="secondary" onClick={() => {}}>
                    <BiShow />
                </Button>
            </Input>
        </InputGroup>
    );
};

PasswordInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default PasswordInput;
