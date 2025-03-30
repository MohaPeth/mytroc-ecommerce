
// Fonctions utilitaires pour les tests end-to-end

export type TestStatus = 'pending' | 'running' | 'success' | 'failed';

export interface TestCase {
  id: string;
  name: string;
  description: string;
  status: TestStatus;
  duration?: number;
  error?: string;
}

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  tests: TestCase[];
  status: TestStatus;
}

// Tests de base pour la démo
const mockTestSuites: TestSuite[] = [
  {
    id: '1',
    name: 'Tests Navigation',
    description: 'Vérification des liens et de la navigation sur le site',
    status: 'pending',
    tests: [
      {
        id: '1-1',
        name: 'Navigation page d\'accueil',
        description: 'Vérifier que la page d\'accueil se charge correctement',
        status: 'pending',
      },
      {
        id: '1-2',
        name: 'Navigation Boutique',
        description: 'Vérifier que la page boutique se charge avec les produits',
        status: 'pending',
      },
      {
        id: '1-3',
        name: 'Navigation Profil',
        description: 'Vérifier l\'accès à la page profil pour les utilisateurs connectés',
        status: 'pending',
      }
    ]
  },
  {
    id: '2',
    name: 'Tests Authentification',
    description: 'Vérification des fonctionnalités d\'authentification',
    status: 'pending',
    tests: [
      {
        id: '2-1',
        name: 'Connexion utilisateur',
        description: 'Vérifier le processus de connexion',
        status: 'pending',
      },
      {
        id: '2-2',
        name: 'Inscription utilisateur',
        description: 'Vérifier le processus d\'inscription',
        status: 'pending',
      },
      {
        id: '2-3',
        name: 'Réinitialisation mot de passe',
        description: 'Vérifier le processus de réinitialisation du mot de passe',
        status: 'pending',
      }
    ]
  },
  {
    id: '3',
    name: 'Tests Processus d\'Achat',
    description: 'Vérification du parcours client de bout en bout',
    status: 'pending',
    tests: [
      {
        id: '3-1',
        name: 'Ajout au panier',
        description: 'Vérifier l\'ajout de produits au panier',
        status: 'pending',
      },
      {
        id: '3-2',
        name: 'Modification quantité panier',
        description: 'Vérifier la modification des quantités dans le panier',
        status: 'pending',
      },
      {
        id: '3-3',
        name: 'Processus de paiement',
        description: 'Vérifier le processus de checkout complet',
        status: 'pending',
      }
    ]
  },
  {
    id: '4',
    name: 'Tests Admin & Super Admin',
    description: 'Vérification des fonctionnalités administratives',
    status: 'pending',
    tests: [
      {
        id: '4-1',
        name: 'Dashboard Admin',
        description: 'Vérifier l\'accès et les fonctionnalités du dashboard admin',
        status: 'pending',
      },
      {
        id: '4-2',
        name: 'Dashboard Super Admin',
        description: 'Vérifier l\'accès et les fonctionnalités du dashboard super admin',
        status: 'pending',
      },
      {
        id: '4-3',
        name: 'Gestion des utilisateurs',
        description: 'Vérifier la gestion des utilisateurs par un super admin',
        status: 'pending',
      }
    ]
  }
];

// Simulation d'exécution de test
const runTest = (test: TestCase): Promise<TestCase> => {
  return new Promise((resolve) => {
    const duration = Math.floor(Math.random() * 2000) + 500; // Entre 500ms et 2500ms
    const success = Math.random() > 0.2; // 80% de chances de succès
    
    setTimeout(() => {
      if (success) {
        resolve({
          ...test,
          status: 'success',
          duration
        });
      } else {
        resolve({
          ...test,
          status: 'failed',
          duration,
          error: 'Erreur lors de l\'exécution du test'
        });
      }
    }, duration);
  });
};

// Exécuter tous les tests d'une suite
export const runTestSuite = async (suiteId: string, onTestComplete: (test: TestCase) => void, onSuiteComplete: (suite: TestSuite) => void): Promise<TestSuite> => {
  const suite = mockTestSuites.find(s => s.id === suiteId);
  
  if (!suite) {
    throw new Error(`Suite de tests ${suiteId} non trouvée`);
  }
  
  const updatedSuite: TestSuite = {
    ...suite,
    status: 'running',
    tests: [...suite.tests]
  };
  
  for (let i = 0; i < updatedSuite.tests.length; i++) {
    updatedSuite.tests[i] = {
      ...updatedSuite.tests[i],
      status: 'running'
    };
    
    onTestComplete(updatedSuite.tests[i]);
    
    updatedSuite.tests[i] = await runTest(updatedSuite.tests[i]);
    
    onTestComplete(updatedSuite.tests[i]);
  }
  
  const allSuccess = updatedSuite.tests.every(test => test.status === 'success');
  updatedSuite.status = allSuccess ? 'success' : 'failed';
  
  onSuiteComplete(updatedSuite);
  
  return updatedSuite;
};

// Exécuter tous les tests
export const runAllTests = async (
  onTestComplete: (test: TestCase, suiteId: string) => void,
  onSuiteComplete: (suite: TestSuite) => void,
  onAllComplete: (suites: TestSuite[]) => void
): Promise<TestSuite[]> => {
  const suites = [...mockTestSuites];
  const updatedSuites: TestSuite[] = [];
  
  for (const suite of suites) {
    const updatedSuite = await runTestSuite(
      suite.id,
      (test) => onTestComplete(test, suite.id),
      onSuiteComplete
    );
    
    updatedSuites.push(updatedSuite);
  }
  
  onAllComplete(updatedSuites);
  
  return updatedSuites;
};

// Récupérer toutes les suites de tests
export const getAllTestSuites = (): TestSuite[] => {
  return [...mockTestSuites];
};
