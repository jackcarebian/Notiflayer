
import { MembersList } from '@/components/vendor/members-list';
import { Users } from 'lucide-react';

export default function VendorMembersPage() {
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
      <MembersList />
    </div>
  );
}
