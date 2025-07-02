import { StatCard } from '@/components/dashboard/stat-card';
import { RecentCustomers } from '@/components/dashboard/recent-customers';
import { CustomerCharts } from '@/components/dashboard/charts';
import { Users, Bell, QrCode, ScanLine } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Ringkasan aktivitas bisnis Anda.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Pelanggan" value="2.389" icon={<Users />} />
        <StatCard title="Kampanye Terkirim" value="12" icon={<Bell />} />
        <StatCard title="Total Outlet" value="4" icon={<QrCode />} />
        <StatCard title="Promo Diredeem" value="152" icon={<ScanLine />} />
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
         <CustomerCharts />
         <RecentCustomers />
      </div>
    </div>
  );
}