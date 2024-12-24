import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ChatInput } from './ChatInput';
import { LanguageHeader } from './LanguageHeader';
import { MessageList } from './MessageList';
import { Message } from '@/lib/types';
import { SpeechRecognitionService } from '@/lib/speech';

const englishSpeech = new SpeechRecognitionService({
  lang: 'en-US',
  continuous: false,
  interimResults: false,
});

const chineseSpeech = new SpeechRecognitionService({
  lang: 'zh-CN',
  continuous: false,
  interimResults: false,
});

export const TranslationChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'I like cat', translation: '我喜欢猫', sender: 'A' },
    { id: 2, text: 'Yes me too', translation: '我也是', sender: 'B' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [activeSpeaker, setActiveSpeaker] = useState<'A' | 'B'>('A');
  const [isListening, setIsListening] = useState(false);

  const handleSpeechResult = (transcript: string) => {
    setNewMessage(transcript);
    setIsListening(false);
  };

  const handleSpeechError = () => setIsListening(false);
  const handleSpeechEnd = () => setIsListening(false);

  const startListening = () => {
    setIsListening(true);
    const speech = activeSpeaker === 'A' ? englishSpeech : chineseSpeech;
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
            <LanguageHeader language="English" color="blue" />
            <MessageList messages={messages} activeSpeaker={activeSpeaker} />
            {activeSpeaker === 'A' && (
              <ChatInput
                value={newMessage}
                onChange={setNewMessage}
                onSend={handleSend}
                onStartListening={startListening}
                isListening={isListening}
                placeholder="Type your message..."
                micTitle="Voice input"
                sendText="Send"
              />
            )}
          </div>
        </div>

        {/* Bottom half - Person B's view (rotated 180 degrees) */}
        <div className={`rotate-180 transition-all duration-300 ${activeSpeaker === 'B' ? 'flex-[3]' : 'flex-1'}`}>
          <div className="h-full flex flex-col">
            <LanguageHeader language="中文" color="green" />
            <MessageList messages={messages} activeSpeaker={activeSpeaker} showTranslation />
            {activeSpeaker === 'B' && (
              <ChatInput
                value={newMessage}
                onChange={setNewMessage}
                onSend={handleSend}
                onStartListening={startListening}
                isListening={isListening}
                placeholder="输入消息..."
                micTitle="语音输入"
                sendText="发送"
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};