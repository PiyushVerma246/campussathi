import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Brain, Users, Target, Lightbulb, Award, Zap } from 'lucide-react';
import teamImage from '@/assets/team-about.jpg';

export const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            About Campus_Sathi
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fade-in">
            Revolutionizing campus communication through intelligent AI assistance and seamless document analysis
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 text-sm">Our Mission</Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Empowering Campus Communities Through AI Innovation
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Campus_Sathi was born from the vision of creating a more connected, efficient, and intelligent campus environment. We believe that every student and faculty member deserves instant access to information and support.
              </p>
              <p className="text-lg text-muted-foreground">
                Our AI-powered platform bridges the gap between complex institutional knowledge and user-friendly accessibility, making campus life smoother for everyone.
              </p>
            </div>
            <div className="relative animate-fade-in">
              <img src={teamImage} alt="Campus Team" className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent rounded-2xl flex items-end p-8">
                <div>
                  <Brain className="h-12 w-12 text-white mb-4 animate-float" />
                  <h3 className="text-2xl font-bold text-white mb-2">Smart Campus Assistant</h3>
                  <p className="text-white/90">
                    Leveraging advanced AI to understand, analyze, and respond to complex campus queries with human-like intelligence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that drive everything we do at Campus_Sathi
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover-scale backdrop-blur-sm bg-card border shadow-elegant hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-primary p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Community First</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We prioritize the needs of students, faculty, and staff, building solutions that truly serve the campus community.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover-scale backdrop-blur-sm bg-card border shadow-elegant hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-secondary p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Innovation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Constantly pushing the boundaries of what's possible with AI and machine learning to deliver cutting-edge solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover-scale backdrop-blur-sm bg-card border shadow-elegant hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Accessibility</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ensuring our platform is usable by everyone, regardless of technical expertise, language, or accessibility needs.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover-scale backdrop-blur-sm bg-card border shadow-elegant hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-secondary to-accent p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Excellence</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Maintaining the highest standards of quality, reliability, and performance in everything we deliver.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover-scale backdrop-blur-sm bg-card border shadow-elegant hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-accent to-primary p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Efficiency</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Streamlining campus processes and eliminating friction to save time for students and faculty.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover-scale backdrop-blur-sm bg-card border shadow-elegant hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Intelligence</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Leveraging artificial intelligence responsibly to augment human capabilities, not replace them.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Built by Educators, for Educators
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our team combines deep educational expertise with cutting-edge technology to create solutions that truly understand campus needs.
          </p>
          <div className="bg-gradient-primary rounded-2xl p-8 shadow-elegant">
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Mission</h3>
            <p className="text-white/90">
              Whether you're a student, educator, or administrator, Campus_Sathi is designed to make your campus experience more productive, engaging, and connected.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};