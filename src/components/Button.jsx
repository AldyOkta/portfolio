const Button = ({
    children,
    onClick,
    className = '',
    type = 'button',
    disabled = false,
    ...props
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={'inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-theme-purple to-[#4c1d95] px-6 py-3 font-bold text-white shadow-[0_10px_30px_rgba(135,80,247,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-neon disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ' + className}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
