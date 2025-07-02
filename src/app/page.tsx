import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, MessageCircleCode, QrCode, Send, LayoutGrid, Users, BrainCircuit, ClipboardCheck, Store, Building2, Globe, Zap, Rocket, MessageSquareText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const howItWorksSteps = [
  { icon: <Zap className="w-8 h-8 text-primary" />, title: "Pelanggan Scan QR", description: "Pelanggan memindai QR code di outlet Anda, mengisi form minat singkat, dan mengizinkan notifikasi browser." },
  { icon: <Rocket className="w-8 h-8 text-primary" />, title: "Anda Kirim Promo", description: "Anda membuat dan mengirimkan kampanye promosi langsung dari dashboard Notiflayer yang mudah digunakan." },
  { icon: <MessageSquareText className="w-8 h-8 text-primary" />, title: "Notifikasi Diterima", description: "Pelanggan menerima notifikasi promo Anda langsung di browser mereka, siap untuk diredeem di kasir." },
];

const features = [
  { icon: <QrCode className="w-8 h-8 text-primary" />, title: "Akses Kode QR", description: "Perluas jangkauan Anda dengan kode QR unik untuk formulir pendaftaran Anda." },
  { icon: <Send className="w-8 h-8 text-primary" />, title: "Notifikasi Push Web", description: "Kirim notifikasi promo langsung ke peramban pelanggan Anda dengan sekali klik." },
  { icon: <LayoutGrid className="w-8 h-8 text-primary" />, title: "Manajemen Kampanye", description: "Buat, jadwalkan, dan lacak kampanye pemasaran Anda dengan mudah." },
  { icon: <Users className="w-8 h-8 text-primary" />, title: "Database Pelanggan", description: "Kelola data pelanggan Anda di satu tempat yang aman dan terorganisir." },
  { icon: <BrainCircuit className="w-8 h-8 text-primary" />, title: "Tool Pemasaran AI", description: "Manfaatkan AI untuk membuat ide kampanye dan mensegmentasi pelanggan Anda." },
  { icon: <ClipboardCheck className="w-8 h-8 text-primary" />, title: "Pencatatan Redeem", description: "Catat setiap promo yang digunakan oleh pelanggan di kasir untuk analisis." },
];

const pricingPlans = [
  {
    icon: <Store className="w-8 h-8 text-primary" />,
    title: "Satu Cabang",
    price: "49.000",
    features: ["6 Kode QR Unik", "5.000 Notifikasi/Bulan", "Analitik Pendaftaran", "Manajemen Terpusat"],
    popular: false,
  },
  {
    icon: <Building2 className="w-8 h-8 text-primary" />,
    title: "Banyak Cabang",
    price: "99.000",
    features: ["Semua di paket Satu Cabang", "Kode QR per-Cabang", "Analitik Lanjutan per-Cabang", "Manajemen Tim", "Dukungan Prioritas"],
    popular: true,
  },
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: "Multi Bisnis dan Banyak Cabang",
    price: "199.000",
    features: ["Semua di paket Banyak Cabang", "Outlet & Brand Tak Terbatas", "Segmentasi Global", "Manajer Akun Khusus", "Integrasi API"],
    popular: false,
  },
];

const addons = [
    { item: "Tambah Cabang (Banyak Cabang)", price: "Rp 40.000 / cabang", note: "Langganan bulanan tetap berlaku per outlet." },
    { item: "Tambah Cabang (Multi Bisnis)", price: "Rp 49.000 / cabang", note: "Diskon 10% jika 4 outlet atau lebih." },
    { item: "Tambah Brand (Multi Bisnis)", price: "Rp 99.000 / brand", note: "Diskon 10% jika 4 putlet atau lebih dari 1 brand." },
    { item: "Upgrade dari 1 Cabang -> Banyak Cabang", price: "Rp 20.000 / sisa hari", note: "Biaya prorata berdasarkan sisa periode berjalan." },
    { item: "Tambah Kampanye Promo Baru", price: "Rp 30.000 / kampanye", note: "Setiap 1 kampanye gratis per bulan per outlet." },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-800">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b">
        <Link href="/" className="flex items-center gap-2">
          <MessageCircleCode className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">Notiflayer</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Coba Gratis</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="text-center py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight max-w-4xl mx-auto lg:text-5xl">
              Semua yang anda perlukan untuk memulai kampanye promo yang efektif dan sukses
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
              Notiflayer adalah platform lengkap untuk mengubah pengunjung menjadi pelanggan
              setia melalui pendaftaran berbasis QR dan notifikasi push yang dipersonalisasi.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/login">Mulai Sekarang</Link>
              </Button>
            </div>
            <div className="mt-12 lg:mt-16">
                 <Image
                    src="https://placehold.co/800x400.png"
                    alt="Hero Image"
                    width={800}
                    height={400}
                    className="rounded-lg mx-auto"
                    data-ai-hint="happy couple phone promotion"
                    priority
                />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Bagaimana Cara Kerjanya?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorksSteps.map((step) => (
                <Card key={step.title} className="p-6 text-left">
                  <div className="flex items-center gap-3 mb-3">
                      {step.icon}
                      <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="bg-slate-50 py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold">Fitur Unggulan</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Temukan fitur canggih yang kami tawarkan untuk memberdayakan strategi pemasaran anda.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold">Langganan Kode QR</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Buka potensi penuh bisnis Anda dengan paket langganan yang paling sesuai.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {pricingPlans.map((plan) => (
                <Card key={plan.title} className={`flex flex-col h-full ${plan.popular ? 'border-2 border-primary shadow-2xl scale-105' : ''}`}>
                   {plan.popular && <div className="text-center py-1 bg-primary text-primary-foreground text-sm font-bold rounded-t-lg -mt-px">Paling Populer</div>}
                  <CardHeader className="items-center text-center">
                     <div className="p-4 bg-primary/10 rounded-full mb-4">
                        {plan.icon}
                     </div>
                    <CardTitle>{plan.title}</CardTitle>
                    <div className="text-4xl font-bold my-4">Rp {plan.price}<span className="text-lg font-normal text-gray-500">/bulan</span></div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>Pilih Paket</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="addons" className="bg-slate-50 py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold">Biaya Penambahan Fleksibel (Add-on)</h2>
                    <p className="mt-4 text-lg text-gray-600">Untuk Member "Banyak Cabang" & "Multi Bisnis"</p>
                </div>
                <Card className="overflow-hidden">
                    <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-2/5">Item Penambahan</TableHead>
                                    <TableHead>Biaya Tambahan</TableHead>
                                    <TableHead className="w-2/5">Keterangan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {addons.map((addon) => (
                                    <TableRow key={addon.item}>
                                        <TableCell className="font-medium">{addon.item}</TableCell>
                                        <TableCell>{addon.price}</TableCell>
                                        <TableCell>{addon.note}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    </CardContent>
                </Card>
                 <Card className="mt-8">
                    <CardContent className="p-6 grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-lg mb-2">Keterangan Tambahan</h3>
                            <ul className="space-y-2 list-disc pl-5 text-gray-600 text-sm">
                                <li>Semua Member baru berhak mendapatkan 1 kampanye promo gratis setiap bulan.</li>
                                <li>Kampanye tambahan bersifat berbayar per jadwal.</li>
                                <li>Sistem secara otomatis akan menagih ulang jika kuota kampanye habis.</li>
                                <li>Penagihan add-on akan digabungkan dengan tagihan bulanan Anda.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-100 p-4 rounded-lg">
                            <h3 className="font-bold text-lg mb-2">Contoh Kasus:</h3>
                            <ul className="space-y-2 list-disc pl-5 text-gray-600 text-sm">
                                <li>Member "Banyak Cabang"</li>
                                <li>Bulan ini sudah menggunakan 1 kampanye promo (gratis).</li>
                                <li>Membuat 2 kampanye tambahan (2 x Rp 30.000).</li>
                                <li className="font-bold text-gray-800">Total Biaya Tambahan: Rp 60.000</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>

      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500 border-t">
        <p>© 2024 Notiflayer. All rights reserved.</p>
      </footer>
    </div>
  );
}
