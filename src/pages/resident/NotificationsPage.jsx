// src/pages/resident/NotificationsPage.jsx
import { useState } from 'react';
import { Header } from '../../components/resident/Header';
import Footer from '../../components/resident/Footer';
import { Bell } from 'lucide-react';
import {
  Button,
  Badge,
  ScrollArea,
  NotificationItem,
  generateNotifications
} from '../../components/resident/NotificationsComponents';

export function NotificationsPage({ tickets = [], user = {}, onViewTicket }) {
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');
  const [readNotifications, setReadNotifications] = useState(new Set());

  // ============================================================
  //  STATE: Generate notifications (KEEP THIS AS IS)
  // TODO: When using API, replace with: const [notifications, setNotifications] = useState([]);
  // TODO: Then fetch from API in useEffect
  // ============================================================
  const notifications = generateNotifications(tickets, user, theme, readNotifications);
  
  // ============================================================
  //  STATE: Calculate unread count (THIS IS THE KEY CHANGE)
  //  TODO: When using API, this will automatically update from notifications state
  // ============================================================
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  
  // Filter notifications
  const filteredNotifications = filter === 'unread'
    ? notifications.filter((n) => !n.isRead)
    : notifications;

  // Handle notification click
  const handleNotificationClick = (notification) => {
    // ============================================================
    // TODO API: Replace with API call to mark notification as read
    // Example: await fetch(`/api/notifications/${notification.id}/read`, { method: 'POST' });
    // ============================================================
    setReadNotifications((prev) => new Set([...prev, notification.id]));
    
    if (notification.ticket && onViewTicket) {
      onViewTicket(notification.ticket);
    }
  };

  // Mark all as read
  const markAllAsRead = () => {
    // ============================================================
    // TODO API: Replace with API call to mark all as read
    // Example: await fetch('/api/notifications/mark-all-read', { method: 'POST' });
    // ============================================================
    const allIds = notifications.map((n) => n.id);
    setReadNotifications(new Set(allIds));
  };

  // Theme classes
  const themeClasses = {
    page: theme === 'light' ? 'bg-[#F6F5F5]' : 'bg-slate-900',
    header: theme === 'light' ? 'bg-[#1687A7]' : 'bg-gradient-to-br from-slate-800 to-slate-900',
    card: theme === 'light' ? 'bg-white' : 'bg-slate-800',
    text: {
      primary: theme === 'light' ? 'text-gray-900' : 'text-gray-100',
      secondary: theme === 'light' ? 'text-gray-600' : 'text-gray-400',
      tertiary: theme === 'light' ? 'text-gray-700' : 'text-gray-300'
    },
    hover: theme === 'light' ? 'hover:bg-[#F6F5F5]' : 'hover:bg-slate-700',
    unreadBg: theme === 'light' ? 'bg-[#D3E0EA]/30' : 'bg-slate-700/50',
    divider: theme === 'light' ? 'divide-[#D3E0EA]' : 'divide-slate-700',
    badge: theme === 'light' ? 'bg-white text-[#1687A7]' : 'bg-slate-700 text-cyan-400',
    emptyStateBg: theme === 'light' ? 'bg-[#D3E0EA]' : 'bg-slate-700',
    emptyStateIcon: theme === 'light' ? 'text-[#1687A7]' : 'text-cyan-400',
    buttonActive:
      theme === 'light'
        ? 'bg-transparent text-white border border-white hover:bg-white hover:text-[#1687A7]'
        : 'bg-transparent text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-slate-900'
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.page}`}>
      {/* ============================================================ */}
      {/* CHANGE: Pass unreadCount to Header */}
      {/* ============================================================ */}
      <Header 
        userName={user.name} 
        apartment={user.apartment} 
        notificationCount={unreadCount}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">
        <div className="max-w-4xl mx-auto">
          <div className={`${themeClasses.card} rounded-xl sm:rounded-2xl shadow-lg overflow-hidden min-h-[500px] sm:min-h-[600px]`}>
            <div className="h-full flex flex-col">
              
              {/* Notifications Header */}
              <div className={`${themeClasses.header} p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-lg sm:rounded-xl">
                      <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white text-xl sm:text-2xl font-bold">Notifications</h2>
                      <p className="text-white/80 text-xs sm:text-sm">
                        {user.role === 'resident' && `Viewing tickets for ${user.name}`}
                        {user.role === 'technician' && `Your assigned tickets`}
                        {user.role === 'admin' && `All system notifications`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    {unreadCount > 0 && (
                      <Badge className={`${themeClasses.badge} px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold`}>
                        {unreadCount} new
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => setFilter('all')}
                      size="sm"
                      className={`text-xs sm:text-sm ${
                        filter === 'all'
                          ? themeClasses.buttonActive
                          : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                      }`}
                    >
                      All ({notifications.length})
                    </Button>
                    <Button
                      onClick={() => setFilter('unread')}
                      size="sm"
                      className={`text-xs sm:text-sm ${
                        filter === 'unread'
                          ? themeClasses.buttonActive
                          : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                      }`}
                    >
                      Unread ({unreadCount})
                    </Button>
                  </div>

                  {unreadCount > 0 && (
                    <Button
                      onClick={markAllAsRead}
                      size="sm"
                      className="text-xs sm:text-sm bg-white/20 text-white border border-white/30 hover:bg-white/30"
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
              </div>

              {/* Notifications List */}
              <ScrollArea
                className={`flex-1 ${themeClasses.card} rounded-b-xl sm:rounded-b-2xl`}
                style={{ maxHeight: 'calc(100vh - 350px)' }}
              >
                {filteredNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center">
                    <div className={`${themeClasses.emptyStateBg} p-4 sm:p-6 rounded-full mb-3 sm:mb-4`}>
                      <Bell className={`h-8 w-8 sm:h-12 sm:w-12 ${themeClasses.emptyStateIcon}`} />
                    </div>
                    <h3 className={`text-base sm:text-lg ${themeClasses.text.primary} font-semibold mb-2`}>
                      No notifications
                    </h3>
                    <p className={`text-xs sm:text-sm ${themeClasses.text.secondary}`}>
                      {filter === 'unread'
                        ? "You're all caught up! 🎉"
                        : "You'll see updates about your tickets here"}
                    </p>
                  </div>
                ) : (
                  <div className={`divide-y ${themeClasses.divider}`}>
                    {filteredNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        theme={theme}
                        onNotificationClick={handleNotificationClick}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </main>

      <Footer theme={theme} />
    </div>
  );
}

export default NotificationsPage;