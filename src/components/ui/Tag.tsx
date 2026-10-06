import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'learning' | 'category';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 text-xs px-2.5 py-1 rounded-md',
    learning:
      'bg-transparent border border-[#404040] text-gray-500 text-xs px-2.5 py-1 rounded-md',
    category:
      'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs px-2.5 py-1 rounded-md font-medium',
  };

  return <span className={`inline-block ${variants[variant]} ${className}`}>{children}</span>;
};
