
import { DemoRegistrationForm } from '@/components/auth/demo-registration-form';
import { MessageCircleCode } from 'lucide-react';
import Link from 'next/link';

export default function DemoRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md mx-auto">
         <header className="flex flex-col items-center text-center gap-4 mb-8">
            <Link href="/" className="flex items-center gap-2 text-primary">
                <MessageCircleCode className="h-8 w-8" />
                <span className="text-2xl font-bold">Notiflayer</span>
            </Link>
            <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Pendaftaran Akun Demo</h1>
                <p className="text-lg text-muted-foreground mt-1">
                    Coba semua fitur gratis selama 30 hari.
                </p>
            </div>
        </header>
        <main>
            <DemoRegistrationForm />
        </main>
         <footer className="text-center mt-8">
             <p className="text-xs text-gray-500">
                Sudah punya akun? <Link href="/login" className="underline font-semibold">Login di sini</Link>
             </p>
         </footer>
      </div>
    </div>
  );
}
