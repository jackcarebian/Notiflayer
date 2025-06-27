import { RegistrationForm } from "@/components/registration-form";
import { outlets } from "@/lib/outlets";
import { notFound } from "next/navigation";

type Props = {
  params: {
    outlet: string;
  };
};

export default function RegistrationPage({ params }: Props) {
  const outlet = outlets.find(o => o.slug === params.outlet);

  if (!outlet) {
    notFound();
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold font-headline">Selamat Datang di Promo {outlet.name}</h1>
        <p className="text-muted-foreground mt-2">Daftarkan diri Anda untuk menerima notifikasi dan promo spesial langsung dari {outlet.name}.</p>
      </div>
      <RegistrationForm outlet={outlet} />
    </div>
  );
}
