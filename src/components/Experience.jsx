import React from 'react';
import { Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import AnimatedSection from './ui/AnimatedSection';

export default function Experience() {
  const { experiences } = portfolioData;
  const { t, lang } = useLanguage();

  const experiencesEn = [
    {
      role: "Quality Assurance Tester",
      company: "PT Tiga Serangkai Inti Corpora",
      period: "December 2025 - Present",
      type: "Full-time",
      current: true,
      responsibilities: [
        "Conduct functional testing, regression testing, and UAT support for internal enterprise systems.",
        "Author test plan documentation, test scenario matrices, and structured bug tracking in OpenProject.",
      ]
    },
    {
      role: "Project-Based Learning - Smart Automation",
      company: "BPVP Surakarta",
      period: "October 2025",
      type: "Training & Certification",
      current: false,
      responsibilities: [
        "Engineered and verified an automated sensor-based nutrient dosing system for hydroponic farming.",
        "Achieved certified competent status awarded by the National Professional Certification Board (BNSP)."
      ]
    },
    {
      role: "Mobile Developer (Intern)",
      company: "PT Tiga Serangkai Pustaka Mandiri",
      period: "February 2024 - July 2024",
      type: "Internship",
      current: false,
      responsibilities: [
        "Developed internal mobile interface modules using React Native & Expo.",
        "Optimized database queries and ensured smooth UI responsiveness across Android device form factors."
      ]
    },
    {
      role: "Front End Web Developer Trainee",
      company: "Hacktiv8 Academy (MSIB Kampus Merdeka)",
      period: "August 2023 - January 2024",
      type: "Certified Independent Study",
      current: false,
      responsibilities: [
        "Completed intensive curriculum covering React.js, Tailwind CSS, state management, and modern ES6+.",
        "Collaborated in a team to build the Movie Search & Discovery Web App (live on Netlify)."
      ]
    }
  ];

  const list = lang === 'en' ? experiencesEn : experiences;

  const getTypeChipClasses = (type) => {
    if (type === 'Full-time') {
      return 'bg-[var(--pass-soft)] text-[var(--pass)] font-semibold';
    }
    if (type === 'Training & Certification' || type === 'Pelatihan & Sertifikasi') {
      return 'bg-[var(--info-soft)] text-[var(--info)] font-semibold';
    }
    return 'bg-[var(--surface-2)] text-[var(--text-muted)] font-medium';
  };

  return (
    <section id="experience" className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-12">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text)] tracking-tight">
            {t.experience.title}
          </h2>
        </AnimatedSection>
        <AnimatedSection animation="fade-up" delay={0.08}>
          <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
            {t.experience.subtitle}
          </p>
        </AnimatedSection>
      </div>

      <div className="space-y-6">
        {list.map((exp, idx) => {
          const isLatest = exp.current || idx === 0;
          return (
            <AnimatedSection key={idx} animation="fade-up" delay={idx * 0.08}>
              <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors p-8 sm:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] bg-[var(--surface-2)] px-3.5 py-1 rounded-full">
                    <Calendar className="w-4 h-4 text-[var(--text-muted)]" />
                    <code>{exp.period}</code>
                    {/* {isLatest && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[var(--accent-soft)] text-[var(--accent)]">
                        {lang === 'en' ? 'Present' : 'Sekarang'}
                      </span>
                    )} */}
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full ${getTypeChipClasses(exp.type)}`}>
                    <span className={`w-2 h-2 rounded-full ${exp.type === 'Full-time' ? 'bg-[var(--pass)]' : exp.type.includes('Training') || exp.type.includes('Pelatihan') ? 'bg-[var(--info)]' : 'bg-[var(--text-muted)]'}`} />
                    {exp.type}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-[var(--text)] mb-2">
                  {exp.role}
                </h3>

                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] font-medium mb-6">
                  <Building2 className="w-4 h-4 text-[var(--text-muted)]" />
                  <span>{exp.company}</span>
                </div>

                <ul className="space-y-3 text-base text-[var(--text-body)]">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-1" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
