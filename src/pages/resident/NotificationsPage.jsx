// src/pages/resident/NotificationsPage.jsx
import { useState ,useEffect} from 'react';
import Footer from '../../components/resident/Footer';
import { Bell } from 'lucide-react';
import {
  Button,
  Badge,
  ScrollArea,
  NotificationItem,
} from '../../components/resident/NotificationsComponents';
import NotificationService from '../../services/notification.service';
import { useTheme } from '../../hooks/useTheme';

export function NotificationsPage({ tickets = [], user = {}, onViewTicket }) {
  const [filter, setFilter] = useState('all');
  const { isDarkMode, bg, cardBg, text, subText, border } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchNotifications();
  }, []);

const fetchNotifications = async () => {
  try {
    setLoading(true);
    const response = await NotificationService.getMyNotifications();
    setNotifications(response.data.notifications);
  } catch (error) {
    console.error("Failed to load notifications", error);
  } finally {
    setLoading(false);
  }
};



  // ============================================================
  //  STATE: Generate notifications (KEEP THIS AS IS)
  // TODO: When using API, replace with: const [notifications, setNotifications] = useState([]);
  // TODO: Then fetch from API in useEffect
  // ============================================================
  
  // ============================================================
  //  STATE: Calculate unread count (THIS IS THE KEY CHANGE)
  const unreadCount = notifications.length;
  //  TODO: When using API, this will automatically update from notifications state
  // ============================================================
 
  
  // Filter notifications
 const filteredNotifications =
  filter === "unread" ? notifications : notifications;


  // Handle notification click

    // ============================================================
    // TODO API: Replace with API call to mark notification as read
    // Example: await fetch(`/api/notifications/${notification.id}/read`, { method: 'POST' });
    // ============================================================
    const handleNotificationClick = async (notification) => {
      try {
        await NotificationService.clearNotification(notification.id);

        // Remove from UI after backend update
        setNotifications((prev) =>
          prev.filter((n) => n.id !== notification.id)
        );

        if (notification.ticket && onViewTicket) {
          onViewTicket(notification.ticket);
        }
      } catch (error) {
        console.error("Failed to clear notification", error);
      }
  };

    

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await Promise.all(
        notifications.map((n) =>
          NotificationService.clearNotification(n.id)
        )
      );
      setNotifications([]);
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  // Theme classes
  const themeClasses = {
    page: bg,
    header: isDarkMode ? 'bg-gradient-to-br from-secondary to-secondary/80' : 'bg-accent',
    card: isDarkMode ? 'bg-secondary/50' : 'bg-white',
    text: {
      primary: text,
      secondary: subText,
      tertiary: isDarkMode ? 'text-primary/80' : 'text-gray-700'
    },
    hover: isDarkMode ? 'hover:bg-primary/10' : 'hover:bg-gray-50',
    unreadBg: isDarkMode ? 'bg-primary/5' : 'bg-accent/5',
    divider: isDarkMode ? 'divide-primary/10' : 'divide-gray-200',
    badge: isDarkMode ? 'bg-primary/10 text-accent' : 'bg-white text-accent',
    emptyStateBg: isDarkMode ? 'bg-primary/10' : 'bg-accent/10',
    emptyStateIcon: 'text-accent',
    buttonActive:
      isDarkMode
        ? 'bg-transparent text-accent border border-accent hover:bg-accent hover:text-secondary'
        : 'bg-transparent text-secondary border border-white hover:bg-white hover:text-accent'
  };

   if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${themeClasses.page}`}
      >
        Loading notifications...
      </div>
    );
  }
  
  return (
    
    <div className={`min-h-screen flex flex-col ${themeClasses.page}`}>
      {/* ============================================================ */}
      {/* CHANGE: Pass unreadCount to Header */}
      {/* ============================================================ */}
      

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
                        isDarkMode={isDarkMode}
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

      <Footer />
    </div>
  );
}

export default NotificationsPage;