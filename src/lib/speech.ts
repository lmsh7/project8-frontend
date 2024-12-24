import { SpeechRecognitionConfig } from './types';

export class SpeechRecognitionService {
  private recognition: any;
  
  constructor(config: SpeechRecognitionConfig) {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.lang = config.lang;
      this.recognition.continuous = config.continuous;
      this.recognition.interimResults = config.interimResults;
    }
  }

  start(
    onResult: (transcript: string) => void,
    onError: () => void,
    onEnd: () => void
  ) {
    if (!this.recognition) return;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    this.recognition.onerror = onError;
    this.recognition.onend = onEnd;

    this.recognition.start();
  }

  stop() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}