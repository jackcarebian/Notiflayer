import Link from "next/link";
import {
  Bell,
  Home,
  Users,
  Store,
  Calendar,
  QrCode,
  LogOut,
  MessageCircleCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
  { href: "/admin/outlets", icon: <Store className="h-5 w-5" />, label: "Outlet & QR" },
  { href: "/admin/campaign", icon: <Bell className="h-5 w-5" />, label: "Kampanye" },
  { href: "/admin/customers", icon: <Users className="h-5 w-5" />, label: "Pelanggan" },
  { href: "/admin/calendar", icon: <Calendar className="h-5 w-5" />, label: "Kalender" },
  { href: "/admin/redeem", icon: <QrCode className="h-5 w-5" />, label: "Redeem" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <MessageCircleCode className="h-6 w-6 text-primary" />
              <span className="">Notiflayer</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
             <Button size="sm" asChild className="w-full justify-start">
               <Link href="/login">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
               </Link>
            </Button>
          </div>
        </div>
      </aside>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gray-50/50">
        {children}
      </main>
    </div>
  );
}