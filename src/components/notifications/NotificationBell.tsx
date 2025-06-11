
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';
import { Link } from 'react-router-dom';

const NotificationBell = () => {
  const { unreadCount } = useNotifications();

  return (
    <Link to="/notifications">
      <Button variant="ghost" size="sm" className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
        <span className="sr-only">
          {unreadCount > 0 ? `${unreadCount} notifications non lues` : 'Notifications'}
        </span>
      </Button>
    </Link>
  );
};

export default NotificationBell;
