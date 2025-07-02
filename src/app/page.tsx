import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircleCode, Rocket, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-800">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <MessageCircleCode className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold">Notiflayer</span>
        </div>
        <nav>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="text-center py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
              Layanan Notifikasi Promo Lokal
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Ubah pengunjung menjadi pelanggan setia melalui notifikasi browser.
              Tanpa aplikasi, tanpa ribet.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/login">Mulai Coba Gratis</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Bagaimana Cara Kerjanya?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="text-blue-500" /> Pelanggan Scan QR
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Pelanggan memindai QR code di outlet Anda, mengisi form
                    minat singkat, dan mengizinkan notifikasi browser.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="text-blue-500" /> Anda Kirim Promo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Anda membuat dan mengirimkan kampanye promosi langsung dari
                    dashboard Notiflayer yang mudah digunakan.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircleCode className="text-blue-500" /> Notifikasi
                    Diterima
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Pelanggan menerima notifikasi promo Anda langsung di
                    browser mereka, siap untuk diredeem di kasir.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500 border-t">
        <p>© 2024 Notiflayer. All rights reserved.</p>
      </footer>
    </div>
  );
}
