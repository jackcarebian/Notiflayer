
"use client";

import Link from "next/link";
import {
  Bell,
  LayoutGrid,
  Megaphone,
  Calendar,
  Users,
  BrainCircuit,
  Receipt,
  QrCode,
  LogOut,
  Menu,
  CreditCard,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useState } from "react";

const navItems = [
  { href: "/admin", icon: <LayoutGrid className="h-5 w-5" />, label: "Dashboard" },
  { href: "/admin/campaign", icon: <Megaphone className="h-5 w-5" />, label: "Kampanye" },
  { href: "/admin/calendar", icon: <Calendar className="h-5 w-5" />, label: "Kalender Kampanye" },
  { href: "/admin/customers", icon: <Users className="h-5 w-5" />, label: "Database Pelanggan" },
  { href: "/admin/ai-tools", icon: <BrainCircuit className="h-5 w-5" />, label: "Tool Pemasaran AI" },
  { href: "/admin/cashier", icon: <Receipt className="h-5 w-5" />, label: "Kasir" },
  { href: "/admin/outlets", icon: <QrCode className="h-5 w-5" />, label: "QR Outlet" },
  { href: "/admin/upgrade", icon: <CreditCard className="h-5 w-5" />, label: "Upgrade" },
];

function SidebarNav() {
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b border-gray-700 px-4 lg:h-[60px] lg:px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold text-white">
          <Bell className="h-6 w-6" />
          <span className="">Notiflayer</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-gray-700/50 hover:text-white"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-gray-700">
         <Button variant="ghost" size="sm" asChild className="w-full justify-start text-gray-300 hover:bg-gray-700/50 hover:text-white">
           <Link href="/login">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
           </Link>
        </Button>
      </div>
    </div>
  )
}

function TrialExpiredOverlay() {
  return (
    <div className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
      <div className="bg-white/90 p-10 rounded-xl shadow-2xl max-w-lg">
        <Rocket className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Masa Percobaan Demo Anda Telah Berakhir</h2>
        <p className="text-gray-600 mb-6">
          Terima kasih telah mencoba Notiflayer! Untuk terus menggunakan semua fitur canggih kami tanpa batas, silakan upgrade ke paket berlangganan.
        </p>
        <Button asChild size="lg">
          <Link href="/admin/upgrade">Upgrade Sekarang</Link>
        </Button>
      </div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // SIMULASI: Ganti nilai ini untuk menguji overlay.
  // Di aplikasi nyata, nilai ini akan berasal dari database (misalnya, `user.subscription.status !== 'active'`).
  // Setelah upgrade, status di database akan diperbarui dan overlay ini tidak akan muncul lagi.
  const [isTrialExpired] = useState(false);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r border-gray-700 bg-gray-900 text-white md:block">
        <SidebarNav />
      </aside>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
           <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0 bg-gray-900 text-white border-r-0">
               <SidebarNav />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Can be used for breadcrumbs or search */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://placehold.co/40x40.png" alt="User avatar" data-ai-hint="user avatar" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                 <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                 <Link href="/login">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gray-100/40 relative">
          {isTrialExpired && <TrialExpiredOverlay />}
          <div className={isTrialExpired ? 'blur-sm pointer-events-none' : ''}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
