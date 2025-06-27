import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, QrCode, ClipboardList, Users, LayoutDashboard, TicketCheck } from 'lucide-react';

const features = [
  {
    icon: <Bell className="h-8 w-8 text-primary" />,
    title: 'Notifikasi Browser',
    description: 'Kirim promosi langsung ke browser HP pelanggan tanpa aplikasi.',
  },
  {
    icon: <QrCode className="h-8 w-8 text-primary" />,
    title: 'QR Code Registrasi',
    description: 'Setiap outlet punya QR unik untuk mengajak pelanggan mendaftar promo.',
  },
  {
    icon: <ClipboardList className="h-8 w-8 text-primary" />,
    title: 'Form Pendaftaran Pelanggan',
    description: 'Kumpulkan data pelanggan lengkap: nama, email, dan minat promo.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Segmentasi Minat Pelanggan',
    description: 'Kirim promo khusus berdasarkan preferensi: Cafe, Kedai, Resto, atau Aksesoris.',
  },
  {
    icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
    title: 'Dashboard Admin',
    description: 'Monitor jumlah pelanggan, statistik QR, dan riwayat redeem promo secara realtime.',
  },
  {
    icon: <TicketCheck className="h-8 w-8 text-primary" />,
    title: 'Fitur Redeem Promo',
    description: 'Kasir scan QR promo dari pelanggan untuk validasi dan input data tebusan.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-headline md:text-4xl">Fitur Utama</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Platform lengkap untuk mengubah pengunjung biasa menjadi pelanggan setia.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6">
              <CardHeader>
                {feature.icon}
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardDescription>{feature.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
