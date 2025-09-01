import React from 'react';

export const BackgroundEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Primary Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 
                      dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20
                      animate-gradient-shift"></div>
      
      {/* Secondary Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/30 to-purple-100/30
                      dark:from-transparent dark:via-blue-800/10 dark:to-purple-800/10
                      animate-gradient-shift-reverse"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute rounded-full animate-float opacity-20 dark:opacity-30
              ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-pink-400'}
              ${i % 4 === 0 ? 'w-1 h-1' : i % 4 === 1 ? 'w-2 h-2' : i % 4 === 2 ? 'w-1.5 h-1.5' : 'w-0.5 h-0.5'}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>
      
      {/* Mesh Gradient Overlays */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-blue-500/10 via-transparent to-transparent
                      dark:from-blue-400/20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-purple-500/10 via-transparent to-transparent
                      dark:from-purple-400/20 animate-pulse-slow [animation-delay:2s]"></div>
      
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
           }}
      ></div>
    </div>
  );
};