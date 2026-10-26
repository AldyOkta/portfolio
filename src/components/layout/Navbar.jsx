import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { portfolioData } from '@/data/portfolioData';

const SECTIONS = [
  { id: 'about', en: 'About', idLabel: 'Tentang' },
  { id: 'projects', en: 'Projects', idLabel: 'Proyek' },
  { id: 'skills', en: 'Skills', idLabel: 'Keahlian' },
  { id: 'experience', en: 'Experience', idLabel: 'Pengalaman' },
  { id: 'certifications', en: 'Certifications', idLabel: 'Sertifikasi' },
  { id: 'contact', en: 'Contact', idLabel: 'Kontak' },
];

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbarCv, setShowNavbarCv] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const mobilePanelRef = useRef(null);
  const isClickScrolling = useRef(false);
  const clickTimer = useRef(null);

  // 1. Scroll listener (>8px) with Lenis sync for background opacity & accurate Scroll-Spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.__lenis ? window.__lenis.scroll : window.scrollY;
      setScrolled(scrollY > 8);

      // If user just clicked a nav link, don't override the active section during smooth scroll
      if (isClickScrolling.current) return;

      // If at top / hero section (< 200px), no menu item is underlined
      if (scrollY < 200) {
        setActiveSection('');
        return;
      }

      // Check if user has scrolled near bottom of page -> activate contact
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact');
        return;
      }

      // Calculate active section based on navbar line position (~100px from top)
      const navBuffer = 100;
      let found = '';

      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= navBuffer && rect.bottom > navBuffer) {
          found = sec.id;
          break;
        }
      }

      if (found) {
        setActiveSection(found);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    let lenisTimer = null;
    let boundLenis = null;

    if (window.__lenis) {
      boundLenis = window.__lenis;
      boundLenis.on('scroll', handleScroll);
    } else {
      lenisTimer = setInterval(() => {
        if (window.__lenis) {
          boundLenis = window.__lenis;
          boundLenis.on('scroll', handleScroll);
          clearInterval(lenisTimer);
        }
      }, 100);
    }

    return () => {
      if (lenisTimer) clearInterval(lenisTimer);
      if (clickTimer.current) clearTimeout(clickTimer.current);
      window.removeEventListener('scroll', handleScroll);
      if (boundLenis) {
        boundLenis.off('scroll', handleScroll);
      }
    };
  }, []);

  // 2. IntersectionObserver on Hero CV button to conditionally show navbar Download CV CTA
  useEffect(() => {
    const heroBtn = document.getElementById('hero-cv-btn');
    if (!heroBtn) {
      setShowNavbarCv(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNavbarCv(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroBtn);
    return () => observer.disconnect();
  }, []);

  // The mobile navigation is a disclosure: allow scrolling and close when focus leaves.
  useEffect(() => {
    if (mobileMenuOpen) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
          document.getElementById('mobile-menu-toggle-btn')?.focus();
        }
      };
      const handleClickOutside = (e) => {
        if (mobilePanelRef.current && !mobilePanelRef.current.contains(e.target)) {
          // Check if not clicking the toggle button
          const toggleBtn = document.getElementById('mobile-menu-toggle-btn');
          if (toggleBtn && toggleBtn.contains(e.target)) return;
          setMobileMenuOpen(false);
        }
      };

      const desktop = window.matchMedia('(min-width: 768px)');
      const handleResize = () => {
        if (desktop.matches) setMobileMenuOpen(false);
      };
      desktop.addEventListener('change', handleResize);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('pointerdown', handleClickOutside);
      return () => {
        desktop.removeEventListener('change', handleResize);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('pointerdown', handleClickOutside);
      };
    }
  }, [mobileMenuOpen]);

  // Smooth scroll handler with 80px offset
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = document.getElementById(targetId);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }

    if (targetId === 'home') {
      setActiveSection('');
      isClickScrolling.current = true;
      if (clickTimer.current) clearTimeout(clickTimer.current);
      clickTimer.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 1100);

      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.0 });
      } else {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
      }
      return;
    }

    const el = document.getElementById(targetId);
    if (!el) return;

    setActiveSection(targetId);
    isClickScrolling.current = true;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1100);

    if (window.__lenis) {
      // scroll-margin-top: 80px is already in CSS, so offset: 0 stops perfectly 80px above content
      window.__lenis.scrollTo(el, { offset: 0, duration: 1.0 });
    } else {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'instant' : 'smooth' });
    }
  }, []);

  const cvText = lang === 'en' ? 'Download CV' : 'Unduh CV';
  const isHeaderOpaque = scrolled || mobileMenuOpen;

  return (
    <header
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setMobileMenuOpen(false);
      }}
      className={`sticky top-0 z-50 w-full transition-all duration-200 backdrop-blur-md ${
        isHeaderOpaque
          ? 'bg-[var(--header-bg)] border-b border-[var(--border)] shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo (mono, 15px, --text) */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="font-mono text-[15px] font-semibold text-[var(--text)] tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 rounded"
        >
          aldyokta.my.id
        </a>

        {/* Center: Desktop Navigation with Scroll-Spy & 2px --accent underline */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-6 lg:gap-7">
          {SECTIONS.map((sec) => {
            const label = lang === 'en' ? sec.en : sec.idLabel;
            const isActive = activeSection === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => handleNavClick(e, `#${sec.id}`)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative py-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 rounded ${
                  isActive
                    ? 'text-[var(--text)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Far Right: Language toggle + Download CV (after hero) */}
        <div className="hidden md:flex items-center gap-5">
          {/* Language Toggle: Plain text EN | ID with subtle protective pill container */}
          <div className="flex items-center text-sm font-medium px-2 py-0.5 rounded-lg bg-[var(--surface-2)]/60 border border-[var(--border)]/60">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded px-1.5 py-0.5 ${
                lang === 'en'
                  ? 'text-[var(--text)] font-semibold bg-[var(--surface)] shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <span className="text-[var(--border)] mx-0.5 select-none text-xs">|</span>
            <button
              type="button"
              onClick={() => setLang('id')}
              className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded px-1.5 py-0.5 ${
                lang === 'id'
                  ? 'text-[var(--text)] font-semibold bg-[var(--surface)] shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
              aria-label="Ganti ke Bahasa Indonesia"
            >
              ID
            </button>
          </div>

          {/* Download CV CTA: Appears only after hero CV button scrolls out of view */}
          <div
            className={`transition-opacity duration-150 ${
              showNavbarCv ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
          >
            <a
              href={portfolioData.personal.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-9 px-4 rounded-[10px] bg-transparent border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--surface-2)] text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
            >
              {cvText}
            </a>
          </div>
        </div>

        {/* Mobile: Hamburger Button (44x44px touch target) */}
        <div className="flex md:hidden items-center">
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="w-11 h-11 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label={
              mobileMenuOpen
                ? lang === 'en'
                  ? 'Close menu'
                  : 'Tutup menu'
                : lang === 'en'
                ? 'Open menu'
                : 'Buka menu'
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel: Full-width panel on --bg with 1px bottom border */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={mobilePanelRef}
          data-lenis-prevent
          className="absolute top-full left-0 md:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto w-full bg-[var(--bg)] border-b border-[var(--border)] px-6 py-4 shadow-sm"
        >
          <nav aria-label="Mobile Main" className="flex flex-col">
            {SECTIONS.map((sec) => {
              const label = lang === 'en' ? sec.en : sec.idLabel;
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => handleNavClick(e, `#${sec.id}`)}
                  className={`h-12 flex items-center text-lg font-medium transition-colors ${
                    isActive ? 'text-[var(--accent)] font-semibold' : 'text-[var(--text)]'
                  }`}
                >
                  {label}
                </a>
              );
            })}

            {/* Language toggle inside mobile menu */}
            <div className="h-12 flex items-center gap-3 pt-2 text-base font-medium border-t border-[var(--border)] mt-2">
              <span className="text-sm text-[var(--text-muted)]">
                {lang === 'en' ? 'Language:' : 'Bahasa:'}
              </span>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded transition-colors ${
                  lang === 'en'
                    ? 'text-[var(--text)] font-semibold bg-[var(--surface-2)]'
                    : 'text-[var(--text-muted)]'
                }`}
              >
                EN
              </button>
              <span className="text-[var(--border)]">|</span>
              <button
                type="button"
                onClick={() => setLang('id')}
                className={`px-2 py-1 rounded transition-colors ${
                  lang === 'id'
                    ? 'text-[var(--text)] font-semibold bg-[var(--surface-2)]'
                    : 'text-[var(--text-muted)]'
                }`}
              >
                ID
              </button>
            </div>

            {/* Download CV CTA inside mobile menu */}
            <div className="pt-3 pb-2">
              <a
                href={portfolioData.personal.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('mobile-menu-toggle-btn')?.focus();
                }}
                className="w-full h-11 rounded-[10px] bg-transparent border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--surface-2)] font-semibold text-sm flex items-center justify-center transition-colors"
              >
                {cvText} (PDF)
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Top Reading Progress Bar (Scroll-driven) */}
      {!reduceMotion && (
        <motion.div
          style={{ scaleX, transformOrigin: '0%' }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent)] via-[var(--accent)] to-[#b46b2a] pointer-events-none z-50"
          aria-hidden="true"
        />
      )}
    </header>
  );
}
