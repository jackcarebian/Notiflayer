import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Buat Akun Baru</CardTitle>
          <CardDescription>
            Pilih jenis akun yang ingin Anda buat untuk memulai.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/register/demo">
                <Card className="flex flex-col items-center justify-center p-6 text-center h-full hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                    <h3 className="text-lg font-bold mb-2">Akun Demo</h3>
                    <p className="text-sm text-muted-foreground mb-4">Coba semua fitur Notiflayer gratis selama 30 hari.</p>
                    <Button className="w-full mt-auto">Mulai Demo</Button>
                </Card>
            </Link>
             <Card className="flex flex-col items-center justify-center p-6 text-center bg-gray-50 cursor-not-allowed opacity-60">
                 <h3 className="text-lg font-bold mb-2">Akun Member</h3>
                <p className="text-sm text-muted-foreground mb-4">Daftar untuk akun berbayar dan mulai kampanye Anda.</p>
                <Button className="w-full mt-auto" disabled>Daftar Member</Button>
            </Card>
           </div>
          <div className="text-center text-sm">
            Sudah punya akun?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
