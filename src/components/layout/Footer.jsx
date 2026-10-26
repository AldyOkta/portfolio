import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { portfolioData } from '@/data/portfolioData';
import { getEmail, getMailtoUrl, getWhatsAppUrl } from '@/utils/contact';

const NAV_LINKS = [
  { id: 'about', en: 'About', idLabel: 'Tentang' },
  { id: 'projects', en: 'Projects', idLabel: 'Proyek' },
  { id: 'skills', en: 'Skills', idLabel: 'Keahlian' },
  { id: 'experience', en: 'Experience', idLabel: 'Pengalaman' },
  { id: 'certifications', en: 'Certifications', idLabel: 'Sertifikasi' },
];

export default function Footer() {
  const { lang } = useLanguage();
  const { personal } = portfolioData;

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.0 });
    } else {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
    }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (!el) return;
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });

    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: 0, duration: 1.0 });
    } else {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'instant' : 'smooth' });
    }
  };

  const [displayEmail, setDisplayEmail] = useState('');

  useEffect(() => {
    setDisplayEmail(getEmail());
  }, []);

  const whatsappMessage = lang === 'en'
    ? 'Hello Aldy Oktaviano, I came across your portfolio at aldyokta.my.id and would like to discuss an opportunity.'
    : 'Halo Aldy Oktaviano, saya melihat portofolio Anda di aldyokta.my.id dan tertarik untuk berdiskusi lebih lanjut.';

  const handleEmailClick = (e) => {
    e.preventDefault();
    window.location.href = getMailtoUrl();
  };

  const handleEmailPrepare = (e) => {
    e.currentTarget.href = getMailtoUrl();
  };

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const url = getWhatsAppUrl(whatsappMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppPrepare = (e) => {
    e.currentTarget.href = getWhatsAppUrl(whatsappMessage);
  };

  return (
    <footer className="w-full bg-[var(--footer-bg)] py-14">
      <div className="max-w-6xl mx-auto px-6">
        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
          {/* Column 1: Identity (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-start">
            <h3 className="text-[18px] font-semibold text-[var(--footer-text)] tracking-tight">
              {personal.name}
            </h3>
            <p className="mt-1.5 text-sm text-[var(--footer-muted)] leading-relaxed">
              QA Tester & Frontend Developer
            </p>
          </div>

          {/* Column 2: Navigation (3 cols) */}
          <div className="md:col-span-3 flex flex-col">
            <nav aria-label="Footer" className="flex flex-col space-y-2.5">
              {NAV_LINKS.map((link) => {
                const label = lang === 'en' ? link.en : link.idLabel;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, `#${link.id}`)}
                    className="text-sm text-[var(--footer-muted)] hover:text-[var(--footer-text)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                  >
                    {label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Column 3: Contact (4 cols) */}
          <div className="md:col-span-4 flex flex-col space-y-2.5 text-sm">
            {/* Obfuscated Email Link */}
            <a
              href="#email"
              onClick={handleEmailClick}
              onMouseEnter={handleEmailPrepare}
              onFocus={handleEmailPrepare}
              aria-label="Send email"
              className="text-[var(--footer-text)] hover:underline break-all transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded cursor-pointer"
            >
              {displayEmail || 'oktavianoaldy777 [at] gmail [dot] com'}
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--footer-muted)] hover:text-[var(--footer-text)] hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              LinkedIn
            </a>

            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--footer-muted)] hover:text-[var(--footer-text)] hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              GitHub
            </a>

            {/* SATU elemen utama dengan var(--accent-on-dark) sesuai saran.md (Obfuscated WhatsApp Link) */}
            <a
              href="#whatsapp"
              onClick={handleWhatsAppClick}
              onMouseEnter={handleWhatsAppPrepare}
              onFocus={handleWhatsAppPrepare}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="text-[var(--accent-on-dark)] hover:underline font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-on-dark)] rounded cursor-pointer"
            >
              WhatsApp
            </a>

            <a
              href={personal.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--footer-muted)] hover:text-[var(--footer-text)] hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              {lang === 'en' ? 'Download CV' : 'Unduh CV'}
            </a>
          </div>
        </div>

        {/* 1px divider */}
        <div className="border-t border-[rgba(255,255,255,0.12)] my-8" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[var(--footer-muted)]">
          <div>
            <span>© 2026 {personal.name}</span>
            <span className="hidden sm:inline"> · Built with React, Vite, and Tailwind CSS</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="text-sm text-[var(--footer-muted)] hover:text-[var(--footer-text)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded py-1 px-1.5"
          >
            {lang === 'en' ? 'Back to top ↑' : 'Kembali ke atas ↑'}
          </button>
        </div>
      </div>
    </footer>
  );
}
