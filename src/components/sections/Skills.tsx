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
    <section id="skills" className="py-24 border-t border-[#111111]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader
          label="Skills"
          title="Technologies & Tools"
          subtitle="A mix of proficient skills and technologies I'm actively learning."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat) => (
            <div key={cat.category} className="bg-[#111111] border border-[#1e1e1e] rounded-xl p-5">
              <h3 className="text-gray-300 font-medium text-sm mb-4 pb-3 border-b border-[#1e1e1e]">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <Tag key={skill.name} variant={skill.level === 'learning' ? 'learning' : 'default'}>
                    {skill.name}
                    {skill.level === 'learning' && (
                      <span className="ml-1 text-gray-600">*</span>
                    )}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-gray-600">
          * Currently learning — included to show direction, not claimed as proficiency.
        </p>
      </div>
    </section>
  );
};
