import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import ImageCarousel from '../components/ImageCarousel';

const categories = ["Semua", "Apps", "QA", "Web"];

const categoryMap = {
    1: "Apps",
    2: "Web",
};

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState("Semua");

    const enrichedProjects = projects.map(p => ({
        ...p,
        category: categoryMap[p.id] || "Apps",
    }));

    const filteredItems = activeCategory === "Semua"
        ? enrichedProjects
        : enrichedProjects.filter(item => item.category === activeCategory);

    return (
        <section id="portfolio" aria-labelledby="portfolio-heading" className="py-24 px-8 bg-theme-dark">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 id="portfolio-heading" className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-text">Eksplorasi Proyek</h2>
                    <p className="text-gray-300 mt-3 max-w-xl mx-auto text-sm">
                        Kumpulan proyek pengembangan aplikasi dan dokumentasi kolaborasi tim dalam memastikan standar kualitas perangkat lunak yang tinggi.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div role="group" aria-label="Filter kategori proyek" className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            aria-label={`Filter proyek: ${category}`}
                            aria-pressed={activeCategory === category}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === category
                                ? 'bg-theme-purple text-white shadow-neon'
                                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div
                    aria-live="polite"
                    aria-atomic="false"
                    aria-label={`Menampilkan ${filteredItems.length} proyek dalam kategori ${activeCategory}`}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.35 }}
                                key={project.id}
                                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-theme-purple/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(135,80,247,0.15)]"
                            >
                                {/* Image / Carousel */}
                                <div className={`${project.images && project.images.length > 0 ? 'h-72' : 'h-48'} w-full overflow-hidden relative bg-gradient-to-br from-theme-purple/20 to-black/60`}>
                                    {project.images && project.images.length > 0 ? (
                                        <ImageCarousel images={project.images} />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-6xl opacity-20">
                                                {project.category === "Apps" ? "📱" : project.category === "Web" ? "🌐" : "🔍"}
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-theme-purple transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-300 text-xs leading-relaxed mb-3">
                                        {project.description}
                                    </p>
                                    {project.tech && (
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-theme-purple/15 border border-theme-purple/20 text-purple-300 font-medium">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
