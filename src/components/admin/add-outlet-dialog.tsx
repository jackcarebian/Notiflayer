'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { addOutletAction } from '@/app/actions';
import { promoInterests } from '@/lib/outlets';
import { Loader2, PlusCircle } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nama outlet minimal 2 karakter.' }),
  address: z.string().min(10, { message: 'Alamat lengkap minimal 10 karakter.' }),
  category: z.string({ required_error: 'Pilih jenis bisnis Anda.' }),
});

const businessCategories = Object.keys(promoInterests);

// In a real app, memberId would be passed as a prop from the user session.
// For this prototype, we'll hardcode it to simulate being logged in.
type AddOutletDialogProps = {
  memberId: string;
};

export function AddOutletDialog({ memberId }: AddOutletDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      category: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await addOutletAction({ ...values, memberId });

    if (result.success) {
      toast({
        title: 'Sukses!',
        description: result.message,
      });
      setOpen(false);
      form.reset();
      router.refresh();
    } else {
      toast({
        variant: 'destructive',
        title: 'Gagal',
        description: result.message || 'Terjadi kesalahan.',
      });
    }
    setIsSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Outlet Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Outlet Cabang Baru</DialogTitle>
          <DialogDescription>
            Isi detail untuk cabang baru Anda. Kode QR unik akan dibuat secara otomatis.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Outlet</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Cafe Inyong - Cabang Tegal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Lengkap Outlet</FormLabel>
                  <FormControl>
                    <Input placeholder="Jl. Gajah Mada No. 45, Tegal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori Bisnis</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori bisnis" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {businessCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan Outlet
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
