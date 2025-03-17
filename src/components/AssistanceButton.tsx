
import React, { useState } from 'react';
import { MessageCircleQuestion, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const AssistanceButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    toast({
      title: "Message envoyé !",
      description: "Notre équipe vous répondra très rapidement.",
    });
    
    setMessage('');
    // If you want to close the chat after sending a message, uncomment the line below
    // setIsOpen(false);
  };

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-mytroc-secondary shadow-lg hover:bg-mytroc-secondary/90 z-50"
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircleQuestion className="h-6 w-6" />
        )}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 shadow-lg z-50 border border-muted animate-in fade-in-50 slide-in-from-bottom-5">
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
