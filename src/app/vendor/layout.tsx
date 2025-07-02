"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutGrid,
  Users,
  BarChart,
  Settings,
  Shield,
  LogOut,
  Menu,
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

const navItems = [
  { href: "/vendor", icon: <LayoutGrid className="h-5 w-5" />, label: "Dashboard" },
  { href: "/vendor/members", icon: <Users className="h-5 w-5" />, label: "Members" },
  { href: "/vendor/analytics", icon: <BarChart className="h-5 w-5" />, label: "Analytics" },
  { href: "/vendor/settings", icon: <Settings className="h-5 w-5" />, label: "Settings" },
];

function VendorSidebarNav() {
  const router = useRouter();
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b border-gray-700 px-4 lg:h-[60px] lg:px-6">
        <Link href="/vendor" className="flex items-center gap-2 font-semibold text-white">
          <Shield className="h-6 w-6" />
          <span className="">Vendor Panel</span>
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
         <Button onClick={() => router.push('/')} variant="ghost" size="sm" className="w-full justify-start text-gray-300 hover:bg-gray-700/50 hover:text-white">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
        </Button>
      </div>
    </div>
  )
}

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r border-gray-700 bg-gray-900 text-white md:block">
        <VendorSidebarNav />
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
               <VendorSidebarNav />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Can be used for breadcrumbs or search */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://placehold.co/40x40.png" alt="Vendor avatar" data-ai-hint="vendor avatar"/>
                  <AvatarFallback>V</AvatarFallback>
                </Avatar>
                 <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Vendor Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/')}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gray-100/40">
          {children}
        </main>
      </div>
    </div>
  );
}
