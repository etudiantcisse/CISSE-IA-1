import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

interface MessageInputProps {
  onSendMessage: (message: string, image?: File) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  isLoading, 
  disabled = false 
}) => {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const [isFocused, setIsFocused] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Maintenir le focus après l'envoi d'un message
  useEffect(() => {
    if (!isLoading && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || selectedImage) && !isLoading && !disabled) {
      onSendMessage(message.trim(), selectedImage);
      setMessage('');
      setSelectedImage(undefined);
      setShowImageUpload(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  const canSend = (message.trim() || selectedImage) && !isLoading && !disabled;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      {/* Image Preview */}
      {showImageUpload && (
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 dark:bg-black/10 
                        border border-white/10 dark:border-gray-700/30">
          <ImageUpload
            onImageSelect={setSelectedImage}
            selectedImage={selectedImage}
            onRemoveImage={() => setSelectedImage(undefined)}
          />
          {selectedImage && (
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {selectedImage.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>
      )}

      {/* Input Area */}
      <div className={`
        relative flex items-end space-x-3 p-4 rounded-2xl 
        bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border
        transition-all duration-300 hover:shadow-2xl
        ${isFocused 
          ? 'border-blue-500 dark:border-purple-500 shadow-lg shadow-blue-500/20 dark:shadow-purple-500/20 scale-[1.02]' 
          : 'border-white/20 dark:border-gray-700/50 hover:border-white/30 dark:hover:border-gray-600/50'
        }
      `}>
        {/* Attachment Button */}
        <button
          type="button"
          onClick={() => setShowImageUpload(!showImageUpload)}
          className={`
            p-2 rounded-full transition-all duration-200 hover:scale-110 active:scale-95
            ${showImageUpload 
              ? 'bg-blue-500 dark:bg-purple-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }
          `}
          aria-label="Joindre une image"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        {/* Text Input */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            adjustTextareaHeight();
          }}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isLoading || disabled}
          placeholder="Écrivez votre message..."
          rows={1}
          className="flex-1 bg-transparent text-gray-800 dark:text-white placeholder-gray-500 
                     dark:placeholder-gray-400 border-none outline-none text-sm resize-none
                     leading-relaxed py-2"
          style={{ minHeight: '24px', maxHeight: '120px' }}
        />
        
        {/* Send Button */}
        <button
          type="submit"
          disabled={!canSend}
          className={`
            group relative p-3 rounded-full transition-all duration-300
            transform hover:scale-110 active:scale-95
            ${canSend
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }
          `}
          aria-label="Envoyer le message"
        >
          <Send className={`w-5 h-5 transition-transform duration-200 ${
            canSend ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5' : ''
          }`} />
          
          {canSend && (
            <>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 
                              opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              {isLoading && (
                <div className="absolute inset-0 rounded-full border-2 border-white/30 border-t-white 
                                animate-spin"></div>
              )}
            </>
          )}
        </button>
      </div>
    </form>
  );
};