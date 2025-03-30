import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check } from 'lucide-react';
const steps = [{
  id: 1,
  name: 'INFOS PERSONNELLES',
  path: '/checkout/informations'
}, {
  id: 2,
  name: 'DETAILS LIVRAISON',
  path: '/checkout/livraison'
}, {
  id: 3,
  name: 'CONFIRMATION',
  path: '/checkout/confirmation'
}];
export const CheckoutSteps = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Dynamically determine the current title based on pathname
  const getCurrentTitle = () => {
    const currentStep = steps.find(step => step.path === currentPath);
    return currentStep ? currentStep.name : "CHECKOUT";
  };
  const getStepStatus = (path: string) => {
    if (currentPath === path) return 'current';
    if (currentPath === '/checkout/livraison' && path === '/checkout/informations' || currentPath === '/checkout/confirmation' && ['/checkout/informations', '/checkout/livraison'].includes(path)) {
      return 'completed';
    }
    return 'upcoming';
  };
  return <div className="mb-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">{getCurrentTitle()}</h1>
      
      
    </div>;
};