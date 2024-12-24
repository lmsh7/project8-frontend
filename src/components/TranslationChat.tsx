import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ChatInput } from './ChatInput';
import { LanguageHeader } from './LanguageHeader';
import { MessageList } from './MessageList';
import { Message, LanguagePair } from '@/lib/types';
import { SpeechRecognitionService } from '@/lib/speech';

interface TranslationChatProps {
  languagePair: LanguagePair;
}

export const TranslationChat: React.FC<TranslationChatProps> = ({ languagePair }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeSpeaker, setActiveSpeaker] = useState<'A' | 'B'>('A');
  const [isListening, setIsListening] = useState(false);

  const speechA = new SpeechRecognitionService({
    lang: languagePair.languageA.code,
    continuous: false,
    interimResults: false,
  });

  const speechB = new SpeechRecognitionService({
    lang: languagePair.languageB.code,
    continuous: false,
    interimResults: false,
  });

  const handleSpeechResult = (transcript: string) => {
    setNewMessage(transcript);
    setIsListening(false);
  };

  const handleSpeechError = () => setIsListening(false);
  const handleSpeechEnd = () => setIsListening(false);

  const startListening = () => {
    setIsListening(true);
    const speech = activeSpeaker === 'A' ? speechA : speechB;
    speech.start(handleSpeechResult, handleSpeechError, handleSpeechEnd);
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      // In a real app, you would call a translation API here
      const mockTranslation = newMessage; // Placeholder for translation
      setMessages([...messages, {
        id: messages.length + 1,
        text: newMessage,
        translation: mockTranslation,
        sender: activeSpeaker
      }]);
      setNewMessage('');
      setActiveSpeaker(activeSpeaker === 'A' ? 'B' : 'A');
    }
  };

  return (
    <Card className="overflow-hidden bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="h-[80vh] flex flex-col">
        {/* Top half - Person A's view */}
        <div className={`border-b transition-all duration-300 ${activeSpeaker === 'A' ? 'flex-[3]' : 'flex-1'}`}>
          <div className="h-full flex flex-col">
            <LanguageHeader 
              language={`${languagePair.languageA.name} (${languagePair.languageA.localName})`} 
              color="blue" 
            />
            <MessageList messages={messages} activeSpeaker={activeSpeaker} />
            {activeSpeaker === 'A' && (
              <ChatInput
                value={newMessage}
                onChange={setNewMessage}
                onSend={handleSend}
                onStartListening={startListening}
                isListening={isListening}
                placeholder={`Type your message in ${languagePair.languageA.name}...`}
                micTitle="Voice input"
                sendText="Send"
              />
            )}
          </div>
        </div>

        {/* Bottom half - Person B's view (rotated 180 degrees) */}
        <div className={`rotate-180 transition-all duration-300 ${activeSpeaker === 'B' ? 'flex-[3]' : 'flex-1'}`}>
          <div className="h-full flex flex-col">
            <LanguageHeader 
              language={`${languagePair.languageB.name} (${languagePair.languageB.localName})`} 
              color="green" 
            />
            <MessageList messages={messages} activeSpeaker={activeSpeaker} showTranslation />
            {activeSpeaker === 'B' && (
              <ChatInput
                value={newMessage}
                onChange={setNewMessage}
                onSend={handleSend}
                onStartListening={startListening}
                isListening={isListening}
                placeholder={`Type your message in ${languagePair.languageB.name}...`}
                micTitle="Voice input"
                sendText="Send"
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};