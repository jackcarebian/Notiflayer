import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

// Mock data, in a real app this would come from a database.
const customers = [
  {
    id: "CUST001",
    name: "Ahmad Dahlan",
    email: "ahmad.d@example.com",
    outlet: "Cafe Inyong",
    interests: ["Promo Makanan", "Diskon Spesial Hari Tertentu"],
    registeredAt: "2024-07-20",
    fcmToken: "c1a2b3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0...",
  },
  {
    id: "CUST002",
    name: "Siti Aminah",
    email: "siti.a@example.com",
    outlet: "Cafe Inyong",
    interests: ["Promo Minuman", "Menu Baru"],
    registeredAt: "2024-07-19",
    fcmToken: "dEaFgHiJkLmNoPqRsTuVwXyZ1234567890AbCdE...",
  },
  {
    id: "CUST003",
    name: "Budi Santoso",
    email: "budi.s@example.com",
    outlet: "Cafe Inyong",
    interests: ["Flash Sale"],
    registeredAt: "2024-07-18",
    fcmToken: "eFbGcHdIeJkFlGnHmIoJpKrLsMtNuOvPwQxRySzT...",
  },
  {
    id: "CUST004",
    name: "Dewi Lestari",
    email: "dewi.l@example.com",
    outlet: "Cafe Inyong",
    interests: ["Promo Pakaian", "Koleksi Terbaru"],
    registeredAt: "2024-07-17",
    fcmToken: "fGbHcIdJkElFmGnHoIpJqKrLsMtNuOvPwQxRySzT...",
  },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Database Pelanggan</h1>
        <p className="text-muted-foreground">
          Kelola data pelanggan yang terdaftar untuk menerima notifikasi promo Anda.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pelanggan</CardTitle>
          <CardDescription>Total {customers.length} pelanggan terdaftar.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pelanggan</TableHead>
                <TableHead className="hidden md:table-cell">Outlet</TableHead>
                <TableHead>Minat Promo</TableHead>
                <TableHead className="hidden lg:table-cell">Token FCM</TableHead>
                <TableHead className="hidden sm:table-cell">Tgl Daftar</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={`https://placehold.co/40x40.png`} alt="Avatar" data-ai-hint="avatar" />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground hidden md:block">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{customer.outlet}</TableCell>
                   <TableCell>
                     <div className="flex flex-wrap gap-1">
                        {customer.interests.map((interest) => (
                            <Badge key={interest} variant="outline" className="text-xs">
                            {interest}
                            </Badge>
                        ))}
                     </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="font-mono text-xs w-32 truncate" title={customer.fcmToken}>
                        {customer.fcmToken}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {new Date(customer.registeredAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Kirim Notifikasi</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Hapus</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
