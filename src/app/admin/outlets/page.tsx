import { OutletsQrList } from "@/components/outlets-qr-list";
import { outlets } from "@/lib/outlets";

export default function OutletsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Outlet & Kode QR</h1>
        <p className="text-muted-foreground">
          Kelola outlet Anda dan bagikan kode QR untuk pendaftaran pelanggan.
        </p>
      </div>
      <OutletsQrList outlets={outlets} />
    </div>
  );
}