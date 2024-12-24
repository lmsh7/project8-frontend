import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onStartListening: () => void;
  isListening: boolean;
  placeholder: string;
  micTitle: string;
  sendText: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  onStartListening,
  isListening,
  placeholder,
  micTitle,
  sendText,
}) => (
  <div className="p-4 flex gap-2 bg-gray-50">
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="flex-1"
      onKeyDown={(e) => e.key === 'Enter' && onSend()}
    />
    <Button 
      onClick={onStartListening}
      variant={isListening ? "destructive" : "secondary"}
      className="w-12"
      title={micTitle}
    >
      <Mic className={`h-5 w-5 ${isListening ? 'animate-pulse' : ''}`} />
    </Button>
    <Button onClick={onSend}>{sendText}</Button>
  </div>
);