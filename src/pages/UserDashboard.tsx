import { useState, useRef, useEffect } from 'react';
import { useData, ChatMessage } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Upload, MessageSquare, Bot, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const UserDashboard = () => {
  const { user } = useAuth();
  const { addChatMessage, searchInstitutionalData, chatMessages } = useData();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userMessages, setUserMessages] = useState<ChatMessage[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Filter messages for current user
  useEffect(() => {
    const filtered = chatMessages.filter(msg => 
      msg.userId === user?.id || !msg.userId
    );
    setUserMessages(filtered);
  }, [chatMessages, user?.id]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [userMessages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage('');

    // Add user message
    addChatMessage({
      content: userMessage,
      isUser: true,
      userId: user?.id,
    });

    // Show typing indicator
    setIsTyping(true);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Search for response
    const response = searchInstitutionalData(userMessage);
    
    const botResponse = response || 
      "I couldn't find that information in our knowledge base. Please contact the administrator for assistance, or try rephrasing your question.";

    // Add bot response
    addChatMessage({
      content: botResponse,
      isUser: false,
      userId: user?.id,
    });

    setIsTyping(false);
  };

  const handleFileUpload = () => {
    toast({
      title: "File Upload",
      description: "File upload feature will be available soon!",
    });
  };

  const quickQuestions = [
    "What are the office hours?",
    "How do I apply for leave?",
    "What are the recent policy updates?",
    "How can I contact support?",
  ];

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome, {user?.username}!
          </h1>
          <p className="text-muted-foreground">
            Ask me anything about institutional policies, procedures, and announcements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="bg-gradient-secondary border-b">
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat Assistant</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {/* Welcome Message */}
                    {userMessages.length === 0 && (
                      <div className="flex items-start space-x-3">
                        <div className="bg-chat-bot rounded-full p-2">
                          <Bot className="h-4 w-4 text-chat-bot-foreground" />
                        </div>
                        <div className="bg-chat-bot rounded-lg p-3 max-w-md shadow-chat">
                          <p className="text-chat-bot-foreground">
                            Hello! I'm your institutional assistant. I can help you find information about policies, procedures, and announcements. What would you like to know?
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Chat Messages */}
                    {userMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-start space-x-3 ${
                          msg.isUser ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {!msg.isUser && (
                          <div className="bg-chat-bot rounded-full p-2">
                            <Bot className="h-4 w-4 text-chat-bot-foreground" />
                          </div>
                        )}
                        
                        <div
                          className={`rounded-lg p-3 max-w-md shadow-chat ${
                            msg.isUser
                              ? 'bg-chat-user text-chat-user-foreground'
                              : 'bg-chat-bot text-chat-bot-foreground'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                          <p className={`text-xs mt-1 opacity-70`}>
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        </div>

                        {msg.isUser && (
                          <div className="bg-chat-user rounded-full p-2">
                            <User className="h-4 w-4 text-chat-user-foreground" />
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex items-start space-x-3">
                        <div className="bg-chat-bot rounded-full p-2">
                          <Bot className="h-4 w-4 text-chat-bot-foreground" />
                        </div>
                        <div className="bg-chat-bot rounded-lg p-3 shadow-chat">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-chat-bot-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-chat-bot-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-chat-bot-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <div className="flex-1 flex space-x-2">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your question here..."
                        className="flex-1"
                        disabled={isTyping}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleFileUpload}
                        disabled={isTyping}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      disabled={!message.trim() || isTyping}
                      variant="gradient"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start text-sm h-auto p-3"
                    onClick={() => handleQuickQuestion(question)}
                    disabled={isTyping}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  I can help you with:
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Institutional policies</li>
                  <li>• Office procedures</li>
                  <li>• Recent announcements</li>
                  <li>• Frequently asked questions</li>
                </ul>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Language Selector (Dummy) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Language</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    🇺🇸 English
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full opacity-50">
                    🇪🇸 Español (Coming Soon)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};