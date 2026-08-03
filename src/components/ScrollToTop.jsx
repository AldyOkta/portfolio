import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const calculateScrollProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        setScrollProgress(scrollPercent);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            toggleVisibility();
            calculateScrollProgress();
        });

        return () => {
            window.removeEventListener("scroll", () => {
                toggleVisibility();
                calculateScrollProgress();
            });
        };
    }, []);

    return (
        <>
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 right-0 w-1 h-screen z-50 pointer-events-none">
                <div 
                    className="w-full bg-theme-purple rounded-b-md shadow-neon transition-all duration-100 ease-out"
                    style={{ height: `${scrollProgress}%` }}
                ></div>
            </div>

            {/* Back to Top Button */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 50 }}
                        transition={{ duration: 0.3 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-50 cursor-pointer group"
                    >
                        <div className="w-12 h-12 bg-theme-purple/20 backdrop-blur-sm border border-theme-purple rounded-full flex items-center justify-center text-theme-purple hover:bg-theme-purple hover:text-white transition-all duration-300 shadow-neon hover:shadow-[0_0_20px_rgba(135,80,247,0.8)]">
                            <FaArrowUp className="text-xl transform group-hover:-translate-y-1 transition-transform duration-300" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ScrollToTop;
