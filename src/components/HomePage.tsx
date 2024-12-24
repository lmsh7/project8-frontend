import React from 'react';
import { Languages, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LanguageSelect } from './LanguageSelect';
import { languages } from '@/lib/languages';
import { Language, LanguagePair } from '@/lib/types';

interface HomePageProps {
  onStart: (languagePair: LanguagePair) => void;
}

export function HomePage({ onStart }: HomePageProps) {
  const [languageA, setLanguageA] = React.useState<Language>();
  const [languageB, setLanguageB] = React.useState<Language>();

  const canStart = languageA && languageB && languageA.code !== languageB.code;

  const handleStart = () => {
    if (canStart) {
      onStart({ languageA, languageB });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <Card className="w-full max-w-lg p-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Languages className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Translation Chat</h1>
          <p className="text-gray-500">Select languages for both participants</p>
        </div>

        <div className="space-y-6">
          <LanguageSelect
            languages={languages}
            value={languageA}
            onChange={setLanguageA}
            label="First participant's language"
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">and</span>
            </div>
          </div>

          <LanguageSelect
            languages={languages}
            value={languageB}
            onChange={setLanguageB}
            label="Second participant's language"
          />
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={handleStart}
          disabled={!canStart}
        >
          Start Chat
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        {languageA && languageB && languageA.code === languageB.code && (
          <p className="text-sm text-red-500 text-center">
            Please select different languages for each participant
          </p>
        )}
      </Card>
    </div>
  );
}