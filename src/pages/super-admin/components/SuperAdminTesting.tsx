
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeeCalculator from './fees/FeeCalculator';

const SuperAdminTesting = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="fee-calculator">
        <TabsList>
          <TabsTrigger value="fee-calculator">Calculateur de frais</TabsTrigger>
          <TabsTrigger value="e2e-tests">Tests E2E</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fee-calculator">
          <FeeCalculator />
        </TabsContent>
        
        <TabsContent value="e2e-tests">
          <Card>
            <CardHeader>
              <CardTitle>Tests end-to-end</CardTitle>
              <CardDescription>
                Lancez et visualisez les résultats des tests automatisés de la plateforme.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                La fonctionnalité de tests automatisés sera implémentée prochainement.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminTesting;
