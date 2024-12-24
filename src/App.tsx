import { useState } from 'react';
import { HomePage } from '@/components/HomePage';
import { TranslationChat } from '@/components/TranslationChat';
import { LanguagePair } from '@/lib/types';

function App() {
  const [languagePair, setLanguagePair] = useState<LanguagePair>();

  return languagePair ? (
    <TranslationChat languagePair={languagePair} />
  ) : (
    <HomePage onStart={setLanguagePair} />
  );
}

export default App;