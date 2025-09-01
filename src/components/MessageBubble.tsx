import React, { useState } from 'react';
import { memo } from 'react';
import { Avatar } from './Avatar';
import { Copy, Check, Download } from 'lucide-react';
import type { Message } from '../types/chat';

interface MessageBubbleProps {
  message: Message;
  isLatest?: boolean;
}

const MessageBubbleComponent: React.FC<MessageBubbleProps> = ({ message, isLatest = false }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageDownload = () => {
    if (message.imageUrl) {
      const link = document.createElement('a');
      link.href = message.imageUrl;
      link.download = `image-${message.id}.jpg`;
      link.click();
    }
  };

  return (
    <div 
      className={`
        flex items-start space-x-2 md:space-x-3 group opacity-0 animate-fade-in
        ${isUser ? 'flex-row-reverse space-x-reverse md:space-x-reverse' : ''}
        ${isLatest ? 'animate-slide-up' : ''}
      `}
    >
      <Avatar type={message.sender} />
      
      <div className={`
        max-w-[85%] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg relative
        transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
      `}>
        {/* Message Content */}
        <div className={`
          px-3 py-2 md:px-4 md:py-3 rounded-2xl backdrop-blur-xl border shadow-xl
          ${isUser 
            ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white border-blue-400/20 rounded-br-md' 
            : 'bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white border-white/20 dark:border-gray-700/50 rounded-bl-md'
          }
        `}>
          {/* Image */}
          {message.imageUrl && (
            <div className="mb-3 relative group/image">
              <img
                src={message.imageUrl}
                alt="Image partagée"
                className="max-w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ maxHeight: '300px' }}
              />
              <button
                onClick={handleImageDownload}
                className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white
                           opacity-0 group-hover/image:opacity-100 transition-all duration-200
                           hover:bg-black/70 hover:scale-110 active:scale-95"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {/* Text Content */}
          {message.content && (
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          )}
        </div>

        {/* Message Actions */}
        <div className={`
          flex items-center justify-between mt-2 px-2 opacity-0 group-hover:opacity-100 
          transition-all duration-200 transform translate-y-2 group-hover:translate-y-0
        `}>
          <div className={`
            text-xs opacity-70
            ${isUser ? 'text-blue-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}
          `}>
            {message.timestamp.toLocaleTimeString('fr-FR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          
          <button
            onClick={handleCopy}
            className={`
              flex items-center space-x-1 px-2 py-1 rounded-md text-xs
              transition-all duration-200 hover:scale-105 active:scale-95
              ${isUser 
                ? 'bg-blue-500/20 text-blue-100 hover:bg-blue-500/30' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copié' : 'Copier'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export const MessageBubble = memo(MessageBubbleComponent);