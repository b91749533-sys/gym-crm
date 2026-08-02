import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, glow = false }) => {
  return (
    <div
      className={clsx(
        'bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-xl transition-all duration-200',
        glow && 'glow-card',
        className
      )}
    >
      {children}
    </div>
  );
};
