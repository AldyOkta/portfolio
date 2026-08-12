import { profile } from '../data/portfolioData';
import { motion } from 'framer-motion';
import Button from '../components/Button';
const AldyImg = '/assets/aldyokta.jpg';
const CVFile = '/assets/CV - ALDY OKTAVIANO.pdf';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Hero = () => {
    const { name, role, tagline, socialLinks, stats } = profile;

    const iconMap = {
        "FaGithub": FaGithub,
        "FaLinkedin": FaLinkedin,
        "FaInstagram": FaInstagram
    };

    // Warna hover disesuaikan per-brand: GitHub -> putih (brand mark-nya monokrom),
    // LinkedIn -> biru resmi LinkedIn (#0A66C2), Instagram -> gradient khas Instagram.
    const iconStyles = {
        "FaGithub": {
            border: "border-white/30",
            text: "text-white",
            hoverBg: "hover:bg-white",
            hoverText: "hover:text-black",
            hoverShadow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]",
        },
        "FaLinkedin": {
            border: "border-[#0A66C2]/40",
            text: "text-[#0A66C2]",
            hoverBg: "hover:bg-[#0A66C2]",
            hoverText: "hover:text-white",
            hoverShadow: "hover:shadow-[0_0_20px_rgba(10,102,194,0.5)]",
        },
        "FaInstagram": {
            border: "border-pink-400/40",
            text: "text-pink-400",
            hoverBg: "hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500",
            hoverText: "hover:text-white",
            hoverShadow: "hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]",
        },
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section
            id="hero"
            aria-labelledby="hero-heading"
            aria-describedby="hero-tagline"
            className="min-h-screen pt-32 pb-20 px-8 flex flex-col justify-center relative overflow-hidden bg-theme-dark"
        >

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="space-y-8 order-2 lg:order-1"
                >
                    <div>
                        <p className="text-xl md:text-2xl font-semibold text-gray-200 mb-1">{name}</p>
                        <h1
                            id="hero-heading"
                            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 leading-tight"
                        >
                            {role}
                        </h1>
                    </div>

                    <p id="hero-tagline" className="text-gray-200 text-lg max-w-lg leading-relaxed">
                        {tagline}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                        <a href={CVFile} download="CV_Aldy.pdf" className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto px-8 py-4 text-base rounded-full shadow-neon border border-theme-purple/50">
                                Download CV
                            </Button>
                        </a>

                        <div className="flex gap-4 mt-4 sm:mt-0">
                            {socialLinks.map((link, index) => {
                                const Icon = iconMap[link.icon] || FaGithub; // Fallback to GitHub icon
                                const style = iconStyles[link.icon] || iconStyles["FaGithub"];
                                return (
                                    <motion.a
                                        key={index}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Kunjungi profil ${link.label || link.icon.replace('Fa', '')} Aldy Oktaviano`}
                                        whileHover={{ scale: 1.12 }}
                                        whileTap={{ scale: 0.92 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                        className={`w-12 h-12 rounded-full border ${style.border} flex items-center justify-center ${style.text} ${style.hoverBg} ${style.hoverText} ${style.hoverShadow} transition-colors duration-300`}
                                    >
                                        <Icon aria-hidden="true" />
                                    </motion.a>
                                );
                            })}
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
                                alt="Foto profil Aldy Oktaviano"
                                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110"
                                style={{ objectPosition: 'center 10%' }}
                            />
                        </div>
                    </motion.div>

                    {/* Background Glow – decorative only */}
                    <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-theme-purple/20 rounded-full blur-[100px] -z-0"></div>
                </div>
            </div>

            {/* Stats Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                role="region"
                aria-label="Statistik ringkas"
                className="container mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center"
            >
                {stats.map((stat, index) => (
                    <div key={index} className="flex gap-4 items-center">
                        <p aria-label={`${stat.number} ${stat.label}`} className="text-5xl md:text-6xl font-bold font-outline-2 text-transparent bg-clip-text bg-white/5 stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }} aria-hidden="true">
                            {stat.number}
                        </p>
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