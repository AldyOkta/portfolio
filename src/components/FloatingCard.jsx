import { motion } from 'framer-motion';

const FloatingCard = ({ children, className = '' }) => {
    return (
        <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className={`bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:border-theme-purple transition-colors ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default FloatingCard;
