import './Input.css'

const Input = ({ value, onChange }) => {
    return (
        <input type='text' placeholder={"enter a task"} className="mainInput"
         value={value} onChange={onChange} /> 
    );
}
export default Input;