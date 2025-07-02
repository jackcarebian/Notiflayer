import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function VendorSettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                 <Settings className="h-8 w-8 text-primary" />
                 <div>
                    <h1 className="text-2xl font-bold tracking-tight">Vendor Settings</h1>
                    <p className="text-muted-foreground">
                        Configure global settings for the vendor panel.
                    </p>
                 </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Configuration</CardTitle>
                    <CardDescription>Manage your vendor account and platform settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-60 flex items-center justify-center text-muted-foreground bg-gray-50 rounded-lg">
                        <p>Settings form and options will be displayed here.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
