'use client';

import { RegistrationForm } from '@/components/registration-form';
import { outlets } from '@/lib/outlets';
import { MessageCircleCode } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    outlet: string;
  };
};

export default function RegistrationPage({ params }: Props) {
  const outlet = outlets.find((o) => o.slug === params.outlet);

  if (!outlet) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <header className="flex flex-col items-center text-center gap-4 mb-8">
            <Link href="/" className="flex items-center gap-2 text-primary">
                <MessageCircleCode className="h-8 w-8" />
                <span className="text-2xl font-bold">Notiflayer</span>
            </Link>
            <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Form Pendaftaran Promo</h1>
                <p className="text-lg text-muted-foreground mt-1">
                    Khusus untuk <span className="font-semibold text-primary">{outlet.name}</span>
                </p>
            </div>
        </header>

        <main>
          <RegistrationForm outlet={outlet} />
        </main>

        <footer className="text-center mt-8">
             <p className="text-xs text-gray-500">
                Powered by Notiflayer © {new Date().getFullYear()}
             </p>
        </footer>
      </div>
    </div>
  );
}