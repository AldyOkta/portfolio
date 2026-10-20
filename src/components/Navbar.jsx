import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbarCv, setShowNavbarCv] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const mobilePanelRef = useRef(null);

  // 1. Scroll listener (>8px) with Lenis sync for background opacity & bottom border
  useEffect(() => {
    const handleScroll = () => {
      const y = window.__lenis ? window.__lenis.scroll : window.scrollY;
      setScrolled(y > 8);
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

  // 3. Scroll-Spy observer for active menu item
  useEffect(() => {
    const sectionElements = SECTIONS.map((sec) => document.getElementById(sec.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible entries
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by highest intersection ratio or top bounding
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -40% 0px',
        threshold: [0, 0.2, 0.5, 0.8],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 4. Mobile menu scroll lock & keyboard Escape listener
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
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

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Smooth scroll handler with 80px offset
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (!el) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80, duration: 1.0 });
    } else {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  }, []);

  const skipText = lang === 'en' ? 'Skip to content' : 'Lewati ke konten';
  const cvText = lang === 'en' ? 'Download CV' : 'Unduh CV';
  const isHeaderOpaque = scrolled || mobileMenuOpen;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 backdrop-blur-md ${
        isHeaderOpaque
          ? 'bg-[var(--header-bg)] border-b border-[var(--border)] shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Accessibility: Skip to Content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--surface)] focus:text-[var(--text)] focus:border focus:border-[var(--accent)] focus:rounded-md focus:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      >
        {skipText}
      </a>

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
              showNavbarCv ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <a
              href={portfolioData.personal.cvPath}
              download="CV_Aldy_Oktaviano.pdf"
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
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel: Full-width panel on --bg with 1px bottom border */}
      {mobileMenuOpen && (
        <div
          ref={mobilePanelRef}
          className="md:hidden w-full bg-[var(--bg)] border-b border-[var(--border)] px-6 py-4 shadow-sm"
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
                download="CV_Aldy_Oktaviano.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-11 rounded-[10px] bg-transparent border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--surface-2)] font-semibold text-sm flex items-center justify-center transition-colors"
              >
                {cvText} (PDF)
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
