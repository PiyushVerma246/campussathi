import { useState, useEffect } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'hi' | 'zh';

export interface Translations {
  // Navigation
  home: string;
  about: string;
  contact: string;
  login: string;
  logout: string;
  
  // Login Page
  welcomeTitle: string;
  welcomeSubtitle: string;
  adminAccess: string;
  adminDescription: string;
  adminFeatures: {
    manage: string;
    users: string;
    analytics: string;
    moderation: string;
  };
  studentAccess: string;
  studentDescription: string;
  studentFeatures: {
    chat: string;
    documents: string;
    faq: string;
    shortcuts: string;
  };
  signIn: string;
  signInDescription: string;
  username: string;
  password: string;
  usernamePrompt: string;
  passwordPrompt: string;
  signingIn: string;
  demoCredentials: string;
  invalidCredentials: string;
  forgotPassword: string;
  rememberMe: string;
  
  // Common
  language: string;
  theme: string;
  submit: string;
  cancel: string;
  loading: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    logout: 'Logout',
    
    // Login Page
    welcomeTitle: 'Campus_Sathi',
    welcomeSubtitle: 'Your Intelligent Campus Assistant',
    adminAccess: 'Administrator Access',
    adminDescription: 'Manage system settings and institutional data',
    adminFeatures: {
      manage: 'Manage institutional data',
      users: 'User management',
      analytics: 'System analytics',
      moderation: 'Content moderation'
    },
    studentAccess: 'Student Access',
    studentDescription: 'Get instant answers and upload documents',
    studentFeatures: {
      chat: 'AI-powered chat assistance',
      documents: 'Document analysis',
      faq: 'FAQ responses',
      shortcuts: 'Quick question shortcuts'
    },
    signIn: 'Sign In',
    signInDescription: 'Enter your credentials to access Campus_Sathi',
    username: 'Username',
    password: 'Password',
    usernamePrompt: 'Enter your username',
    passwordPrompt: 'Enter your password',
    signingIn: 'Signing in...',
    demoCredentials: 'Demo Credentials:',
    invalidCredentials: 'Invalid credentials. Please try again.',
    forgotPassword: 'Forgot your password?',
    rememberMe: 'Remember me',
    
    // Common
    language: 'Language',
    theme: 'Theme',
    submit: 'Submit',
    cancel: 'Cancel',
    loading: 'Loading...'
  },
  es: {
    // Navigation
    home: 'Inicio',
    about: 'Acerca de',
    contact: 'Contacto',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    
    // Login Page
    welcomeTitle: 'Campus_Sathi',
    welcomeSubtitle: 'Tu Asistente de Campus Inteligente',
    adminAccess: 'Acceso de Administrador',
    adminDescription: 'Gestionar configuraciones del sistema y datos institucionales',
    adminFeatures: {
      manage: 'Gestionar datos institucionales',
      users: 'Gestión de usuarios',
      analytics: 'Análisis del sistema',
      moderation: 'Moderación de contenido'
    },
    studentAccess: 'Acceso de Estudiante',
    studentDescription: 'Obtener respuestas instantáneas y subir documentos',
    studentFeatures: {
      chat: 'Asistencia de chat con IA',
      documents: 'Análisis de documentos',
      faq: 'Respuestas de preguntas frecuentes',
      shortcuts: 'Atajos de preguntas rápidas'
    },
    signIn: 'Iniciar Sesión',
    signInDescription: 'Ingresa tus credenciales para acceder a Campus_Sathi',
    username: 'Nombre de usuario',
    password: 'Contraseña',
    usernamePrompt: 'Ingresa tu nombre de usuario',
    passwordPrompt: 'Ingresa tu contraseña',
    signingIn: 'Iniciando sesión...',
    demoCredentials: 'Credenciales de Demostración:',
    invalidCredentials: 'Credenciales inválidas. Por favor, intenta de nuevo.',
    forgotPassword: '¿Olvidaste tu contraseña?',
    rememberMe: 'Recordarme',
    
    // Common
    language: 'Idioma',
    theme: 'Tema',
    submit: 'Enviar',
    cancel: 'Cancelar',
    loading: 'Cargando...'
  },
  fr: {
    // Navigation
    home: 'Accueil',
    about: 'À propos',
    contact: 'Contact',
    login: 'Connexion',
    logout: 'Déconnexion',
    
    // Login Page
    welcomeTitle: 'Campus_Sathi',
    welcomeSubtitle: 'Votre Assistant de Campus Intelligent',
    adminAccess: 'Accès Administrateur',
    adminDescription: 'Gérer les paramètres système et les données institutionnelles',
    adminFeatures: {
      manage: 'Gérer les données institutionnelles',
      users: 'Gestion des utilisateurs',
      analytics: 'Analyses du système',
      moderation: 'Modération de contenu'
    },
    studentAccess: 'Accès Étudiant',
    studentDescription: 'Obtenez des réponses instantanées et téléchargez des documents',
    studentFeatures: {
      chat: 'Assistance de chat IA',
      documents: 'Analyse de documents',
      faq: 'Réponses FAQ',
      shortcuts: 'Raccourcis de questions rapides'
    },
    signIn: 'Se Connecter',
    signInDescription: 'Entrez vos identifiants pour accéder à Campus_Sathi',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    usernamePrompt: 'Entrez votre nom d\'utilisateur',
    passwordPrompt: 'Entrez votre mot de passe',
    signingIn: 'Connexion en cours...',
    demoCredentials: 'Identifiants de Démonstration:',
    invalidCredentials: 'Identifiants invalides. Veuillez réessayer.',
    forgotPassword: 'Mot de passe oublié?',
    rememberMe: 'Se souvenir de moi',
    
    // Common
    language: 'Langue',
    theme: 'Thème',
    submit: 'Soumettre',
    cancel: 'Annuler',
    loading: 'Chargement...'
  },
  de: {
    // Navigation
    home: 'Startseite',
    about: 'Über uns',
    contact: 'Kontakt',
    login: 'Anmelden',
    logout: 'Abmelden',
    
    // Login Page
    welcomeTitle: 'Campus_Sathi',
    welcomeSubtitle: 'Ihr Intelligenter Campus-Assistent',
    adminAccess: 'Administrator-Zugang',
    adminDescription: 'Systemeinstellungen und institutionelle Daten verwalten',
    adminFeatures: {
      manage: 'Institutionelle Daten verwalten',
      users: 'Benutzerverwaltung',
      analytics: 'Systemanalyse',
      moderation: 'Inhaltsmoderation'
    },
    studentAccess: 'Studenten-Zugang',
    studentDescription: 'Sofortige Antworten erhalten und Dokumente hochladen',
    studentFeatures: {
      chat: 'KI-gestützte Chat-Unterstützung',
      documents: 'Dokumentenanalyse',
      faq: 'FAQ-Antworten',
      shortcuts: 'Schnelle Fragen-Shortcuts'
    },
    signIn: 'Anmelden',
    signInDescription: 'Geben Sie Ihre Anmeldedaten ein, um auf Campus_Sathi zuzugreifen',
    username: 'Benutzername',
    password: 'Passwort',
    usernamePrompt: 'Geben Sie Ihren Benutzernamen ein',
    passwordPrompt: 'Geben Sie Ihr Passwort ein',
    signingIn: 'Anmeldung läuft...',
    demoCredentials: 'Demo-Anmeldedaten:',
    invalidCredentials: 'Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.',
    forgotPassword: 'Passwort vergessen?',
    rememberMe: 'Angemeldet bleiben',
    
    // Common
    language: 'Sprache',
    theme: 'Thema',
    submit: 'Senden',
    cancel: 'Abbrechen',
    loading: 'Laden...'
  },
  hi: {
    // Navigation
    home: 'होम',
    about: 'के बारे में',
    contact: 'संपर्क',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    
    // Login Page
    welcomeTitle: 'Campus_Sathi',
    welcomeSubtitle: 'आपका बुद्धिमान कैंपस सहायक',
    adminAccess: 'प्रशासक पहुंच',
    adminDescription: 'सिस्टम सेटिंग्स और संस्थागत डेटा प्रबंधित करें',
    adminFeatures: {
      manage: 'संस्थागत डेटा प्रबंधित करें',
      users: 'उपयोगकर्ता प्रबंधन',
      analytics: 'सिस्टम विश्लेषण',
      moderation: 'सामग्री मॉडरेशन'
    },
    studentAccess: 'छात्र पहुंच',
    studentDescription: 'तुरंत उत्तर प्राप्त करें और दस्तावेज़ अपलोड करें',
    studentFeatures: {
      chat: 'AI-संचालित चैट सहायता',
      documents: 'दस्तावेज़ विश्लेषण',
      faq: 'FAQ उत्तर',
      shortcuts: 'त्वरित प्रश्न शॉर्टकट'
    },
    signIn: 'साइन इन करें',
    signInDescription: 'Campus_Sathi तक पहुंच के लिए अपने क्रेडेंशियल दर्ज करें',
    username: 'उपयोगकर्ता नाम',
    password: 'पासवर्ड',
    usernamePrompt: 'अपना उपयोगकर्ता नाम दर्ज करें',
    passwordPrompt: 'अपना पासवर्ड दर्ज करें',
    signingIn: 'साइन इन हो रहे हैं...',
    demoCredentials: 'डेमो क्रेडेंशियल:',
    invalidCredentials: 'अमान्य क्रेडेंशियल। कृपया पुनः प्रयास करें।',
    forgotPassword: 'अपना पासवर्ड भूल गए?',
    rememberMe: 'मुझे याद रखें',
    
    // Common
    language: 'भाषा',
    theme: 'थीम',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    loading: 'लोड हो रहा है...'
  },
  zh: {
    // Navigation
    home: '首页',
    about: '关于',
    contact: '联系',
    login: '登录',
    logout: '登出',
    
    // Login Page
    welcomeTitle: 'Campus_Sathi',
    welcomeSubtitle: '您的智能校园助手',
    adminAccess: '管理员访问',
    adminDescription: '管理系统设置和机构数据',
    adminFeatures: {
      manage: '管理机构数据',
      users: '用户管理',
      analytics: '系统分析',
      moderation: '内容审核'
    },
    studentAccess: '学生访问',
    studentDescription: '获取即时答案并上传文档',
    studentFeatures: {
      chat: 'AI驱动的聊天协助',
      documents: '文档分析',
      faq: '常见问题解答',
      shortcuts: '快速问题快捷方式'
    },
    signIn: '登录',
    signInDescription: '输入您的凭据以访问Campus_Sathi',
    username: '用户名',
    password: '密码',
    usernamePrompt: '输入您的用户名',
    passwordPrompt: '输入您的密码',
    signingIn: '正在登录...',
    demoCredentials: '演示凭据：',
    invalidCredentials: '凭据无效。请重试。',
    forgotPassword: '忘记密码？',
    rememberMe: '记住我',
    
    // Common
    language: '语言',
    theme: '主题',
    submit: '提交',
    cancel: '取消',
    loading: '加载中...'
  }
};

const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  hi: 'हिंदी',
  zh: '中文'
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('campus-sathi-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('campus-sathi-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const getLanguageName = (lang: Language) => languageNames[lang];

  return {
    language,
    t,
    changeLanguage,
    getLanguageName,
    availableLanguages: Object.keys(languageNames) as Language[],
    languageNames
  };
};