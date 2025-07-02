import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Masuk ke akun Notiflayer Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button asChild className="w-full">
                <Link href="/admin">Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="text-lg">Akun Demo</CardTitle>
                <CardDescription>Gunakan akun di bawah ini untuk mencoba Notiflayer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div>
                    <p className="font-semibold">Admin</p>
                    <p><span className="text-muted-foreground">Email:</span> admin@notiflayer.com</p>
                    <p><span className="text-muted-foreground">Pass:</span> admin</p>
                </div>
                <Separator />
                <div>
                    <p className="font-semibold">Operator</p>
                    <p><span className="text-muted-foreground">Email:</span> operator@notiflayer.com</p>
                    <p><span className="text-muted-foreground">Pass:</span> operator</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}