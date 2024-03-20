import './Input.css'

export const Input = ({ value, onChange, placeholder }) => (
    <input
        type='text'
        value={value}
        onChange={onChange}
        className="mainInput"
        placeholder={placeholder}
    />
);

