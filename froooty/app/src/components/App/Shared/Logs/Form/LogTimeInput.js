import Input from "../../../../Design/Form/Input";

const LogTimeInput = ({ value, name, onChange, ...rest }) => {
    return <Input value={value} name={name} onChange={onChange} {...rest} />;
};

export default LogTimeInput;
