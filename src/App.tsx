import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Journey } from './components/sections/Journey';
import { Certifications } from './components/sections/Certifications';
import { GitHub } from './components/sections/GitHub';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Certifications />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
