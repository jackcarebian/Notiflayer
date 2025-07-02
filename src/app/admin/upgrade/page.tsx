
import { UpgradeForm } from "@/components/admin/upgrade-form";
import { CreditCard } from "lucide-react";

export default function UpgradePage() {
    return (
        <div className="flex flex-col items-center">
             <div className="w-full max-w-4xl space-y-6">
                 <div className="flex items-center gap-4">
                    <CreditCard className="h-8 w-8 text-primary" />
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Upgrade Langganan</h1>
                        <p className="text-muted-foreground">
                            Pilih paket yang paling sesuai dengan skala bisnis Anda untuk melanjutkan.
                        </p>
                    </div>
                </div>
                
                <UpgradeForm />
             </div>
        </div>
    );
}
