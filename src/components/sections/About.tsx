import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Code2, Brain, Lightbulb } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

const highlights = [
  {
    icon: BookOpen,
    title: 'Academic Foundation',
    text: 'BSc Computer Science at the University of Ghana — building strong fundamentals in algorithms, software systems, and mathematics.',
  },
  {
    icon: Code2,
    title: 'Python Development',
    text: 'Python is my primary language. I use it to build data tools, automate workflows, implement algorithms, and explore AI applications.',
  },
  {
    icon: Brain,
    title: 'AI Enthusiast',
    text: 'Passionate about artificial intelligence and machine learning — exploring how intelligent systems work and how to build them with Python.',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Learning',
    text: 'Every project is a learning opportunity. I build real things, study what works, and iterate — always moving toward stronger engineering.',
  },
];

export const About: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <SectionHeader
            label="About"
            title="A bit about me"
            subtitle="Computer Science student at the University of Ghana, building with Python and exploring artificial intelligence."
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: bio */}
          <div
            className={`space-y-5 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <p className="text-neutral-600 leading-relaxed">
              I'm Issaka Sa-ad Timbilla, a Computer Science student at the University of Ghana
              (expected graduation: 2028). Python is my primary language — I use it for everything
              from building data tools and implementing algorithms to exploring AI and machine
              learning concepts.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              I'm drawn to artificial intelligence and what becomes possible when you combine
              strong Python fundamentals with real data. My projects reflect that — working with
              APIs, analysing data, and building things that demonstrate what I'm learning in
              practice.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Right now I'm focused on deepening my Python skills and AI knowledge while building
              projects that matter. I'm looking for opportunities where I can contribute, learn
              from experienced engineers, and keep growing.
            </p>
          </div>

          {/* Right: highlight cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <div
                key={h.title}
                className={`bg-white border border-neutral-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mb-3">
                  <h.icon size={16} className="text-indigo-600" />
                </div>
                <h3 className="text-neutral-800 font-semibold text-sm mb-2">{h.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
