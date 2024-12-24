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