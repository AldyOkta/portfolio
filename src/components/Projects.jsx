import React from 'react';
import { ExternalLink, ShieldCheck, Github } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import AnimatedSection from './ui/AnimatedSection';

export default function Projects() {
  const { t, lang } = useLanguage();

  return (
    <section id="projects" className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text)] tracking-tight">
              {t.projects.title}
            </h2>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={0.08}>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
              {t.projects.subtitle}
            </p>
          </AnimatedSection>
        </div>
        <AnimatedSection animation="fade-left">
          <div className="text-base text-[var(--text-muted)] font-medium">
            {t.projects.countLabel}
          </div>
        </AnimatedSection>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">

        {/* Project 1 (WIDE: 7 COLS) — Movie Discovery Web App */}
        <AnimatedSection animation="fade-up" delay={0} className="md:col-span-7">
          <div className="rounded-3xl bg-[var(--surface)] border border-[var(--accent-border)] hover:border-[var(--border-strong)] transition-colors p-8 sm:p-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[var(--text)] mb-3">
                Movie Search &amp; Discovery Web App
              </h3>

              <p className="text-base text-[var(--text-body)] leading-relaxed mb-6">
                {lang === 'en'
                  ? "Interactive movie search Single Page Application built collaboratively during the MSIB Hacktiv8 program. Features instant search, category filtering, and responsive UI with React.js, Tailwind CSS, Axios, and live OMDb API."
                  : "Single Page Application pencarian film yang saya kembangkan bersama tim di program MSIB Hacktiv8. Menggunakan React.js, Tailwind CSS, Axios, dan integrasi live OMDb API dengan pencarian instan dan responsivitas penuh."
                }
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Team Project", "React.js", "Tailwind CSS", "Axios", "OMDb API", "Netlify"].map((tag) => (
                  <span key={tag} className="text-sm font-medium px-3.5 py-1.5 rounded-md bg-[var(--surface-2)] text-[var(--text-muted)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-sm text-[var(--text-muted)]">
                {t.projects.p1Role}
              </span>
              <a
                href="https://chic-sawine-f22630.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] bg-transparent border border-[var(--border)] hover:bg-[var(--surface-2)] px-5 py-2 rounded-full transition-colors" // taste-skill-ignore
              >
                <span>{t.projects.openDemo}</span>
                <ExternalLink className="w-4 h-4 text-[var(--text-muted)]" />
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Project 2 (COMPACT: 5 COLS) — Aksara Assistant AI */}
        <AnimatedSection animation="fade-up" delay={0.08} className="md:col-span-5">
          <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors p-8 sm:p-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-semibold text-[var(--text)] mb-3">
                Aksara Assistant AI
              </h3>

              <p className="text-base text-[var(--text-body)] leading-relaxed mb-6">
                {lang === 'en'
                  ? "Intelligent enterprise AI assistant featuring an interactive web chat connected to n8n AI Agents and Socket.io at PT Tiga Serangkai Inti Corpora. Helps sales teams validate, aggregate, and query field visit data automatically."
                  : "Asisten AI cerdas berbasis antarmuka web chat terhubung ke n8n AI Agent dan Socket.io di PT Tiga Serangkai Inti Corpora. Digunakan tim sales lapangan untuk validasi, rekapitulasi, dan pelaporan data kunjungan secara otomatis."
                }
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {["Enterprise AI", "React.js", "Socket.io", "n8n AI", "REST API"].map((tag) => (
                  <span key={tag} className="text-sm font-medium px-3.5 py-1.5 rounded-md bg-[var(--surface-2)] text-[var(--text-muted)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 text-sm text-[var(--text-muted)] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[var(--text-muted)]" />
              <span>{t.projects.p2Internal}</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Project 3 (COMPACT: 5 COLS) — Hotel Booking App */}
        <AnimatedSection animation="fade-up" delay={0.12} className="md:col-span-5">
          <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors p-8 sm:p-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-semibold text-[var(--text)] mb-3">
                Hotel Booking Mobile
              </h3>

              <p className="text-base text-[var(--text-body)] leading-relaxed mb-6">
                {lang === 'en'
                  ? "Cross-platform mobile hotel booking app built with React Native and Expo (Hacktiv8 Batch 5). Includes dynamic search, price range filtering, bookmarking, and user profile management."
                  : "Aplikasi reservasi hotel mobile multiplatform berbasis React Native dan Expo (Hacktiv8 Batch 5). Memiliki fitur pencarian akomodasi, filter rentang harga, bookmark hotel favorit, dan halaman akun pengguna."
                }
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {["Mobile App", "React Native", "Expo", "Context API", "JavaScript"].map((tag) => (
                  <span key={tag} className="text-sm font-medium px-3.5 py-1.5 rounded-md bg-[var(--surface-2)] text-[var(--text-muted)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 text-sm text-[var(--text-muted)]">
              {t.projects.p3Role}
            </div>
          </div>
        </AnimatedSection>

        {/* Project 4 (WIDE: 7 COLS) — Rodaku Mobile App */}
        <AnimatedSection animation="fade-up" delay={0.16} className="md:col-span-7">
          <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors p-8 sm:p-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[var(--text)] mb-3">
                Rodaku : Vehicle Service Logbook
              </h3>

              <p className="text-base text-[var(--text-body)] leading-relaxed mb-6">
                {lang === 'en'
                  ? "100% offline-first personal mobile logbook for tracking vehicle maintenance, fuel fill-ups, and dual-trigger service reminders (mileage or date). Built with React Native, Expo Router, and local SQLite with WAL mode."
                  : "Aplikasi buku catatan (logbook) digital perawatan motor, mobil, dan pengisian BBM berarsitektur 100% offline-first. Dilengkapi pencatatan kilat (<30 detik), validasi odometer, pengingat servis dwi-faktor (kilometer atau tanggal), dan analitik pengeluaran berbasis SQLite lokal."
                }
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Personal Project", "React Native", "Expo SDK 57", "Expo Router", "SQLite (WAL)", "Offline-First", "Android"].map((tag) => (
                  <span key={tag} className="text-sm font-medium px-3.5 py-1.5 rounded-md bg-[var(--surface-2)] text-[var(--text-muted)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-sm text-[var(--text-muted)]">
                {t.projects.rodakuRole}
              </span>
              <a
                href="https://github.com/AldyOkta/Rodaku"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] bg-transparent border border-[var(--border)] hover:bg-[var(--surface-2)] px-5 py-2 rounded-full transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>{t.projects.openGithub}</span>
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Project 5 (WIDE: 12 COLS) — Hydroponic IoT Automation */}
        <AnimatedSection animation="fade-up" delay={0.2} className="md:col-span-12">
          <div className="rounded-3xl bg-[var(--surface)] border border-[var(--accent-border)] hover:border-[var(--border-strong)] transition-colors p-8 sm:p-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[var(--text)] mb-3">
                Hydroponic Smart Automation System
              </h3>

              <p className="text-base text-[var(--text-body)] leading-relaxed mb-6">
                {lang === 'en'
                  ? "Microcontroller-based smart automation system controlling nutrition dosing, realtime pH/TDS sensor telemetry, and water pump cycles for hydroponic agriculture at BPVP Surakarta. Officially verified competent by BNSP."
                  : "Sistem kendali otomatis berbasis mikrokontroler untuk mengatur kadar nutrisi, pembacaan sensor pH/TDS secara realtime, dan siklus pompa air tanaman hidroponik di BPVP Surakarta. Dinyatakan Kompeten oleh BNSP."
                }
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {["IoT & Hardware", "Microcontroller", "Sensor TDS & pH", "Embedded C++", "Sertifikasi BNSP"].map((tag) => (
                  <span key={tag} className="text-sm font-medium px-3.5 py-1.5 rounded-md bg-[var(--surface-2)] text-[var(--text-muted)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--pass-soft)] text-sm font-semibold text-[var(--pass)]">
                <ShieldCheck className="w-4 h-4 text-[var(--pass)]" />
                <span>{t.projects.p4Predicate}</span>
              </span>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
