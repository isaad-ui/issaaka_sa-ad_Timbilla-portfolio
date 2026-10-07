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
    <section id="journey" className="py-24 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            label="Journey"
            title="How I got here"
            subtitle="A timeline of my learning path as a Computer Science student."
          />
        </div>

        <div className="relative max-w-2xl">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-neutral-200" aria-hidden="true" />

          <ol className="space-y-8" aria-label="Learning journey timeline">
            {journeyItems.map((item, i) => (
              <li
                key={item.id}
                className={`pl-9 relative transition-all duration-700 ${
                  visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Dot */}
                <div
                  className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 transition-colors ${
                    item.current
                      ? 'bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-200'
                      : 'bg-white border-neutral-300'
                  }`}
                  aria-hidden="true"
                />

                <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold font-mono ${item.current ? 'text-indigo-600' : 'text-neutral-400'}`}>
                      {item.year}
                    </span>
                    {item.current && (
                      <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-200 px-2 py-0.5 rounded-full font-semibold">
                        Now
                      </span>
                    )}
                  </div>
                  <h3 className="text-neutral-800 font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
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
