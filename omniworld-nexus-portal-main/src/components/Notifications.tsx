
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle,
  X,
  Trash2
} from 'lucide-react';

interface NotificationsProps {
  children: React.ReactNode;
}

export const Notifications: React.FC<NotificationsProps> = ({ children }) => {
  const { notifications, markNotificationAsRead, clearNotifications } = useCart();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      default:
        return <Info className="h-4 w-4 text-blue-400" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-900/20 border-green-700';
      case 'error':
        return 'bg-red-900/20 border-red-700';
      case 'warning':
        return 'bg-yellow-900/20 border-yellow-700';
      default:
        return 'bg-blue-900/20 border-blue-700';
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-slate-900 border-slate-700">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-sky-300 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </SheetTitle>
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearNotifications}
                className="text-slate-400 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="flex flex-col h-full pt-4">
          {notifications.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No notifications yet</p>
                <p className="text-sm">We'll notify you about important updates</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-3">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`${getNotificationBg(notification.type)} ${
                    notification.read ? 'opacity-70' : ''
                  } cursor-pointer transition-all hover:opacity-100`}
                  onClick={() => !notification.read && markNotificationAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sky-300 text-sm">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-slate-300 text-sm mt-1">
                          {notification.message}
                        </p>
                        <p className="text-slate-500 text-xs mt-2">
                          {notification.timestamp.toLocaleTimeString()} • {notification.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
