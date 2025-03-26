
import React, { useState } from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const AppearanceSettings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Ici, on pourrait ajouter la logique pour appliquer réellement le mode sombre
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-2">Apparence</h2>
      <p className="text-gray-500 mb-6">Personnalisez l'apparence de l'application</p>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Mode sombre</h3>
            <p className="text-sm text-gray-500">Activer le mode sombre pour l'interface</p>
          </div>
          <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
        </div>
        
        <div className="py-6 border-t border-b border-gray-200">
          <div className="flex items-center justify-center gap-8">
            <div 
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-md cursor-pointer transition",
                !isDarkMode ? "bg-gray-100 border-2 border-mytroc-primary" : "hover:bg-gray-100"
              )}
              onClick={() => setIsDarkMode(false)}
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <SunIcon className="h-6 w-6 text-gray-700" />
              </div>
              <span className="font-medium">Clair</span>
            </div>
            
            <div className="text-gray-400 text-lg">→</div>
            
            <div 
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-md cursor-pointer transition",
                isDarkMode ? "bg-gray-900 text-white border-2 border-mytroc-primary" : "bg-gray-900 text-white hover:bg-gray-800"
              )}
              onClick={() => setIsDarkMode(true)}
            >
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-2">
                <MoonIcon className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium">Sombre</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AppearanceSettings;
