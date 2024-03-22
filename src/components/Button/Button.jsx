import './Button.css';

export const Button = ({ onClick, label, selected }) => {
    return (
        <button className={`button ${selected ? 'selected' : ''}`} onClick={onClick}>
            {label}
        </button>
    )
};
