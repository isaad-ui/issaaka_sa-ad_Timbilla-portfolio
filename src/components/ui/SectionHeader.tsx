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
        <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">
          {label}
        </span>
      )}
      <h2 className="text-3xl font-semibold text-gray-100 tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-gray-400 text-base max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};
