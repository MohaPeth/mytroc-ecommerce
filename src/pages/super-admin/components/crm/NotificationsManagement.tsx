
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bell, Filter, Send, MessageSquare, Download, Settings
} from 'lucide-react';

const NotificationsManagement = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Gestion des notifications</CardTitle>
              <CardDescription>
                Gérez et personnalisez les notifications envoyées aux utilisateurs
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrer
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Exporter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Paramètres
              </Button>
              <Button size="sm" className="gap-2">
                <Send className="h-4 w-4" />
                Nouvelle notification
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-md border border-dashed border-gray-200">
            <div className="text-center">
              <Bell className="h-10 w-10 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Module de Notifications</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Cette section permettra de configurer et gérer les notifications automatiques envoyées aux utilisateurs par email, SMS et notifications push.
              </p>
              <Button className="mt-4">Configurer le module</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsManagement;
