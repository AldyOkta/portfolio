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
            <ScrollToTop />
            <Navbar />
            <main>
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
