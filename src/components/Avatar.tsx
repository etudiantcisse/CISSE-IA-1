import React from 'react';
import { Bot, User } from 'lucide-react';

interface AvatarProps {
  type: 'user' | 'ai';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ type, className = '' }) => {
  const isAI = type === 'ai';
  
  return (
    <div 
      className={`
        relative flex items-center justify-center w-10 h-10 rounded-full
        transition-all duration-300 hover:scale-110 hover:rotate-6
        ${isAI 
          ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5' 
          : 'bg-gradient-to-br from-emerald-400 to-cyan-400 p-0.5'
        }
        ${className}
      `}
    >
      <div className={`
        flex items-center justify-center w-full h-full rounded-full
        ${isAI ? 'bg-gray-900 dark:bg-white' : 'bg-white dark:bg-gray-800'}
      `}>
        {isAI ? (
          <Bot className={`w-5 h-5 ${isAI ? 'text-white dark:text-gray-900' : 'text-gray-700 dark:text-white'}`} />
        ) : (
          <User className={`w-5 h-5 ${isAI ? 'text-white dark:text-gray-900' : 'text-gray-700 dark:text-white'}`} />
        )}
      </div>
      
      {/* Pulse effect for AI */}
      {isAI && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 
                        animate-pulse opacity-30 scale-110"></div>
      )}
    </div>
  );
};