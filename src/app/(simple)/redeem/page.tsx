"use client";

import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner, Html5QrcodeResult, QrcodeSuccessCallback } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { QrCode, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RedeemPage() {
  const [manualCode, setManualCode] = useState('');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const { toast } = useToast();

  const handleScanSuccess: QrcodeSuccessCallback = (decodedText, decodedResult) => {
    setScanResult(decodedText);
    setIsScanning(false);
    if (scannerRef.current) {
      scannerRef.current.clear().catch(error => {
        console.error("Failed to clear scanner.", error);
      });
      scannerRef.current = null;
    }
    toast({
      title: 'Kode QR Terdeteksi',
      description: `Kode: ${decodedText}`,
    });
  };

  const handleScanError = (errorMessage: string) => {
    // console.log(`QR Code no longer in front of camera: ${errorMessage}`);
  };

  useEffect(() => {
    if (isScanning) {
      if (!scannerRef.current) {
        scannerRef.current = new Html5QrcodeScanner(
          'qr-reader',
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            supportedScanTypes: [],
          },
          false
        );
      }
      scannerRef.current.render(handleScanSuccess, handleScanError);
    } else {
        if (scannerRef.current) {
            scannerRef.current.clear().catch(err => console.error(err));
            scannerRef.current = null;
        }
    }
    
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
            console.error("Failed to clear scanner on cleanup.", error);
        });
      }
    };
  }, [isScanning]);


  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode) return;
    setScanResult(manualCode);
    toast({
      title: 'Kode Manual Dimasukkan',
      description: `Kode: ${manualCode}`,
    });
  };

  const resetState = () => {
    setScanResult(null);
    setManualCode('');
    setIsScanning(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Redeem Kode Promo</CardTitle>
          <CardDescription>
            Pindai QR code atau masukkan kode secara manual untuk validasi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!scanResult ? (
            <div className="space-y-6">
              <div id="qr-reader" className={!isScanning ? 'hidden' : ''}></div>
              {!isScanning && (
                <Button onClick={() => setIsScanning(true)} className="w-full" size="lg">
                  <QrCode className="mr-2 h-5 w-5" />
                  Pindai QR Code Promo
                </Button>
              )}
               {isScanning && (
                <Button onClick={() => setIsScanning(false)} className="w-full" variant="outline">
                  Tutup Kamera
                </Button>
              )}
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Atau</span>
                </div>
              </div>

              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="manual-code">Masukkan Kode Manual</Label>
                  <Input
                    id="manual-code"
                    placeholder="Contoh: PROMO-XYZ123"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={!manualCode}>
                  Validasi Kode
                </Button>
              </form>
            </div>
          ) : (
            <div className="space-y-4 text-center">
               {scanResult.toLowerCase().includes('valid') ? (
                 <Alert variant="default" className="bg-green-50 border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertTitle className="text-green-800">Promo Valid!</AlertTitle>
                    <AlertDescription className="text-green-700">
                        Kode promo <strong>{scanResult}</strong> berhasil divalidasi dan dapat digunakan.
                    </AlertDescription>
                 </Alert>
               ) : (
                <Alert variant="destructive">
                    <XCircle className="h-5 w-5" />
                    <AlertTitle>Promo Tidak Valid</AlertTitle>
                    <AlertDescription>
                     Kode promo <strong>{scanResult}</strong> tidak ditemukan atau sudah digunakan.
                    </AlertDescription>
                </Alert>
               )}
              
              <Button onClick={resetState} className="w-full">
                Scan Lagi
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}