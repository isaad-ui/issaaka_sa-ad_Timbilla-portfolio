import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, ArrowDown } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
      aria-label="Introduction"
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{background:
            'radial-gradient(ellipse 60% 50% at 50% -10%, rgba(99,102,241,0.08) 0%, transparent 70%)',}}
      />

      <div className="max-w-6xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div
            ref={ref}
            className={`transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="mb-6">
              <span className="inline-block text-sm text-gray-500 tracking-wide">
                Computer Science Student · University of Ghana
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold text-gray-100 tracking-tight leading-tight mb-4">
              Hi, I'm{' '}
              <span className="text-indigo-400">Issaka Sa-ad</span>
              <br />
              Timbilla.
            </h1>

            <p className="text-lg text-gray-400 mb-3 font-medium">
              Software Engineer &amp; Data Science Enthusiast
            </p>

            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
              I build practical software — from full-stack web applications to Python-based data
              tools. Currently studying Computer Science at the University of Ghana while
              sharpening my skills in software engineering and data science.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Button href="#projects" size="lg">
                View Projects
              </Button>
              <Button href="#contact" variant="outline" size="lg">
                Contact Me
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/isaad-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-300 transition-colors p-1"
                aria-label="GitHub profile"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/issaka-sa-ad-timbilla"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-300 transition-colors p-1"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Right column: terminal block */}
          <div
            className={`transition-all duration-700 delay-150 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="bg-[#111111] border border-[#1e1e1e] rounded-xl overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1e1e1e] bg-[#0f0f0f]">
                <span className="w-3 h-3 rounded-full bg-[#3a3a3a]" />
                <span className="w-3 h-3 rounded-full bg-[#3a3a3a]" />
                <span className="w-3 h-3 rounded-full bg-[#3a3a3a]" />
                <span className="ml-2 text-xs text-gray-600 font-mono">profile.py</span>
              </div>

              {/* Code content */}
              <div className="p-5 font-mono text-sm leading-relaxed">
                <div className="text-gray-600"># Developer profile</div>
                <div className="mt-2">
                  <span className="text-indigo-400">profile</span>
                  <span className="text-gray-400"> = {'{'}</span>
                </div>
                <div className="ml-4">
                  <span className="text-gray-500">"name"</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-emerald-400">"Issaka Sa-ad Timbilla"</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div className="ml-4">
                  <span className="text-gray-500">"location"</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-emerald-400">"Accra, Ghana"</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div className="ml-4">
                  <span className="text-gray-500">"degree"</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-emerald-400">"BSc Computer Science"</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div className="ml-4">
                  <span className="text-gray-500">"interests"</span>
                  <span className="text-gray-400">: [</span>
                </div>
                <div className="ml-8">
                  <span className="text-emerald-400">"Software Engineering"</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div className="ml-8">
                  <span className="text-emerald-400">"Data Science"</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div className="ml-8">
                  <span className="text-emerald-400">"Algorithms"</span>
                </div>
                <div className="ml-4">
                  <span className="text-gray-400">],</span>
                </div>
                <div className="ml-4">
                  <span className="text-gray-500">"status"</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-amber-400">"open to internships"</span>
                </div>
                <div className="text-gray-400">{'}'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <a
            href="#about"
            className="text-gray-600 hover:text-gray-400 transition-colors animate-bounce"
            aria-label="Scroll to About section"
          >
            <ArrowDown size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};
