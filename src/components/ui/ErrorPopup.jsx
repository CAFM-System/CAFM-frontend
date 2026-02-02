import React, { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

// Icons
const AlertCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);
const XIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export const ErrorPopup = ({ message, onClose }) => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-bounce-in">
      <div className={`
        flex items-start gap-3 p-4 rounded-xl shadow-lg max-w-sm w-full border-l-4 border-red-500
        ${isDarkMode ? "bg-zinc-800 text-white" : "bg-white text-gray-800"}
      `}>
        <AlertCircleIcon className="w-6 h-6 text-red-500 shrink-0" />
        <div className="flex-1">
          <h4 className="font-bold text-sm mb-1">Action Required</h4>
          <p className="text-sm opacity-90 leading-relaxed whitespace-pre-line">{message}</p>
        </div>
        <button onClick={onClose} className={`transition-colors ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-600"}`}>
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};