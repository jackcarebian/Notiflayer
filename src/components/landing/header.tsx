import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="#features" className="text-foreground/70 transition-colors hover:text-foreground">
            Fitur
          </Link>
          <Link href="#demo" className="text-foreground/70 transition-colors hover:text-foreground">
            Demo
          </Link>
          <Button asChild>
            <Link href="/login">Dashboard</Link>
          </Button>
        </nav>
        <div className="md:hidden">
            <Button asChild>
                <Link href="/login">Dashboard</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
