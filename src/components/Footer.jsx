const Footer = () => {
    return (
        <footer className="border-t border-white/[0.07] bg-[#07070c] px-6 py-8 sm:px-8">
            <div className="container mx-auto text-center">
                <p className="text-sm text-gray-400">
                    Copyright {new Date().getFullYear()} <span className="font-semibold text-gray-200">Aldy Oktaviano</span>.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
