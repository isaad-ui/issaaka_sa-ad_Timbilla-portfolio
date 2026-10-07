import React, { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Tag } from '../ui/Tag';
import { skillCategories } from '../../data/skills';

export const Skills: React.FC = () => {
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
    <section id="skills" className="py-24 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <SectionHeader
            label="Skills"
            title="Technologies &amp; Tools"
            subtitle="A mix of proficient skills and technologies I'm actively learning."
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.category}
              className={`bg-white border border-neutral-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="text-neutral-800 font-semibold text-sm mb-4 pb-3 border-b border-neutral-100">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <Tag key={skill.name} variant={skill.level === 'learning' ? 'learning' : 'default'}>
                    {skill.name}
                    {skill.level === 'learning' && (
                      <span className="ml-1 text-neutral-300" aria-label="currently learning">*</span>
                    )}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs text-neutral-400">
          * Currently learning — included to show direction, not claimed as proficiency.
        </p>
      </div>
    </section>
  );
};
