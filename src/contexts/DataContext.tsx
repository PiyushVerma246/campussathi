import React, { createContext, useContext, useState, useEffect } from 'react';

export interface InstitutionalData {
  id: string;
  title: string;
  content: string;
  type: 'circular' | 'notice' | 'faq';
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  userId?: string;
}

interface DataContextType {
  institutionalData: InstitutionalData[];
  chatMessages: ChatMessage[];
  addInstitutionalData: (data: Omit<InstitutionalData, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateInstitutionalData: (id: string, data: Partial<InstitutionalData>) => void;
  deleteInstitutionalData: (id: string) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  searchInstitutionalData: (query: string) => string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [institutionalData, setInstitutionalData] = useState<InstitutionalData[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('institutional_data');
    const savedMessages = localStorage.getItem('chat_messages');
    
    if (savedData) {
      setInstitutionalData(JSON.parse(savedData));
    } else {
      // Initialize with some sample data
      const sampleData: InstitutionalData[] = [
        {
          id: '1',
          title: 'Office Hours',
          content: 'Our office hours are Monday through Friday, 9:00 AM to 5:00 PM. We are closed on weekends and public holidays.',
          type: 'notice',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'How to Apply for Leave',
          content: 'To apply for leave, please fill out the leave application form available on the portal and submit it to your supervisor at least 3 days in advance.',
          type: 'faq',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'New Policy Update',
          content: 'Effective immediately, all employees must complete the mandatory training module within 30 days of enrollment.',
          type: 'circular',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setInstitutionalData(sampleData);
      localStorage.setItem('institutional_data', JSON.stringify(sampleData));
    }
    
    if (savedMessages) {
      setChatMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('institutional_data', JSON.stringify(institutionalData));
  }, [institutionalData]);

  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const addInstitutionalData = (data: Omit<InstitutionalData, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newData: InstitutionalData = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setInstitutionalData(prev => [...prev, newData]);
  };

  const updateInstitutionalData = (id: string, data: Partial<InstitutionalData>) => {
    setInstitutionalData(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, ...data, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const deleteInstitutionalData = (id: string) => {
    setInstitutionalData(prev => prev.filter(item => item.id !== id));
  };

  const addChatMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const searchInstitutionalData = (query: string): string | null => {
    const lowerQuery = query.toLowerCase();
    
    // Search through all institutional data
    for (const item of institutionalData) {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const contentMatch = item.content.toLowerCase().includes(lowerQuery);
      
      if (titleMatch || contentMatch) {
        return `Based on our ${item.type}: ${item.title}\n\n${item.content}`;
      }
    }
    
    // If no match found
    return null;
  };

  return (
    <DataContext.Provider value={{
      institutionalData,
      chatMessages,
      addInstitutionalData,
      updateInstitutionalData,
      deleteInstitutionalData,
      addChatMessage,
      searchInstitutionalData,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};