
"use client";

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  MoreHorizontal,
  CheckCircle,
  Trash2,
  BarChart,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Member } from '@/lib/types';
import { deleteMemberAction } from '@/app/actions';

const getStatusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" | null | undefined => {
    switch (status) {
        case 'Active': return 'default';
        case 'Trial': return 'secondary';
        case 'Upgrade Pending': return 'outline';
        case 'Expired': return 'destructive';
        default: return 'outline';
    }
};

export function MembersList({ initialMembers }: { initialMembers: Member[] }) {
  const [members, setMembers] = useState(initialMembers);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [confirmationText, setConfirmationText] = useState('');
  const { toast } = useToast();

  const handleConfirmDelete = async () => {
    if (!memberToDelete || confirmationText !== 'delete') return;
    
    const result = await deleteMemberAction(memberToDelete.id);
    
    if (result.success) {
        setMembers(prevMembers => prevMembers.filter(m => m.id !== memberToDelete.id));
        toast({
          title: "Member Dihapus",
          description: `Akun untuk ${memberToDelete.businessName} telah berhasil dihapus.`,
        });
    } else {
        toast({
          variant: "destructive",
          title: "Gagal Menghapus",
          description: result.message,
        });
    }
    
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setMemberToDelete(null);
    setConfirmationText('');
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Members</CardTitle>
          <CardDescription>
            A complete list of all {members.length} registered members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    {member.businessName}
                  </TableCell>
                  <TableCell>{member.owner}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(member.status)}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.plan}</TableCell>
                  <TableCell>
                    {new Date(member.joined).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {member.status === 'Upgrade Pending' && (
                          <DropdownMenuItem className="text-green-600 focus:bg-green-100 focus:text-green-700">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Activate Upgrade
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <BarChart className="mr-2 h-4 w-4" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:bg-red-100 focus:text-destructive"
                          onSelect={() => setMemberToDelete(member)}
                         >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
               {members.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Belum ada member yang terdaftar. Coba daftarkan akun demo baru.
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={!!memberToDelete} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Anda yakin ingin menghapus member ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus akun member untuk{' '}
              <span className="font-bold">{memberToDelete?.businessName}</span> secara permanen dari Firestore.
              <br /><br />
              Untuk mengonfirmasi, ketik <strong className="font-mono text-destructive">delete</strong> pada kolom di bawah ini.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <Label htmlFor="delete-confirm" className="sr-only">Konfirmasi Hapus</Label>
            <Input
              id="delete-confirm"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="delete"
              autoComplete="off"
              autoFocus
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDialog}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={confirmationText !== 'delete'}
              variant="destructive"
            >
              Hapus Member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
