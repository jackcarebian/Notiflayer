
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BarChart, Users, Clock, MoreHorizontal, CheckCircle, Trash2, Download, Database, Loader2, Upload, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { memberAnalytics, allCustomers, allCampaigns } from '@/lib/data';
import { getMembersAction } from '@/app/actions';
import type { Member } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';


const getStatusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" | null | undefined => {
    switch (status) {
        case 'Active': return 'default';
        case 'Trial': return 'secondary';
        case 'Upgrade Pending': return 'outline';
        case 'Expired': return 'destructive';
        default: return 'outline';
    }
};

type AnalyticsRating = 'Sangat Baik' | 'Baik' | 'Cukup Baik' | 'Kurang Baik' | 'Sangat Buruk';

const ratingToScore: Record<AnalyticsRating, number> = {
    'Sangat Baik': 95,
    'Baik': 80,
    'Cukup Baik': 65,
    'Kurang Baik': 40,
    'Sangat Buruk': 20,
};

export default function VendorDashboardPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const fetchMembers = useCallback(async (showToast = false) => {
    setIsLoading(true);
    const result = await getMembersAction();
    if (result.success && result.members) {
      setMembers(result.members);
      if (showToast) {
        toast({
          title: 'Data Disinkronkan',
          description: 'Daftar member telah berhasil diperbarui dari database.',
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Gagal Memuat Member',
        description: result.message || 'Tidak dapat mengambil data dari server.',
      });
    }
    setIsLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);


  const handleClearCache = async () => {
    setIsRefreshing(true);
    toast({
      title: "Memulai proses...",
      description: "Membersihkan cache dan service worker.",
    });

    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        if (registrations.length) {
          for (const registration of registrations) {
            await registration.unregister();
          }
          toast({
            title: "Service Worker Dihapus",
            description: "Semua service worker berhasil dihapus.",
          });
        } else {
            toast({
                title: "Tidak Ada Service Worker",
                description: "Tidak ada service worker aktif yang ditemukan untuk dihapus.",
            });
        }
      } else {
         toast({
            title: "Service Worker Tidak Didukung",
            description: "Browser Anda tidak mendukung service worker.",
        });
      }

      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(key => caches.delete(key)));
        toast({
          title: "Cache Dibersihkan",
          description: "Cache browser berhasil dibersihkan.",
        });
      }

      toast({
        title: "Selesai!",
        description: "Memuat ulang halaman sekarang...",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      console.error("Gagal membersihkan cache:", error);
      toast({
        variant: "destructive",
        title: "Gagal Membersihkan Cache",
        description: "Terjadi kesalahan saat mencoba membersihkan cache.",
      });
      setIsRefreshing(false);
    }
  };


  const calculateAvgSuccessPotential = () => {
    if (memberAnalytics.length === 0) return 0;
    const totalScore = memberAnalytics.reduce((sum, member) => {
      const rating = member.overallRating as AnalyticsRating;
      return sum + (ratingToScore[rating] || 0);
    }, 0);
    return Math.round(totalScore / memberAnalytics.length);
  };

  const avgSuccessPotential = calculateAvgSuccessPotential();

  const handleSelectMember = (memberId: string, checked: boolean) => {
    if (checked) {
      setSelectedMembers(prev => [...prev, memberId]);
    } else {
      setSelectedMembers(prev => prev.filter(id => id !== memberId));
    }
  };

  const handleExport = () => {
    if (selectedMembers.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Tidak ada member terpilih',
        description: 'Silakan pilih setidaknya satu member untuk diekspor.',
      });
      return;
    }
    setIsProcessing(true);

    const membersToExport = members.filter(m => selectedMembers.includes(m.id));
    const customersToExport = allCustomers.filter(c => selectedMembers.includes(c.memberId));
    const campaignsToExport = allCampaigns.filter(c => selectedMembers.includes(c.memberId));

    const backupData = {
        exportedAt: new Date().toISOString(),
        data: {
            members: membersToExport,
            customers: customersToExport,
            campaigns: campaignsToExport,
        }
    };
    
    const jsonContent = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `notiflayer_backup_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Ekspor Berhasil',
      description: `Backup data untuk ${selectedMembers.length} member telah diunduh.`,
    });
    
    setIsProcessing(false);
    setIsDialogOpen(false);
    setSelectedMembers([]);
  };

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text !== 'string') throw new Error("File could not be read");
                
                const data = JSON.parse(text);
                const { members: restoredMembers, customers: restoredCustomers, campaigns: restoredCampaigns } = data.data;

                toast({
                    title: 'Proses Restore Dimulai',
                    description: `Memulihkan ${restoredMembers?.length || 0} member, ${restoredCustomers?.length || 0} pelanggan, dan ${restoredCampaigns?.length || 0} kampanye dari ${file.name}. Ini adalah simulasi.`,
                });
                console.log("SIMULASI: Data yang akan di-restore:", data);

            } catch (error) {
                console.error("Error parsing restore file:", error);
                toast({
                    variant: 'destructive',
                    title: 'Gagal Membaca File',
                    description: 'File backup tidak valid atau rusak. Pastikan file dalam format JSON yang benar.'
                });
            }
        };
        reader.readAsText(file);
    }
    if(event.target) {
      event.target.value = '';
    }
    setIsDialogOpen(false);
    setSelectedMembers([]);
  };

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, Jimmy. Manage all member accounts from here.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Members" value={isLoading ? "..." : members.length.toString()} icon={<Users />} description={isLoading ? "" : `${members.filter(m => m.status === 'Active').length} active subscriptions`} />
        <StatCard title="Pending Upgrades" value={isLoading ? "..." : members.filter(m => m.status === 'Upgrade Pending').length.toString()} icon={<Clock />} description="Awaiting activation" />
        <StatCard title="Avg. Success Potential" value={`${avgSuccessPotential}%`} icon={<BarChart />} description="Based on AI-driven analytics" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Member Management</CardTitle>
                        <CardDescription>View, manage, and take action on all registered member accounts.</CardDescription>
                    </div>
                     <Button variant="outline" size="icon" onClick={() => fetchMembers(true)} disabled={isLoading}>
                        <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
                        <span className="sr-only">Refresh members</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Business Name</TableHead>
                            <TableHead>Owner Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                                </TableRow>
                            ))
                        ) : members.length > 0 ? (
                            members.map(member => (
                                <TableRow key={member.id}>
                                    <TableCell className="font-medium">{member.businessName}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell><Badge variant={getStatusVariant(member.status)}>{member.status}</Badge></TableCell>
                                    <TableCell>{member.plan}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
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
                                                <DropdownMenuItem className="text-destructive focus:bg-red-100 focus:text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete Member
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                              Tidak ada member yang ditemukan.
                            </TableCell>
                          </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <div className="lg:col-span-1 space-y-6">
            <Card className="h-fit">
                <CardHeader>
                    <CardTitle>Database Tools</CardTitle>
                    <CardDescription>Perform global database operations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                             <Button variant="outline" className="w-full">
                                <Database className="mr-2 h-4 w-4" />
                                Export / Restore Data
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Export / Restore Data Member</DialogTitle>
                                <DialogDescription>
                                    Pilih member untuk mengekspor data mereka (termasuk pelanggan & kampanye), atau pulihkan dari file backup JSON.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                {members.map(member => (
                                    <div key={member.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                                        <Checkbox 
                                            id={`backup-${member.id}`}
                                            onCheckedChange={(checked) => handleSelectMember(member.id, checked as boolean)}
                                            checked={selectedMembers.includes(member.id)}
                                        />
                                        <Label htmlFor={`backup-${member.id}`} className="flex-1 cursor-pointer">
                                            <span className="font-medium">{member.businessName}</span>
                                            <p className="text-xs text-muted-foreground">{member.email}</p>
                                        </Label>
                                    </div>
                                ))}
                            </div>
                            <DialogFooter className="flex-col sm:flex-row gap-2">
                                 <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept=".json"
                                    className="hidden"
                                 />
                                <Button variant="outline" className="w-full sm:w-auto" onClick={handleRestoreClick}>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Restore dari File
                                </Button>
                                <Button className="w-full sm:w-auto" onClick={handleExport} disabled={isProcessing || selectedMembers.length === 0}>
                                    {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                                    Export Backup {selectedMembers.length > 0 ? `(${selectedMembers.length})` : ''}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                     <p className="text-xs text-muted-foreground pt-2">
                        Auto-backup harian dijadwalkan pada pukul 12 malam. Export & restore manual tersedia kapan saja.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Utilitas Vendor</CardTitle>
                    <CardDescription>Alat untuk pemeliharaan dan perbaikan cepat.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleClearCache} disabled={isRefreshing}>
                        {isRefreshing ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="mr-2 h-4 w-4"/>
                        )}
                        {isRefreshing ? "Membersihkan..." : "Bersihkan Cache & Segarkan"}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Gunakan ini jika Anda atau member mengalami masalah data yang usang.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
