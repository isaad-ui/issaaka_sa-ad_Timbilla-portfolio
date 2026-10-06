import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import { SectionHeader } from '../ui/SectionHeader';
import { Tag } from '../ui/Tag';
import { ProjectModal } from './ProjectModal';
import { projects } from '../../data/projects';
import type { Project } from '../../types';

const statusLabel: Record<Project['status'], { text: string; className: string }> = {
  complete: { text: 'Complete', className: 'text-emerald-400 bg-emerald-400/10' },
  'in-development': { text: 'In Development', className: 'text-amber-400 bg-amber-400/10' },
};

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  const status = statusLabel[project.status];
  return (
    <article
      className="bg-[#111111] border border-[#1e1e1e] rounded-xl p-6 flex flex-col gap-4 hover:border-[#2a2a2a] transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <Tag variant="category">{project.category}</Tag>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.className}`}
            >
              {status.text}
            </span>
          </div>
          <h3 className="text-gray-100 font-semibold text-base group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>
        </div>
        <ArrowUpRight
          size={16}
          className="text-gray-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-1"
        />
      </div>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed">{project.shortDescription}</p>

      {/* Features */}
      <ul className="space-y-1">
        {project.features.slice(0, 3).map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#3a3a3a] flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-[#1a1a1a]">
        {project.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      {/* Action buttons */}
      <div
        className="flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 border border-[#2a2a2a] hover:border-[#3a3a3a] px-3 py-1.5 rounded-md transition-all"
          aria-label={`${project.title} GitHub repository`}
        >
          <GithubIcon size={12} />
          GitHub
        </a>
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/50 px-3 py-1.5 rounded-md transition-all"
            aria-label={`${project.title} live demo`}
          >
            <ExternalLink size={12} />
            Demo
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 px-3 py-1.5 rounded-md cursor-not-allowed">
            <ExternalLink size={12} />
            No Demo
          </span>
        )}
      </div>
    </article>
  );
};

export const Projects: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-24 border-t border-[#111111]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader
          label="Projects"
          title="Things I've built"
          subtitle="A selection of projects built to solve real problems and deepen my engineering skills. Click any card for the full case study."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};
