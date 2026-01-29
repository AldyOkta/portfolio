const Navbar = () => {
    return (
        <nav className="fixed w-full p-4 bg-theme-dark/80 backdrop-blur-md z-50 border-b border-white/10">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-white hover:text-theme-purple transition-colors cursor-pointer">Aldy</span>
                    <span className="w-2 h-2 rounded-full bg-theme-purple"></span>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8">
                    {['Home', 'Services', 'Portfolio', 'Experience', 'Contact'].map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase()}`}
                                className="text-gray-300 hover:text-theme-purple transition-colors text-sm font-medium"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <a
                    href="#contact"
                    className="hidden md:block px-6 py-2 rounded-full bg-gradient-to-r from-theme-purple to-theme-gray text-white font-bold text-sm hover:shadow-neon transition-all duration-300"
                >
                    Hire Me!
                </a>

                {/* Mobile Menu Toggle (Simplified placeholder) */}
                <div className="md:hidden text-white">
                    Menu
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
