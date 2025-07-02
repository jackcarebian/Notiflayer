import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="py-20 md:py-24">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold font-headline tracking-tight md:text-5xl lg:text-6xl">
            Platform Notifikasi Promo Untuk Bisnis Lokal
          </h1>
          <p className="mt-6 max-w-2xl mx-auto md:mx-0 text-lg text-foreground/80 md:text-xl">
            Ubah pengunjung menjadi pelanggan setia melalui notifikasi browser yang personal. Tanpa perlu aplikasi, tanpa ribet.
          </p>
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <Button asChild size="lg">
              <Link href="/login">Mulai Gratis</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#fitur">Pelajari Fitur</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image 
            src="https://placehold.co/600x400.png"
            alt="Dua orang tersenyum sambil memegang ponsel yang menampilkan notifikasi promo"
            width={600}
            height={400}
            className="rounded-xl shadow-2xl"
            data-ai-hint="happy couple phone promotion"
          />
        </div>
      </div>
    </section>
  );
}
