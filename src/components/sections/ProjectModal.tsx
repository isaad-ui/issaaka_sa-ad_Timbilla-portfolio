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
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-[#111111] border border-[#1e1e1e] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#111111] border-b border-[#1e1e1e] px-6 py-4 flex items-start justify-between gap-4 rounded-t-2xl">
          <div>
            <Tag variant="category" className="mb-2">{project.category}</Tag>
            <h2 className="text-xl font-semibold text-gray-100">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-200 transition-colors p-1 mt-1 flex-shrink-0"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          <div>
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">The Problem</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{project.problem}</p>
          </div>

          <div>
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">The Solution</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{project.solution}</p>
          </div>

          <div>
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Key Features</h3>
            <ul className="space-y-2">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="mt-2 w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Challenges</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{project.challenges}</p>
          </div>

          <div>
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">What I Learned</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{project.learned}</p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2 border-t border-[#1e1e1e]">
            {project.githubUrl ? (
              <Button href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="outline">
                <GithubIcon size={14} />
                GitHub
              </Button>
            ) : null}
            {project.demoUrl ? (
              <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} />
                Live Demo
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
