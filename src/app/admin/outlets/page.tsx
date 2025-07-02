import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { QrCode } from "lucide-react";

export default function OutletsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold font-headline tracking-tight">Manajemen Outlet</h2>
      </div>
      <p className="text-muted-foreground">
        Buat dan kelola QR Code unik untuk setiap outlet Anda di halaman ini.
      </p>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Segera Hadir!</CardTitle>
          <CardDescription>
            Fitur untuk membuat dan menampilkan QR Code untuk outlet Anda sedang dalam pengembangan.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground min-h-[200px]">
          <QrCode className="w-16 h-16 mb-4" />
          <p>Di sini Anda akan dapat melihat daftar outlet dan QR code registrasi pelanggan.</p>
        </CardContent>
      </Card>
    </div>
  );
}
