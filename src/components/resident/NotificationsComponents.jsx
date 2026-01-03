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
    default: 'bg-[#1687A7] text-white hover:bg-[#1687A7]/90 focus:ring-[#1687A7]',
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

export const generateNotifications = (tickets, user, theme, readNotifications) => {
  const notifications = [];
  const now = new Date();

  // Safety check
  if (!Array.isArray(tickets) || tickets.length === 0) {
    return notifications;
  }

  tickets.forEach((ticket) => {
    // Check if notification is relevant to user
    const isRelevant =
      user?.role === 'admin' ||
      (user?.role === 'resident' && ticket.name === user.name) ||
      (user?.role === 'technician' && ticket.reportedTo === user.name);

    if (!isRelevant && user?.role !== 'admin') return;

    // Generate notifications from ticket_updates
    if (ticket.ticket_updates && Array.isArray(ticket.ticket_updates)) {
      ticket.ticket_updates.forEach((update) => {
        const updateDate = parseTimestamp(update.timestamp);
        const daysDiff = (now - updateDate) / (1000 * 60 * 60 * 24);

        // Show all notifications (date filter disabled for testing)
        // if (daysDiff > 30) return;

        let icon, color, title, message;

        // Generate notification based on status update
        switch (update.status) {
          case 'open':
            icon = <Clock className="h-4 w-4 sm:h-5 sm:w-5" />;
            color = theme === 'light' ? 'text-orange-600' : 'text-orange-400';
            title = 'New Ticket Created';
            message = `${ticket.ticketId}: ${ticket.title} - ${update.message}`;
            break;
          case 'assigned':
            icon = <UserCheck className="h-4 w-4 sm:h-5 sm:w-5" />;
            color = theme === 'light' ? 'text-[#1687A7]' : 'text-cyan-400';
            title = 'Ticket Assigned';
            message = `${ticket.ticketId}: ${ticket.title} - ${update.message}`;
            break;
          case 'in_progress':
            icon = <Wrench className="h-4 w-4 sm:h-5 sm:w-5" />;
            color = theme === 'light' ? 'text-blue-600' : 'text-blue-400';
            title = 'Work Started';
            message = `${ticket.ticketId}: ${ticket.title} - ${update.message}`;
            break;
          case 'resolved':
            icon = <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />;
            color = theme === 'light' ? 'text-green-600' : 'text-green-400';
            title = 'Issue Resolved';
            message = `${ticket.ticketId}: ${ticket.title} - ${update.message}`;
            break;
          case 'closed':
            icon = <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />;
            color = theme === 'light' ? 'text-gray-600' : 'text-gray-400';
            title = 'Ticket Closed';
            message = `${ticket.ticketId}: ${ticket.title} - ${update.message}`;
            break;
          case 'reopened':
            icon = <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />;
            color = theme === 'light' ? 'text-yellow-600' : 'text-yellow-400';
            title = 'Ticket Reopened';
            message = `${ticket.ticketId}: ${ticket.title} - ${update.message}`;
            break;
          default:
            icon = <Bell className="h-4 w-4 sm:h-5 sm:w-5" />;
            color = theme === 'light' ? 'text-[#1687A7]' : 'text-cyan-400';
            title = 'Status Update';
            message = `${ticket.ticketId}: ${ticket.title} - ${update.message}`;
        }

        const notificationId = `${ticket.ticketId}-${update.status}-${update.timestamp}`;

        notifications.push({
          id: notificationId,
          type: 'status_update',
          title,
          message,
          timestamp: update.timestamp,
          ticket,
          isRead: readNotifications.has(notificationId),
          icon,
          color,
          priority: ticket.priority,
          author: update.author
        });
      });
    }

    // Add urgent notification if priority is high or urgent and status is not resolved/closed
    if (
      (ticket.priority === 'high' || ticket.priority === 'urgent') &&
      !['resolved', 'closed'].includes(ticket.status)
    ) {
      const createdDate = parseTimestamp(ticket.createdDate);
      const daysSinceCreated = (now - createdDate) / (1000 * 60 * 60 * 24);

      if (true) {
        // Show all urgent tickets regardless of date
        const urgentId = `urgent-${ticket.ticketId}`;
        notifications.push({
          id: urgentId,
          type: 'urgent',
          title: `${ticket.priority === 'urgent' ? '🚨 Urgent' : '⚠️ High Priority'} - Requires Attention`,
          message: `${ticket.ticketId}: ${ticket.title} in ${ticket.location}`,
          timestamp: ticket.createdDate,
          ticket,
          isRead: readNotifications.has(urgentId),
          icon: <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />,
          color: theme === 'light' ? 'text-red-600' : 'text-red-400',
          priority: ticket.priority,
          author: ticket.complaintRecievdBy
        });
      }
    }

    // CSAT Rating notification (only for admin and assigned technician)
    if (ticket.csat && (user?.role === 'admin' || ticket.reportedTo === user.name)) {
      const csatDate = parseTimestamp(ticket.completedDate || ticket.createdDate);
      const daysSinceCSAT = (now - csatDate) / (1000 * 60 * 60 * 24);

      if (ticket.csat) {
        // Show all CSAT ratings regardless of date
        const csatId = `csat-${ticket.ticketId}`;
        const stars = '⭐'.repeat(ticket.csat);
        notifications.push({
          id: csatId,
          type: 'rating',
          title: 'Customer Satisfaction Rating',
          message: `${ticket.ticketId}: ${ticket.name} rated your work ${stars} (${ticket.csat}/5)`,
          timestamp: ticket.completedDate || ticket.createdDate,
          ticket,
          isRead: readNotifications.has(csatId),
          icon: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />,
          color:
            ticket.csat >= 4
              ? theme === 'light'
                ? 'text-green-600'
                : 'text-green-400'
              : theme === 'light'
              ? 'text-orange-600'
              : 'text-orange-400',
          priority: ticket.priority,
          author: ticket.name
        });
      }
    }

    // Notification for pending tickets (open for more than 24 hours without assignment)
    if (ticket.status === 'open' && !ticket.reportedTo) {
      const createdDate = parseTimestamp(ticket.createdDate);
      const hoursSinceCreated = (now - createdDate) / (1000 * 60 * 60);

      if (hoursSinceCreated > 24) {
        // Show all pending tickets
        const pendingId = `pending-${ticket.ticketId}`;
        notifications.push({
          id: pendingId,
          type: 'pending',
          title: 'Ticket Awaiting Assignment',
          message: `${ticket.ticketId}: ${ticket.title} - Not yet assigned (${Math.floor(hoursSinceCreated)}h)`,
          timestamp: ticket.createdDate,
          ticket,
          isRead: readNotifications.has(pendingId),
          icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5" />,
          color: theme === 'light' ? 'text-yellow-600' : 'text-yellow-400',
          priority: ticket.priority,
          author: ticket.complaintRecievdBy
        });
      }
    }
  });

  // Sort by priority, then by timestamp (most recent first)
  return notifications.sort((a, b) => {
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;

    const timeA = parseTimestamp(a.timestamp);
    const timeB = parseTimestamp(b.timestamp);
    return timeB.getTime() - timeA.getTime();
  });
};

// ============= NOTIFICATION ITEM COMPONENT =============

export const NotificationItem = ({ notification, theme, onNotificationClick }) => {
  const themeClasses = {
    text: {
      primary: theme === 'light' ? 'text-gray-900' : 'text-gray-100',
      secondary: theme === 'light' ? 'text-gray-600' : 'text-gray-400',
      tertiary: theme === 'light' ? 'text-gray-700' : 'text-gray-300'
    },
    hover: theme === 'light' ? 'hover:bg-[#F6F5F5]' : 'hover:bg-slate-700',
    unreadBg: theme === 'light' ? 'bg-[#D3E0EA]/30' : 'bg-slate-700/50'
  };

  return (
    <div
      className={`p-3 sm:p-4 ${themeClasses.hover} transition-colors cursor-pointer ${
        !notification.isRead ? themeClasses.unreadBg : ''
      }`}
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
              <h4 className={`text-xs sm:text-sm font-semibold ${themeClasses.text.primary}`}>
                {notification.title}
              </h4>
              {(notification.priority === 'urgent' || notification.priority === 'high') && (
                <Badge className="bg-red-100 text-red-700 text-[10px] sm:text-xs">
                  {notification.priority}
                </Badge>
              )}
            </div>
            <span className={`text-[10px] sm:text-xs ${themeClasses.text.secondary} whitespace-nowrap`}>
              {formatTimestamp(notification.timestamp)}
            </span>
          </div>
          
          <p className={`text-xs sm:text-sm ${themeClasses.text.tertiary} mb-1`}>
            {notification.message}
          </p>
          
          {notification.ticket && (
            <div className={`text-[10px] sm:text-xs ${themeClasses.text.secondary} flex flex-wrap items-center gap-1`}>
              <span>{notification.ticket.location}</span>
              <span>•</span>
              <span>{notification.ticket.jobType}</span>
              {notification.author && (
                <>
                  <span>•</span>
                  <span>By {notification.author}</span>
                </>
              )}
            </div>
          )}
          
          {!notification.isRead && (
            <div className="mt-2">
              <span className={`inline-flex items-center gap-1 text-[10px] sm:text-xs text-[#1687A7] font-medium`}>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1687A7] rounded-full"></span>
                New
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};