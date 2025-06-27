"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (email === "admin@notiflayer.com" && password === "admin") {
      router.push("/admin");
    } else if (email === "operator@notiflayer.com" && password === "operator") {
      router.push("/redeem");
    } else {
      setError("Email atau password yang Anda masukkan salah.");
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Login Demo</CardTitle>
        <CardDescription>
          Gunakan salah satu akun di bawah ini untuk masuk.
        </CardDescription>
        <div className="text-sm text-muted-foreground pt-2 space-y-1 bg-muted p-3 rounded-md mt-2 border">
            <p className="font-semibold text-foreground">Admin:</p>
            <p>Email: <code className="bg-background px-1 py-0.5 rounded text-sm">admin@notiflayer.com</code></p>
            <p>Pass: <code className="bg-background px-1 py-0.5 rounded text-sm">admin</code></p>
            <p className="pt-2 font-semibold text-foreground">Operator:</p>
            <p>Email: <code className="bg-background px-1 py-0.5 rounded text-sm">operator@notiflayer.com</code></p>
            <p>Pass: <code className="bg-background px-1 py-0.5 rounded text-sm">operator</code></p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Login Gagal</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@contoh.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              required 
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
