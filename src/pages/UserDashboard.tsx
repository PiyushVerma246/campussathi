import { useState, useRef, useEffect } from 'react';
import { useData, ChatMessage } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { UserProfile } from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Send, Upload, MessageSquare, Bot, User, FileText, UserCircle, Paperclip, History, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const UserDashboard = () => {
  const { user } = useAuth();
  const { addChatMessage, searchInstitutionalData, chatMessages } = useData();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userMessages, setUserMessages] = useState<ChatMessage[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{id: string, name: string, size: number, type: string, uploadDate: Date, content?: string}>>([]);
  const [chatHistory, setChatHistory] = useState<Array<{id: string, title: string, messages: ChatMessage[], date: Date}>>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const searchUploadedDocuments = (query: string): string | null => {
    const searchTerms = query.toLowerCase().split(' ');
    const relevantFiles = uploadedFiles.filter(file => {
      const fileName = file.name.toLowerCase();
      return searchTerms.some(term => 
        fileName.includes(term) || 
        (file.content && file.content.toLowerCase().includes(term))
      );
    });

    if (relevantFiles.length > 0) {
      const fileNames = relevantFiles.map(f => f.name).join(', ');
      return `Based on your uploaded documents (${fileNames}), I found relevant content. However, for detailed document analysis, I recommend asking specific questions about the document content.`;
    }
    
    return null;
  };

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

    // Search for response in knowledge base
    let response = searchInstitutionalData(userMessage);
    
    // If no response from knowledge base, search uploaded documents
    if (!response) {
      const documentResponse = searchUploadedDocuments(userMessage);
      if (documentResponse) {
        response = documentResponse;
      }
    }
    
    let botResponse: string;
    if (response) {
      botResponse = `📚 Campus_Sathi found relevant information:\n\n${response}`;
    } else {
      // Provide helpful suggestions if no match found
      const suggestions = [
        "• Office hours and contact information",
        "• Leave application process", 
        "• Password reset instructions",
        "• IT support contacts",
        "• Remote work policy",
        "• Expense reimbursement",
        "• Holiday schedule",
        "• Building access information",
        "• Questions about your uploaded documents"
      ];
      
      botResponse = `I couldn't find specific information about "${userMessage}" in our knowledge base or your uploaded documents. 

Here are some topics I can help with:
${suggestions.join('\n')}

Please try asking about one of these topics, upload relevant documents, or contact the administrator for assistance.`;
    }

    // Add bot response
    addChatMessage({
      content: botResponse,
      isUser: false,
      userId: user?.id,
    });

    setIsTyping(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      // Check file size (limit to 10MB for demo)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is too large. Maximum size is 10MB.`,
          variant: "destructive"
        });
        return;
      }

      // Simulate file content extraction for text files
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        
        const newFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadDate: new Date(),
          content: file.type.includes('text') ? content : undefined
        };

        setUploadedFiles(prev => [...prev, newFile]);
        
        toast({
          title: "File uploaded successfully",
          description: `${file.name} has been uploaded and processed by Campus_Sathi.`,
        });

        // Add a message about the file upload
        addChatMessage({
          content: `📎 File uploaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
          isUser: true,
          userId: user?.id,
        });

        // Simulate bot response
        setTimeout(() => {
          addChatMessage({
            content: `Campus_Sathi has processed your file "${file.name}". I can now answer questions about this document. Try asking: "What is this document about?" or "Summarize the key points from ${file.name}".`,
            isUser: false,
            userId: user?.id,
          });
        }, 1000);
      };

      // Read file content for text files
      if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        reader.readAsText(file);
      } else {
        // For non-text files, create without content
        const newFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadDate: new Date()
        };

        setUploadedFiles(prev => [...prev, newFile]);
        
        toast({
          title: "File uploaded successfully",
          description: `${file.name} has been uploaded to Campus_Sathi.`,
        });
      }
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearChat = () => {
    // Save current chat to history if it has messages
    if (userMessages.length > 0) {
      const chatTitle = userMessages[0]?.content.substring(0, 30) + '...' || 'Chat Session';
      const historyItem = {
        id: Date.now().toString(),
        title: chatTitle,
        messages: [...userMessages],
        date: new Date()
      };
      setChatHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep last 10 chats
    }
    
    setUserMessages([]);
    toast({
      title: "Chat cleared",
      description: "Your chat has been cleared and saved to history.",
    });
  };

  const loadChatHistory = (historyItem: any) => {
    setUserMessages([...historyItem.messages]);
    toast({
      title: "Chat loaded",
      description: `Loaded chat from ${historyItem.date.toLocaleDateString()}`,
    });
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const quickQuestions = [
    "What are the office hours?",
    "How do I apply for leave?",
    "How do I reset my password?",
    "How can I contact IT support?",
    "What is the remote work policy?",
    "How do I claim expense reimbursement?",
    "What are the official holidays?",
    "How do I access the building after hours?",
  ];

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Campus_Sathi - Your intelligent campus assistant for support and information.
          </p>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Chat Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <History className="h-4 w-4" />
              <span>Chat History</span>
              {chatHistory.length > 0 && (
                <Badge variant="secondary" className="ml-1">{chatHistory.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>My Files</span>
              {uploadedFiles.length > 0 && (
                <Badge variant="secondary" className="ml-1">{uploadedFiles.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <UserCircle className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Chat Interface */}
              <div className="lg:col-span-3">
                <Card className="h-[600px] flex flex-col shadow-elegant">
                  <CardHeader className="bg-gradient-secondary border-b">
                    <CardTitle className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5" />
                        <span>Campus_Sathi Assistant</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearChat}
                        className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                      >
                        Clear Chat
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col p-0">
                    {/* Messages Area */}
                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                      <div className="space-y-4">
                        {/* Welcome Message */}
                        {userMessages.length === 0 && (
                          <div className="flex items-start space-x-3 animate-fade-in">
                            <div className="bg-chat-bot rounded-full p-2 shadow-soft">
                              <Bot className="h-4 w-4 text-chat-bot-foreground" />
                            </div>
                            <div className="bg-chat-bot rounded-lg p-4 max-w-md shadow-chat animate-scale-in">
                              <p className="text-chat-bot-foreground">
                                Hello! I'm Campus_Sathi, your intelligent campus assistant. I can help you with campus policies, procedures, announcements, and analyze your uploaded documents. What would you like to know?
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Chat Messages */}
                        {userMessages.map((msg, index) => (
                          <div
                            key={msg.id}
                            className={`flex items-start space-x-3 animate-fade-in ${
                              msg.isUser ? 'justify-end' : 'justify-start'
                            }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            {!msg.isUser && (
                              <div className="bg-chat-bot rounded-full p-2 shadow-soft">
                                <Bot className="h-4 w-4 text-chat-bot-foreground" />
                              </div>
                            )}
                            
                            <div
                              className={`rounded-lg p-4 max-w-md shadow-chat hover-scale ${
                                msg.isUser
                                  ? 'bg-chat-user text-chat-user-foreground'
                                  : 'bg-chat-bot text-chat-bot-foreground'
                              }`}
                            >
                              <p className="whitespace-pre-wrap">{msg.content}</p>
                              <p className={`text-xs mt-2 opacity-70`}>
                                {new Date(msg.timestamp).toLocaleTimeString()}
                              </p>
                            </div>

                            {msg.isUser && (
                              <div className="bg-chat-user rounded-full p-2 shadow-soft">
                                <User className="h-4 w-4 text-chat-user-foreground" />
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                          <div className="flex items-start space-x-3 animate-fade-in">
                            <div className="bg-chat-bot rounded-full p-2 shadow-soft">
                              <Bot className="h-4 w-4 text-chat-bot-foreground" />
                            </div>
                            <div className="bg-chat-bot rounded-lg p-4 shadow-chat">
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
                    <div className="border-t p-4 bg-muted/20">
                      <form onSubmit={handleSendMessage} className="flex space-x-2">
                        <div className="flex-1 flex space-x-2">
                          <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask Campus_Sathi anything..."
                            className="flex-1"
                            disabled={isTyping}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={triggerFileUpload}
                            disabled={isTyping}
                            className="hover-scale"
                          >
                            <Paperclip className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          type="submit"
                          disabled={!message.trim() || isTyping}
                          variant="gradient"
                          className="hover-scale"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        multiple
                        accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                        className="hidden"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Questions */}
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full text-left justify-start text-sm h-auto p-3 hover-scale"
                        onClick={() => handleQuickQuestion(question)}
                        disabled={isTyping}
                      >
                        {question}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* Help Card */}
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-lg">Campus_Sathi Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      I can help you with:
                    </p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Campus policies & procedures</li>
                      <li>• Document analysis</li>
                      <li>• Recent announcements</li>
                      <li>• FAQ responses</li>
                      <li>• File uploads & processing</li>
                    </ul>
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full hover-scale">
                        Contact Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Chat History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <History className="h-5 w-5" />
                    <span>Chat History</span>
                  </span>
                  <Button 
                    onClick={() => setChatHistory([])} 
                    variant="outline" 
                    size="sm" 
                    className="hover-scale"
                    disabled={chatHistory.length === 0}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {chatHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No chat history yet</h3>
                    <p className="text-muted-foreground">Your previous conversations will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {chatHistory.map((chat) => (
                      <div 
                        key={chat.id} 
                        className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow hover-scale cursor-pointer"
                        onClick={() => loadChatHistory(chat)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <MessageSquare className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground truncate max-w-md">{chat.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {chat.date.toLocaleDateString()} • {chat.messages.length} messages
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Load Chat
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>My Uploaded Files</span>
                  </span>
                  <Button onClick={triggerFileUpload} variant="gradient" size="sm" className="hover-scale">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uploadedFiles.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No files uploaded yet</h3>
                    <p className="text-muted-foreground mb-4">Upload documents for Campus_Sathi to analyze</p>
                    <Button onClick={triggerFileUpload} variant="gradient" className="hover-scale">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Your First File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow hover-scale">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{file.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatFileSize(file.size)} • Uploaded {file.uploadDate.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant={file.content ? "default" : "secondary"}>
                          {file.content ? "Processed" : "Uploaded"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};