import React, { useState, useCallback } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import SmoothScroll from '@/components/ui/SmoothScroll';
import WeightSweepPreloader from '@/components/ui/WeightSweepPreloader';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const handlePreloaderComplete = useCallback(() => setPreloaderFinished(true), []);

  return (
    <LanguageProvider>
      <SmoothScroll>
        <WeightSweepPreloader onComplete={handlePreloaderComplete} />
        <div className="min-h-svh bg-[var(--bg)] text-[var(--text)] font-sans">
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            <Hero isLoaded={preloaderFinished} />
            <About />
            <Projects />
            <Skills />
            <Experience />
            <Certifications />
            <Contact />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </LanguageProvider>
  );
}
