import React from 'react';
import { Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import AnimatedSection from './ui/AnimatedSection';
import StaggerContainer, { StaggerItem } from './ui/StaggerContainer';

export default function Certifications() {
  const { certifications } = portfolioData;
  const { t } = useLanguage();

  return (
    <section id="certifications" className="py-20 bg-[var(--surface-2)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text)] tracking-tight">
              {t.certifications.title}
            </h2>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={0.08}>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
              {t.certifications.subtitle}
            </p>
          </AnimatedSection>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.06}>
          {certifications.map((cert, idx) => (
            <StaggerItem key={idx}>
              <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-7 flex flex-col justify-between h-full">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[var(--surface-2)] text-[var(--text-muted)] flex items-center justify-center mb-5">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--text)] mb-2 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                    {cert.issuer}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-sm text-[var(--text-muted)] font-medium">
                  <code>{cert.year}</code>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
