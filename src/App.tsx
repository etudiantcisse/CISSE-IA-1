import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { ThemeToggle } from './components/ThemeToggle';
import { BackgroundEffect } from './components/BackgroundEffect';
import { useTheme } from './hooks/useTheme';
import { useChat } from './hooks/useChat';

function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    conversations,
    activeConversation,
    activeConversationId,
    isLoading,
    createNewConversation,
    selectConversation,
    deleteConversation,
    sendMessage,
  } = useChat();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Reset conversations handler
  const handleResetConversations = () => {
    window.location.reload(); // Simple reset for demo
  };

  // Create initial conversation on first load
  useEffect(() => {
    if (conversations.length === 0) {
      createNewConversation();
    }
  }, [conversations.length, createNewConversation]);

  return (
    <div className={`h-screen flex transition-colors duration-500 ${theme === 'dark' ? 'dark' : ''}`}>
      <BackgroundEffect />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <div className="relative z-10 flex w-full">
        {/* Sidebar */}
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onNewConversation={createNewConversation}
          onSelectConversation={selectConversation}
          onDeleteConversation={deleteConversation}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <ChatInterface
            messages={activeConversation?.messages || []}
            isLoading={isLoading}
            onSendMessage={sendMessage}
            hasActiveConversation={!!activeConversationId}
            theme={theme}
            onToggleTheme={toggleTheme}
            onResetConversations={handleResetConversations}
            onNewConversation={createNewConversation}
          />
        </div>
      </div>
    </div>
  );
}

export default App;