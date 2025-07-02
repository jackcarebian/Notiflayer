import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold font-headline tracking-tight">Dashboard</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Selamat Datang di Dasbor Anda!</CardTitle>
          <CardDescription>Ini adalah pusat kendali untuk kampanye promosi Anda.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center p-6 bg-secondary rounded-lg">
            <Lightbulb className="h-8 w-8 mr-4 text-primary" />
            <p className="text-foreground">
              Gunakan menu di sebelah kiri untuk mengelola Outlet, membuat Kampanye baru, dan melihat data Pelanggan.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
