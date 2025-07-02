import { OutletsQrList } from "@/components/outlets-qr-list";
import { outlets } from "@/lib/outlets";

export default function OutletsPage() {
  // SIMULASI: Dalam aplikasi nyata, Anda akan mengambil data outlet
  // yang terkait dengan pengguna yang sedang login.
  // Di sini, kita akan menampilkan outlet dari data mock sebagai contoh.
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Kode QR Outlet Anda</h1>
        <p className="text-muted-foreground">
          Cetak dan pasang kode QR di bawah ini di outlet Anda. Pelanggan akan memindainya untuk mendaftar.
        </p>
      </div>
      <OutletsQrList outlets={outlets} />
    </div>
  );
}
