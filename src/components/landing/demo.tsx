import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Check } from 'lucide-react';

const plans = [
    {
        name: "Satu Cabang",
        price: "49.000",
        description: "Ideal untuk memulai bisnis tunggal.",
        features: [
            "1 Outlet",
            "500 Pelanggan",
            "5 Kampanye/bulan",
            "Manajemen Terpusat"
        ],
        popular: false,
    },
    {
        name: "Banyak Cabang",
        price: "99.000",
        description: "Untuk bisnis yang sedang berkembang.",
        features: [
            "Hingga 10 Outlet",
            "5.000 Pelanggan",
            "Kampanye Tak Terbatas",
            "Manajemen per Outlet",
            "Dukungan Prioritas"
        ],
        popular: true,
    },
    {
        name: "Multi Bisnis & Banyak Cabang",
        price: "199.000",
        description: "Solusi lengkap untuk agensi atau brand besar.",
        features: [
            "Brand & Outlet Tak Terbatas",
            "Pelanggan Tak Terbatas",
            "Segmentasi Lanjutan",
            "Manajer Akun Khusus",
            "Laporan & Analitik API"
        ],
        popular: false,
    },
]

export function Pricing() {
  return (
    <section id="harga" className="py-20 md:py-32">
      <div className="container text-center">
        <h2 className="text-3xl font-bold font-headline md:text-4xl">Langganan yang Sesuai Kebutuhan Anda</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          Pilih paket yang paling pas untuk skala bisnis Anda. Mulai gratis, upgrade kapan saja.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
                <Card key={plan.name} className={`flex flex-col text-left ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                    <CardHeader>
                        <CardTitle className="font-headline">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <p className="text-4xl font-bold mb-4">
                            Rp {plan.price}
                            <span className="text-sm font-normal text-muted-foreground">/bulan</span>
                        </p>
                        <ul className="space-y-3">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center">
                                    <Check className="h-5 w-5 text-green-500 mr-2" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                            <Link href="/login">Pilih Paket</Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
