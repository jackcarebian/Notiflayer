import { StatCard } from '@/components/dashboard/stat-card';
import { CustomerCharts } from '@/components/dashboard/charts';
import { RecentCustomers } from '@/components/dashboard/recent-customers';
import { Users, UserPlus, BellRing, TicketCheck } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold font-headline tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Pelanggan" value="2,389" icon={<Users />} />
        <StatCard title="Baru Hari Ini" value="+26" icon={<UserPlus />} />
        <StatCard title="Izin Notifikasi" value="1,892" icon={<BellRing />} />
        <StatCard title="Sudah Redeem" value="678" icon={<TicketCheck />} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <CustomerCharts />
        </div>
        <div className="col-span-4 lg:col-span-3">
          <RecentCustomers />
        </div>
      </div>
    </div>
  );
}
