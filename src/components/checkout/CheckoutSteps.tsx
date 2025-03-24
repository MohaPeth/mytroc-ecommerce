
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const steps = [{
  id: 1,
  name: 'INFOS PERSONNELLES',
  shortName: 'INFOS',
  path: '/checkout/informations'
}, {
  id: 2,
  name: 'DETAILS LIVRAISON',
  shortName: 'LIVRAISON',
  path: '/checkout/livraison'
}, {
  id: 3,
  name: 'CONFIRMATION',
  shortName: 'CONFIRM',
  path: '/checkout/confirmation'
}];

export const CheckoutSteps = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();

  // Dynamically determine the current title based on pathname
  const getCurrentTitle = () => {
    const currentStep = steps.find(step => step.path === currentPath);
    return currentStep ? currentStep.name : "CHECKOUT";
  };

  const getStepStatus = (path: string) => {
    if (currentPath === path) return 'current';
    if (currentPath === '/checkout/livraison' && path === '/checkout/informations' || 
        currentPath === '/checkout/confirmation' && ['/checkout/informations', '/checkout/livraison'].includes(path)) {
      return 'completed';
    }
    return 'upcoming';
  };

  return <div className="mb-8 md:mb-10">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-gray-800">{getCurrentTitle()}</h1>
      
      <div className="flex items-center justify-between my-6 md:my-[88px]">
        {steps.map((step, index) => {
          const status = getStepStatus(step.path);
          return <React.Fragment key={step.id}>
              {/* Step circle */}
              <div className="relative flex flex-col items-center">
                <Link to={step.path} className="cursor-pointer">
                  <div className={`rounded-full h-8 w-8 md:h-12 md:w-12 flex items-center justify-center border-2 transition-colors ${
                    status === 'completed' ? 'bg-green-500 border-green-500 text-white' : 
                    status === 'current' ? 'border-green-500 text-green-500' : 
                    'border-gray-300 text-gray-400'}`}>
                    {status === 'completed' ? <Check className="h-4 w-4 md:h-6 md:w-6" /> : <span className="text-sm md:text-base">{step.id}</span>}
                  </div>
                </Link>
                <div className="mt-1 md:mt-2 text-[10px] md:text-xs font-medium text-center w-16 md:w-28 overflow-hidden">
                  <span className={`${status === 'completed' || status === 'current' ? 'text-green-500' : 'text-gray-500'}`}>
                    Étape {step.id}
                  </span>
                  <p className={`${status === 'completed' || status === 'current' ? 'text-green-600' : 'text-gray-500'} font-medium truncate`}>
                    {isMobile ? step.shortName : step.name}
                  </p>
                </div>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && <div className={`flex-1 h-0.5 mx-1 md:mx-2 ${
                getStepStatus(steps[index + 1].path) === 'completed' || getStepStatus(step.path) === 'completed' ? 
                'bg-green-500' : 'bg-gray-300'}`} />}
            </React.Fragment>;
        })}
      </div>
    </div>;
};
