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
import Link from "next/link";
import { Shield } from "lucide-react";

export default function VendorLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-sm bg-gray-800 text-white border-gray-700">
        <CardHeader className="text-center">
            <Shield className="mx-auto h-10 w-10 text-primary mb-4" />
          <CardTitle className="text-2xl">Vendor Access</CardTitle>
          <CardDescription className="text-gray-400">
            Login with your vendor credentials.
            <br />
            Email: <span className="font-mono">jimmy.tjahyono@gmail.com</span>
            <br />
            Pass: <span className="font-mono">Database*123#</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="jimmy.tjahyono@gmail.com" defaultValue="jimmy.tjahyono@gmail.com" className="bg-gray-700 border-gray-600 text-white" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" defaultValue="Database*123#" className="bg-gray-700 border-gray-600 text-white" />
          </div>
          <Button asChild className="w-full bg-primary hover:bg-primary/90">
            <Link href="/vendor">Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
