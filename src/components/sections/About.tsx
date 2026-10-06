import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Code2, FlaskConical, Lightbulb } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

const stats = [
  { label: 'Projects Built', value: '5+' },
  { label: 'Languages', value: '5+' },
  { label: 'Focus Areas', value: '2' },
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 border-t border-[#111111]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader
          label="About"
          title="A bit about me"
          subtitle="Computer Science student at the University of Ghana, building practical software and exploring data science."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: bio */}
          <div className="space-y-5">
            <p className="text-gray-400 leading-relaxed">
              I'm Issaka Sa-ad Timbilla, a Computer Science student at the University of Ghana
              (expected graduation: 2028). My focus sits at the intersection of software
              engineering and data science — I want to build things that work well and understand
              the data that flows through them.
            </p>
            <p className="text-gray-400 leading-relaxed">
              I started with Python and worked my way through data structures, algorithms, and web
              development. Over the past year I've built full-stack applications, frontend UIs,
              and a collection of Python projects covering core CS concepts. Everything I've built
              is on GitHub.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Right now I'm working on strengthening my skills across the full stack while
              deepening my understanding of data science concepts. I'm looking for internship
              opportunities where I can contribute to real work and keep growing as an engineer.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-[#111111] border border-[#1e1e1e] rounded-lg p-4"
                >
                  <div className="text-2xl font-semibold text-gray-100 mb-1">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: highlight cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="bg-[#111111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] transition-colors"
              >
                <h.icon size={20} className="text-indigo-400 mb-3" />
                <h3 className="text-gray-200 font-medium text-sm mb-2">{h.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
