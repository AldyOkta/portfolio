import React from 'react';
import { DotGridHero } from './ui/dot-grid-hero';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

export default function Hero({ isLoaded = true }) {
  const { personal } = portfolioData;
  const { t } = useLanguage();

  return (
    <DotGridHero
      name={personal.name}
      location={t.hero.location}
      role={t.hero.role}
      summary={t.hero.summary}
      cvUrl={personal.cvPath}
      downloadText={t.hero.downloadCv}
      dotGap={48}
      interactionRadius={140}
      repulsionStrength={7}
      springK={0.08}
      damping={0.82}
      isLoaded={isLoaded}
    />
  );
}
