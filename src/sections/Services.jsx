import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const servicesData = [
    {
        id: "01",
        title: "Branding Design",
        description: "I break down complex user experience problems to create integrity focussed solutions that connect billions of people.",
    },
    {
        id: "02",
        title: "Web Design",
        description: "I break down complex user experience problems to create integrity focussed solutions that connect billions of people.",
    },
    {
        id: "03",
        title: "UI/UX Design",
        description: "I break down complex user experience problems to create integrity focussed solutions that connect billions of people.",
    },
    {
        id: "04",
        title: "Graphics Design",
        description: "I break down complex user experience problems to create integrity focussed solutions that connect billions of people.",
    }
];

const Services = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section id="services" className="py-24 px-8 bg-theme-dark relative">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-text">My Quality Services</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    {servicesData.map((service, index) => (
                        <div
                            key={service.id}
                            className={`group bg-gradient-to-r ${activeIndex === index ? 'from-theme-purple/10 to-transparent border-theme-purple' : 'from-transparent to-transparent border-white/10'} border-b hover:border-theme-purple p-8 transition-all duration-300 cursor-pointer`}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-8">
                                    <span className={`text-2xl font-bold ${activeIndex === index ? 'text-theme-purple' : 'text-white'} transition-colors duration-300`}>
                                        {service.id}
                                    </span>
                                    <h3 className={`text-2xl md:text-3xl font-bold ${activeIndex === index ? 'text-theme-purple' : 'text-white'} transition-colors duration-300`}>
                                        {service.title}
                                    </h3>
                                </div>

                                <div className="hidden md:block max-w-lg text-gray-400 text-sm">
                                    <p>{service.description}</p>
                                </div>

                                <div className={`transform ${activeIndex === index ? '-rotate-45 text-theme-purple' : 'text-white'} transition-all duration-300`}>
                                    <FaArrowRight size={24} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
