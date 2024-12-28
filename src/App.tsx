import React, { useState } from 'react';
import { Message, ChatState } from './types/chat';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { MessageSquare } from 'lucide-react';

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
  });

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      isLoading: true,
    }));

    // TODO: Implement AI response logic with OpenAI API
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: '申し訳ありませんが、現在APIキーが設定されていないため、応答できません。',
        role: 'assistant',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, aiResponse],
        isLoading: false,
      }));
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center gap-2 px-4 py-3 bg-white border-b">
        <MessageSquare className="h-6 w-6 text-blue-500" />
        <h1 className="text-xl font-semibold">AI Chat</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatState.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageSquare className="h-12 w-12 mb-2" />
            <p>メッセージを送信してチャットを開始しましょう</p>
          </div>
        ) : (
          chatState.messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
      </main>

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={chatState.isLoading}
      />
    </div>
  );
}

export default App;