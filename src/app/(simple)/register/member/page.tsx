
import { Suspense } from 'react';
import { MemberRegistrationForm } from '@/components/auth/member-registration-form';
import { MessageCircleCode } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function RegistrationFormSkeleton() {
    return (
        <Card>
            <CardContent className="p-6 space-y-8">
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>
                <Card className="bg-gray-50/50">
                    <CardContent className="p-6">
                        <Skeleton className="h-40 w-full" />
                    </CardContent>
                </Card>
                <Skeleton className="h-12 w-full" />
            </CardContent>
        </Card>
    )
}


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
          <Suspense fallback={<RegistrationFormSkeleton />}>
            <MemberRegistrationForm />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
