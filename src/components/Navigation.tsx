import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, MessageSquare, Shield, Globe } from 'lucide-react';
import { useState } from 'react';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const [language, setLanguage] = useState('EN');

  if (!user) return null;

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'ES' : 'EN');
  };

  return (
    <nav className="bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {user.role === 'admin' ? (
                <Shield className="h-6 w-6 text-primary" />
              ) : (
                <MessageSquare className="h-6 w-6 text-primary" />
              )}
              <h1 className="text-xl font-semibold text-foreground">
                Institutional Chatbot
              </h1>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm text-muted-foreground">
                {user.role === 'admin' ? 'Admin Dashboard' : 'User Portal'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span>{language}</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.username}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};