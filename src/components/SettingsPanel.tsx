import React from 'react';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  theme: 'light' | 'dark';
  onResetConversations?: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ open, onClose, onToggleTheme, theme, onResetConversations }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-sm relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-xl font-bold"
          onClick={onClose}
          aria-label="Fermer les paramètres"
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">Paramètres</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-200">Mode sombre</span>
            <button
              onClick={onToggleTheme}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {theme === 'dark' ? 'Actif' : 'Inactif'}
            </button>
          </div>
          {onResetConversations && (
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-200">Réinitialiser les conversations</span>
              <button
                onClick={onResetConversations}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors duration-200"
              >
                Réinitialiser
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
