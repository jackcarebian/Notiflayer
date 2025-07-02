
"use client";

import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Camera, ScanLine, QrCode, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Redemption = {
  code: string;
  time: Date;
  status: 'Berhasil' | 'Gagal';
};

export default function CashierPage() {
  const [code, setCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [history, setHistory] = useState<Redemption[]>([]);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const { toast } = useToast();

  const handleScanSuccess = (decodedText: string) => {
    setCode(decodedText);
    setIsScanning(false);
    toast({
      title: 'Kode QR Terdeteksi',
      description: `Kode: ${decodedText}`,
    });
  };

  const handleScanError = (errorMessage: string) => {
    // This function is called frequently, so we keep it quiet
    // console.error(`QR Scanner Error: ${errorMessage}`);
  };

  useEffect(() => {
    if (isScanning) {
      if (!scannerRef.current) {
        scannerRef.current = new Html5QrcodeScanner(
          'qr-reader-container',
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            supportedScanTypes: [],
          },
          false // verbose
        );
      }
      scannerRef.current.render(handleScanSuccess, handleScanError);
    } else {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.clear().catch(err => {
          // This can fail if the component is unmounted quickly, so we log softly.
          console.log("Could not clear scanner: ", err);
        });
        scannerRef.current = null;
      }
    }
    
    // Cleanup on component unmount
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.clear().catch(err => console.log("Could not clear scanner on unmount: ", err));
      }
    };
  }, [isScanning]);

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    setIsRedeeming(true);
    // Simulate API call for redemption
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // Simulate success/failure
      const newRedemption: Redemption = {
        code,
        time: new Date(),
        status: isSuccess ? 'Berhasil' : 'Gagal',
      };
      
      setHistory([newRedemption, ...history]);
      
      toast({
        title: isSuccess ? 'Redeem Berhasil' : 'Redeem Gagal',
        description: `Kode promo "${code}" telah diproses.`,
        variant: isSuccess ? 'default' : 'destructive',
      });
      
      setCode('');
      setIsRedeeming(false);
    }, 1000);
  };

  const toggleScanner = () => {
    setIsScanning(!isScanning);
  };
  
  return (
    <div className="space-y-8 flex flex-col items-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <ScanLine className="h-8 w-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl">Promo Redeem</CardTitle>
                        <CardDescription>
                            Masukkan atau pindai kode unik dari pelanggan untuk menebus promo.
                        </CardDescription>
                    </div>
                </div>
                 <Button variant="ghost" size="icon" onClick={toggleScanner}>
                    <QrCode className="h-6 w-6 text-muted-foreground" />
                    <span className="sr-only">Toggle QR Scanner</span>
                 </Button>
            </div>
        </CardHeader>
        <CardContent>
          {isScanning && (
            <div className="mb-4 space-y-2">
              <div id="qr-reader-container" className="w-full"></div>
              <Button onClick={toggleScanner} variant="outline" className="w-full">Tutup Kamera</Button>
            </div>
          )}

          {!isScanning && (
             <form onSubmit={handleRedeem} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="promo-code">Kode Unik Pelanggan</Label>
                <div className="flex gap-2">
                  <Input
                    id="promo-code"
                    placeholder="Contoh: PROMO123XYZ"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                  <Button type="button" variant="outline" size="icon" onClick={toggleScanner}>
                    <Camera className="h-5 w-5" />
                    <span className="sr-only">Pindai Kode QR</span>
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isRedeeming || !code}>
                {isRedeeming && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Tebus Kode
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
      
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Riwayat Redeem Terbaru</CardTitle>
          <CardDescription>
            Menampilkan 10 transaksi redeem terakhir.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode Promo</TableHead>
                  <TableHead>Waktu Redeem</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.length > 0 ? (
                  history.slice(0, 10).map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{item.code}</TableCell>
                      <TableCell>{item.time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</TableCell>
                      <TableCell className="text-right">
                        <div className={`inline-flex items-center gap-2 font-medium ${item.status === 'Berhasil' ? 'text-green-600' : 'text-red-600'}`}>
                          {item.status === 'Berhasil' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                          {item.status}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center h-24">
                      Belum ada riwayat redeem.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
