
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, CheckSquare, AlertTriangle, XCircle } from 'lucide-react';

interface ScannerProps {
  onScan: (result: string) => void;
}

const QRCodeScanner: React.FC<ScannerProps> = ({ onScan }) => {
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'ready' | 'success' | 'error' | 'warning'>('ready');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // This is a placeholder for the actual scanning logic
  // In a real implementation, you would use a library like jsQR
  const startScanning = () => {
    setScanning(true);
    setMessage('Scanning for QR codes...');
    setStatus('ready');
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch(err => {
          setScanning(false);
          setMessage(`Camera error: ${err.message}`);
          setStatus('error');
        });
    } else {
      setScanning(false);
      setMessage('Your browser does not support camera access');
      setStatus('error');
    }
  };

  const stopScanning = () => {
    setScanning(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // In a real implementation, this would run the QR code detection algorithm
  // on each frame of the video
  useEffect(() => {
    let intervalId: number;
    
    if (scanning) {
      intervalId = window.setInterval(() => {
        if (videoRef.current && canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          
          if (context) {
            context.drawImage(
              videoRef.current, 
              0, 
              0, 
              canvas.width, 
              canvas.height
            );
            
            // Here you would use a library like jsQR to detect QR codes
            // For now we'll just simulate a successful scan after 3 seconds
            window.setTimeout(() => {
              const mockResult = JSON.stringify({
                ticketId: 'ticket-003',
                eventName: 'Match PSG - Marseille',
                eventDate: '2025-04-20',
                venue: 'Parc des Princes',
                ticketType: 'standard-plus',
                owner: 'Jean Dupont'
              });
              
              onScan(mockResult);
              setMessage('Billet validé avec succès!');
              setStatus('success');
              stopScanning();
            }, 3000);
          }
        }
      }, 100);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
      stopScanning();
    };
  }, [scanning, onScan]);

  const renderStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckSquare className="text-green-500 h-8 w-8" />;
      case 'error':
        return <XCircle className="text-red-500 h-8 w-8" />;
      case 'warning':
        return <AlertTriangle className="text-amber-500 h-8 w-8" />;
      default:
        return null;
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Camera className="h-6 w-6" />
          Scanner de Billets
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          {scanning ? (
            <>
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-0"
                width={480}
                height={320}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-white/50 rounded-lg"></div>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              {status !== 'ready' ? (
                <div className="text-center p-4">
                  {renderStatusIcon()}
                  <p className="mt-2">{message}</p>
                </div>
              ) : (
                <p>Appuyez sur "Scanner" pour commencer</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center">
        {scanning ? (
          <Button variant="destructive" onClick={stopScanning}>
            Arrêter
          </Button>
        ) : (
          <Button onClick={startScanning} disabled={status === 'success'}>
            <Camera className="mr-2 h-4 w-4" />
            Scanner
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QRCodeScanner;
