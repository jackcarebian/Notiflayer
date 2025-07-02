
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const pricingSchema = z.object({
  satuCabang: z.coerce.number().min(0, "Harga harus positif."),
  banyakCabang: z.coerce.number().min(0, "Harga harus positif."),
  multiBisnis: z.coerce.number().min(0, "Harga harus positif."),
  addonCampaign: z.coerce.number().min(0, "Harga harus positif."),
  addonBranch: z.coerce.number().min(0, "Harga harus positif."),
  addonBrand: z.coerce.number().min(0, "Harga harus positif."),
});

// Mock data: In a real app, this would be fetched from a database.
const currentPrices = {
    satuCabang: 49000,
    banyakCabang: 99000,
    multiBisnis: 199000,
    addonCampaign: 30000,
    addonBranch: 40000,
    addonBrand: 99000,
};

function PriceInput({ field, label, description }: { field: any; label: string; description?: string }) {
    return (
      <FormItem>
        <div className="grid grid-cols-1 md:grid-cols-3 items-start md:items-center gap-2 md:gap-4">
          <div className="md:col-span-1">
             <FormLabel>{label}</FormLabel>
             {description && <FormDescription className="mt-1">{description}</FormDescription>}
          </div>
          <div className="md:col-span-2">
              <div className="relative max-w-xs">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground text-sm">Rp</span>
                  <FormControl>
                      <Input type="number" className="pl-9" placeholder="0" {...field} />
                  </FormControl>
              </div>
              <FormMessage />
          </div>
        </div>
      </FormItem>
    );
}

export function PricingSettingsForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof pricingSchema>>({
        resolver: zodResolver(pricingSchema),
        defaultValues: currentPrices,
    });

    async function onSubmit(values: z.infer<typeof pricingSchema>) {
        setIsSubmitting(true);
        // SIMULASI: Menyimpan data ke backend.
        console.log("SIMULASI: Memperbarui harga langganan...", values);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
            title: "Pengaturan Disimpan!",
            description: "Harga langganan dan add-on telah berhasil diperbarui.",
        });
        
        setIsSubmitting(false);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Konfigurasi Harga Strategis</CardTitle>
                <CardDescription>
                    Atur harga untuk paket langganan dan item add-on. Perubahan akan diterapkan secara global.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div>
                            <h3 className="text-base font-semibold mb-4 text-primary">Harga Paket Langganan</h3>
                            <div className="space-y-6">
                                <FormField control={form.control} name="satuCabang" render={({ field }) => (
                                    <PriceInput field={field} label="Satu Cabang" />
                                )} />
                                <FormField control={form.control} name="banyakCabang" render={({ field }) => (
                                    <PriceInput field={field} label="Banyak Cabang" />
                                )} />
                                <FormField control={form.control} name="multiBisnis" render={({ field }) => (
                                    <PriceInput field={field} label="Multi Bisnis" />
                                )} />
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-base font-semibold mb-4 text-primary">Harga Add-on</h3>
                            <div className="space-y-6">
                               <FormField control={form.control} name="addonCampaign" render={({ field }) => (
                                    <PriceInput field={field} label="Kampanye Tambahan" description="Per kampanye." />
                               )} />
                               <FormField control={form.control} name="addonBranch" render={({ field }) => (
                                    <PriceInput field={field} label="Cabang Tambahan" description="Per cabang/bulan." />
                               )} />
                               <FormField control={form.control} name="addonBrand" render={({ field }) => (
                                    <PriceInput field={field} label="Brand Tambahan" description="Per brand/bulan." />
                               )} />
                            </div>
                        </div>
                        
                        <Button type="submit" disabled={isSubmitting}>
                           {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                           Simpan Perubahan Harga
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
