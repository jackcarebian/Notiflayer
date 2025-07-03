
'use client';

import { useState, useEffect } from 'react';
import { OutletsQrList } from "@/components/outlets-qr-list";
import { AddOutletDialog } from "@/components/admin/add-outlet-dialog";
import { getOutletsPageDataAction } from '@/app/actions';
import type { Outlet, Member } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

function OutletsPageSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-5 w-96" />
                </div>
                <Skeleton className="h-10 w-40" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-52 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function OutletsPage() {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [member, setMember] = useState<Member | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getOutletsPageDataAction();
      if (result.success) {
        setOutlets(result.outlets);
        setMember(result.member);
      } else {
        setError(result.message || 'Gagal memuat data.');
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <OutletsPageSkeleton />;
  }

  if (error) {
     return (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Gagal Memuat Data</AlertTitle>
          <AlertDescription>
            {error} Pastikan Anda telah mendaftarkan setidaknya satu member.
          </AlertDescription>
        </Alert>
     )
  }

  const canAddOutlet = member?.plan === 'Banyak Cabang' || member?.plan === 'Multi Bisnis';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Kode QR Outlet Anda</h1>
            <p className="text-muted-foreground">
                { canAddOutlet 
                    ? "Kelola, cetak, atau tambahkan outlet baru di sini."
                    : "Cetak kode QR di bawah ini di outlet Anda. Upgrade ke paket 'Banyak Cabang' untuk menambah outlet."
                }
            </p>
        </div>
        {canAddOutlet && member && <AddOutletDialog memberId={member.id} />}
      </div>
      
      {outlets.length > 0 ? (
        <OutletsQrList outlets={outlets} />
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg">
            <h3 className="text-lg font-semibold">Belum Ada Outlet</h3>
            <p className="text-muted-foreground mt-1 max-w-sm">
                Anda belum memiliki outlet terdaftar.
                {canAddOutlet ? " Gunakan tombol di atas untuk menambahkan outlet pertama Anda." : " Upgrade ke paket 'Banyak Cabang' untuk menambah lebih dari satu outlet."}
            </p>
        </div>
      )}
    </div>
  );
}
