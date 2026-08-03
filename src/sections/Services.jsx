import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaRobot, FaMobileAlt, FaCode } from 'react-icons/fa';
import { services } from '../data/portfolioData';

const Services = () => {
    // Map icons manually based on the service IDs
    const iconMap = {
        "01": FaShieldAlt, // QA
        "02": FaRobot,     // AI
        "03": FaMobileAlt, // Mobile
        "04": FaCode,      // Web
    };

    return (
        <section id="services" className="py-24 px-8 bg-theme-surface relative">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-text">Keahlian Teknis</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => {
                        const Icon = iconMap[service.id];
                        const isMain = service.id === "01"; // Highlight QA

                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                key={service.id}
                                className={`group relative p-8 rounded-2xl bg-white/5 border transition-all duration-300 hover:-translate-y-2 ${isMain
                                    ? 'border-theme-purple/50 shadow-[0_0_20px_rgba(135,80,247,0.2)] hover:shadow-[0_0_30px_rgba(135,80,247,0.4)] hover:border-theme-purple'
                                    : 'border-white/10 hover:border-theme-purple/50 hover:bg-white/10'
                                    }`}
                            >
                                {isMain && (
                                    <div className="absolute -top-3 -right-3 bg-theme-purple text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-neon z-10">
                                        ⭐ Utama
                                    </div>
                                )}

                                <div className="flex items-start gap-6 mb-6">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-colors duration-300 ${isMain
                                        ? 'bg-theme-purple text-white shadow-neon'
                                        : 'bg-white/10 text-theme-purple group-hover:bg-theme-purple group-hover:text-white'
                                        }`}>
                                        <Icon />
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-theme-purple/60 font-semibold text-sm block mb-1">Service {service.id}</span>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-theme-purple transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                    {service.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
