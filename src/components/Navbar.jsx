import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const [clickedLink, setClickedLink] = useState('');

    const navLinks = [
        { name: 'Beranda', href: '#hero' },
        { name: 'Layanan', href: '#services' },
        { name: 'Portofolio', href: '#portfolio' },
        { name: 'Pengalaman', href: '#experience' },
        { name: 'Kontak', href: '#contact' }
    ];

    // Deteksi section aktif berdasarkan scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map(link => link.href.replace('#', ''));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveLink('#' + sections[i]);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href) => {
        setClickedLink(href);
        setActiveLink(href);
        setIsOpen(false);
        // Reset efek klik setelah animasi selesai
        setTimeout(() => setClickedLink(''), 600);
    };

    return (
        <nav className="fixed w-full p-4 bg-[#0a0a1a]/80 backdrop-blur-md z-50 border-b border-white/10">
            <div className="container mx-auto flex justify-between items-center">

                {/* Logo */}
                <motion.div
                    className="text-2xl font-bold flex items-center gap-2 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavClick('#hero')}
                >
                    <a href="#hero" className="text-white hover:text-purple-400 transition-colors">
                        Portofolio
                    </a>
                    <motion.span
                        className="w-2 h-2 rounded-full bg-purple-500"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-2">
                    {navLinks.map((item) => {
                        const isActive = activeLink === item.href;
                        const isClicked = clickedLink === item.href;
                        return (
                            <li key={item.name} className="relative">
                                <motion.a
                                    href={item.href}
                                    onClick={() => handleNavClick(item.href)}
                                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 block ${
                                        isActive
                                            ? 'text-white'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.92 }}
                                    animate={isClicked ? {
                                        y: [0, -6, 0],
                                        transition: { duration: 0.4, ease: 'easeOut' }
                                    } : {}}
                                >
                                    {/* Active/Hover background pill */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="activePill"
                                            className="absolute inset-0 bg-purple-600/25 border border-purple-500/40 rounded-full -z-10"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}

                                    {/* Ripple/flash on click */}
                                    <AnimatePresence>
                                        {isClicked && (
                                            <motion.span
                                                key="ripple"
                                                className="absolute inset-0 rounded-full bg-purple-500/30"
                                                initial={{ scale: 0.5, opacity: 0.8 }}
                                                animate={{ scale: 2, opacity: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                            />
                                        )}
                                    </AnimatePresence>

                                    {item.name}

                                    {/* Underline dot indicator */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="activeDot"
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </motion.a>
                            </li>
                        );
                    })}
                </ul>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center">
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white text-2xl p-2 rounded-lg border border-white/10"
                        whileTap={{ scale: 0.85, rotate: 90 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.span
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaTimes />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="open"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaBars />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden bg-[#0a0a1a]/95 backdrop-blur-lg"
                    >
                        <ul className="flex flex-col p-6 space-y-2">
                            {navLinks.map((item, index) => (
                                <motion.li
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.07, duration: 0.3 }}
                                >
                                    <a
                                        href={item.href}
                                        onClick={() => handleNavClick(item.href)}
                                        className={`block px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                                            activeLink === item.href
                                                ? 'text-white bg-purple-600/20 border border-purple-500/30'
                                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {item.name}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;