import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Beranda", href: "#hero" },
  { name: "Layanan", href: "#services" },
  { name: "Portofolio", href: "#portfolio" },
  { name: "Pengalaman", href: "#experience" },
  { name: "Kontak", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#hero");

  useEffect(() => {
    const updateActiveLink = () => {
      const current = [...navLinks].reverse().find(({ href }) => {
        const section = document.querySelector(href);
        return section && window.scrollY >= section.offsetTop - 140;
      });

      if (current) {
        setActiveLink(current.href);
      }
    };

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveLink);
  }, []);

  const closeMenu = (href) => {
    setActiveLink(href);
    setIsOpen(false);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#050709]/72 backdrop-blur-xl">
      <div className="container mx-auto flex h-[76px] items-center justify-between px-6 sm:px-8">
        <a
          href="#hero"
          onClick={() => closeMenu("#hero")}
          className="group inline-flex items-center gap-3"
          aria-label="Kembali ke beranda"
        ></a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => {
            const isActive = activeLink === item.href;

            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => closeMenu(item.href)}
                  className={
                    "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 " +
                    (isActive ? "text-white" : "text-gray-400 hover:text-white")
                  }
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-theme-purple/30 bg-theme-purple/15"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-xl text-white transition-colors hover:border-theme-purple/50 hover:bg-theme-purple/10 md:hidden"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Tutup navigasi" : "Buka navigasi"}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -60 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 60 }}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/[0.07] bg-[#080812]/95 px-6 backdrop-blur-xl md:hidden"
          >
            <ul className="container mx-auto grid gap-2 py-5">
              {navLinks.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={() => closeMenu(item.href)}
                    className={
                      "block rounded-xl px-4 py-3 text-sm font-semibold transition-colors " +
                      (activeLink === item.href
                        ? "border border-theme-purple/30 bg-theme-purple/15 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white")
                    }
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
