
import { MemberRegistrationForm } from '@/components/auth/member-registration-form';
import { MessageCircleCode } from 'lucide-react';
import Link from 'next/link';

export default function MemberRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="flex flex-col items-center text-center gap-4 mb-8">
            <Link href="/" className="flex items-center gap-2 text-primary">
                <MessageCircleCode className="h-8 w-8" />
                <span className="text-2xl font-bold">Notiflayer</span>
            </Link>
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Daftar sebagai Member Outlet</h1>
            <p className="text-lg text-muted-foreground mt-1">
              Isi formulir di bawah ini untuk menjadi mitra Notiflayer.
            </p>
          </div>
        </header>
        <main>
          <MemberRegistrationForm />
        </main>
      </div>
    </div>
  );
}
