
import { Settings } from "lucide-react";
import { PricingSettingsForm } from "@/components/vendor/pricing-settings-form";

export default function VendorSettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                 <Settings className="h-8 w-8 text-primary" />
                 <div>
                    <h1 className="text-2xl font-bold tracking-tight">Vendor Settings</h1>
                    <p className="text-muted-foreground">
                        Konfigurasi pengaturan global dan strategis untuk panel vendor.
                    </p>
                 </div>
            </div>
            
            <PricingSettingsForm />

        </div>
    );
}
