import {
  Bell,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Wrench,
  UserCheck,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

//UI COMPONENTS FOR NOTIFICATIONS PAGE

export const Button = ({
  children,
  onClick,
  variant = 'default',
  size = 'default',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    default: 'bg-accent text-secondary hover:bg-accent/90 focus:ring-accent',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
    ghost: 'hover:bg-gray-100'
  };

  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10'
  };

  return (
    <button
      type="button"  
      onClick={(e) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Badge = ({ children, className = '' }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
};

export const ScrollArea = ({ children, className = '', style = {} }) => {
  return (
    <div
      className={`overflow-auto ${className}`}
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#cbd5e1 #f1f5f9',
        ...style
      }}
    >
      <style>{`
        div::-webkit-scrollbar {
          width: 8px;
        }
        div::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
      {children}
    </div>
  );
};

//  HELPER FUNCTIONS 

// Parse timestamp from string format to Date
export const parseTimestamp = (timestamp) => {
  if (!timestamp) return new Date();

  // Handle ISO format dates
  if (timestamp.includes('T')) {
    return new Date(timestamp);
  }

  // Handle "Nov 14, 2025, 06:50 PM" format
  try {
    return new Date(timestamp);
  } catch {
    return new Date();
  }
};

// Format timestamp for display
export const formatTimestamp = (timestamp) => {
  const date = parseTimestamp(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
};

// ============= NOTIFICATION GENERATION =============


// ============= NOTIFICATION ITEM COMPONENT =============

export const NotificationItem = ({
  notification,
  isDarkMode,
  onNotificationClick
}) => {
  const themeClasses = {
    text: {
      primary: isDarkMode ? "text-primary" : "text-secondary",
      secondary: isDarkMode ? "text-primary/70" : "text-gray-500",
      tertiary: isDarkMode ? "text-primary/80" : "text-gray-700"
    },
    hover: isDarkMode ? "hover:bg-primary/10" : "hover:bg-gray-50",
    unreadBg: isDarkMode ? "bg-primary/5" : "bg-accent/5"
  };

  return (
    <div
      /* 🔴 CHANGED: ALWAYS treat as unread (backend already filtered) */
      className={`p-3 sm:p-4 ${themeClasses.hover} ${themeClasses.unreadBg} transition-colors cursor-pointer`}
      onClick={() => onNotificationClick(notification)}
    >
      <div className="flex gap-2 sm:gap-4">
        {/* Icon */}
        <div className={`${notification.color} mt-1 flex-shrink-0`}>
          {notification.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4
                className={`text-xs sm:text-sm font-semibold ${themeClasses.text.primary}`}
              >
                {notification.tickets.title}
              </h4>

              {(notification.priority === "urgent" ||
                notification.priority === "high") && (
                <Badge className="bg-red-100 text-red-700 text-[10px] sm:text-xs">
                  {notification.tickets.priority}
                </Badge>
              )}
            </div>

            <span
              className={`text-[10px] sm:text-xs ${themeClasses.text.secondary} whitespace-nowrap`}
            >
              {formatTimestamp(notification.created_at)}
            </span>
          </div>

          <p
            className={`text-xs sm:text-sm ${themeClasses.text.tertiary} mb-1`}
          >
            {notification.message}
          </p>

          {notification.tickets && (
            <div
              className={`text-[10px] sm:text-xs ${themeClasses.text.secondary} flex flex-wrap items-center gap-1`}
            >
              <span>{notification.tickets.location}</span>
              <span>•</span>
              <span>{notification.tickets.job_type}</span>
              {notification.updated_by &&notification.updated_by !== "" && (
                <>
                  <span>•</span>
                  <span>By {notification.updated_by}</span>
                </>
              )}
            </div>
          )}

          {/* 🔴 CHANGED: ALWAYS show "New" (backend returns unread only) */}
          <div className="mt-2">
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-accent font-medium">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full"></span>
              New
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};