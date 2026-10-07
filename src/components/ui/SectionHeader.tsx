import React from 'react';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  subtitle,
  align = 'left',
}) => {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-3 mb-14 ${alignClass}`}>
      {label && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-indigo-600">
          <span className="w-5 h-px bg-indigo-500 rounded-full" aria-hidden="true" />
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-neutral-500 text-base max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};
