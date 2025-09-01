import React from 'react';
import { Avatar } from './Avatar';

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-start space-x-3 opacity-0 animate-fade-in">
      <Avatar type="ai" />
      <div className="flex items-center space-x-3 px-6 py-4 bg-white/90 dark:bg-gray-800/90 
                      backdrop-blur-xl rounded-2xl rounded-bl-md border border-white/20 
                      dark:border-gray-700/50 shadow-xl">
        {/* Animated Dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
        </div>
        
        {/* Loading Text */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            IA en réflexion
          </span>
          <div className="flex space-x-0.5">
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse [animation-delay:0s]"></div>
            <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
            <div className="w-1 h-1 bg-pink-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
          </div>
        </div>
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent
                        animate-shimmer opacity-30"></div>
      </div>
    </div>
  );
};