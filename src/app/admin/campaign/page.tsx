import { CampaignForm } from "@/components/admin/campaign-form";

export default function CampaignPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Buat Kampanye Baru</h1>
        <p className="text-muted-foreground">
          Kirim notifikasi promo ke pelanggan Anda.
        </p>
      </div>
      <CampaignForm />
    </div>
  );
}