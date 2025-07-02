import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BarChart, Users, Clock, MoreHorizontal, CheckCircle, Trash2, Download, Database } from 'lucide-react';

// Mock data for the vendor dashboard
const members = [
  { id: 'usr_001', businessName: 'Cafe Inyong', owner: 'Budi Santoso', email: 'budi.s@example.com', status: 'Active', plan: 'Satu Cabang', joined: '2024-07-20' },
  { id: 'usr_002', businessName: 'Kedai Kopi Anyar', owner: 'Siti Aminah', email: 'siti.a@example.com', status: 'Trial', plan: 'Demo', joined: '2024-07-28' },
  { id: 'usr_003', businessName: 'Butik Elegan', owner: 'Dewi Lestari', email: 'dewi.l@example.com', status: 'Upgrade Pending', plan: 'Banyak Cabang', joined: '2024-06-15' },
  { id: 'usr_004', businessName: 'Toko Roti Lezat', owner: 'Ahmad Dahlan', email: 'ahmad.d@example.com', status: 'Expired', plan: 'Demo', joined: '2024-05-10' },
];

const getStatusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" | null | undefined => {
    switch (status) {
        case 'Active': return 'default';
        case 'Trial': return 'secondary';
        case 'Upgrade Pending': return 'outline';
        case 'Expired': return 'destructive';
        default: return 'outline';
    }
};

export default function VendorDashboardPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, Jimmy. Manage all member accounts from here.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Members" value={members.length.toString()} icon={<Users />} description={`${members.filter(m => m.status === 'Active').length} active subscriptions`} />
        <StatCard title="Pending Upgrades" value={members.filter(m => m.status === 'Upgrade Pending').length.toString()} icon={<Clock />} description="Awaiting activation" />
        <StatCard title="Avg. Success Potential" value="78%" icon={<BarChart />} description="Based on AI-driven analytics" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Member Management</CardTitle>
                <CardDescription>View, manage, and take action on all registered member accounts.</CardDescription>
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
                        {members.map(member => (
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
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card className="lg:col-span-1 h-fit">
            <CardHeader>
                <CardTitle>Database Tools</CardTitle>
                <CardDescription>Perform global database operations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export All Members (CSV)
                </Button>
                <Button variant="outline" className="w-full">
                     <Database className="mr-2 h-4 w-4" />
                     Backup Database
                </Button>
                 <p className="text-xs text-muted-foreground pt-2">
                    Regular backups are recommended. Exports are useful for external analysis.
                </p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
