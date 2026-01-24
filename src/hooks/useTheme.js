import { useState, useEffect } from 'react';

// Simple hook - No Context needed!
export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
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
  };
}