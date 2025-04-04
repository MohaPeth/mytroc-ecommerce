
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, AlertTriangle, Play, Clock, ArrowRight, FileDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { 
  TestCase, 
  TestSuite, 
  TestStatus, 
  runTestSuite, 
  runAllTests, 
  getAllTestSuites,
  applyTestFix
} from '@/utils/e2eTests';

const statusIcons = {
  pending: <Clock className="h-5 w-5 text-gray-400" />,
  running: <Play className="h-5 w-5 text-blue-500 animate-pulse" />,
  success: <Check className="h-5 w-5 text-green-500" />,
  failed: <AlertTriangle className="h-5 w-5 text-red-500" />
};

const statusColors = {
  pending: "bg-gray-200 text-gray-800",
  running: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800"
};

const E2ETestRunner = () => {
  const [testSuites, setTestSuites] = useState<TestSuite[]>(getAllTestSuites());
  const [runningTests, setRunningTests] = useState<boolean>(false);
  const [expandedSuites, setExpandedSuites] = useState<string[]>([]);
  
  // Gérer l'exécution d'une suite de tests spécifique
  const handleRunSuite = (suiteId: string) => {
    if (runningTests) return;
    
    setRunningTests(true);
    
    // Mettre à jour le statut de la suite et des tests
    setTestSuites(prev => 
      prev.map(suite => {
        if (suite.id === suiteId) {
          return {
            ...suite,
            status: 'running',
            tests: suite.tests.map(test => ({
              ...test,
              status: 'running',
              error: undefined
            }))
          };
        }
        return suite;
      })
    );
    
    // Si la suite n'est pas déjà développée, la développer
    if (!expandedSuites.includes(suiteId)) {
      setExpandedSuites(prev => [...prev, suiteId]);
    }
    
    // Exécuter la suite de tests
    runTestSuite(
      suiteId,
      (updatedTest) => {
        // Mise à jour d'un test individuel
        setTestSuites(prev => 
          prev.map(suite => {
            if (suite.id === suiteId) {
              return {
                ...suite,
                tests: suite.tests.map(test => 
                  test.id === updatedTest.id ? updatedTest : test
                )
              };
            }
            return suite;
          })
        );
      },
      (updatedSuite) => {
        // Mise à jour de la suite complète
        setTestSuites(prev => 
          prev.map(suite => 
            suite.id === updatedSuite.id ? updatedSuite : suite
          )
        );
        
        setRunningTests(false);
        
        // Afficher une notification
        if (updatedSuite.status === 'success') {
          toast({
            title: "Tests réussis",
            description: `Tous les tests de la suite "${updatedSuite.name}" ont réussi.`,
          });
        } else {
          toast({
            title: "Tests échoués",
            description: `Certains tests de la suite "${updatedSuite.name}" ont échoué.`,
            variant: "destructive",
          });
        }
      }
    ).catch(error => {
      console.error("Erreur lors de l'exécution des tests:", error);
      setRunningTests(false);
      
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'exécution des tests.",
        variant: "destructive",
      });
    });
  };
  
  // Gérer l'exécution de tous les tests
  const handleRunAllTests = () => {
    if (runningTests) return;
    
    setRunningTests(true);
    
    // Mettre à jour le statut de toutes les suites et tests
    setTestSuites(prev => 
      prev.map(suite => ({
        ...suite,
        status: 'running',
        tests: suite.tests.map(test => ({
          ...test,
          status: 'running',
          error: undefined
        }))
      }))
    );
    
    // Développer toutes les suites
    setExpandedSuites(testSuites.map(suite => suite.id));
    
    // Exécuter tous les tests
    runAllTests(
      (updatedTest, suiteId) => {
        // Mise à jour d'un test individuel
        setTestSuites(prev => 
          prev.map(suite => {
            if (suite.id === suiteId) {
              return {
                ...suite,
                tests: suite.tests.map(test => 
                  test.id === updatedTest.id ? updatedTest : test
                )
              };
            }
            return suite;
          })
        );
      },
      (updatedSuite) => {
        // Mise à jour de la suite complète
        setTestSuites(prev => 
          prev.map(suite => 
            suite.id === updatedSuite.id ? updatedSuite : suite
          )
        );
      },
      (updatedSuites) => {
        // Mise à jour de toutes les suites
        setTestSuites(updatedSuites);
        setRunningTests(false);
        
        const failedSuites = updatedSuites.filter(suite => suite.status === 'failed');
        
        if (failedSuites.length > 0) {
          toast({
            title: "Tests terminés avec des erreurs",
            description: `${failedSuites.length} suite(s) de tests ont échoué.`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Tous les tests ont réussi",
            description: "Toutes les suites de tests ont passé avec succès.",
          });
        }
      }
    ).catch(error => {
      console.error("Erreur lors de l'exécution des tests:", error);
      setRunningTests(false);
      
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'exécution des tests.",
        variant: "destructive",
      });
    });
  };
  
  // Gérer l'application d'une correction automatique
  const handleApplyFix = (testId: string, testName: string) => {
    toast({
      title: "Application de la correction...",
      description: `Tentative de correction automatique pour "${testName}"`,
    });
    
    applyTestFix(testId)
      .then(success => {
        if (success) {
          toast({
            title: "Correction appliquée",
            description: `La correction pour "${testName}" a été appliquée avec succès.`,
          });
          
          // Réinitialiser le statut du test concerné
          setTestSuites(prev => 
            prev.map(suite => ({
              ...suite,
              tests: suite.tests.map(test => {
                if (test.id === testId) {
                  return {
                    ...test,
                    status: 'pending',
                    error: undefined,
                    fixAvailable: false
                  };
                }
                return test;
              })
            }))
          );
        } else {
          toast({
            title: "Échec de la correction",
            description: `La correction pour "${testName}" n'a pas pu être appliquée.`,
            variant: "destructive",
          });
        }
      })
      .catch(error => {
        console.error("Erreur lors de l'application de la correction:", error);
        
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'application de la correction.",
          variant: "destructive",
        });
      });
  };
  
  // Formater la durée en millisecondes
  const formatDuration = (ms?: number) => {
    if (!ms) return "N/A";
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tests end-to-end</CardTitle>
          <CardDescription>
            Lancez et visualisez les résultats des tests automatisés de la plateforme.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div>
                <h3 className="text-lg font-semibold">Suites de tests</h3>
                <p className="text-sm text-muted-foreground">
                  {testSuites.length} suites disponibles, {testSuites.filter(s => s.status === 'success').length} réussies,{' '}
                  {testSuites.filter(s => s.status === 'failed').length} échouées
                </p>
              </div>
              <Button 
                onClick={handleRunAllTests} 
                disabled={runningTests}
                className="w-full md:w-auto"
              >
                <Play className="mr-2 h-4 w-4" />
                Exécuter tous les tests
              </Button>
            </div>
            
            {testSuites.map((suite) => (
              <Accordion 
                key={suite.id} 
                type="multiple" 
                value={expandedSuites}
                onValueChange={setExpandedSuites}
                className="border rounded-lg"
              >
                <AccordionItem value={suite.id} className="border-none">
                  <AccordionTrigger className="px-4 py-2 hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {statusIcons[suite.status]}
                        <span>{suite.name}</span>
                      </div>
                      <Badge className={statusColors[suite.status]}>
                        {suite.status === 'pending' && 'En attente'}
                        {suite.status === 'running' && 'En cours'}
                        {suite.status === 'success' && 'Réussi'}
                        {suite.status === 'failed' && 'Échec'}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row justify-between gap-2">
                        <p className="text-sm text-muted-foreground">{suite.description}</p>
                        <Button 
                          size="sm" 
                          onClick={() => handleRunSuite(suite.id)}
                          disabled={runningTests}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Exécuter cette suite
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {suite.tests.map((test) => (
                          <Card key={test.id} className="overflow-hidden">
                            <div className={`p-4 ${
                              test.status === 'success' ? 'bg-green-50' : 
                              test.status === 'failed' ? 'bg-red-50' : 
                              test.status === 'running' ? 'bg-blue-50' : 'bg-gray-50'
                            }`}>
                              <div className="flex flex-col md:flex-row justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  {statusIcons[test.status]}
                                  <div>
                                    <h4 className="font-medium">{test.name}</h4>
                                    <p className="text-sm text-muted-foreground">{test.description}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {test.duration && (
                                    <Badge variant="outline">
                                      {formatDuration(test.duration)}
                                    </Badge>
                                  )}
                                  <Badge className={statusColors[test.status]}>
                                    {test.status === 'pending' && 'En attente'}
                                    {test.status === 'running' && 'En cours'}
                                    {test.status === 'success' && 'Réussi'}
                                    {test.status === 'failed' && 'Échec'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            
                            {(test.steps || test.error || test.fixAvailable) && (
                              <CardContent className="pt-4">
                                {test.steps && (
                                  <div className="mb-4">
                                    <h5 className="text-sm font-semibold mb-2">Étapes du test</h5>
                                    <ul className="space-y-1 text-sm">
                                      {test.steps.map((step, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                          <ArrowRight className="h-4 w-4 text-muted-foreground mt-0.5" />
                                          <span>{step}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                
                                {test.error && (
                                  <Alert variant="destructive" className="mb-4">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Erreur détectée</AlertTitle>
                                    <AlertDescription>{test.error}</AlertDescription>
                                  </Alert>
                                )}
                                
                                {test.fixAvailable && test.status === 'failed' && (
                                  <div className="flex justify-end">
                                    <Button 
                                      variant="outline" 
                                      onClick={() => handleApplyFix(test.id, test.name)}
                                    >
                                      <Check className="mr-2 h-4 w-4" />
                                      Appliquer une correction automatique
                                    </Button>
                                  </div>
                                )}
                              </CardContent>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            <FileDown className="mr-2 h-4 w-4" />
            Exporter les résultats
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default E2ETestRunner;
