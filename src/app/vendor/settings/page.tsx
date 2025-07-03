
import { Settings } from "lucide-react";
import { PricingSettingsForm } from "@/components/vendor/pricing-settings-form";

export default function VendorSettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                 <Settings className="h-8 w-8 text-primary" />
                 <div>
                    <h1 className="text-2xl font-bold tracking-tight">Global Settings</h1>
                    <p className="text-muted-foreground">
                        Konfigurasi pengaturan global, kebijakan, dan integrasi untuk platform.
                    </p>
                 </div>
            </div>
            
            <PricingSettingsForm />

        </div>
    );
}
