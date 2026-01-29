const Button = ({ children, onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-2 rounded-full bg-gradient-to-r from-theme-purple to-theme-gray text-white font-bold hover:shadow-neon transition-all duration-300 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
