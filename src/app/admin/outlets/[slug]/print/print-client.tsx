'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Bell, Printer, ScanLine } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Outlet } from '@/lib/types';

export function PrintClientComponent({ outlet }: { outlet: Outlet }) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    if (typeof window !== 'undefined' && outlet) {
      const registrationUrl = `${window.location.origin}/reg/${outlet.slug}`;
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
        registrationUrl
      )}&qzone=2`;
      setQrCodeUrl(url);
    }
  }, [outlet]);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <div className="container mx-auto p-8 max-w-2xl">
        <header className="flex justify-between items-center pb-4 border-b print:border-none">
          <div className="flex items-center gap-2">
            <Bell className="h-7 w-7 text-primary" />
            <span className="text-2xl font-bold">Notiflayer</span>
          </div>
          <Button onClick={() => window.print()} className="print:hidden">
            <Printer className="mr-2 h-4 w-4" />
            Cetak Halaman Ini
          </Button>
        </header>

        <main className="flex flex-col items-center text-center mt-12 sm:mt-16">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Promo Eksklusif dari <br /> {outlet.name}
          </h1>
          <p className="mt-2 text-lg text-gray-500">{outlet.address}</p>

          <div className="mt-10 sm:mt-12 flex flex-col items-center">
             <div className="flex items-center gap-3 text-primary font-semibold text-lg">
                <ScanLine className="h-7 w-7 transform -scale-x-100" />
                <span>Pindai untuk Bergabung!</span>
                <ScanLine className="h-7 w-7" />
             </div>
            <div className="mt-4 p-4 border-4 border-dashed border-gray-200 rounded-2xl bg-white">
                {qrCodeUrl ? (
                    <Image
                        src={qrCodeUrl}
                        alt={`QR Code untuk ${outlet.name}`}
                        width={300}
                        height={300}
                        priority
                        data-ai-hint="qr code"
                    />
                ) : (
                  <div className="w-[300px] h-[300px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
                    <p className="text-sm text-gray-500">Membuat Kode QR...</p>
                  </div>
                )}
            </div>
          </div>

          <p className="mt-8 max-w-sm text-base text-gray-600">
            Dapatkan notifikasi langsung di HP Anda untuk penawaran spesial, diskon, dan menu baru!
          </p>
        </main>
      </div>
    </div>
  );
}
