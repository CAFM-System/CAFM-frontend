import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export const InputField = ({ label, id, type = "text", value, onChange, placeholder, min, readOnly, className = "" }) => {
  const { isDarkMode, text, border, bg } = useTheme();

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className={`text-sm font-bold ${text}`}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id} 
          type={type} 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder}
          min={min}
          readOnly={readOnly}
          onKeyDown={(e) => {
              if (type === 'number' && (e.key === '-' || e.key === 'e')) {
                e.preventDefault();
              }
          }}
          className={`
            flex h-11 w-full rounded-xl border-2 px-4 py-2 text-sm transition-all duration-200 
            focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
            ${bg} ${border} ${text}
            placeholder:text-gray-400
            ${readOnly ? 'opacity-60 cursor-not-allowed' : ''}
          `}
        />
      </div>
    </div>
  );
};