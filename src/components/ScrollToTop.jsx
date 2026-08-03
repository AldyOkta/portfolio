import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollState = () => {
            const maxScroll = Math.max(
                document.documentElement.scrollHeight - window.innerHeight,
                1
            );

            setIsVisible(window.scrollY > 420);
            setScrollProgress((window.scrollY / maxScroll) * 100);
        };

        updateScrollState();
        window.addEventListener('scroll', updateScrollState, { passive: true });
        return () => window.removeEventListener('scroll', updateScrollState);
    }, []);

    return (
        <>
            <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-white/[0.05]">
                <div
                    className="h-full bg-gradient-to-r from-theme-purple via-violet-400 to-cyan-300 shadow-[0_0_12px_rgba(135,80,247,0.9)] transition-[width] duration-100"
                    style={{ width: scrollProgress + '%' }}
                />
            </div>

            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        aria-label="Kembali ke atas"
                        initial={{ opacity: 0, scale: 0.7, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.7, y: 16 }}
                        className="group fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-theme-purple/60 bg-[#0e0b1c]/85 text-theme-purple shadow-[0_0_24px_rgba(135,80,247,0.25)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:bg-theme-purple hover:text-white sm:bottom-8 sm:right-8"
                    >
                        <FaArrowUp className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
};

export default ScrollToTop;
