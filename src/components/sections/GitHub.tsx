import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import { SectionHeader } from '../ui/SectionHeader';
import { repos } from '../../data/repos';

const langColor: Record<string, string> = {
  Python: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-400',
  default: 'bg-gray-500',
};

export const GitHub: React.FC = () => {
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
    <section className="py-24 border-t border-[#111111]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader
          label="GitHub"
          title="Explore My Work"
          subtitle="Selected repositories. All projects are open source."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#111111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] transition-all group block"
              aria-label={`View ${repo.name} on GitHub`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-gray-300 font-mono text-sm group-hover:text-indigo-400 transition-colors break-all">
                  {repo.name}
                </h3>
                <GithubIcon size={14} className="text-gray-600 flex-shrink-0 mt-0.5" />
              </div>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">{repo.description}</p>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${langColor[repo.language] ?? langColor.default}`}
                  aria-hidden="true"
                />
                <span className="text-gray-600 text-xs">{repo.language}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://github.com/isaad-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 border border-[#2a2a2a] hover:border-indigo-500/40 px-6 py-3 rounded-lg transition-all"
          >
            <GithubIcon size={16} />
            View All Repositories
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
