import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <div className="min-h-screen relative">
            {/* Skip to main content – first focusable element for keyboard/AI navigation */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-theme-purple focus:text-white focus:font-semibold focus:shadow-neon"
            >
                Lewati ke konten utama
            </a>

            <ScrollToTop />
            <Navbar />
            <main id="main-content" tabIndex={-1}>
                <Hero />
                <Services />
                <Portfolio />
                <Experience />
                <Skills />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
