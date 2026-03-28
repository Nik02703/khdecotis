'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('khd_messages');
    if (stored) {
      setMessages(JSON.parse(stored));
    }
    setIsMounted(true);
  }, []);

  const addMessage = (msgParams) => {
    const newMessage = {
      ...msgParams,
      id: `msg_${Date.now()}`,
      date: new Date().toISOString(),
      status: 'unread'
    };
    
    setMessages(prev => {
      const updated = [newMessage, ...prev];
      localStorage.setItem('khd_messages', JSON.stringify(updated));
      return updated;
    });
    return newMessage;
  };

  const markAsRead = (id) => {
    setMessages(prev => {
      const updated = prev.map(msg => msg.id === id ? { ...msg, status: 'read' } : msg);
      localStorage.setItem('khd_messages', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteMessage = (id) => {
    setMessages(prev => {
      const updated = prev.filter(msg => msg.id !== id);
      localStorage.setItem('khd_messages', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <MessageContext.Provider value={{ messages, isMounted, addMessage, markAsRead, deleteMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) throw new Error("useMessages must be used within MessageProvider");
  return context;
};
