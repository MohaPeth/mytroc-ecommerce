
import React, { useState } from 'react';
import { MessageCircleQuestion, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useNotificationStore } from '@/stores/notificationStore';

interface AssistanceButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

const AssistanceButton: React.FC<AssistanceButtonProps> = ({
  position = 'bottom-right',
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { addNotification } = useNotificationStore();
  const [message, setMessage] = useState('');

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Ajouter une notification de confirmation
    addNotification({
      title: "Message envoyé",
      message: "Notre équipe vous répondra très rapidement.",
      type: "success",
      read: false
    });

    toast({
      title: "Message envoyé !",
      description: "Notre équipe vous répondra très rapidement."
    });

    setMessage('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={toggleChat}
        className={`fixed ${positionClasses[position]} z-40 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ${className}`}
        size="icon"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircleQuestion className="h-5 w-5" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className={`fixed ${position.includes('bottom') ? 'bottom-20' : 'top-20'} ${position.includes('right') ? 'right-6' : 'left-6'} w-80 md:w-96 shadow-lg z-50 border border-muted animate-in fade-in-50 slide-in-from-bottom-5`}>
          <CardHeader className="bg-mytroc-secondary text-white rounded-t-lg">
            <CardTitle className="text-lg">Assistance client</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-6">
            <div className="space-y-4">
              <div className="bg-mytroc-secondary/10 p-3 rounded-lg text-sm">
                <p>
                  Bonjour ! Comment puis-je vous aider aujourd'hui ? Notre service client est disponible 6j/7.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <Textarea
                  placeholder="Posez votre question ici..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Service disponible 6j/7
                  </p>
                  <Button type="submit" disabled={!message.trim()}>
                    Envoyer
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AssistanceButton;
