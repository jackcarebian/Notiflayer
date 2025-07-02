
'use client';

import { useState } from 'react';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Megaphone, BarChart3, Edit, User, Calendar, RefreshCw, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleClearCache = async () => {
    setIsRefreshing(true);
    toast({
      title: "Memulai proses...",
      description: "Membersihkan cache dan service worker.",
    });

    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        if (registrations.length) {
          for (const registration of registrations) {
            await registration.unregister();
          }
          toast({
            title: "Service Worker Dihapus",
            description: "Semua service worker berhasil dihapus.",
          });
        } else {
            toast({
                title: "Tidak Ada Service Worker",
                description: "Tidak ada service worker aktif yang ditemukan untuk dihapus.",
            });
        }
      } else {
         toast({
            title: "Service Worker Tidak Didukung",
            description: "Browser Anda tidak mendukung service worker.",
        });
      }

      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(key => caches.delete(key)));
        toast({
          title: "Cache Dibersihkan",
          description: "Cache browser berhasil dibersihkan.",
        });
      }

      toast({
        title: "Selesai!",
        description: "Memuat ulang halaman sekarang...",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      console.error("Gagal membersihkan cache:", error);
      toast({
        variant: "destructive",
        title: "Gagal Membersihkan Cache",
        description: "Terjadi kesalahan saat mencoba membersihkan cache.",
      });
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Selamat datang kembali! Berikut adalah ringkasan aktivitas Anda.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Pelanggan" value="0" icon={<Users />} description="Total pelanggan terdaftar" />
        <StatCard title="Total Kampanye" value="0" icon={<Megaphone />} description="0 kampanye akan datang" />
        <StatCard title="Tingkat Konversi (Mock)" value="0%" icon={<BarChart3 />} description="Berdasarkan kampanye terakhir" />
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-5">
         <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Pertumbuhan Pelanggan</CardTitle>
                <CardDescription>Menunjukkan total kumulatif pelanggan terdaftar dari waktu ke waktu.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-60 flex items-center justify-center text-muted-foreground bg-gray-50 rounded-lg">
                    <p>Belum ada data untuk ditampilkan.</p>
                </div>
            </CardContent>
         </Card>
         <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Distribusi Minat Pelanggan</CardTitle>
                <CardDescription>Jumlah pelanggan berdasarkan kategori minat utama.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="h-60 flex items-center justify-center text-muted-foreground bg-gray-50 rounded-lg">
                    <p>Belum ada data untuk ditampilkan.</p>
                </div>
            </CardContent>
         </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>Mulai aktivitas baru dengan satu klik.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
                <Button asChild>
                    <Link href="/admin/campaign"><Edit className="mr-2 h-4 w-4"/>Buat Kampanye Baru</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/admin/customers"><User className="mr-2 h-4 w-4"/>Lihat Pelanggan</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/admin/calendar"><Calendar className="mr-2 h-4 w-4"/>Kalender Kampanye</Link>
                </Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Utilitas Admin</CardTitle>
                <CardDescription>Alat untuk pemeliharaan dan pemecahan masalah.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleClearCache} disabled={isRefreshing}>
                    {isRefreshing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4"/>
                    )}
                    {isRefreshing ? "Membersihkan..." : "Bersihkan Cache & Segarkan"}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Gunakan ini jika Anda mengalami masalah dengan data yang usang atau notifikasi. Ini akan menghapus paksa service worker dan memuat ulang halaman.
                </p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
