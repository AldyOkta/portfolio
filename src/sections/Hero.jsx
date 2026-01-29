import { motion } from 'framer-motion';
import Button from '../components/Button';
import { FaGithub, FaLinkedin, FaTwitter, FaDribbble } from 'react-icons/fa';
import AldyImg from '../assets/aldy.png';

const Hero = () => {
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const socialLinks = [
        { icon: <FaGithub />, href: "https://github.com/AldyOkta" },
        { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/aldy-oktaviano-548174280" },
        { icon: <FaTwitter />, href: "#" },
        { icon: <FaDribbble />, href: "#" },
    ];

    const stats = [
        { number: "14", label: "Years of Experience" },
        { number: "50+", label: "Projects Completed" },
        { number: "1.5K", label: "Happy Clients" },
    ];

    return (
        <section id="hero" className="min-h-screen pt-32 pb-20 px-8 flex flex-col justify-center relative overflow-hidden">

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="space-y-8 order-2 lg:order-1"
                >
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Aldy Oktaviano</h2>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-text leading-tight">
                            Mobile Developer +<br /> UX Designer
                        </h1>
                    </div>

                    <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
                        I break down complex user experience problems to create integrity focussed solutions that connect billions of people.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                        <a href="/assets/CV - ALDY OKTAVIANO.pdf" download="CV - ALDY OKTAVIANO.pdf" className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto px-8 py-4 text-base rounded-full shadow-neon border border-theme-purple/50">
                                Download CV
                            </Button>
                        </a>

                        <div className="flex gap-4 mt-4 sm:mt-0">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="w-12 h-12 rounded-full border border-theme-purple/30 flex items-center justify-center text-theme-purple hover:bg-theme-purple hover:text-white hover:shadow-neon transition-all duration-300"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Profile Image & Anti-Gravity Effect */}
                <div className="order-1 lg:order-2 flex justify-center relative">
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10"
                    >
                        {/* Image Container with rotation/tilt could go here, keeping it simple but styled properly */}
                        <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] relative rounded-[3rem] overflow-hidden border-2 border-theme-gray group">
                            <div className="absolute inset-0 bg-theme-purple/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            {/* Placeholder Grayscale Image */}
                            <img
                                src={AldyImg}
                                alt="Aldy"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110"
                            />
                        </div>
                    </motion.div>

                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-theme-purple/20 rounded-full blur-[100px] -z-0"></div>
                </div>
            </div>

            {/* Stats Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="container mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center"
            >
                {stats.map((stat, index) => (
                    <div key={index} className="flex gap-4 items-center">
                        <h3 className="text-5xl md:text-6xl font-bold font-outline-2 text-transparent bg-clip-text bg-white/5 stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                            {stat.number}
                        </h3>
                        <span className="text-gray-400 text-sm max-w-[80px] leading-tight block">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </motion.div>

        </section>
    );
};

export default Hero;
