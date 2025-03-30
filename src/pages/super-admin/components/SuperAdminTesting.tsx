
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestSuite, TestCase, runAllTests, runTestSuite, getAllTestSuites, applyTestFix } from '@/utils/e2eTests';
import { Play, CheckCircle, XCircle, Clock, AlertTriangle, RefreshCw, Download, FileText, SkipForward, Wrench } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SuperAdminTesting = () => {
  const [testSuites, setTestSuites] = useState<TestSuite[]>(getAllTestSuites());
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedSuite, setSelectedSuite] = useState<string>("all");
  const [fixing, setFixing] = useState<Record<string, boolean>>({});
  const reportRef = useRef<HTMLPreElement>(null);

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

  const generateTestReport = () => {
    const now = new Date().toISOString().replace(/:/g, '-').slice(0, 19);
    let reportContent = `# Rapport de tests - ${now}\n\n`;
    
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = 0;
    let fixableTests = 0;
    
    testSuites.forEach(suite => {
      reportContent += `## ${suite.name} - ${suite.status}\n`;
      reportContent += `${suite.description}\n\n`;
      
      suite.tests.forEach(test => {
        totalTests++;
        if (test.status === 'success') passedTests++;
        if (test.status === 'failed') failedTests++;
        if (test.fixAvailable) fixableTests++;
        
        reportContent += `### ${test.name} - ${test.status.toUpperCase()}\n`;
        reportContent += `${test.description}\n`;
        if (test.duration) {
          reportContent += `Durée: ${(test.duration / 1000).toFixed(2)}s\n`;
        }
        if (test.error) {
          reportContent += `Erreur: ${test.error}\n`;
        }
        if (test.fixAvailable) {
          reportContent += `Correction disponible: ${test.fixDescription}\n`;
        }
        reportContent += '\n';
      });
      
      reportContent += '\n';
    });
    
    reportContent += `## Résumé\n`;
    reportContent += `- Total des tests: ${totalTests}\n`;
    reportContent += `- Tests réussis: ${passedTests} (${Math.round((passedTests/totalTests) * 100)}%)\n`;
    reportContent += `- Tests échoués: ${failedTests} (${Math.round((failedTests/totalTests) * 100)}%)\n`;
    reportContent += `- Tests corrigeables: ${fixableTests}\n`;
    
    return reportContent;
  };

  const downloadTestReport = () => {
    const reportContent = generateTestReport();
    const blob = new Blob([reportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-report-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Rapport téléchargé",
      description: "Le rapport de tests a été téléchargé avec succès",
      variant: "default"
    });
  };

  const handleRunTests = async () => {
    try {
      // Réinitialiser l'état
      setRunning(true);
      setProgress(0);
      
      // Réinitialiser tous les tests ou uniquement la suite sélectionnée
      let suitesToRun: TestSuite[];
      if (selectedSuite === "all") {
        setTestSuites(getAllTestSuites());
        suitesToRun = getAllTestSuites();
      } else {
        const allSuites = getAllTestSuites();
        const selectedSuiteObj = allSuites.find(s => s.id === selectedSuite);
        if (!selectedSuiteObj) throw new Error("Suite de tests non trouvée");
        
        setTestSuites(prevSuites => {
          return prevSuites.map(s => s.id === selectedSuite ? 
            {...selectedSuiteObj, status: 'pending', tests: selectedSuiteObj.tests.map(t => ({...t, status: 'pending'}))} : s);
        });
        
        suitesToRun = [selectedSuiteObj];
      }
      
      setExpanded([]);
      
      if (selectedSuite === "all") {
        // Lancer tous les tests
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
            
            // Compter les tests avec corrections disponibles
            const fixableCount = completedSuites.reduce((count, suite) => {
              return count + suite.tests.filter(test => test.fixAvailable).length;
            }, 0);
            
            if (failedCount > 0) {
              toast({
                title: `Tests terminés avec ${failedCount} échec(s)`,
                description: fixableCount > 0 
                  ? `${fixableCount} problème(s) peuvent être corrigés automatiquement`
                  : "Veuillez consulter les résultats détaillés",
                variant: "destructive"
              });
            } else {
              toast({
                title: "Tous les tests ont réussi",
                description: "L'application fonctionne correctement",
                variant: "default"
              });
            }
          }
        );
      } else {
        // Lancer une suite spécifique
        await runTestSuite(
          selectedSuite,
          (test) => {
            // Mettre à jour un test individuel
            setTestSuites(prevSuites => {
              const newSuites = [...prevSuites];
              const suiteIndex = newSuites.findIndex(s => s.id === selectedSuite);
              if (suiteIndex !== -1) {
                const testIndex = newSuites[suiteIndex].tests.findIndex(t => t.id === test.id);
                if (testIndex !== -1) {
                  newSuites[suiteIndex].tests[testIndex] = test;
                  
                  // Si le test a échoué, étendre l'accordéon
                  if (test.status === 'failed' && !expanded.includes(selectedSuite)) {
                    setExpanded(prev => [...prev, selectedSuite]);
                  }
                }
              }
              setProgress(calculateProgress(newSuites));
              return newSuites;
            });
          },
          (suite) => {
            // Mettre à jour la suite complète
            setTestSuites(prevSuites => {
              const newSuites = [...prevSuites];
              const suiteIndex = newSuites.findIndex(s => s.id === suite.id);
              if (suiteIndex !== -1) {
                newSuites[suiteIndex] = suite;
              }
              setRunning(false);
              setProgress(100);
              
              // Vérifier les échecs
              const failedCount = suite.tests.filter(test => test.status === 'failed').length;
              const fixableCount = suite.tests.filter(test => test.fixAvailable).length;
              
              if (failedCount > 0) {
                toast({
                  title: `Suite terminée avec ${failedCount} échec(s)`,
                  description: fixableCount > 0 
                    ? `${fixableCount} problème(s) peuvent être corrigés automatiquement`
                    : "Veuillez consulter les résultats détaillés",
                  variant: "destructive"
                });
              } else {
                toast({
                  title: "Suite de tests réussie",
                  description: "Tous les tests de cette suite ont réussi",
                  variant: "default"
                });
              }
              
              return newSuites;
            });
          }
        );
      }
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

  const handleFixTest = async (testId: string) => {
    try {
      // Marquer le test comme en cours de correction
      setFixing(prev => ({ ...prev, [testId]: true }));
      
      // Appliquer la correction
      const success = await applyTestFix(testId);
      
      if (success) {
        // Mettre à jour l'état du test
        setTestSuites(prevSuites => {
          const newSuites = [...prevSuites];
          
          for (const suite of newSuites) {
            const testIndex = suite.tests.findIndex(t => t.id === testId);
            if (testIndex !== -1) {
              // Marquer le test comme réussi après la correction
              suite.tests[testIndex] = {
                ...suite.tests[testIndex],
                status: 'success',
                error: undefined,
                fixAvailable: false
              };
              
              // Vérifier si tous les tests de la suite sont réussis
              const allSuccess = suite.tests.every(test => test.status === 'success');
              if (allSuccess) {
                suite.status = 'success';
              }
              
              break;
            }
          }
          
          return newSuites;
        });
        
        toast({
          title: "Correction appliquée avec succès",
          description: "Le problème a été résolu automatiquement",
          variant: "default"
        });
      } else {
        toast({
          title: "Échec de la correction",
          description: "La correction automatique n'a pas pu être appliquée",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Erreur lors de la correction:", error);
      toast({
        title: "Erreur lors de la correction",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive"
      });
    } finally {
      // Marquer le test comme n'étant plus en cours de correction
      setFixing(prev => ({ ...prev, [testId]: false }));
    }
  };

  const handleFixAllTests = async () => {
    // Récupérer tous les tests échoués avec une correction disponible
    const testsToFix: string[] = [];
    
    testSuites.forEach(suite => {
      suite.tests.forEach(test => {
        if (test.status === 'failed' && test.fixAvailable) {
          testsToFix.push(test.id);
        }
      });
    });
    
    if (testsToFix.length === 0) {
      toast({
        title: "Aucune correction disponible",
        description: "Il n'y a pas de problèmes pouvant être corrigés automatiquement",
        variant: "default"
      });
      return;
    }
    
    // Appliquer les corrections une par une
    let successCount = 0;
    
    for (const testId of testsToFix) {
      setFixing(prev => ({ ...prev, [testId]: true }));
      
      try {
        const success = await applyTestFix(testId);
        
        if (success) {
          successCount++;
          
          // Mettre à jour l'état du test
          setTestSuites(prevSuites => {
            const newSuites = JSON.parse(JSON.stringify(prevSuites));
            
            for (const suite of newSuites) {
              const testIndex = suite.tests.findIndex((t: TestCase) => t.id === testId);
              if (testIndex !== -1) {
                suite.tests[testIndex].status = 'success';
                suite.tests[testIndex].error = undefined;
                suite.tests[testIndex].fixAvailable = false;
                
                // Vérifier si tous les tests de la suite sont réussis
                const allSuccess = suite.tests.every((test: TestCase) => test.status === 'success');
                if (allSuccess) {
                  suite.status = 'success';
                }
                
                break;
              }
            }
            
            return newSuites;
          });
        }
      } catch (error) {
        console.error(`Erreur lors de la correction du test ${testId}:`, error);
      } finally {
        setFixing(prev => ({ ...prev, [testId]: false }));
      }
    }
    
    toast({
      title: `${successCount} correction(s) appliquée(s)`,
      description: successCount === testsToFix.length 
        ? "Tous les problèmes ont été résolus" 
        : `${testsToFix.length - successCount} correction(s) ont échoué`,
      variant: successCount > 0 ? "default" : "destructive"
    });
  };

  const getTestsStatusCount = () => {
    let success = 0;
    let failed = 0;
    let pending = 0;
    let running = 0;
    let fixable = 0;

    testSuites.forEach(suite => {
      suite.tests.forEach(test => {
        switch (test.status) {
          case 'success': success++; break;
          case 'failed': 
            failed++; 
            if (test.fixAvailable) fixable++;
            break;
          case 'pending': pending++; break;
          case 'running': running++; break;
        }
      });
    });

    return { success, failed, pending, running, fixable };
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
          
          <div className="bg-gray-50 rounded-lg p-4 flex-1 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-2 text-green-600">{statusCount.fixable}</div>
            <div className="text-sm text-gray-500">Corrigeables</div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Select 
            value={selectedSuite} 
            onValueChange={setSelectedSuite}
            disabled={running}
          >
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Sélectionner une suite de tests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les suites</SelectItem>
              {testSuites.map(suite => (
                <SelectItem key={suite.id} value={suite.id}>
                  {suite.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Button
              onClick={handleRunTests}
              disabled={running}
              className={cn("gap-2", running ? "bg-gray-400" : "bg-green-600 hover:bg-green-700")}
            >
              {running ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  En cours...
                </>
              ) : selectedSuite === "all" ? (
                <>
                  <Play className="h-4 w-4" />
                  Exécuter tous les tests
                </>
              ) : (
                <>
                  <SkipForward className="h-4 w-4" />
                  Exécuter cette suite
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              className="gap-2"
              disabled={statusCount.success + statusCount.failed === 0}
              onClick={downloadTestReport}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Rapport</span>
            </Button>
            
            <Button
              variant="green"
              className="gap-2"
              disabled={statusCount.fixable === 0 || running}
              onClick={handleFixAllTests}
            >
              <Wrench className="h-4 w-4" />
              <span>Corriger tous</span>
            </Button>
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
        
        {statusCount.fixable > 0 && !running && (
          <Alert className="bg-green-50 border-green-200">
            <Wrench className="h-4 w-4 text-green-600" />
            <AlertTitle>Corrections automatiques disponibles</AlertTitle>
            <AlertDescription>
              {statusCount.fixable} problème(s) peuvent être corrigés automatiquement. Cliquez sur "Corriger tous" pour les résoudre en une seule fois.
            </AlertDescription>
          </Alert>
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
                      <div key={test.id} className={cn("border rounded-md p-3", 
                        test.status === 'failed' ? "border-red-200 bg-red-50" : 
                        test.status === 'success' ? "border-green-200 bg-green-50" : ""
                      )}>
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
                          <div className="mt-2 p-2 bg-red-100 text-red-600 rounded text-xs font-mono">
                            {test.error}
                          </div>
                        )}
                        {test.status === 'failed' && test.fixAvailable && (
                          <div className="mt-2 flex items-center justify-between">
                            <div className="text-xs text-green-600">
                              <span className="font-medium">Correction disponible:</span> {test.fixDescription}
                            </div>
                            <Button 
                              variant="green" 
                              size="sm" 
                              className="gap-1"
                              disabled={fixing[test.id]}
                              onClick={() => handleFixTest(test.id)}
                            >
                              {fixing[test.id] ? (
                                <>
                                  <RefreshCw className="h-3 w-3 animate-spin" />
                                  Correction...
                                </>
                              ) : (
                                <>
                                  <Wrench className="h-3 w-3" />
                                  Corriger
                                </>
                              )}
                            </Button>
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
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2 w-full">
              <AlertTriangle className="h-4 w-4" />
              Diagnostic de l'environnement de test
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Diagnostic de l'environnement de test</DialogTitle>
              <DialogDescription>
                Informations techniques sur l'environnement d'exécution des tests
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Navigateur</h3>
                <pre className="bg-gray-100 p-3 rounded-md text-xs overflow-x-auto">
                  {`
User Agent: ${navigator.userAgent}
Platform: ${navigator.platform}
Cookies Enabled: ${navigator.cookieEnabled}
Language: ${navigator.language}
                  `.trim()}
                </pre>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Écran</h3>
                <pre className="bg-gray-100 p-3 rounded-md text-xs overflow-x-auto">
                  {`
Width: ${window.innerWidth}px
Height: ${window.innerHeight}px
Device Pixel Ratio: ${window.devicePixelRatio}
                  `.trim()}
                </pre>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Rapport de test</h3>
                <pre ref={reportRef} className="bg-gray-100 p-3 rounded-md text-xs overflow-x-auto whitespace-pre-wrap">
                  {generateTestReport()}
                </pre>
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" className="w-full sm:w-auto" onClick={downloadTestReport}>
                <Download className="h-4 w-4 mr-2" />
                Télécharger le rapport
              </Button>
              <Button className="w-full sm:w-auto">
                Fermer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
      
      <CardFooter>
        <div className="text-sm text-gray-500 w-full">
          <p className="mb-2">
            <strong>Notes:</strong> Ces tests vérifient les fonctionnalités principales de l'application comme la navigation, l'authentification et le processus d'achat.
          </p>
          <p>
            Dernière exécution complète: {statusCount.success + statusCount.failed > 0 ? new Date().toLocaleString() : "Jamais"}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SuperAdminTesting;
