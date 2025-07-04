
"use client";

import { useState, useEffect } from 'react';
import type { Outlet } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight, Printer } from 'lucide-react';

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
  
  const containerClasses = outlets.length > 1 
    ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : "flex justify-center";

  if (!baseUrl) {
    return (
        <div className={containerClasses}>
            {outlets.map((outlet, i) => (
                <Card key={i} className={outlets.length === 1 ? "w-full max-w-sm" : ""}>
                    <CardHeader>
                        <CardTitle>{outlet.name}</CardTitle>
                        <CardDescription>{outlet.address}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-4">
                        <div className="h-[216px] w-[216px] bg-gray-200 rounded-lg animate-pulse"></div>
                         <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
                         <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
  }

  return (
    <div className={containerClasses}>
      {outlets.map((outlet) => {
        const registrationUrl = `${baseUrl}/reg/${outlet.slug}`;
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(registrationUrl)}&qzone=1`;
        
        return (
          <Card key={outlet.id} className={outlets.length === 1 ? "w-full max-w-sm" : ""}>
            <CardHeader>
              <CardTitle>{outlet.name}</CardTitle>
              <CardDescription>{outlet.address}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <div className="p-2 bg-white rounded-lg border">
                <Image
                  src={qrCodeUrl}
                  alt={`QR Code for ${outlet.name}`}
                  width={200}
                  height={200}
                  data-ai-hint="qr code"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Button asChild variant="outline">
                    <Link href={`/reg/${outlet.slug}`} target="_blank">
                    Test Link <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                <Button asChild>
                  <Link href={`/admin/outlets/${outlet.slug}/print`} target="_blank">
                    <Printer className="mr-2 h-4 w-4" /> Cetak QR
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
