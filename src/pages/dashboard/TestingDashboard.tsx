
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TestRunner from '@/components/testing/TestRunner';
import { Shield, Target, CheckCircle } from 'lucide-react';

const TestingDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Testing Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unit Tests</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              Coverage rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Integration Tests</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12/15</div>
            <p className="text-xs text-muted-foreground">
              Tests passing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">E2E Tests</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8/10</div>
            <p className="text-xs text-muted-foreground">
              Scenarios passing
            </p>
          </CardContent>
        </Card>
      </div>

      <TestRunner />

      {/* Test Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Testing Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Unit Testing</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Test individual components in isolation</li>
                <li>• Mock external dependencies</li>
                <li>• Focus on component behavior and props</li>
                <li>• Test edge cases and error states</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Integration Testing</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Test component interactions</li>
                <li>• Verify API integrations</li>
                <li>• Test complete user workflows</li>
                <li>• Check data flow between components</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestingDashboard;
