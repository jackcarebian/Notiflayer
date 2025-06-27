"use client";

import { useState, useEffect } from 'react';
import type { Outlet } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

type OutletsQrListProps = {
  outlets: Outlet[];
};

export function OutletsQrList({ outlets }: OutletsQrListProps) {
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  if (!baseUrl) {
    return <div>Loading QR Codes...</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {outlets.map((outlet) => {
        const registrationUrl = `${baseUrl}/reg/${outlet.slug}`;
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(registrationUrl)}&qzone=1`;
        
        return (
          <Card key={outlet.id}>
            <CardHeader>
              <CardTitle>{outlet.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <div className="p-4 bg-white rounded-lg">
                <Image
                  src={qrCodeUrl}
                  alt={`QR Code for ${outlet.name}`}
                  width={200}
                  height={200}
                  data-ai-hint="qr code"
                />
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/reg/${outlet.slug}`}>
                  Go to Registration Page <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
