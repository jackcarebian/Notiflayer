"use client";

import { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner, Html5QrcodeError, Html5QrcodeResult } from 'html5-qrcode';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { QrCode, AlertCircle, CheckCircle, RotateCcw } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

const qrboxFunction = (viewfinderWidth: number, viewfinderHeight: number) => {
    const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
    const qrboxSize = Math.floor(minEdge * 0.7);
    return {
        width: qrboxSize,
        height: qrboxSize,
    };
}

export default function RedeemPage() {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    const handleScanSuccess = (decodedText: string, result: Html5QrcodeResult) => {
        if (scannerRef.current) {
            scannerRef.current.clear().catch(err => {
                console.error("Failed to clear scanner", err);
            });
        }
        setIsScanning(false);
        setScanResult(decodedText);
        toast({
            title: "QR Code Terbaca!",
            description: "Kode promo berhasil divalidasi.",
        });
    };

    const handleScanError = (errorMessage: string, error: Html5QrcodeError) => {
        if (!errorMessage.includes("No QR code found")) {
            console.error(`QR Code scan error: ${errorMessage}`);
            setError("Terjadi kesalahan saat memindai. Coba lagi.");
            if (scannerRef.current) {
                scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
            }
            setIsScanning(false);
        }
    };
    
    const startScan = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => {
                setError(null);
                setIsScanning(true);
                setScanResult(null);

                setTimeout(() => {
                    if (document.getElementById('reader')) {
                        const scanner = new Html5QrcodeScanner(
                            'reader', 
                            { 
                                fps: 10, 
                                qrbox: qrboxFunction,
                                rememberLastUsedCamera: true,
                                supportedScanTypes: []
                            },
                            false
                        );
                        scanner.render(handleScanSuccess, handleScanError);
                        scannerRef.current = scanner;
                    }
                }, 100);
            })
            .catch(err => {
                console.error("Camera permission denied:", err);
                setError("Izin kamera diperlukan untuk memindai QR code. Aktifkan di pengaturan browser Anda.");
                toast({
                    variant: "destructive",
                    title: "Akses Kamera Ditolak",
                    description: "Mohon izinkan akses kamera untuk menggunakan fitur ini.",
                });
            });
    };

    const resetScanner = () => {
        if (scannerRef.current) {
            scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
        }
        scannerRef.current = null;
        setScanResult(null);
        setIsScanning(false);
        setError(null);
        startScan();
    }
    
    useEffect(() => {
        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(err => console.error("Failed to clear scanner on unmount", err));
            }
        };
    }, []);

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-headline">Redeem Promo</CardTitle>
                <CardDescription>
                    Scan QR code promo pelanggan untuk validasi.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-6 p-6 min-h-[350px]">
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {!isScanning && !scanResult && (
                    <>
                        <div className="p-8 bg-primary/10 rounded-full">
                            <QrCode className="h-20 w-20 text-primary" />
                        </div>
                        <Button size="lg" className="w-full" onClick={startScan}>
                            Mulai Scan QR Code
                        </Button>
                    </>
                )}
                
                <div id="reader" className={`w-full ${!isScanning ? 'hidden' : ''}`}></div>

                {scanResult && (
                    <div className="flex flex-col items-center gap-4 text-center w-full">
                        <CheckCircle className="h-20 w-20 text-green-500" />
                        <h3 className="text-xl font-semibold">Promo Tervalidasi!</h3>
                        <Card className="w-full bg-secondary">
                            <CardContent className="p-4">
                                <p className="text-sm text-muted-foreground">Data Pindaian:</p>
                                <p className="font-mono break-all text-sm">{scanResult}</p>
                            </CardContent>
                        </Card>
                        <Button size="lg" className="w-full" onClick={() => { setScanResult(null); setError(null); setIsScanning(false); }}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Scan Lagi
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
