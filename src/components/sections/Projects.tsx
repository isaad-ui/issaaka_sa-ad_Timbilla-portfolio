import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import { SectionHeader } from '../ui/SectionHeader';
import { Tag } from '../ui/Tag';
import { ProjectModal } from './ProjectModal';
import { projects } from '../../data/projects';
import type { Project } from '../../types';

// ─── Inline SVG previews ─────────────────────────────────────────────────────

const AnalyticsPreview: React.FC = () => (
  <svg
    viewBox="0 0 400 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    aria-hidden="true"
  >
    {/* Background */}
    <rect width="400" height="200" fill="#0f0f0f" />

    {/* Grid lines */}
    {[40, 80, 120, 160].map((y) => (
      <line key={y} x1="40" y1={y} x2="380" y2={y} stroke="#1e1e1e" strokeWidth="1" />
    ))}

    {/* Bar chart */}
    {[
      { x: 60,  h: 90,  color: '#6366f1' },
      { x: 100, h: 120, color: '#6366f1' },
      { x: 140, h: 60,  color: '#6366f1' },
      { x: 180, h: 140, color: '#818cf8' },
      { x: 220, h: 80,  color: '#6366f1' },
      { x: 260, h: 110, color: '#6366f1' },
      { x: 300, h: 95,  color: '#818cf8' },
      { x: 340, h: 130, color: '#6366f1' },
    ].map(({ x, h, color }) => (
      <rect key={x} x={x} y={170 - h} width="28" height={h} rx="3" fill={color} opacity="0.85" />
    ))}

    {/* Language dot legend */}
    {[
      { cx: 60,  label: 'Python',     color: '#6366f1' },
      { cx: 140, label: 'JavaScript', color: '#facc15' },
      { cx: 240, label: 'HTML/CSS',   color: '#f97316' },
    ].map(({ cx, label, color }) => (
      <g key={label}>
        <circle cx={cx} cy="192" r="4" fill={color} />
        <text x={cx + 8} y="196" fill="#6b7280" fontSize="9" fontFamily="monospace">{label}</text>
      </g>
    ))}

    {/* Y-axis label */}
    <text x="8" y="12" fill="#4b5563" fontSize="8" fontFamily="monospace">Stars</text>

    {/* Trend line overlay */}
    <polyline
      points="74,100 114,75 154,115 194,45 234,95 274,68 314,82 354,52"
      stroke="#818cf8"
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="4 2"
      opacity="0.5"
    />
  </svg>
);

const YouTubePreview: React.FC = () => (
  <svg
    viewBox="0 0 400 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    aria-hidden="true"
  >
    {/* Background */}
    <rect width="400" height="200" fill="#0f0f0f" />

    {/* Top navbar */}
    <rect width="400" height="28" fill="#111111" />
    {/* Hamburger */}
    {[8, 13, 18].map((y) => (
      <rect key={y} x="10" y={y} width="14" height="1.5" rx="1" fill="#3a3a3a" />
    ))}
    {/* YouTube logo pill */}
    <rect x="32" y="9" width="36" height="12" rx="3" fill="#dc2626" opacity="0.9" />
    <text x="50" y="19" fill="white" fontSize="7" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">▶ YT</text>
    {/* Search bar */}
    <rect x="110" y="8" width="160" height="13" rx="6" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
    <text x="190" y="18" fill="#4b5563" fontSize="7" textAnchor="middle" fontFamily="sans-serif">Search</text>

    {/* Sidebar */}
    <rect x="0" y="28" width="40" height="172" fill="#111111" />
    {[40, 65, 90, 115].map((y) => (
      <g key={y}>
        <rect x="10" y={y} width="20" height="3" rx="1.5" fill="#2a2a2a" />
        <rect x="10" y={y + 7} width="14" height="2" rx="1" fill="#1e1e1e" />
      </g>
    ))}

    {/* Video grid — 3 columns */}
    {[
      { x: 52, y: 36 }, { x: 152, y: 36 }, { x: 252, y: 36 },
      { x: 52, y: 110 }, { x: 152, y: 110 }, { x: 252, y: 110 },
    ].map(({ x, y }, i) => (
      <g key={i}>
        {/* Thumbnail */}
        <rect x={x} y={y} width="88" height="50" rx="4" fill="#1a1a1a" />
        {/* Play icon */}
        <polygon
          points={`${x + 38},${y + 20} ${x + 38},${y + 32} ${x + 50},${y + 26}`}
          fill="#2a2a2a"
        />
        {/* Duration badge */}
        <rect x={x + 62} y={y + 38} width="22" height="8" rx="2" fill="#000000" opacity="0.7" />
        <text x={x + 73} y={y + 45} fill="#9ca3af" fontSize="5" textAnchor="middle" fontFamily="monospace">4:32</text>
        {/* Channel avatar */}
        <circle cx={x + 8} cy={y + 60} r="6" fill="#2a2a2a" />
        {/* Title lines */}
        <rect x={x + 18} y={y + 55} width="65" height="3" rx="1.5" fill="#2a2a2a" />
        <rect x={x + 18} y={y + 61} width="48" height="2" rx="1" fill="#1e1e1e" />
        <rect x={x + 18} y={y + 66} width="38" height="2" rx="1" fill="#1e1e1e" />
      </g>
    ))}
  </svg>
);

// ─── Preview map ──────────────────────────────────────────────────────────────

const previewMap: Record<string, React.FC> = {
  'github-developer-analytics': AnalyticsPreview,
  'youtube-clone': YouTubePreview,
};

// ─── Status config ────────────────────────────────────────────────────────────

const statusLabel: Record<Project['status'], { text: string; className: string }> = {
  complete: { text: 'Complete', className: 'text-emerald-400 bg-emerald-400/10' },
  'in-development': { text: 'In Development', className: 'text-amber-400 bg-amber-400/10' },
};

// ─── Project Card ─────────────────────────────────────────────────────────────

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  const Preview = previewMap[project.id];
  const status = statusLabel[project.status];

  return (
    <article
      className="bg-[#111111] border border-[#1e1e1e] rounded-xl overflow-hidden flex flex-col hover:border-[#2a2a2a] transition-all duration-200 group cursor-pointer"
      onClick={onClick}
    >
      {/* Visual preview */}
      <div className="relative h-44 bg-[#0f0f0f] border-b border-[#1a1a1a] overflow-hidden">
        {Preview && <Preview />}
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors duration-300" />
        {/* "View details" hint */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="inline-flex items-center gap-1 text-[10px] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded-md">
            View details <ArrowUpRight size={10} />
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Tag variant="category">{project.category}</Tag>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.className}`}>
                {status.text}
              </span>
            </div>
            <h3 className="text-gray-100 font-semibold text-base leading-snug group-hover:text-indigo-400 transition-colors">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed">{project.shortDescription}</p>

        {/* Key features */}
        <ul className="space-y-1.5">
          {project.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-500/50 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-[#1a1a1a] mt-auto">
          {project.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        {/* Action buttons */}
        <div
          className="flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 border border-[#2a2a2a] hover:border-[#3a3a3a] px-3 py-1.5 rounded-md transition-all"
              aria-label={`${project.title} GitHub repository`}
            >
              <GithubIcon size={12} />
              GitHub
            </a>
          ) : null}
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/50 px-3 py-1.5 rounded-md transition-all"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink size={12} />
              Live Demo
            </a>
          ) : null}
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
          subtitle="Projects that demonstrate real skills across data analysis and frontend development. Click any card for the full breakdown."
        />

        {/* Two-column grid — single column on mobile */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
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
