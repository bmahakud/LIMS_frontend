import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
  className = ''
}) => {
  return (
    <div className={`space-y-3 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      {/* Eyebrow with industrial accent line */}
      <div className={`inline-flex items-center space-x-2.5 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className={`w-6 h-[2px] block ${dark ? 'bg-industrial-orange' : 'bg-industrial-darkOrange'}`}></span>
        <span className={`text-xs font-mono font-bold tracking-widest uppercase ${
          dark ? 'text-industrial-orange' : 'text-industrial-darkOrange'
        }`}>
          {eyebrow}
        </span>
      </div>

      {/* Main Headline */}
      <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
        dark ? 'text-white' : 'text-charcoal'
      }`}>
        {title}
      </h2>

      {/* Narrative Description */}
      {description && (
        <p className={`text-sm sm:text-base leading-relaxed font-light ${
          dark ? 'text-charcoal-200' : 'text-charcoal-700'
        }`}>
          {description}
        </p>
      )}
    </div>
  );
};
