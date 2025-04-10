
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save, X } from 'lucide-react';

interface SalesFormActionsProps {
  onCancel: () => void;
}

const SalesFormActions: React.FC<SalesFormActionsProps> = ({ onCancel }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
      <Button variant="outline" type="button" onClick={onCancel} className="w-full sm:w-auto">
        <X className="mr-2 h-4 w-4" />
        Annuler
      </Button>
      <Button type="submit" className="w-full sm:w-auto">
        <Save className="mr-2 h-4 w-4" />
        Enregistrer
      </Button>
    </div>
  );
};

export default SalesFormActions;
