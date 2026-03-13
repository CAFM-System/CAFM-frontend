import { useState, useEffect } from 'react';

// Simple hook - No Context needed!
export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Toggle .dark class on <html> so dark: prefix works everywhere
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    // Dispatch custom event to sync across components
    window.dispatchEvent(new Event('theme-change'));
  }, [isDarkMode]);

  // Listen for theme changes from other components
  useEffect(() => {
    const handleThemeChange = () => {
      const saved = localStorage.getItem('theme');
      setIsDarkMode(saved === 'dark');
    };

    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Return everything you need
  return {
    isDarkMode,
    toggleTheme,
    // Ready-to-use classes
    bg: isDarkMode ? "bg-secondary" : "bg-primary",
    cardBg: isDarkMode ? "bg-secondary/50 border-primary/10" : "bg-white border-gray-100",
    text: isDarkMode ? "text-primary" : "text-secondary",
    subText: isDarkMode ? "text-primary/70" : "text-gray-500",
    border: isDarkMode ? "border-primary/20" : "border-gray-200",
    // Extended utility classes
    inputBg: isDarkMode ? "bg-secondary/30 border-primary/20 text-primary placeholder-primary/40" : "bg-white border-gray-300 text-secondary placeholder-gray-400",
    modalBg: isDarkMode ? "bg-secondary border-primary/10" : "bg-white border-gray-100",
    divider: isDarkMode ? "border-primary/10" : "border-gray-200",
    hover: isDarkMode ? "hover:bg-primary/10" : "hover:bg-gray-100",
    buttonPrimary: "bg-accent text-secondary",
    buttonSecondary: isDarkMode ? "bg-primary/10 text-primary border-primary/20" : "bg-gray-100 text-secondary border-gray-200",
    glassBg: isDarkMode ? "bg-secondary/60 backdrop-blur-xl border-primary/10" : "bg-white/70 backdrop-blur-xl border-gray-100",
  };
}