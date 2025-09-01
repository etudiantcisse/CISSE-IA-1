import React from 'react';
import { Bot, Circle, Settings, MoreVertical, Menu } from 'lucide-react';

export interface ChatHeaderProps {
  conversationTitle?: string;
  onOpenSettings?: () => void;
  isMobile?: boolean;
  onToggleSidebar?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  conversationTitle, 
  onOpenSettings, 
  isMobile = false, 
  onToggleSidebar 
}) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 dark:border-gray-700/50 
                    backdrop-blur-xl bg-white/5 dark:bg-black/10">
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Bouton menu pour mobile */}
        {isMobile && onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 
                       transition-all duration-200 hover:scale-110 active:scale-95 md:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}
        
        <div className="relative group">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5
                          group-hover:scale-110 transition-transform duration-300">
            <div className="flex items-center justify-center w-full h-full rounded-full 
                           bg-gray-900 dark:bg-white">
              <Bot className="w-5 h-5 md:w-6 md:h-6 text-white dark:text-gray-900" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1">
            <Circle className="w-3 h-3 md:w-4 md:h-4 text-green-500 fill-current animate-pulse" />
          </div>
          {/* Pulse Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 dark:border-purple-500/30 
                          animate-ping opacity-20"></div>
        </div>
        <div>
          <h1 className="text-base md:text-lg font-semibold text-gray-800 dark:text-white">
            {conversationTitle || 'CISSE IA'}
          </h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
            <Circle className="w-2 h-2 text-green-500 fill-current animate-pulse" />
            <span>En ligne • Prêt à vous aider</span>
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          className="p-2 rounded-lg bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200 hover:scale-110 active:scale-95"
          onClick={onOpenSettings}
          aria-label="Ouvrir les paramètres"
        >
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-2 rounded-lg bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200 hover:scale-110 active:scale-95">
          <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};