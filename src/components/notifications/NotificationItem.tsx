
import React from 'react';
import { ShoppingCart, Percent, Settings, Bell, Check, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface NotificationType {
  id: string;
  type: 'order' | 'promo' | 'system' | string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationItemProps {
  notification: NotificationType;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'order':
      return <ShoppingCart className="h-6 w-6 text-mytroc-primary" />;
    case 'promo':
      return <Percent className="h-6 w-6 text-pink-500" />;
    case 'system':
      return <Settings className="h-6 w-6 text-gray-600" />;
    default:
      return <Bell className="h-6 w-6 text-blue-500" />;
  }
};

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onMarkAsRead, 
  onDelete 
}) => {
  return (
    <div 
      className={`p-4 border rounded-lg transition-all ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
    >
      <div className="flex items-start">
        <div className="mr-4 mt-1">
          <NotificationIcon type={notification.type} />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">{notification.title}</h3>
          <p className="text-gray-600 mb-2">{notification.message}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{notification.date}</p>
            <div className="flex space-x-2">
              {!notification.read && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 w-8 p-0" 
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <span className="sr-only">Marquer comme lu</span>
                  <Check className="h-4 w-4" />
                </Button>
              )}
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 w-8 p-0 border-red-200 hover:bg-red-50 hover:text-red-500" 
                onClick={() => onDelete(notification.id)}
              >
                <span className="sr-only">Supprimer</span>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
