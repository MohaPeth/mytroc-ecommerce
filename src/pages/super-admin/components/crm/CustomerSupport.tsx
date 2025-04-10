
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LifeBuoy, Filter, MessageSquare, Download, Settings, FileQuestion, Users
} from 'lucide-react';

const CustomerSupport = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Service client</CardTitle>
              <CardDescription>
                Gérez les demandes de support et d'assistance des utilisateurs
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrer
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <FileQuestion className="h-4 w-4" />
                FAQ
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                Agents
              </Button>
              <Button size="sm" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Nouveau ticket
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-md border border-dashed border-gray-200">
            <div className="text-center">
              <LifeBuoy className="h-10 w-10 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Module de Support Client</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Cette section permettra de gérer les tickets de support, les demandes d'assistance et la base de connaissances FAQ pour les utilisateurs.
              </p>
              <Button className="mt-4">Configurer le module</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerSupport;
