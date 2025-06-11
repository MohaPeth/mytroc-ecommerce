
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  error?: string;
}

const TestRunner = () => {
  const [tests, setTests] = useState<TestCase[]>([
    {
      id: 'cart-add',
      name: 'Add Item to Cart',
      description: 'Test adding products to cart functionality',
      status: 'pending'
    },
    {
      id: 'search-products',
      name: 'Search Products',
      description: 'Test product search with filters',
      status: 'pending'
    },
    {
      id: 'checkout-flow',
      name: 'Checkout Process',
      description: 'Test complete checkout workflow',
      status: 'pending'
    },
    {
      id: 'user-auth',
      name: 'User Authentication',
      description: 'Test login/logout functionality',
      status: 'pending'
    }
  ]);

  const runTest = async (testId: string) => {
    setTests(prev => prev.map(test => 
      test.id === testId ? { ...test, status: 'running' } : test
    ));

    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    // Random pass/fail for demo
    const passed = Math.random() > 0.3;
    
    setTests(prev => prev.map(test => 
      test.id === testId ? { 
        ...test, 
        status: passed ? 'passed' : 'failed',
        error: passed ? undefined : 'Test failed: Assertion error'
      } : test
    ));
  };

  const runAllTests = async () => {
    for (const test of tests) {
      await runTest(test.id);
    }
  };

  const getStatusIcon = (status: TestCase['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: TestCase['status']) => {
    const variants = {
      pending: 'secondary',
      running: 'default',
      passed: 'success',
      failed: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status] || 'secondary'}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Test Runner
          <Button onClick={runAllTests}>Run All Tests</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tests.map(test => (
            <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(test.status)}
                <div>
                  <h4 className="font-medium">{test.name}</h4>
                  <p className="text-sm text-muted-foreground">{test.description}</p>
                  {test.error && (
                    <p className="text-sm text-red-500 mt-1">{test.error}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(test.status)}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => runTest(test.id)}
                  disabled={test.status === 'running'}
                >
                  Run
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestRunner;
