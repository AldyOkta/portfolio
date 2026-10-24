import React from 'react';
import { ExternalLink, ShieldCheck, Github } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import AnimatedSection from './ui/AnimatedSection';
import SpotlightCard from './ui/spotlight-card';

export default function Projects() {
  const { t, lang } = useLanguage();
  const { projects } = portfolioData;

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
        {projects.map((project) => {
          const desc = typeof project.description === 'object'
            ? project.description[lang] || project.description.id
            : project.description;

          return (
            <AnimatedSection
              key={project.id}
              animation="fade-up"
              delay={project.delay || 0}
              className={project.colSpan || 'md:col-span-6'}
            >
              <SpotlightCard
                className={`${project.borderAccent ? 'border-[var(--accent-border)]' : ''} p-8 sm:p-10 flex flex-col justify-between h-full`}
              >
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[var(--text)] mb-3">
                    {project.title}
                  </h3>

                  <p className="text-base text-[var(--text-body)] leading-relaxed mb-6">
                    {desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm font-medium px-3.5 py-1.5 rounded-md bg-[var(--surface-2)] text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  {project.roleKey && (
                    <span className="text-sm text-[var(--text-muted)]">
                      {t.projects[project.roleKey]}
                    </span>
                  )}

                  {project.action?.type === 'link' && (
                    <a
                      href={project.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] bg-transparent border border-[var(--border)] hover:bg-[var(--surface-2)] px-5 py-2 rounded-full transition-colors"
                    >
                      <span>{t.projects[project.action.labelKey]}</span>
                      <ExternalLink className="w-4 h-4 text-[var(--text-muted)]" />
                    </a>
                  )}

                  {project.action?.type === 'internal' && (
                    <div className="text-sm text-[var(--text-muted)] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[var(--text-muted)]" />
                      <span>{t.projects[project.action.labelKey]}</span>
                    </div>
                  )}

                  {project.action?.type === 'roleOnly' && (
                    <div className="text-sm text-[var(--text-muted)]">
                      {t.projects[project.action.labelKey]}
                    </div>
                  )}

                  {project.action?.type === 'github' && (
                    <a
                      href={project.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] bg-transparent border border-[var(--border)] hover:bg-[var(--surface-2)] px-5 py-2 rounded-full transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>{t.projects[project.action.labelKey]}</span>
                    </a>
                  )}

                  {project.action?.type === 'badge' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--pass-soft)] text-sm font-semibold text-[var(--pass)]">
                      <ShieldCheck className="w-4 h-4 text-[var(--pass)]" />
                      <span>{t.projects[project.action.labelKey]}</span>
                    </span>
                  )}
                </div>
              </SpotlightCard>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
