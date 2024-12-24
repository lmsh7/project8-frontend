import React from 'react';
import { Globe2 } from 'lucide-react';

interface LanguageHeaderProps {
  language: string;
  color: string;
}

export const LanguageHeader: React.FC<LanguageHeaderProps> = ({ language, color }) => (
  <div className={`bg-${color}-50 p-2 flex items-center gap-2`}>
    <Globe2 className={`h-4 w-4 text-${color}-600`} />
    <span className={`text-sm font-medium text-${color}-600`}>{language}</span>
  </div>
);