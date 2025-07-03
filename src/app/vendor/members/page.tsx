import { db } from '@/lib/firebase-admin';
import { MembersList } from '@/components/vendor/members-list';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Users } from 'lucide-react';
import type { Member } from '@/lib/types';

export type MemberWithId = Member;

async function getMembers(): Promise<MemberWithId[]> {
  try {
    const membersSnapshot = await db.collection('members').orderBy('joined', 'desc').get();
    if (membersSnapshot.empty) {
      console.log("Tidak ada member yang ditemukan di Firestore.");
      return [];
    }
    // Data dari Firestore perlu diserialisasi agar aman dikirim dari Server ke Client Component.
    return membersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as MemberWithId[];
  } catch (error) {
    console.error("Gagal mengambil data member dari Firestore:", error);
    throw new Error("Gagal mengambil data member. Pastikan konfigurasi Firebase Admin Anda sudah benar.");
  }
}

export default async function VendorMembersPage() {
  let members: MemberWithId[] = [];
  let fetchError: string | null = null;

  try {
    members = await getMembers();
  } catch (error: any) {
    fetchError = error.message;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Users className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Member Management
          </h1>
          <p className="text-muted-foreground">
            Menampilkan semua akun member yang terdaftar di Firestore.
          </p>
        </div>
      </div>
      
      {fetchError ? (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Gagal Mengambil Data</AlertTitle>
          <AlertDescription>
            <p>{fetchError}</p>
            <p className="mt-2 text-xs">
              Pastikan variabel lingkungan `FIREBASE_SERVICE_ACCOUNT_KEY` dan `FIREBASE_PROJECT_ID` di file `.env` sudah diatur dengan benar dan coba segarkan halaman.
            </p>
          </AlertDescription>
        </Alert>
      ) : (
        <MembersList initialMembers={members} />
      )}
    </div>
  );
}
