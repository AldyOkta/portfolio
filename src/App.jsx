import React, { useState, useCallback } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import SmoothScroll from './components/ui/SmoothScroll'
import WeightSweepPreloader from './components/ui/weight-sweep-preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const handlePreloaderComplete = useCallback(() => setPreloaderFinished(true), []);

  return (
    <LanguageProvider>
      <SmoothScroll>
        <WeightSweepPreloader onComplete={handlePreloaderComplete} />
        <div className="min-h-svh bg-[var(--bg)] text-[var(--text)] font-sans">
          <Navbar />
          <main id="main-content">
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
