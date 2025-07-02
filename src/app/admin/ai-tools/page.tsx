import { AiPromoGenerator } from "@/components/admin/ai-promo-generator";
import { Bot } from "lucide-react";

export default function AiToolsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                 <Bot className="h-8 w-8 text-primary" />
                 <div>
                    <h1 className="text-2xl font-bold tracking-tight">Asisten Pemasaran AI</h1>
                    <p className="text-muted-foreground">
                        Bingung bikin kalimat promosi? Serahin aja ke AI, dijamin jitu dan menjual!
                    </p>
                 </div>
            </div>
            
            <AiPromoGenerator />
        </div>
    );
}
