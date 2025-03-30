
// Fonctions utilitaires pour les tests end-to-end

export type TestStatus = 'pending' | 'running' | 'success' | 'failed';

export interface TestCase {
  id: string;
  name: string;
  description: string;
  status: TestStatus;
  duration?: number;
  error?: string;
  steps?: string[];
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
        steps: [
          'Accéder à l\'URL /',
          'Vérifier le chargement du header',
          'Vérifier le chargement du slider',
          'Vérifier les catégories mises en avant',
          'Vérifier le chargement du footer'
        ]
      },
      {
        id: '1-2',
        name: 'Navigation Boutique',
        description: 'Vérifier que la page boutique se charge avec les produits',
        status: 'pending',
        steps: [
          'Accéder à l\'URL /boutique',
          'Vérifier le chargement des filtres',
          'Vérifier l\'affichage des produits',
          'Tester la pagination',
          'Tester le tri des produits'
        ]
      },
      {
        id: '1-3',
        name: 'Navigation Profil',
        description: 'Vérifier l\'accès à la page profil pour les utilisateurs connectés',
        status: 'pending',
        steps: [
          'Se connecter avec un compte valide',
          'Accéder à l\'URL /profile',
          'Vérifier l\'affichage des informations du profil',
          'Vérifier l\'accès aux différents onglets du profil'
        ]
      },
      {
        id: '1-4',
        name: 'Responsive Design',
        description: 'Vérifier que le site s\'adapte correctement aux différentes tailles d\'écran',
        status: 'pending',
        steps: [
          'Tester sur mobile (375px)',
          'Tester sur tablette (768px)',
          'Tester sur desktop (1280px)',
          'Vérifier le menu hamburger sur mobile',
          'Vérifier l\'adaptation des images et composants'
        ]
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
        steps: [
          'Accéder à la page de connexion',
          'Entrer des identifiants valides',
          'Soumettre le formulaire',
          'Vérifier la redirection après connexion réussie',
          'Vérifier la présence du token d\'authentification'
        ]
      },
      {
        id: '2-2',
        name: 'Inscription utilisateur',
        description: 'Vérifier le processus d\'inscription',
        status: 'pending',
        steps: [
          'Accéder à la page d\'inscription',
          'Remplir le formulaire avec des données valides',
          'Soumettre le formulaire',
          'Vérifier la création du compte',
          'Vérifier l\'envoi d\'un email de confirmation'
        ]
      },
      {
        id: '2-3',
        name: 'Réinitialisation mot de passe',
        description: 'Vérifier le processus de réinitialisation du mot de passe',
        status: 'pending',
        steps: [
          'Accéder à la page de réinitialisation',
          'Entrer une adresse email valide',
          'Vérifier l\'envoi d\'un email de réinitialisation',
          'Accéder au lien de réinitialisation',
          'Définir un nouveau mot de passe'
        ]
      },
      {
        id: '2-4',
        name: 'Validation de sécurité',
        description: 'Vérifier les mécanismes de sécurité de l\'authentification',
        status: 'pending',
        steps: [
          'Tester la protection contre les attaques par force brute',
          'Vérifier l\'expiration des jetons de session',
          'Tester la déconnexion automatique après inactivité',
          'Vérifier les redirections sécurisées'
        ]
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
        steps: [
          'Accéder à la page d\'un produit',
          'Cliquer sur le bouton "Ajouter au panier"',
          'Vérifier la mise à jour du compteur du panier',
          'Vérifier que le produit apparaît dans le panier',
          'Vérifier le calcul correct du prix total'
        ]
      },
      {
        id: '3-2',
        name: 'Modification quantité panier',
        description: 'Vérifier la modification des quantités dans le panier',
        status: 'pending',
        steps: [
          'Accéder au panier avec des produits',
          'Modifier la quantité d\'un produit',
          'Vérifier la mise à jour du prix total',
          'Supprimer un produit du panier',
          'Vérifier que le panier est mis à jour correctement'
        ]
      },
      {
        id: '3-3',
        name: 'Processus de paiement',
        description: 'Vérifier le processus de checkout complet',
        status: 'pending',
        steps: [
          'Procéder au checkout depuis le panier',
          'Remplir les informations personnelles',
          'Passer à l\'étape de livraison',
          'Choisir une méthode de livraison',
          'Procéder au paiement et vérifier la confirmation'
        ]
      },
      {
        id: '3-4',
        name: 'Validation des commandes',
        description: 'Vérifier que les commandes sont correctement enregistrées',
        status: 'pending',
        steps: [
          'Finaliser une commande',
          'Vérifier l\'email de confirmation',
          'Vérifier l\'historique des commandes dans le profil',
          'Accéder aux détails de la commande',
          'Vérifier la correspondance avec les produits achetés'
        ]
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
        steps: [
          'Se connecter en tant qu\'administrateur',
          'Accéder au dashboard admin',
          'Vérifier l\'affichage des statistiques',
          'Vérifier l\'accès à la gestion des produits',
          'Vérifier l\'accès à la gestion des commandes'
        ]
      },
      {
        id: '4-2',
        name: 'Dashboard Super Admin',
        description: 'Vérifier l\'accès et les fonctionnalités du dashboard super admin',
        status: 'pending',
        steps: [
          'Se connecter en tant que super admin',
          'Accéder au dashboard super admin',
          'Vérifier les privilèges étendus',
          'Vérifier l\'accès à tous les modules',
          'Vérifier les fonctionnalités de configuration système'
        ]
      },
      {
        id: '4-3',
        name: 'Gestion des utilisateurs',
        description: 'Vérifier la gestion des utilisateurs par un super admin',
        status: 'pending',
        steps: [
          'Accéder au module de gestion des utilisateurs',
          'Créer un nouvel utilisateur',
          'Modifier les permissions d\'un utilisateur',
          'Désactiver un compte utilisateur',
          'Vérifier l\'application des changements'
        ]
      },
      {
        id: '4-4',
        name: 'Contrôles de sécurité',
        description: 'Vérifier les mécanismes de sécurité administratifs',
        status: 'pending',
        steps: [
          'Tester les contrôles d\'accès par rôle',
          'Vérifier la journalisation des actions administratives',
          'Tester l\'authentification à deux facteurs',
          'Vérifier les restrictions IP si configurées',
          'Tester les limites de session administratives'
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Tests Performance',
    description: 'Vérification des performances du site',
    status: 'pending',
    tests: [
      {
        id: '5-1',
        name: 'Chargement initial',
        description: 'Mesurer le temps de chargement initial du site',
        status: 'pending',
        steps: [
          'Mesurer le First Contentful Paint',
          'Mesurer le Largest Contentful Paint',
          'Évaluer le Time to Interactive',
          'Vérifier les requêtes réseau',
          'Analyser la taille des bundles JS'
        ]
      },
      {
        id: '5-2',
        name: 'Performance recherche',
        description: 'Vérifier les performances du moteur de recherche',
        status: 'pending',
        steps: [
          'Effectuer des recherches simples',
          'Effectuer des recherches complexes avec filtres',
          'Mesurer le temps de réponse',
          'Vérifier le comportement avec un grand nombre de résultats',
          'Tester l\'auto-complétion'
        ]
      },
      {
        id: '5-3',
        name: 'Optimisation mobile',
        description: 'Vérifier les performances sur les appareils mobiles',
        status: 'pending',
        steps: [
          'Tester sur une connexion 3G simulée',
          'Vérifier le chargement des images optimisées',
          'Mesurer l\'interaction et le défilement',
          'Évaluer la consommation de batterie',
          'Tester avec des contraintes de mémoire'
        ]
      }
    ]
  }
];

// Erreurs courantes pour simulation
const commonErrors = [
  "Le composant ne s'est pas chargé dans le délai imparti",
  "Élément non trouvé dans le DOM: .product-card",
  "La redirection attendue vers /checkout n'a pas eu lieu",
  "Échec de la requête API: 404 Not Found",
  "Exception non gérée: Cannot read property 'length' of undefined",
  "Test timeout après 30s",
  "Le formulaire n'a pas pu être soumis en raison d'un champ invalide",
  "Le total du panier calculé ne correspond pas à la somme attendue"
];

// Simulation d'exécution de test
const runTest = (test: TestCase): Promise<TestCase> => {
  return new Promise((resolve) => {
    const duration = Math.floor(Math.random() * 2000) + 500; // Entre 500ms et 2500ms
    
    // Pour la démo, ajoutons une probabilité d'échec plus réaliste
    // Les tests de performance échouent plus souvent
    let failureProbability = 0.2; // 20% de base
    
    if (test.id.startsWith('5-')) {
      failureProbability = 0.4; // 40% pour les tests de performance
    }
    
    const success = Math.random() > failureProbability;
    
    setTimeout(() => {
      if (success) {
        resolve({
          ...test,
          status: 'success',
          duration
        });
      } else {
        // Sélectionner une erreur commune ou générer une spécifique au test
        let errorMessage = commonErrors[Math.floor(Math.random() * commonErrors.length)];
        
        // Pour les tests spécifiques, ajoutons des erreurs plus pertinentes
        if (test.id === '3-3') {
          errorMessage = "La passerelle de paiement a renvoyé une erreur: INVALID_CARD_NUMBER";
        } else if (test.id === '2-4') {
          errorMessage = "Vulnérabilité détectée: Les tokens JWT n'expirent pas correctement";
        } else if (test.id === '5-2') {
          errorMessage = "Temps de réponse excessif: La requête a pris 8.2s (seuil: 3s)";
        }
        
        resolve({
          ...test,
          status: 'failed',
          duration,
          error: errorMessage
        });
      }
    }, duration);
  });
};

// Exécuter tous les tests d'une suite
export const runTestSuite = async (
  suiteId: string, 
  onTestComplete: (test: TestCase) => void, 
  onSuiteComplete: (suite: TestSuite) => void
): Promise<TestSuite> => {
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
  return JSON.parse(JSON.stringify(mockTestSuites));
};
