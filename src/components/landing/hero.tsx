import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="py-20 md:py-32">
      <div className="container text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight md:text-5xl lg:text-6xl">
          Semua yang Anda butuhkan untuk menjalankan kampanye promosi yang berhasil.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80 md:text-xl">
          Kirim notifikasi langsung ke browser pelanggan, kumpulkan minat, dan tingkatkan penukaran promo outlet Anda tanpa perlu aplikasi.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/admin/outlets">Lihat Demo</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#features">Pelajari Fitur</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
