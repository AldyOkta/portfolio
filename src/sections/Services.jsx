import { motion } from 'framer-motion';
import { services } from '../data/portfolioData';

const Services = () => {
    return (
        <section id="services" aria-labelledby="services-heading" className="relative bg-theme-surface px-8 py-24">
            <div className="container mx-auto">
                <div className="mb-16 text-center">
                    <h2 id="services-heading" className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 transition-colors duration-500">
                        Keahlian Teknis
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {services.map((service, index) => (
                        <motion.article
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="group flex min-h-[190px] flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-theme-purple/60 hover:bg-white/[0.07] hover:shadow-[0_12px_32px_rgba(135,80,247,0.16)]"
                        >
                            <h3 className="mb-4 text-2xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-theme-purple">
                                {service.title}
                            </h3>

                            <p className="text-sm leading-7 text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
                                {service.description}
                            </p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
