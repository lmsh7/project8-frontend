export interface Message {
  id: number;
  text: string;
  translation: string;
  sender: 'A' | 'B';
}

export interface SpeechRecognitionConfig {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
}

export interface Language {
  code: string;
  name: string;
  localName: string;
}

export interface LanguagePair {
  languageA: Language;
  languageB: Language;
}