import { OutletsQrList } from "@/components/outlets-qr-list";
import { outlets } from "@/lib/outlets";

export default function OutletsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold font-headline tracking-tight">Outlets</h2>
      </div>
      <p className="text-muted-foreground">
        Setiap outlet memiliki QR Code unik. Pelanggan yang scan akan diarahkan ke halaman pendaftaran khusus outlet tersebut.
      </p>
      <div className="mt-8">
        <OutletsQrList outlets={outlets} />
      </div>
    </div>
  );
}
