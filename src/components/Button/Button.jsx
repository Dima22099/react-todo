const Button = ({ onClick, label, className, onChange, renameDate}) => {
    return (
        <button className={`button ${className}`} onClick={onClick}>{label}
        </button>
    )
};
export default Button;