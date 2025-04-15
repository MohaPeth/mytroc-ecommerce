
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Mail, FileDown, Megaphone, TagsIcon, Star, Calendar } from 'lucide-react';
import EmailCampaigns from './EmailCampaigns';
import Promotions from './Promotions';
import { toast } from 'sonner';

const MarketingManagement = () => {
  const [activeTab, setActiveTab] = useState('emails');

  const handleExport = () => {
    toast.success('Données marketing exportées avec succès');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Marketing</h2>
          <p className="text-muted-foreground">
            Créez et gérez des campagnes marketing efficaces pour améliorer l'engagement utilisateur
          </p>
        </div>
        <Button variant="outline" className="gap-2" onClick={handleExport}>
          <FileDown className="h-4 w-4" />
          Exporter les données
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="emails" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Campagnes email
          </TabsTrigger>
          <TabsTrigger value="promotions" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            Promotions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="emails" className="mt-6">
          <EmailCampaigns />
        </TabsContent>

        <TabsContent value="promotions" className="mt-6">
          <Promotions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingManagement;
