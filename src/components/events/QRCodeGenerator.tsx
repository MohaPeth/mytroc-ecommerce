
import React, { useEffect, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Ticket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface QRCodeGeneratorProps {
  data: {
    ticketId: string;
    eventName: string;
    eventDate: string;
    venue: string;
    ticketType: string;
    owner: string;
  };
  size?: number;
  logoUrl?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  data, 
  size = 200, 
  logoUrl = '/placeholder.svg' 
}) => {
  const [qrCode, setQRCode] = useState<QRCodeStyling | null>(null);
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const QRCode = new QRCodeStyling({
        width: size,
        height: size,
        data: JSON.stringify(data),
        image: logoUrl,
        dotsOptions: {
          color: '#1e40af',
          type: 'rounded'
        },
        cornersSquareOptions: {
          color: '#1e40af',
          type: 'extra-rounded'
        },
        backgroundOptions: {
          color: '#ffffff',
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 10
        }
      });
      
      setQRCode(QRCode);
      
      // Generate URL for the QR code
      QRCode.getRawData('png').then((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setQrUrl(url);
        }
      });
    }
    
    return () => {
      // Clean up the URL when component unmounts
      if (qrUrl) {
        URL.revokeObjectURL(qrUrl);
      }
    };
  }, [data, size, logoUrl]);

  return (
    <Card className="max-w-xs mx-auto">
      <CardContent className="pt-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <Ticket className="mr-2 text-mytroc-primary" />
          <h3 className="font-semibold text-lg">Billet électronique</h3>
        </div>
        
        {qrUrl ? (
          <div className="relative">
            <img 
              src={qrUrl} 
              alt="QR Code du billet" 
              className="mx-auto rounded-lg shadow-md" 
            />
          </div>
        ) : (
          <div 
            className="w-full aspect-square bg-gray-200 animate-pulse rounded-lg flex items-center justify-center"
            style={{ maxWidth: size, maxHeight: size }}
          >
            Génération du QR Code...
          </div>
        )}
        
        <div className="mt-4 text-sm text-gray-600">
          <p><span className="font-semibold">Événement:</span> {data.eventName}</p>
          <p><span className="font-semibold">Date:</span> {data.eventDate}</p>
          <p><span className="font-semibold">Lieu:</span> {data.venue}</p>
          <p><span className="font-semibold">Type de billet:</span> {data.ticketType}</p>
        </div>
        
        <p className="mt-4 text-xs text-gray-500">
          Ce QR code est unique et permet l'accès à l'événement. Ne le partagez pas.
        </p>
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
