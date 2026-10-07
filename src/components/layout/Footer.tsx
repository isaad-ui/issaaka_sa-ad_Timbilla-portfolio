import React from 'react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-neutral-400 text-sm">
          © {new Date().getFullYear()} Issaka Sa-ad Timbilla. Built with React &amp; TypeScript.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/isaad-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-700 transition-colors"
            aria-label="GitHub profile"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://linkedin.com/in/issaka-sa-ad-timbilla"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-700 transition-colors"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};
