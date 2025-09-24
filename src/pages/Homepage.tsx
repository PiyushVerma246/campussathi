import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Shield, User, Zap, Globe, FileText, Users, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full animate-fade-in">
                <MessageSquare className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Campus_Sathi
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                Smart Campus Assistant
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in">
              Your intelligent campus assistant for academic support, document analysis, and instant answers to all your campus-related questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/login">
                <Button size="lg" variant="secondary" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Admin Features */}
            <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-elegant hover-scale">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-primary p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-foreground">Admin Dashboard</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Manage institutional content, upload documents, and monitor user interactions with comprehensive admin tools.
                </CardDescription>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload & Manage Content
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    Monitor User Queries
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Features */}
            <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-elegant hover-scale">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-secondary p-2 rounded-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-foreground">User Portal</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Interactive chatbot interface for instant answers to institutional queries and document assistance.
                </CardDescription>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    AI-Powered Responses
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Document Upload
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Features */}
            <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-elegant hover-scale md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-foreground">Smart Features</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Advanced multilingual support and intelligent content matching for enhanced user experience.
                </CardDescription>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Globe className="h-4 w-4 mr-2" />
                    Multilingual Support
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 mr-2" />
                    Instant Responses
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Campus_Sathi?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join students and faculty already using Campus_Sathi to enhance campus communication and get instant support.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="group">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};