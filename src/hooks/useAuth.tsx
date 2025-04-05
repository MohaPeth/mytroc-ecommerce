
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// Types d'utilisateurs disponibles
export type UserRole = 'super-admin' | 'vendor' | 'customer';

// Structure d'un utilisateur
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

// Utilisateurs de test prédéfinis
export const testUsers: User[] = [
  {
    id: '1',
    email: 'admin@mytroc.com',
    name: 'Admin System',
    role: 'super-admin',
  },
  {
    id: '2',
    email: 'vendeur@mytroc.com',
    name: 'Jean Dupont',
    role: 'vendor',
  },
  {
    id: '3',
    email: 'client@mytroc.com',
    name: 'Marie Martin',
    role: 'customer',
  }
];

interface AuthContextType {
  currentUser: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifie si un utilisateur est déjà connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('mytroc-user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.isLoggedIn) {
          setCurrentUser(userData.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        localStorage.removeItem('mytroc-user');
      }
    }
  }, []);

  // Fonction de connexion
  const login = (email: string): boolean => {
    const user = testUsers.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('mytroc-user', JSON.stringify({ user, isLoggedIn: true }));
      return true;
    }
    return false;
  };

  // Fonction de déconnexion
  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('mytroc-user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé avec un AuthProvider');
  }
  return context;
};
