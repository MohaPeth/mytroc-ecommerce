
import React from 'react';
import { ShoppingCart, Percent, Settings, Bell, Check, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface NotificationType {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  action_url?: string;
}

interface NotificationItemProps {
  notification: NotificationType;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  compact?: boolean;
}

export const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'success':
      return <Check className="h-5 w-5 text-green-500" />;
    case 'error':
      return <X className="h-5 w-5 text-red-500" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'info':
    default:
      return <Bell className="h-5 w-5 text-blue-500" />;
  }
};

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onMarkAsRead, 
  onDelete,
  compact = false
}) => {
  const handleActionClick = () => {
    if (notification.action_url) {
      window.location.href = notification.action_url;
    }
  };

  return (
    <div 
      className={cn(
        "border rounded-lg transition-all cursor-pointer relative",
        !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200',
        compact ? 'p-3' : 'p-4'
      )}
      onClick={handleActionClick}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <NotificationIcon type={notification.type} />
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className={cn(
                "font-semibold text-gray-800 truncate",
                compact ? 'text-sm' : 'text-base'
              )}>
                {notification.title}
              </h3>
              <p className={cn(
                "text-gray-600 mt-1",
                compact ? 'text-xs line-clamp-2' : 'text-sm'
              )}>
                {notification.message}
              </p>
              <p className={cn(
                "text-gray-500 mt-1",
                compact ? 'text-xs' : 'text-sm'
              )}>
                {notification.date}
              </p>
            </div>
            <div className="flex gap-1">
              {!notification.read && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-6 w-6 p-0 hover:bg-green-100" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(notification.id);
                  }}
                >
                  <Check className="h-3 w-3 text-green-600" />
                </Button>
              )}
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-6 w-6 p-0 hover:bg-red-100" 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(notification.id);
                }}
              >
                <Trash className="h-3 w-3 text-red-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {!notification.read && (
        <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
      )}
    </div>
  );
};

export default NotificationItem;
