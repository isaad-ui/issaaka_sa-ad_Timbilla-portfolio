import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Code2, FlaskConical, Lightbulb } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

const stats = [
  { label: 'Projects Built', value: '5+' },
  { label: 'Languages', value: '5+' },
  { label: 'Year Started', value: '2024' },
];

const highlights = [
  {
    icon: BookOpen,
    title: 'Academic Foundation',
    text: 'BSc Computer Science at the University of Ghana — building strong fundamentals in algorithms, software systems, and mathematics.',
  },
  {
    icon: Code2,
    title: 'Software Engineering',
    text: 'Building full-stack and frontend applications with Python, JavaScript, and modern web technologies. Focused on clean, practical software.',
  },
  {
    icon: FlaskConical,
    title: 'Data Science Track',
    text: 'Exploring data analysis, machine learning fundamentals, and the pipeline from raw data to actionable insight with Python.',
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
            subtitle="Computer Science student at the University of Ghana, building practical software and exploring data science."
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: bio */}
          <div
            className={`space-y-5 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <p className="text-neutral-600 leading-relaxed">
              I'm Issaka Sa-ad Timbilla, a Computer Science student at the University of Ghana
              (expected graduation: 2028). My focus sits at the intersection of software
              engineering and data science — I want to build things that work well and understand
              the data that flows through them.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              I started with Python and worked my way through data structures, algorithms, and web
              development. Over the past year I've built full-stack applications, frontend UIs,
              and a collection of Python projects covering core CS concepts. Everything I've built
              is on GitHub.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Right now I'm working on strengthening my skills across the full stack while
              deepening my understanding of data science concepts. I'm looking for internship
              opportunities where I can contribute to real work and keep growing as an engineer.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`bg-white border border-neutral-200 rounded-xl p-4 shadow-sm transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${200 + i * 80}ms` }}
                >
                  <div className="text-2xl font-bold text-neutral-900 mb-1">{s.value}</div>
                  <div className="text-xs text-neutral-400 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
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
