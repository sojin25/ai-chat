import React from 'react';
import { format } from 'date-fns';
import { Bot, User } from 'lucide-react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-gray-200'
      }`}>
        {isUser ? (
          <User className="h-6 w-6 text-white" />
        ) : (
          <Bot className="h-6 w-6 text-gray-600" />
        )}
      </div>
      <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : ''}`}>
        <div className={`rounded-2xl px-4 py-2 ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
        }`}>
          <p className="text-sm">{message.content}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {format(message.timestamp, 'HH:mm')}
        </span>
      </div>
    </div>
  );
}