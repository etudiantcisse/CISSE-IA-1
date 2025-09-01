import React from 'react';
import { MessageCircle, Sparkles, Image, Zap } from 'lucide-react';

interface EmptyStateProps {
  onNewConversation?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onNewConversation }) => {
  const features = [
    {
      icon: MessageCircle,
      title: 'Conversations intelligentes',
      description: 'Discutez naturellement avec une IA avancée'
    },
    {
      icon: Image,
      title: 'Partage d\'images',
      description: 'Analysez et discutez de vos images'
    },
    {
      icon: Sparkles,
      title: 'Réponses créatives',
      description: 'Obtenez des réponses détaillées et créatives'
    },
    {
      icon: Zap,
      title: 'Réponses rapides',
      description: 'Interface optimisée pour une expérience fluide'
    }
  ];

  return (
    <div className="flex items-center justify-center h-full p-4 md:p-8">
      <div className="max-w-2xl mx-auto text-center space-y-6 md:space-y-8 opacity-0 animate-fade-in">
        {/* Hero Section */}
        <div className="space-y-3 md:space-y-4">
          <div className="relative mx-auto w-16 h-16 md:w-24 md:h-24">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 
                            animate-pulse-glow"></div>
            <div className="relative w-full h-full rounded-full bg-white dark:bg-gray-900 
                            flex items-center justify-center border-4 border-white dark:border-gray-800">
              <span className="text-2xl md:text-3xl">🤖</span>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                         bg-clip-text text-transparent">
            Assistant IA Avancé
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed px-2">
            Votre compagnon intelligent pour des conversations enrichissantes et créatives
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12 px-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-4 md:p-6 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md
                         border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-black/30
                         transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="p-2 md:p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
                                group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1 text-sm md:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-6 md:pt-8">
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm md:text-base px-2">
            Sélectionnez une discussion existante ou créez-en une nouvelle pour commencer
          </p>
          
          {onNewConversation && (
            <button
              onClick={onNewConversation}
              className="inline-flex items-center space-x-2 px-6 py-3 md:px-8 md:py-4 rounded-xl
                         bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium
                         hover:from-blue-600 hover:to-purple-700 transition-all duration-300
                         hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 active:scale-95
                         transform touch-target"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Commencer une discussion</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};