import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ImageCarousel = ({ images }) => {
    const [index, setIndex] = useState(0);
    const [lightbox, setLightbox] = useState(false);

    const prev = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    };
    const next = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    };

    const openLightbox = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLightbox(true);
    };

    const closeLightbox = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        setLightbox(false);
    };

    // Keyboard navigation
    const handleKeyDown = useCallback((e) => {
        if (!lightbox) return;
        if (e.key === "Escape") setLightbox(false);
        if (e.key === "ArrowLeft") setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
        if (e.key === "ArrowRight") setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }, [lightbox, images.length]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Lock body scroll when lightbox open
    useEffect(() => {
        if (lightbox) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [lightbox]);

    return (
        <>
            {/* Inline Carousel */}
            <div className="absolute inset-0 bg-black/40 cursor-pointer" onClick={openLightbox} role="button" aria-label="Buka gambar lebih besar" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && openLightbox(e)}>
                <img
                    src={images[index]}
                    alt={`Gambar proyek ${index + 1} dari ${images.length}`}
                    className="w-full h-full object-contain"
                />

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            aria-label="Gambar sebelumnya"
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-theme-purple/80 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                        >
                            <FaChevronLeft size={12} aria-hidden="true" />
                        </button>
                        <button
                            onClick={next}
                            aria-label="Gambar berikutnya"
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-theme-purple/80 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                        >
                            <FaChevronRight size={12} aria-hidden="true" />
                        </button>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setIndex(i);
                                    }}
                                    aria-label={`Lihat gambar ${i + 1}`}
                                    aria-current={i === index ? 'true' : undefined}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === index
                                            ? "bg-theme-purple w-5"
                                            : "bg-white/40 w-1.5 hover:bg-white/70"
                                        }`}
                                />
                            ))}
                        </div>

                        <span className="absolute top-3 left-3 z-10 text-[10px] font-bold px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white/80">
                            {index + 1} / {images.length}
                        </span>
                    </>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            aria-label="Tutup lightbox"
                            className="absolute top-6 right-6 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300"
                        >
                            <FaTimes size={18} aria-hidden="true" />
                        </button>

                        {/* Counter */}
                        <div className="absolute top-6 left-6 z-50 text-white/60 text-sm font-medium">
                            {index + 1} / {images.length}
                        </div>

                        {/* Image */}
                        <motion.img
                            key={images[index]}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            src={images[index]}
                            alt={`Gambar proyek ${index + 1} dari ${images.length}`}
                            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Navigation */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prev}
                                    aria-label="Gambar sebelumnya"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-theme-purple/70 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                                >
                                    <FaChevronLeft size={18} aria-hidden="true" />
                                </button>
                                <button
                                    onClick={next}
                                    aria-label="Gambar berikutnya"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-theme-purple/70 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                                >
                                    <FaChevronRight size={18} aria-hidden="true" />
                                </button>
                            </>
                        )}

                        {/* Thumbnails */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIndex(i);
                                    }}
                                    aria-label={`Lihat gambar ${i + 1}`}
                                    aria-current={i === index ? 'true' : undefined}
                                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${i === index
                                            ? "border-theme-purple shadow-[0_0_12px_rgba(135,80,247,0.5)] scale-110"
                                            : "border-white/20 opacity-50 hover:opacity-80"
                                        }`}
                                >
                                    <img src={img} alt={`Thumbnail gambar ${i + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ImageCarousel;