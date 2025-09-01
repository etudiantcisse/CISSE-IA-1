import React, { useState } from 'react';
import { Plus, MessageSquare, Trash2, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import type { Conversation } from '../types/chat';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Overlay pour mobile */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onToggleCollapse}
        />
      )}
      
      <div className={`
        relative h-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/30
        transition-all duration-300 ease-in-out flex flex-col z-50
        ${isCollapsed ? 'w-0 md:w-16' : 'w-80 fixed md:relative inset-y-0 left-0'}
      `}>
      {/* Header */}
      <div className="p-4 border-b border-white/10 dark:border-gray-700/30">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Discussions
            </h2>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30
                       transition-all duration-200 hover:scale-110 active:scale-95"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        
        {!isCollapsed && (
          <button
            onClick={onNewConversation}
            className="w-full mt-4 flex items-center justify-center space-x-2 p-3 rounded-xl
                       bg-gradient-to-r from-blue-500 to-purple-600 text-white
                       hover:from-blue-600 hover:to-purple-700 transition-all duration-300
                       hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Nouvelle discussion</span>
          </button>
        )}
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 dark:bg-black/20 
                         border border-white/20 dark:border-gray-700/30 text-gray-800 dark:text-white
                         placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none
                         focus:border-blue-500 dark:focus:border-purple-500 transition-colors duration-200"
            />
          </div>
        </div>
      )}

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {isCollapsed ? (
          <button
            onClick={onNewConversation}
            className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600
                       hover:from-blue-600 hover:to-purple-700 transition-all duration-300
                       hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`
                group relative p-3 rounded-lg cursor-pointer transition-all duration-200
                hover:bg-white/10 dark:hover:bg-black/20 hover:scale-[1.02]
                ${activeConversationId === conversation.id 
                  ? 'bg-blue-500/20 dark:bg-purple-500/20 border border-blue-500/30 dark:border-purple-500/30' 
                  : 'hover:shadow-lg'
                }
              `}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="flex items-start space-x-3">
                <MessageSquare className={`
                  w-5 h-5 mt-0.5 transition-colors duration-200
                  ${activeConversationId === conversation.id 
                    ? 'text-blue-600 dark:text-purple-400' 
                    : 'text-gray-500 dark:text-gray-400'
                  }
                `} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    {conversation.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {conversation.updatedAt.toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conversation.id);
                }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded
                           hover:bg-red-500/20 text-red-500 transition-all duration-200
                           hover:scale-110 active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};