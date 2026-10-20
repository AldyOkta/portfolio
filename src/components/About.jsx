import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import AnimatedSection from './ui/AnimatedSection';

export default function About() {
  const { education } = portfolioData;
  const { t } = useLanguage();

  return (
    <section id="about" className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight leading-tight mb-6">
              {t.about.title}
            </h2>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-left" delay={0.08}>
            <div className="p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <p className="text-sm font-medium text-[var(--text-muted)] mb-1">
                {t.about.formalEdu}
              </p>
              <p className="text-lg font-bold text-[var(--text)] mb-1">
                {education[0].degree}
              </p>
              <p className="text-base text-[var(--text-muted)] mb-4">
                {education[0].institution}
              </p>
              <div className="inline-block px-3.5 py-1.5 rounded-lg bg-[var(--surface-2)] text-sm font-medium text-[var(--text-muted)]">
                {t.about.gpaPrefix}{education[0].gpa}
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="md:col-span-7 space-y-5 text-base sm:text-lg text-[var(--text-body)] leading-relaxed pt-2">
          <AnimatedSection animation="fade-up" delay={0.05}>
            <p>{t.about.p1}</p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={0.1}>
            <p>{t.about.p2}</p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={0.15}>
            <p>{t.about.p3}</p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
