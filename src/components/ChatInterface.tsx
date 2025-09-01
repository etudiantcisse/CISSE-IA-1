import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { ChatHeader } from './ChatHeader';
import { SettingsPanel } from './SettingsPanel';
import { useState } from 'react';
import { EmptyState } from './EmptyState';
import { LoadingIndicator } from './LoadingIndicator';

export interface ChatInterfaceProps {
  messages: any[];
  isLoading: boolean;
  onSendMessage: (message: string, image?: File) => void;
  hasActiveConversation: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onResetConversations?: () => void;
  onNewConversation?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
  onSendMessage,
  hasActiveConversation,
  theme,
  onToggleTheme,
  onResetConversations,
  onNewConversation,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const [settingsOpen, setSettingsOpen] = useState(false);
  if (!hasActiveConversation) {
  return <EmptyState onNewConversation={onNewConversation} />;
  }

  return (
    <div className="flex flex-col h-full">
  <ChatHeader onOpenSettings={() => setSettingsOpen(true)} />
      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onToggleTheme={onToggleTheme}
        theme={theme}
        onResetConversations={onResetConversations}
      />
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4 opacity-0 animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
                              flex items-center justify-center shadow-lg">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Commencez une nouvelle conversation
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Posez une question ou partagez une image pour commencer
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <MessageBubble 
                key={message.id} 
                message={message} 
                isLatest={index === messages.length - 1}
              />
            ))}
            
            {isLoading && <LoadingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input Area */}
      <div className="p-6 border-t border-white/10 dark:border-gray-700/50 
                      bg-white/5 dark:bg-black/10 backdrop-blur-xl">
        <MessageInput 
          onSendMessage={onSendMessage} 
          isLoading={isLoading}
          disabled={!hasActiveConversation}
        />
      </div>
    </div>
  );
};
