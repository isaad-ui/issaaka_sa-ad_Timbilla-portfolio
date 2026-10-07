import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import { SectionHeader } from '../ui/SectionHeader';
import { Tag } from '../ui/Tag';
import { ProjectModal } from './ProjectModal';
import { projects } from '../../data/projects';
import type { Project } from '../../types';

// ─── SVG Previews ─────────────────────────────────────────────────────────────

const AnalyticsPreview: React.FC = () => (
  <svg viewBox="0 0 480 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <rect width="480" height="220" fill="#f8f8ff" />
    {[50, 90, 130, 170].map((y) => (
      <line key={y} x1="48" y1={y} x2="448" y2={y} stroke="#e5e7eb" strokeWidth="1" />
    ))}
    {[
      { x: 72,  h: 100, color: '#6366f1' },
      { x: 122, h: 130, color: '#818cf8' },
      { x: 172, h: 70,  color: '#6366f1' },
      { x: 222, h: 155, color: '#4f46e5' },
      { x: 272, h: 90,  color: '#6366f1' },
      { x: 322, h: 120, color: '#818cf8' },
      { x: 372, h: 105, color: '#6366f1' },
    ].map(({ x, h, color }) => (
      <rect key={x} x={x} y={190 - h} width="34" height={h} rx="4" fill={color} opacity="0.8" />
    ))}
    <polyline
      points="89,115 139,85 189,135 239,58 289,105 339,78 389,92"
      stroke="#4f46e5" strokeWidth="2" fill="none" strokeDasharray="5 3" opacity="0.6"
    />
    {[89, 139, 189, 239, 289, 339, 389].map((cx, i) => {
      const ys = [115, 85, 135, 58, 105, 78, 92];
      return <circle key={cx} cx={cx} cy={ys[i]} r="4" fill="#4f46e5" opacity="0.8" />;
    })}
    <text x="48" y="212" fill="#9ca3af" fontSize="9" fontFamily="monospace">Python · GitHub API · Data Analysis · Visualization</text>
  </svg>
);

const YouTubePreview: React.FC = () => (
  <svg viewBox="0 0 480 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <rect width="480" height="220" fill="#f9fafb" />
    {/* Navbar */}
    <rect width="480" height="32" fill="white" />
    <rect x="0" y="32" width="480" height="1" fill="#e5e7eb" />
    {[8, 14, 20].map((y) => <rect key={y} x="12" y={y} width="16" height="2" rx="1" fill="#d1d5db" />)}
    <rect x="36" y="10" width="40" height="14" rx="3" fill="#ef4444" opacity="0.9" />
    <text x="56" y="21" fill="white" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">▶ YT</text>
    <rect x="130" y="9" width="200" height="15" rx="7" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1" />
    <text x="230" y="20" fill="#9ca3af" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Search</text>
    {/* Sidebar */}
    <rect x="0" y="33" width="50" height="187" fill="white" />
    <rect x="50" y="33" width="1" height="187" fill="#f3f4f6" />
    {[48, 75, 102, 129].map((y) => (
      <g key={y}>
        <rect x="12" y={y} width="26" height="4" rx="2" fill="#e5e7eb" />
        <rect x="12" y={y + 9} width="18" height="3" rx="1.5" fill="#f3f4f6" />
      </g>
    ))}
    {/* Video cards grid */}
    {[
      { x: 62, y: 42 }, { x: 190, y: 42 }, { x: 318, y: 42 },
      { x: 62, y: 128 }, { x: 190, y: 128 }, { x: 318, y: 128 },
    ].map(({ x, y }, i) => (
      <g key={i}>
        <rect x={x} y={y} width="110" height="62" rx="6" fill="#f3f4f6" />
        <rect x={x} y={y} width="110" height="62" rx="6" stroke="#e5e7eb" strokeWidth="1" />
        <polygon points={`${x+48},${y+25} ${x+48},${y+40} ${x+62},${y+32}`} fill="#d1d5db" />
        <rect x={x+82} y={y+50} width="24" height="8" rx="2" fill="white" opacity="0.9" />
        <text x={x+94} y={y+57} fill="#6b7280" fontSize="5.5" textAnchor="middle" fontFamily="monospace">4:23</text>
        <circle cx={x+10} cy={y+75} r="7" fill="#e5e7eb" />
        <rect x={x+22} y={y+70} width="78" height="4" rx="2" fill="#e5e7eb" />
        <rect x={x+22} y={y+77} width="55" height="3" rx="1.5" fill="#f3f4f6" />
      </g>
    ))}
  </svg>
);

const previewMap: Record<string, React.FC> = {
  'github-developer-analytics': AnalyticsPreview,
  'youtube-clone': YouTubePreview,
};

const statusLabel: Record<Project['status'], { text: string; className: string }> = {
  complete: { text: 'Complete', className: 'text-emerald-700 bg-emerald-50 border border-emerald-200' },
  'in-development': { text: 'In Development', className: 'text-amber-700 bg-amber-50 border border-amber-200' },
};

// ─── Project Card ─────────────────────────────────────────────────────────────

const ProjectCard: React.FC<{ project: Project; index: number; visible: boolean; onClick: () => void }> = ({
  project, index, visible, onClick,
}) => {
  const Preview = previewMap[project.id];
  const status = statusLabel[project.status];
  const isEven = index % 2 === 0;

  return (
    <article
      className={`bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer group ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
      onClick={onClick}
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        {/* Preview */}
        <div className="relative lg:w-1/2 h-52 lg:h-auto bg-neutral-50 border-b lg:border-b-0 border-neutral-100 overflow-hidden flex-shrink-0">
          {Preview && <Preview />}
          <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors duration-300" />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-indigo-600 bg-white border border-indigo-200 px-2 py-1 rounded-md shadow-sm">
              View case study <ArrowUpRight size={10} />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 p-7 lg:w-1/2">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <Tag variant="category">{project.category}</Tag>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${status.className}`}>
                {status.text}
              </span>
            </div>
            <h3 className="text-neutral-900 font-bold text-xl leading-snug group-hover:text-indigo-600 transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="text-neutral-500 text-sm leading-relaxed">{project.shortDescription}</p>

          {/* Features */}
          <ul className="space-y-2">
            {project.features.slice(0, 3).map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-600">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-neutral-100 mt-auto">
            {project.tech.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200 hover:border-neutral-300 px-3 py-1.5 rounded-lg transition-all shadow-sm hover:shadow"
                aria-label={`${project.title} GitHub repository`}
              >
                <GithubIcon size={12} />
                GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-200 hover:border-indigo-300 px-3 py-1.5 rounded-lg transition-all shadow-sm hover:shadow"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink size={12} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────

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
    <section id="projects" className="py-24 border-t border-neutral-200">
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            label="Projects"
            title="Things I've built"
            subtitle="Projects that demonstrate real skills across data analysis and frontend development. Click any card for the full breakdown."
          />
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              visible={visible}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};
