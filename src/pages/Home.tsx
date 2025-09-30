import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Shield, User, Zap, Globe, FileText, Users, BookOpen, ArrowRight, Brain, Clock, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import heroImage from '@/assets/hero-campus.jpg';
import aiAnalysisImage from '@/assets/ai-analysis.jpg';

export const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary py-32">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImage} alt="Campus Hero" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="flex items-center mb-8 animate-slide-in-left">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full animate-float">
                  <Brain className="h-16 w-16 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
                Campus_Sathi
              </h1>
              <div className="text-2xl md:text-3xl text-white/90 mb-4 animate-fade-in">
                Your Intelligent Campus Assistant
              </div>
              <p className="text-lg text-white/80 mb-12 max-w-2xl animate-fade-in">
                Revolutionizing campus communication with AI-powered document analysis, instant support, and intelligent query handling for students and faculty.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 animate-fade-in">
                <Link to="/login">
                  <Button size="lg" variant="secondary" className="group px-8 py-4 text-lg hover-lift">
                    Get Started Today
                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-all duration-300" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 px-8 py-4 text-lg backdrop-blur-sm">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block animate-slide-in-right">
              <img src={aiAnalysisImage} alt="AI Analysis" className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features for Modern Campus Life
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Campus_Sathi combines cutting-edge AI with intuitive design to deliver unparalleled campus support
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI-Powered Responses */}
            <Card className="group hover-scale backdrop-blur-sm bg-card/95 border shadow-elegant hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-primary p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">AI-Powered Intelligence</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Advanced natural language processing delivers instant, accurate responses to all your campus queries with contextual understanding.
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                    Contextual Query Understanding
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    24/7 Instant Responses
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Analysis */}
            <Card className="group hover-scale backdrop-blur-sm bg-card/95 border shadow-elegant hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-secondary p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Smart Document Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Upload documents and get intelligent insights, summaries, and answers extracted from your academic materials instantly.
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4 mr-2 text-primary" />
                    Multi-format Support
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 mr-2 text-primary" />
                    Instant Extraction
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Dashboard */}
            <Card className="group hover-scale backdrop-blur-sm bg-card/95 border shadow-elegant hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Administrative Control</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Comprehensive admin dashboard for managing institutional content, monitoring interactions, and maintaining system integrity.
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    User Management
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Lock className="h-4 w-4 mr-2 text-primary" />
                    Secure Access Control
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Multilingual Support */}
            <Card className="group hover-scale backdrop-blur-sm bg-card/95 border shadow-elegant hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-secondary to-accent p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Global Accessibility</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Built-in multilingual support ensures every student can interact in their preferred language with seamless translation.
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Globe className="h-4 w-4 mr-2 text-primary" />
                    50+ Languages Supported
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 mr-2 text-primary" />
                    Real-time Translation
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Experience */}
            <Card className="group hover-scale backdrop-blur-sm bg-card/95 border shadow-elegant hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-accent to-primary p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <User className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Personalized Experience</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Tailored user dashboards with personalized recommendations, chat history, and preference-based customizations.
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-4 w-4 mr-2 text-primary" />
                    Custom Profiles
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    Chat History
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card className="group hover-scale backdrop-blur-sm bg-card/95 border shadow-elegant hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Lightning Fast</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Optimized performance ensures instant responses, seamless file uploads, and smooth user interactions across all devices.
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 mr-2 text-primary" />
                    Sub-second Response Time
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Globe className="h-4 w-4 mr-2 text-primary" />
                    Cross-platform Compatibility
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transform Your Campus Experience Today
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Join thousands of students and faculty already using Campus_Sathi for smarter, faster campus interactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="group px-10 py-4 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-all duration-300" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 px-10 py-4 text-lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};