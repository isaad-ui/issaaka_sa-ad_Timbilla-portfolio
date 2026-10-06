import React, { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Tag } from '../ui/Tag';
import { journeyItems } from '../../data/journey';

export const Journey: React.FC = () => {
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
    <section id="journey" className="py-24 border-t border-[#111111]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader
          label="Journey"
          title="How I got here"
          subtitle="A timeline of my learning path as a Computer Science student."
        />

        <div className="relative max-w-2xl">
          {/* Timeline line */}
          <div className="absolute left-[6px] top-2 bottom-2 w-px bg-[#1e1e1e]" aria-hidden="true" />

          <ol className="space-y-8" aria-label="Learning journey timeline">
            {journeyItems.map((item) => (
              <li key={item.id} className="pl-8 relative">
                {/* Dot */}
                <div
                  className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                    item.current
                      ? 'bg-indigo-500 border-indigo-500'
                      : 'bg-[#0a0a0a] border-[#333]'
                  }`}
                  aria-hidden="true"
                />

                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span
                      className={`text-xs font-mono ${
                        item.current ? 'text-indigo-400' : 'text-gray-600'
                      }`}
                    >
                      {item.year}
                    </span>
                    {item.current && (
                      <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                        Now
                      </span>
                    )}
                  </div>

                  <h3 className="text-gray-200 font-medium text-sm mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
