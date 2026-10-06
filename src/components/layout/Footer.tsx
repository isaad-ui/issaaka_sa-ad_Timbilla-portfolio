import React from 'react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Issaka Sa-ad Timbilla. Built with React &amp; TypeScript.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/isaad-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-300 transition-colors"
            aria-label="GitHub profile"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://linkedin.com/in/issaka-sa-ad-timbilla"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-300 transition-colors"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};
