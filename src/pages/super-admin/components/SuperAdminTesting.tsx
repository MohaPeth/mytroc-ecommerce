
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestSuite, TestCase, runAllTests, getAllTestSuites } from '@/utils/e2eTests';
import { Play, CheckCircle, XCircle, Clock, AlertTriangle, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const SuperAdminTesting = () => {
  const [testSuites, setTestSuites] = useState<TestSuite[]>(getAllTestSuites());
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState<string[]>([]);

  const getStatusBadge = (status: 'pending' | 'running' | 'success' | 'failed') => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
          <Clock className="h-3 w-3" />
          <span>En attente</span>
        </Badge>;
      case 'running':
        return <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 border-blue-200">
          <RefreshCw className="h-3 w-3 animate-spin" />
          <span>En cours</span>
        </Badge>;
      case 'success':
        return <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 border-green-200">
          <CheckCircle className="h-3 w-3" />
          <span>Succès</span>
        </Badge>;
      case 'failed':
        return <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 border-red-200">
          <XCircle className="h-3 w-3" />
          <span>Échec</span>
        </Badge>;
    }
  };

  const calculateProgress = (suites: TestSuite[]): number => {
    let totalTests = 0;
    let completedTests = 0;

    suites.forEach(suite => {
      suite.tests.forEach(test => {
        totalTests++;
        if (test.status === 'success' || test.status === 'failed') {
          completedTests++;
        }
      });
    });

    return totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0;
  };

  const handleRunTests = async () => {
    try {
      // Réinitialiser l'état
      setRunning(true);
      setProgress(0);
      
      // Réinitialiser tous les tests
      setTestSuites(getAllTestSuites());
      setExpanded([]);
      
      // Lancer les tests
      await runAllTests(
        (test, suiteId) => {
          // Mettre à jour un test individuel
          setTestSuites(prevSuites => {
            const newSuites = [...prevSuites];
            const suiteIndex = newSuites.findIndex(s => s.id === suiteId);
            if (suiteIndex !== -1) {
              const testIndex = newSuites[suiteIndex].tests.findIndex(t => t.id === test.id);
              if (testIndex !== -1) {
                newSuites[suiteIndex].tests[testIndex] = test;
                
                // Si le test a échoué, étendre l'accordéon pour montrer les détails
                if (test.status === 'failed' && !expanded.includes(suiteId)) {
                  setExpanded(prev => [...prev, suiteId]);
                }
              }
            }
            setProgress(calculateProgress(newSuites));
            return newSuites;
          });
        },
        (suite) => {
          // Mettre à jour une suite complète
          setTestSuites(prevSuites => {
            const newSuites = [...prevSuites];
            const suiteIndex = newSuites.findIndex(s => s.id === suite.id);
            if (suiteIndex !== -1) {
              newSuites[suiteIndex] = suite;
            }
            return newSuites;
          });
        },
        (completedSuites) => {
          // Tous les tests sont terminés
          setRunning(false);
          setProgress(100);
          
          // Compter les échecs
          const failedCount = completedSuites.reduce((count, suite) => {
            return count + suite.tests.filter(test => test.status === 'failed').length;
          }, 0);
          
          if (failedCount > 0) {
            toast({
              title: `Tests terminés avec ${failedCount} échec(s)`,
              description: "Veuillez consulter les résultats détaillés",
              variant: "destructive"
            });
          } else {
            toast({
              title: "Tous les tests ont réussi",
              description: "L'application fonctionne correctement",
              variant: "success"
            });
          }
        }
      );
    } catch (error) {
      console.error("Erreur lors de l'exécution des tests:", error);
      setRunning(false);
      toast({
        title: "Erreur lors de l'exécution des tests",
        description: "Veuillez réessayer ultérieurement",
        variant: "destructive"
      });
    }
  };

  const handleToggleAccordion = (value: string) => {
    if (expanded.includes(value)) {
      setExpanded(expanded.filter(id => id !== value));
    } else {
      setExpanded([...expanded, value]);
    }
  };

  const getTestsStatusCount = () => {
    let success = 0;
    let failed = 0;
    let pending = 0;
    let running = 0;

    testSuites.forEach(suite => {
      suite.tests.forEach(test => {
        switch (test.status) {
          case 'success': success++; break;
          case 'failed': failed++; break;
          case 'pending': pending++; break;
          case 'running': running++; break;
        }
      });
    });

    return { success, failed, pending, running };
  };

  const statusCount = getTestsStatusCount();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Tests End-to-End Automatisés</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <AlertTriangle className="h-4 w-4" />
                À propos des tests
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tests End-to-End</DialogTitle>
                <DialogDescription>
                  Les tests end-to-end simulent le comportement d'un utilisateur réel sur le site, vérifiant que tous les composants fonctionnent correctement ensemble.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <p className="text-sm">Dans un environnement de production, ces tests:</p>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>Utilisent des frameworks comme Cypress ou Playwright</li>
                  <li>S'exécutent dans un navigateur réel ou headless</li>
                  <li>Testent l'application de bout en bout</li>
                  <li>Peuvent être programmés pour s'exécuter automatiquement</li>
                </ul>
                <p className="text-sm">
                  <strong>Note:</strong> Dans cette démo, les résultats des tests sont simulés pour démontrer l'interface utilisateur.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" className="w-full">Fermer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardDescription>
          Exécutez des tests automatisés pour vérifier le bon fonctionnement de l'application
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="bg-gray-50 rounded-lg p-4 flex-1 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-2">{testSuites.length}</div>
            <div className="text-sm text-gray-500">Suites de Tests</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 flex-1 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-2">{statusCount.success}</div>
            <div className="text-sm text-gray-500">Tests Réussis</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 flex-1 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-2 text-red-500">{statusCount.failed}</div>
            <div className="text-sm text-gray-500">Tests Échoués</div>
          </div>
        </div>
        
        {running && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression des tests</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        <Accordion
          type="multiple"
          value={expanded}
          className="w-full"
        >
          {testSuites.map((suite) => (
            <AccordionItem key={suite.id} value={suite.id}>
              <AccordionTrigger onClick={() => handleToggleAccordion(suite.id)} className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center">
                    <span className="font-medium">{suite.name}</span>
                    <span className="ml-2 text-xs text-gray-500">({suite.tests.length} tests)</span>
                  </div>
                  {getStatusBadge(suite.status)}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 py-2 space-y-3">
                  <p className="text-sm text-gray-500">{suite.description}</p>
                  <div className="space-y-2">
                    {suite.tests.map((test) => (
                      <div key={test.id} className="border rounded-md p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium text-sm">{test.name}</div>
                          {getStatusBadge(test.status)}
                        </div>
                        <div className="text-xs text-gray-500 mb-2">{test.description}</div>
                        {test.status !== 'pending' && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {test.duration ? `${(test.duration / 1000).toFixed(2)}s` : 'N/A'}
                          </div>
                        )}
                        {test.status === 'failed' && test.error && (
                          <div className="mt-2 p-2 bg-red-50 text-red-600 rounded text-xs">
                            {test.error}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleRunTests} 
          disabled={running}
          className={cn("w-full gap-2", running ? "bg-gray-400" : "bg-green-600 hover:bg-green-700")}
        >
          {running ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Exécution des tests en cours...
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Lancer tous les tests
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SuperAdminTesting;
