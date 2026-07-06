import { useState } from 'react';
import { motion } from 'framer-motion';

const categories = ["Semua", "Apps", "Branding", "UX/UI"];

const workItems = [
    { id: 1, title: "Deloitte", category: "UX/UI", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" },
    { id: 2, title: "New Age", category: "Apps", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop" },
    { id: 3, title: "Luxe", category: "Branding", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop" },
    { id: 4, title: "Oreo", category: "Apps", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop" },
];

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState("Semua");

    const filteredItems = activeCategory === "Semua"
        ? workItems
        : workItems.filter(item => item.category === activeCategory);

    return (
        <section id="portfolio" className="py-24 px-8 bg-black/30">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-text">Eksplorasi Proyek & Kolaborasi</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Kumpulan proyek pengembangan aplikasi dan dokumentasi kolaborasi tim dalam memastikan standar kualitas perangkat lunak yang tinggi.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeCategory === category
                                ? 'bg-theme-purple text-white shadow-neon'
                                : 'bg-white/5 text-gray-400 hover:text-white'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredItems.map((project) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={project.id}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer"
                        >
                            <div className="bg-[#0a0a1a] h-[400px] w-full overflow-hidden relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1 brightness-90 contrast-110"
                                />

                                {/* Purple Filter Overlay with Blend Mode */}
                                <div className="absolute inset-0 bg-purple-900/40 mix-blend-overlay transition-all duration-500 group-hover:bg-purple-900/10"></div>

                                {/* Bottom Gradient for Text Readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent opacity-90"></div>
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-x-4 bottom-6 bg-theme-dark/90 backdrop-blur-sm p-6 rounded-xl transform translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-center border border-white/10">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                                    <p className="text-gray-400 text-sm">{project.category}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-theme-purple flex items-center justify-center text-white">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 1L1 11M11 1V11M11 1H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
