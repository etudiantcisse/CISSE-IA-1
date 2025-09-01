import { useState, useCallback } from 'react';
import type { Message, Conversation, ChatState } from '../types/chat';

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    conversations: [],
    activeConversationId: null,
    isLoading: false,
    error: null,
  });

  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'Nouvelle discussion',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setState(prev => ({
      ...prev,
      conversations: [newConversation, ...prev.conversations],
      activeConversationId: newConversation.id,
    }));

    return newConversation.id;
  }, []);

  const selectConversation = useCallback((conversationId: string) => {
    setState(prev => ({
      ...prev,
      activeConversationId: conversationId,
    }));
  }, []);

  const deleteConversation = useCallback((conversationId: string) => {
    setState(prev => {
      const updatedConversations = prev.conversations.filter(c => c.id !== conversationId);
      const newActiveId = prev.activeConversationId === conversationId 
        ? (updatedConversations[0]?.id || null)
        : prev.activeConversationId;

      return {
        ...prev,
        conversations: updatedConversations,
        activeConversationId: newActiveId,
      };
    });
  }, []);

  const sendMessage = useCallback(async (content: string, imageFile?: File) => {
    if (!state.activeConversationId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      imageFile,
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined,
    };

    // Add user message
    setState(prev => ({
      ...prev,
      conversations: prev.conversations.map(conv => 
        conv.id === state.activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, userMessage],
              title: conv.messages.length === 0 ? content.slice(0, 30) + '...' : conv.title,
              updatedAt: new Date(),
            }
          : conv
      ),
      isLoading: true,
    }));

    // Affichage instantané du loader et gestion d'erreur utilisateur
    try {
  const response = await fetch('https://cisse-ia-1.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });
      if (!response.ok) {
        throw new Error('Erreur réseau ou backend');
      }
      const data = await response.json();
      const botMessage: Message = {
        id: Date.now().toString() + '-bot',
        content: data.reply || 'Erreur de réponse du bot',
        sender: 'ai',
        timestamp: new Date(),
      };
      setState(prev => ({
        ...prev,
        conversations: prev.conversations.map(conv =>
          conv.id === state.activeConversationId
            ? {
                ...conv,
                messages: [...conv.messages, botMessage],
                updatedAt: new Date(),
              }
            : conv
        ),
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error?.message || 'Erreur lors de la connexion au backend',
      }));
    }
  }, [state.activeConversationId]);

  const activeConversation = state.conversations.find(c => c.id === state.activeConversationId);

  return {
    ...state,
    activeConversation,
    createNewConversation,
    selectConversation,
    deleteConversation,
    sendMessage,
  };
};