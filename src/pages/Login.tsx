import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MessageSquare, Shield, User, Lock } from 'lucide-react';

export const Login = () => {
  const { user, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (login(username, password)) {
      // Redirect will happen automatically due to user state change
    } else {
      setError('Invalid credentials. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full animate-float">
              <MessageSquare className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
            Campus_Sathi
          </h1>
          <p className="text-xl text-white/90 animate-slide-up">
            Your Intelligent Campus Assistant
          </p>
        </div>

        {/* Two Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Admin Section */}
          <Card className="backdrop-blur-sm bg-white/95 shadow-medium border-0 hover-scale animate-slide-up">
            <CardHeader className="text-center pb-4 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-t-lg">
              <div className="flex justify-center mb-3">
                <Shield className="h-12 w-12" />
              </div>
              <CardTitle className="text-2xl">Administrator Access</CardTitle>
              <CardDescription className="text-red-100">
                Manage system settings and user data
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Admin Features</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Manage institutional data</li>
                    <li>• User management</li>
                    <li>• System analytics</li>
                    <li>• Content moderation</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Demo Credentials:</p>
                  <p className="font-mono text-sm">Username: admin</p>
                  <p className="font-mono text-sm">Password: admin123</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Section */}
          <Card className="backdrop-blur-sm bg-white/95 shadow-medium border-0 hover-scale animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="text-center pb-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-t-lg">
              <div className="flex justify-center mb-3">
                <User className="h-12 w-12" />
              </div>
              <CardTitle className="text-2xl">Student Access</CardTitle>
              <CardDescription className="text-blue-100">
                Get instant answers and upload documents
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Student Features</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI-powered chat assistance</li>
                    <li>• Document analysis</li>
                    <li>• FAQ responses</li>
                    <li>• Quick question shortcuts</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Demo Credentials:</p>
                  <p className="font-mono text-sm">Username: user</p>
                  <p className="font-mono text-sm">Password: user123</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Login Form */}
        <Card className="backdrop-blur-sm bg-white/95 shadow-medium border-0 max-w-md mx-auto mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-foreground">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access Campus_Sathi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Username</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="transition-smooth"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Password</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="transition-smooth"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                variant="gradient"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};