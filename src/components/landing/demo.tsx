import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Demo() {
  return (
    <section id="demo" className="py-20 md:py-32">
      <div className="container text-center">
        <h2 className="text-3xl font-bold font-headline md:text-4xl">Lihat Notiflayer Bekerja</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          Scan QR outlet, beri izin notifikasi, dan nikmati pengalaman promosi modern tanpa ribet.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/admin/outlets">Coba Sekarang</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
