import React, { useEffect, useState } from 'react';
import { ArrowDown, MapPin, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #d4d4d4 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.55,
        }}
        aria-hidden="true"
      />
      {/* Fade vignette so dots don't crowd the edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #f5f5f5 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Status badge */}
          <div
            className={`mb-8 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <span className="inline-flex items-center gap-2 bg-white border border-neutral-200 text-neutral-600 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              Open to internships &amp; opportunities
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 tracking-tight leading-[1.05] mb-6 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '80ms' }}
          >
            Hi, I'm{' '}
            <span className="text-indigo-600">Issaka</span>
            <br />
            <span className="text-indigo-600">Sa-ad</span> Timbilla.
          </h1>

          {/* Role line */}
          <p
            className={`text-xl sm:text-2xl font-semibold text-neutral-600 mb-4 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '160ms' }}
          >
            Software Engineer &amp; Data Science Enthusiast
          </p>

          {/* Bio */}
          <p
            className={`text-neutral-500 text-lg leading-relaxed mb-8 max-w-xl transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '240ms' }}
          >
            I build practical software — from full-stack web applications to Python data tools.
            Currently studying Computer Science at the University of Ghana while sharpening my
            skills across software engineering and data science.
          </p>

          {/* Meta info */}
          <div
            className={`flex flex-wrap items-center gap-4 text-sm text-neutral-400 mb-10 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-neutral-400" />
              Accra, Ghana
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" aria-hidden="true" />
            <span className="flex items-center gap-1.5">
              <GraduationCap size={14} className="text-neutral-400" />
              BSc Computer Science, University of Ghana
            </span>
          </div>

          {/* CTAs */}
          <div
            className={`flex flex-wrap items-center gap-3 mb-10 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '360ms' }}
          >
            <Button href="#projects" size="lg">
              View Projects
            </Button>
            <Button href="#contact" variant="outline" size="lg">
              Contact Me
            </Button>
          </div>

          {/* Social icons */}
          <div
            className={`flex items-center gap-4 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '420ms' }}
          >
            <a
              href="https://github.com/isaad-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-800 transition-colors p-1"
              aria-label="GitHub profile"
            >
              <GithubIcon size={22} />
            </a>
            <a
              href="https://linkedin.com/in/issaka-sa-ad-timbilla"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-800 transition-colors p-1"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          className="text-neutral-300 hover:text-neutral-500 transition-colors animate-bounce block"
          aria-label="Scroll to About section"
        >
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
};
