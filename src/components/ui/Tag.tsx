import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'learning' | 'category';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default:
      'bg-neutral-100 border border-neutral-200 text-neutral-600 text-xs px-2.5 py-1 rounded-md font-medium',
    learning:
      'bg-white border border-dashed border-neutral-300 text-neutral-400 text-xs px-2.5 py-1 rounded-md font-medium',
    category:
      'bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs px-2.5 py-1 rounded-md font-semibold',
  };

  return <span className={`inline-block ${variants[variant]} ${className}`}>{children}</span>;
};
