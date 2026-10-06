import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.slice(1));
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          current = id;
        }
      }
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = () => {
    // Place your resume PDF at /public/resume.pdf to enable download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Issaka-Sa-ad-Timbilla-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // If the file doesn't exist, the browser will show a 404 — replace /public/resume.pdf with your actual file
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#1a1a1a]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <a
          href="#home"
          className="text-gray-100 font-semibold text-lg tracking-tight hover:text-indigo-400 transition-colors"
          aria-label="Issaka Sa-ad Timbilla — home"
        >
          IST
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`px-3 py-2 text-sm rounded-md transition-colors relative ${
                  active === link.href.slice(1)
                    ? 'text-indigo-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                aria-current={active === link.href.slice(1) ? 'page' : undefined}
              >
                {link.label}
                {active === link.href.slice(1) && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-px bg-indigo-500/60 rounded-full" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* CV button + mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadCV}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-300 border border-[#2a2a2a] rounded-lg hover:border-indigo-500/50 hover:text-indigo-400 transition-all"
            aria-label="Download CV"
          >
            <Download size={14} />
            CV
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-gray-200 transition-colors"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0f0f0f] border-b border-[#1a1a1a]">
          <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 text-sm rounded-md transition-colors ${
                    active === link.href.slice(1)
                      ? 'text-indigo-400 bg-indigo-500/10'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-[#1a1a1a] mt-2">
              <button
                onClick={() => { handleDownloadCV(); setIsOpen(false); }}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-400 hover:text-gray-200 transition-colors"
              >
                <Download size={14} />
                Download CV
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
