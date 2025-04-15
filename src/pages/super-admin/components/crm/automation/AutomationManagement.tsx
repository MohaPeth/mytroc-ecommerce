
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Zap, Bell, Users, FileDown } from 'lucide-react';
import AutomationWorkflows from './AutomationWorkflows';
import AutomationSegments from './AutomationSegments';
import AutomationRules from './AutomationRules';
import { toast } from 'sonner';

const AutomationManagement = () => {
  const [activeTab, setActiveTab] = useState('workflows');

  const handleExport = () => {
    toast.success('Configurations d\'automatisation exportées avec succès');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Automatisation</h2>
          <p className="text-muted-foreground">
            Réduisez le travail manuel grâce à des workflows automatisés et des rappels intelligents
          </p>
        </div>
        <Button variant="outline" className="gap-2" onClick={handleExport}>
          <FileDown className="h-4 w-4" />
          Exporter les configurations
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="workflows" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="segments" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Segmentation
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Règles & Alertes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="mt-6">
          <AutomationWorkflows />
        </TabsContent>

        <TabsContent value="segments" className="mt-6">
          <AutomationSegments />
        </TabsContent>

        <TabsContent value="rules" className="mt-6">
          <AutomationRules />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutomationManagement;
