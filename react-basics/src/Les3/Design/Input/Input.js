import "./Input.css";

const Input = ({ type, value, onChange, disabled = false }) => {
  return (
    <input
      className="input"
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default Input;
