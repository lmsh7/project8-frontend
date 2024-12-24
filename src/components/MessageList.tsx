import React from 'react';
import { Message } from '@/lib/types';

interface MessageListProps {
  messages: Message[];
  activeSpeaker: 'A' | 'B';
  showTranslation?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  activeSpeaker,
  showTranslation = false,
}) => (
  <div className="flex-1 overflow-y-auto p-4">
    {messages.map(msg => (
      <div key={msg.id} className={`mb-2 ${activeSpeaker === msg.sender ? 'text-lg' : 'text-base'}`}>
        <div className={`font-bold ${msg.sender === 'A' ? 'text-blue-600' : 'text-green-600'}`}>
          {msg.sender}:
        </div>
        <div>{showTranslation ? msg.translation : msg.text}</div>
      </div>
    ))}
  </div>
);