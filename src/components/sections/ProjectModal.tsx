import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import type { Project } from '../../types';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white border border-neutral-200 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto animate-fade-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 flex items-start justify-between gap-4 rounded-t-2xl">
          <div>
            <Tag variant="category" className="mb-2">{project.category}</Tag>
            <h2 className="text-xl font-bold text-neutral-900">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors p-1.5 rounded-lg mt-1 flex-shrink-0"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {[
            { label: 'The Problem', content: project.problem },
            { label: 'The Solution', content: project.solution },
          ].map(({ label, content }) => (
            <div key={label}>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{label}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{content}</p>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Key Features</h3>
            <ul className="space-y-2">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-600">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>

          {[
            { label: 'Challenges', content: project.challenges },
            { label: 'What I Learned', content: project.learned },
          ].map(({ label, content }) => (
            <div key={label}>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{label}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{content}</p>
            </div>
          ))}

          <div className="flex flex-wrap gap-3 pt-2 border-t border-neutral-100">
            {project.githubUrl && (
              <Button href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="outline">
                <GithubIcon size={14} />
                GitHub
              </Button>
            )}
            {project.demoUrl && (
              <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} />
                Live Demo
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
