
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeeCalculator from './fees/FeeCalculator';
import E2ETestRunner from './tests/E2ETestRunner';

const SuperAdminTesting = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="e2e-tests">
        <TabsList>
          <TabsTrigger value="e2e-tests">Tests E2E</TabsTrigger>
          <TabsTrigger value="fee-calculator">Calculateur de frais</TabsTrigger>
        </TabsList>
        
        <TabsContent value="e2e-tests">
          <E2ETestRunner />
        </TabsContent>
        
        <TabsContent value="fee-calculator">
          <FeeCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminTesting;
