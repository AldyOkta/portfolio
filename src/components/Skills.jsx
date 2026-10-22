import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import AnimatedSection from './ui/AnimatedSection';
import StaggerContainer, { StaggerItem } from './ui/StaggerContainer';

export default function Skills() {
  const { skills } = portfolioData;
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-20 bg-[var(--surface-2)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text)] tracking-tight">
              {t.skills.title}
            </h2>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={0.08}>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
              {t.skills.subtitle}
            </p>
          </AnimatedSection>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.08}>

          <StaggerItem>
            <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors p-8 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-1">{t.skills.qaTitle}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-6 font-medium">{t.skills.qaSub}</p>
                <ul className="space-y-3">
                  {skills.qa.map((item, idx) => (
                    <li key={idx} className="py-1 text-base text-[var(--text)] font-medium">
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors p-8 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-1">{t.skills.feTitle}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-6 font-medium">{t.skills.feSub}</p>
                <ul className="space-y-3">
                  {skills.frontend.map((item, idx) => (
                    <li key={idx} className="py-1 text-base text-[var(--text)] font-medium">
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors p-8 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-1">{t.skills.toolsTitle}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-6 font-medium">{t.skills.toolsSub}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.tools.map((item, idx) => (
                    <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-[var(--surface-2)] text-[var(--text-muted)] text-sm font-medium">
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-4 text-sm text-[var(--text-muted)]">
                {t.skills.platform}
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>
      </div>
    </section>
  );
}
