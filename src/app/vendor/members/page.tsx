import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function VendorMembersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                 <Users className="h-8 w-8 text-primary" />
                 <div>
                    <h1 className="text-2xl font-bold tracking-tight">Member Management</h1>
                    <p className="text-muted-foreground">
                        View and manage all member accounts.
                    </p>
                 </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Members</CardTitle>
                    <CardDescription>A complete list of all registered members.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-60 flex items-center justify-center text-muted-foreground bg-gray-50 rounded-lg">
                        <p>Member data will be displayed here.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
