import './Input.css'

export const Input = ({ value, onChange }) => {
    return (
        <input 
        type='text' 
        value={value} 
        className="mainInput"
        placeholder={" enter a task"} 
        onChange={onChange} autoFocus/> 
    );
}