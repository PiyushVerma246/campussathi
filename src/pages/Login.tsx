import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { MessageSquare, Shield, User, Lock, Globe, Sun, Moon, Monitor, Brain, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';

// Input validation schema
const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required").max(50, "Username must be less than 50 characters"),
  password: z.string().min(1, "Password is required").max(100, "Password must be less than 100 characters")
});

export const Login = () => {
  const { user, login } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t, language, changeLanguage, availableLanguages, languageNames } = useLanguage();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'user' | null>(null);

  // Redirect if already logged in
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  const getThemeIcon = () => {
    if (theme === 'system') return <Monitor className="h-4 w-4" />;
    return resolvedTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate inputs
    try {
      const validatedData = loginSchema.parse({ username, password });
      setIsLoading(true);

      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 800));

      if (login(validatedData.username, validatedData.password)) {
        // Handle remember me functionality
        if (rememberMe) {
          localStorage.setItem('campus-sathi-remember', 'true');
        }
      } else {
        setError(t.invalidCredentials);
      }
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        setError(validationError.errors[0].message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role: 'admin' | 'user') => {
    setSelectedRole(role);
    // Pre-fill demo credentials
    if (role === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('user');
      setPassword('user123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Navigation Bar */}
      <nav className="relative z-10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5 text-white" />
            <span className="text-white font-medium">{t.home}</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 border border-white/20">
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{languageNames[language]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {availableLanguages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={language === lang ? "bg-primary/10" : ""}
                  >
                    {languageNames[lang]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 border border-white/20">
                  {getThemeIcon()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <Monitor className="h-4 w-4 mr-2" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm p-8 rounded-full animate-float shadow-glow">
                <Brain className="h-20 w-20 text-white" />
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in gradient-text">
              {t.welcomeTitle}
            </h1>
            <p className="text-2xl text-white/90 animate-slide-up max-w-2xl mx-auto">
              {t.welcomeSubtitle}
            </p>
          </div>

          {!selectedRole ? (
            /* Role Selection */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Admin Section */}
              <Card className="group backdrop-blur-sm bg-white/95 shadow-elegant hover:shadow-glow border-0 hover-scale animate-slide-up cursor-pointer transition-all duration-500"
                    onClick={() => handleRoleSelect('admin')}>
                <CardHeader className="text-center pb-4 bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white rounded-t-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                  <div className="relative z-10">
                    <div className="flex justify-center mb-4">
                      <div className="bg-white/20 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <Shield className="h-12 w-12" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">{t.adminAccess}</CardTitle>
                    <CardDescription className="text-red-100 text-base">
                      {t.adminDescription}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Admin Features</h3>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                          {t.adminFeatures.manage}
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                          {t.adminFeatures.users}
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                          {t.adminFeatures.analytics}
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                          {t.adminFeatures.moderation}
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800">
                      <p className="text-xs text-red-600 dark:text-red-400 font-medium mb-2">{t.demoCredentials}</p>
                      <p className="font-mono text-sm text-red-700 dark:text-red-300">admin / admin123</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Section */}
              <Card className="group backdrop-blur-sm bg-white/95 shadow-elegant hover:shadow-glow border-0 hover-scale animate-slide-up cursor-pointer transition-all duration-500"
                    style={{ animationDelay: '0.1s' }}
                    onClick={() => handleRoleSelect('user')}>
                <CardHeader className="text-center pb-4 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white rounded-t-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                  <div className="relative z-10">
                    <div className="flex justify-center mb-4">
                      <div className="bg-white/20 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <User className="h-12 w-12" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">{t.studentAccess}</CardTitle>
                    <CardDescription className="text-blue-100 text-base">
                      {t.studentDescription}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Student Features</h3>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {t.studentFeatures.chat}
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {t.studentFeatures.documents}
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {t.studentFeatures.faq}
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {t.studentFeatures.shortcuts}
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">{t.demoCredentials}</p>
                      <p className="font-mono text-sm text-blue-700 dark:text-blue-300">user / user123</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (

            /* Login Form */
            <div className="max-w-md mx-auto mt-8">
              <Card className="backdrop-blur-sm bg-white/95 shadow-elegant hover:shadow-glow border-0 animate-fade-in transition-all duration-500" style={{ animationDelay: '0.2s' }}>
                <CardHeader className="text-center pb-4 space-y-4">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedRole(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${selectedRole === 'admin' ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'}`}>
                      {selectedRole === 'admin' ? 
                        <Shield className="h-8 w-8 text-white" /> : 
                        <User className="h-8 w-8 text-white" />
                      }
                    </div>
                    <CardTitle className="text-2xl text-foreground">{t.signIn}</CardTitle>
                    <CardDescription className="text-base">
                      {t.signInDescription}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="flex items-center space-x-2 text-sm font-medium">
                        <User className="h-4 w-4 text-primary" />
                        <span>{t.username}</span>
                      </Label>
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={t.usernamePrompt}
                        required
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 border-2"
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="flex items-center space-x-2 text-sm font-medium">
                        <Lock className="h-4 w-4 text-primary" />
                        <span>{t.password}</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={t.passwordPrompt}
                          required
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 border-2 pr-10"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="remember" 
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                          disabled={isLoading}
                        />
                        <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                          {t.rememberMe}
                        </Label>
                      </div>
                      <Button variant="link" className="text-sm p-0 h-auto" disabled={isLoading}>
                        {t.forgotPassword}
                      </Button>
                    </div>

                    {error && (
                      <Alert variant="destructive" className="animate-fade-in">
                        <AlertDescription className="text-sm">{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className={`w-full transition-all duration-300 transform hover:scale-[1.02] ${selectedRole === 'admin' ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'}`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          <span>{t.signingIn}</span>
                        </div>
                      ) : (
                        t.signIn
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};