
import { CampaignForm } from "@/components/admin/campaign-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

const campaigns = [
  { name: "Diskon Kilat Ramadhan", dates: "25 Mar 2024 - 5 Apr 2024", category: "Butik & Aksesoris", targeted: 0, status: "Berakhir" },
  { name: "Promo Hari Pendidikan", dates: "1 Mei 2024 - 7 Mei 2024", category: "Toko Online", targeted: 0, status: "Berakhir" },
  { name: "Gebyar Diskon Akhir Pekan", dates: "24 Mei 2024 - 26 Mei 2024", category: "Cafe, Resto, Foodcourt", targeted: 0, status: "Berakhir" },
  { name: "Flash Sale 7.7", dates: "7 Jul 2024 - 7 Jul 2024", category: "Toko Online", targeted: 0, status: "Berakhir" },
  { name: "Promo Nonton Bola Bareng", dates: "30 Jun 2025 - 7 Jul 2025", category: "Cafe, Resto, Foodcourt", targeted: 1, status: "Sedang Berlangsung" },
  { name: "Diskon Liburan Sekolah Ceria", dates: "12 Jul 2025 - 22 Jul 2025", category: "Toko Online", targeted: 0, status: "Akan Datang" },
  { name: "Pesta Gajian Juni", dates: "24 Jul 2025 - 30 Jul 2025", category: "Butik & Aksesoris", targeted: 0, status: "Akan Datang" },
];

const getStatusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" | null | undefined => {
    switch (status) {
        case "Sedang Berlangsung":
            return "default";
        case "Akan Datang":
            return "secondary";
        case "Berakhir":
            return "outline";
        default:
            return "outline";
    }
}

export default function CampaignPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Kampanye</h1>
        <p className="text-muted-foreground">
          Buat, kelola, edit, dan hapus kampanye promo untuk pelanggan Anda.
        </p>
      </div>
      
      <CampaignForm />
      
      <Card>
        <CardHeader>
          <CardTitle>Daftar Kampanye</CardTitle>
          <CardDescription>
            Berikut adalah semua kampanye yang telah Anda buat. Anda dapat mengedit atau menghapusnya dari sini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Kampanye</TableHead>
                  <TableHead>Tanggal Berlaku</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Target Pelanggan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>{campaign.dates}</TableCell>
                    <TableCell>{campaign.category}</TableCell>
                    <TableCell className="text-center">{campaign.targeted}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(campaign.status)}>{campaign.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Hapus</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
