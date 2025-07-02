import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, QrCode, Users, Send, BrainCircuit, TicketCheck } from 'lucide-react';

const features = [
  {
    icon: <QrCode className="h-8 w-8 text-primary" />,
    title: 'Akses Kode QR',
    description: 'Satu scan untuk registrasi pelanggan dan izin notifikasi. Tanpa perlu install aplikasi.',
  },
  {
    icon: <Bell className="h-8 w-8 text-primary" />,
    title: 'Notifikasi Push Web',
    description: 'Kirim promosi, info produk baru, atau pengumuman langsung ke browser pelanggan.',
  },
  {
    icon: <Send className="h-8 w-8 text-primary" />,
    title: 'Manajemen Kampanye',
    description: 'Buat, jadwalkan, dan broadcast kampanye promosi Anda dengan mudah dan cepat.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Database Pelanggan',
    description: 'Kumpulkan data pelanggan (nama, email, minat) untuk personalisasi promo.',
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Tool Pemasaran AI',
    description: 'Dapatkan rekomendasi waktu dan target promo terbaik dengan bantuan AI.',
  },
  {
    icon: <TicketCheck className="h-8 w-8 text-primary" />,
    title: 'Pencatatan Redeem',
    description: 'Kasir dapat dengan mudah memvalidasi dan mencatat promo yang digunakan pelanggan.',
  },
];

export function Features() {
  return (
    <section id="fitur" className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-headline md:text-4xl">Fitur Unggulan</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Semua yang Anda butuhkan untuk mengubah pengunjung biasa menjadi pelanggan setia.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 transition-transform hover:scale-105 hover:shadow-lg">
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
