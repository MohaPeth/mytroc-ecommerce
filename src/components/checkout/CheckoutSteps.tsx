
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const steps = [
  { id: 1, name: 'INFOS PERSONNELLES', path: '/checkout/informations' },
  { id: 2, name: 'DETAILS LIVRAISON', path: '/checkout/livraison' },
  { id: 3, name: 'CONFIRMATION', path: '/checkout/confirmation' },
];

export const CheckoutSteps = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getStepStatus = (path: string) => {
    if (currentPath === path) return 'current';
    if (
      (currentPath === '/checkout/livraison' && path === '/checkout/informations') ||
      (currentPath === '/checkout/confirmation' && ['/checkout/informations', '/checkout/livraison'].includes(path))
    ) {
      return 'completed';
    }
    return 'upcoming';
  };

  return (
    <div className="mb-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">DETAILS LIVRAISON</h1>
      
      <div className="flex items-center">
        {steps.map((step, index) => {
          const status = getStepStatus(step.path);
          
          return (
            <React.Fragment key={step.id}>
              {/* Step circle */}
              <div className="relative">
                <div
                  className={`rounded-full h-12 w-12 flex items-center justify-center border-2 ${
                    status === 'completed'
                      ? 'bg-green-500 border-green-500 text-white'
                      : status === 'current'
                      ? 'border-green-500 text-green-500'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {status === 'completed' ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <div className="mt-2 text-xs font-medium text-center w-32 -ml-10">
                  <span
                    className={`${
                      status === 'completed' || status === 'current'
                        ? 'text-green-500'
                        : 'text-gray-500'
                    }`}
                  >
                    Step {step.id}
                  </span>
                  <p
                    className={`${
                      status === 'completed' || status === 'current'
                        ? 'text-green-600'
                        : 'text-gray-500'
                    } font-medium`}
                  >
                    {step.name}
                  </p>
                </div>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
