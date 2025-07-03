import { OutletsQrList } from "@/components/outlets-qr-list";
import { AddOutletDialog } from "@/components/admin/add-outlet-dialog";
import { db } from '@/lib/firebase-admin';
import type { Outlet, Member } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

async function getData() {
  // In a real app, you'd get the logged-in member's ID from a session.
  // For this prototype, we'll find a specific member ('Cafe Inyong') to act as the logged-in user.
  // If not found, we'll gracefully handle it.
  const membersSnapshot = await db.collection('members').where('businessName', '==', 'Cafe Inyong').limit(1).get();
  
  if (membersSnapshot.empty) {
    // If 'Cafe Inyong' doesn't exist, maybe find the first member?
    const firstMemberSnapshot = await db.collection('members').orderBy('joined', 'desc').limit(1).get();
    if(firstMemberSnapshot.empty) {
        return { outlets: [], member: null, error: "Tidak ada member yang terdaftar di database." };
    }
    const memberDoc = firstMemberSnapshot.docs[0];
    const member = { id: memberDoc.id, ...memberDoc.data() } as Member;
    const outletsSnapshot = await db.collection('outlets').where('memberId', '==', member.id).get();
    const outlets = outletsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Outlet[];
    return { outlets, member, error: null };
  }
  
  const memberDoc = membersSnapshot.docs[0];
  const member = { id: memberDoc.id, ...memberDoc.data() } as Member;

  const outletsSnapshot = await db.collection('outlets').where('memberId', '==', member.id).get();
  const outlets = outletsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Outlet[];
  
  return { outlets, member, error: null };
}

export default async function OutletsPage() {
  const { outlets, member, error } = await getData();

  if (error) {
     return (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Gagal Memuat Data</AlertTitle>
          <AlertDescription>
            {error} Pastikan Anda telah mendaftarkan setidaknya satu member.
          </AlertDescription>
        </Alert>
     )
  }

  // Determine if the user should be able to add more outlets based on their plan.
  // We'll allow it for 'Banyak Cabang' and 'Multi Bisnis' plans.
  const canAddOutlet = member?.plan === 'Banyak Cabang' || member?.plan === 'Multi Bisnis';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Kode QR Outlet Anda</h1>
            <p className="text-muted-foreground">
                { canAddOutlet 
                    ? "Kelola, cetak, atau tambahkan outlet baru di sini."
                    : "Cetak kode QR di bawah ini di outlet Anda. Upgrade ke paket 'Banyak Cabang' untuk menambah outlet."
                }
            </p>
        </div>
        {canAddOutlet && member && <AddOutletDialog memberId={member.id} />}
      </div>
      
      {outlets.length > 0 ? (
        <OutletsQrList outlets={outlets} />
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg">
            <h3 className="text-lg font-semibold">Belum Ada Outlet</h3>
            <p className="text-muted-foreground mt-1 max-w-sm">
                Anda belum memiliki outlet terdaftar.
                {canAddOutlet ? " Gunakan tombol di atas untuk menambahkan outlet pertama Anda." : " Upgrade ke paket 'Banyak Cabang' untuk menambah lebih dari satu outlet."}
            </p>
        </div>
      )}
    </div>
  );
}
