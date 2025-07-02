import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";

export default function CampaignPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold font-headline tracking-tight">Manajemen Kampanye</h2>
      </div>
      <p className="text-muted-foreground">
        Buat, jadwalkan, dan kirim notifikasi promosi langsung ke pelanggan Anda.
      </p>
       <Card className="mt-8">
        <CardHeader>
          <CardTitle>Segera Hadir!</CardTitle>
          <CardDescription>
            Fitur untuk membuat kampanye notifikasi sedang dalam pengembangan.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground min-h-[200px]">
          <Send className="w-16 h-16 mb-4" />
          <p>Form untuk membuat kampanye promosi akan tersedia di sini.</p>
        </CardContent>
      </Card>
    </div>
  );
}
