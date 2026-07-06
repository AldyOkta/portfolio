import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Pastikan array ini hanya berisi 5 item unik
    const navLinks = [
        { name: 'Beranda', href: '#hero' },
        { name: 'Layanan', href: '#services' }, // Kamu bisa ganti jadi 'Quality Services'
        { name: 'Portofolio', href: '#portfolio' },
        { name: 'Pengalaman', href: '#experience' },
        { name: 'Kontak', href: '#contact' }
    ];

    return (
        <nav className="fixed w-full p-4 bg-[#0a0a1a]/80 backdrop-blur-md z-50 border-b border-white/10">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-white hover:text-purple-500 transition-colors cursor-pointer">Aldy</span>
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                </div>

                {/* Desktop Menu - Hanya mapping satu kali */}
                <ul className="hidden md:flex space-x-8">
                    {navLinks.map((item) => (
                        <li key={item.name}>
                            <a href={item.href} className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium">
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-[72px] left-0 w-full bg-[#0a0a1a]/95 backdrop-blur-lg transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <ul className="flex flex-col p-6 space-y-5">
                    {navLinks.map((item) => (
                        <li key={item.name}>
                            <a href={item.href} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-purple-400 block text-xl font-semibold">
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;