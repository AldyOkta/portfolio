import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';
import ImageCarousel from '../components/ImageCarousel';

const categories = ["Semua", "Apps", "Sertifikat", "Project"];

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState("Semua");

    // Setiap project di portfolioData.js sudah punya field `category` sendiri
    // (mis. "Sertifikat", "Project"). Fallback ke "Apps" hanya untuk jaga-jaga
    // kalau ada project lama yang belum diberi category.
    const enrichedProjects = projects.map(p => ({
        ...p,
        category: p.category || "Apps",
    }));

    const filteredItems = activeCategory === "Semua"
        ? enrichedProjects
        : enrichedProjects.filter(item => item.category === activeCategory);

    return (
        <section id="portfolio" aria-labelledby="portfolio-heading" className="py-24 px-8 bg-theme-dark">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 id="portfolio-heading" className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 transition-colors duration-500">Kumpulan Project dan Dokumentasi</h2>
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
                                ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]'
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
                                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                            >
                                {/* Image / Carousel */}
                                <div className={`${project.images && project.images.length > 0 ? 'h-72' : 'h-48'} w-full overflow-hidden relative bg-gradient-to-br from-blue-500/20 to-black/60`}>
                                    {project.images && project.images.length > 0 ? (
                                        <ImageCarousel images={project.images} alt={project.title} />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-6xl opacity-20">
                                                {project.category === "Apps" ? "📱" : project.category === "Sertifikat" ? "📜" : "🔍"}
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    {/* Judul */}
                                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                                        {project.title}
                                    </h3>

                                    {/* Posisi + Periode */}
                                    {project.posisi && (
                                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-2">
                                            <span className="text-xs font-bold text-cyan-400">
                                                {project.posisi}
                                            </span>
                                            {project.period && (
                                                <span className="text-[10px] text-gray-400 font-medium">
                                                    {project.period}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Deskripsi singkat (opsional, tampil sebelum jobdesk) */}
                                    {project.description && (
                                        <p className="text-gray-300 text-xs leading-relaxed mb-2">
                                            {project.description}
                                        </p>
                                    )}

                                    {/* Jobdesk sebagai bullet list, kalau ada */}
                                    {project.jobdesk && (
                                        <ul className="text-gray-300 text-xs leading-relaxed mb-3 space-y-1 list-disc list-inside marker:text-cyan-400">
                                            {project.jobdesk.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {project.tech && (
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/20 text-cyan-300 font-medium">
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