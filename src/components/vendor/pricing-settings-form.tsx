
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const globalSettingsSchema = z.object({
  // Feature Toggles
  enableNewRegistrations: z.boolean().default(true),
  enableAiTools: z.boolean().default(true),

  // AI Config
  aiModel: z.string().min(1, "Nama model AI harus diisi."),
  aiSystemPrompt: z.string().optional(),

  // Notification Config
  fcmVapidKey: z.string().min(1, "VAPID Key harus diisi."),

  // Pricing
  satuCabang: z.coerce.number().min(0, "Harga harus positif."),
  banyakCabang: z.coerce.number().min(0, "Harga harus positif."),
  multiBisnis: z.coerce.number().min(0, "Harga harus positif."),
  addonCampaign: z.coerce.number().min(0, "Harga harus positif."),
  addonBranch: z.coerce.number().min(0, "Harga harus positif."),
  addonBrand: z.coerce.number().min(0, "Harga harus positif."),
  freeCampaignsPerMonth: z.coerce.number().int().min(0, "Jumlah harus 0 atau lebih."),
});

// Mock data: In a real app, this would be fetched from a global config document in Firestore.
const currentSettings = {
    enableNewRegistrations: true,
    enableAiTools: true,
    aiModel: 'googleai/gemini-2.0-flash',
    aiSystemPrompt: 'You are an expert marketing assistant. Your task is to create a short, compelling promotional text based on the user\'s input. The language should be in Indonesian.',
    fcmVapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || '',
    satuCabang: 49000,
    banyakCabang: 99000,
    multiBisnis: 199000,
    addonCampaign: 30000,
    addonBranch: 40000,
    addonBrand: 99000,
    freeCampaignsPerMonth: 1,
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

    const form = useForm<z.infer<typeof globalSettingsSchema>>({
        resolver: zodResolver(globalSettingsSchema),
        defaultValues: currentSettings,
    });

    async function onSubmit(values: z.infer<typeof globalSettingsSchema>) {
        setIsSubmitting(true);
        // SIMULASI: Menyimpan data ke backend.
        console.log("SIMULASI: Memperbarui pengaturan global...", values);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
            title: "Pengaturan Disimpan!",
            description: "Pengaturan global untuk platform telah berhasil diperbarui.",
        });
        
        setIsSubmitting(false);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Formulir Pengaturan Global</CardTitle>
                <CardDescription>
                    Atur kebijakan, harga, dan integrasi teknis untuk seluruh platform.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                        {/* Global Policies & Features */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-primary border-b pb-2">Kebijakan & Fitur Global</h3>
                            <div className="space-y-6 pt-4">
                                <FormField control={form.control} name="enableNewRegistrations" render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Aktifkan Pendaftaran Member Baru</FormLabel>
                                            <FormDescription>Jika dinonaktifkan, halaman pendaftaran akan ditutup sementara.</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="enableAiTools" render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Aktifkan Fitur Pemasaran AI</FormLabel>
                                            <FormDescription>Menonaktifkan ini akan menyembunyikan tool AI dari dasbor member.</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            </div>
                        </div>

                        {/* AI Configuration */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-primary border-b pb-2">Konfigurasi AI (Genkit)</h3>
                            <div className="space-y-6 pt-4">
                               <FormField control={form.control} name="aiModel" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Model AI</FormLabel>
                                        <FormControl>
                                            <Input placeholder="googleai/gemini-2.0-flash" {...field} />
                                        </FormControl>
                                        <FormDescription>Nama model Genkit yang akan digunakan untuk semua fitur AI.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="aiSystemPrompt" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>System Prompt AI Global</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Anda adalah asisten pemasaran yang ahli..." {...field} className="min-h-24 font-mono text-xs" />
                                        </FormControl>
                                        <FormDescription>Prompt dasar yang akan memandu perilaku AI di seluruh aplikasi.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </div>

                        {/* Notification Configuration */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-primary border-b pb-2">Konfigurasi Notifikasi (FCM)</h3>
                             <div className="space-y-6 pt-4">
                                <FormField control={form.control} name="fcmVapidKey" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Firebase VAPID Key</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••••••••" {...field} />
                                        </FormControl>
                                        <FormDescription>Kunci Public Key dari Firebase Cloud Messaging untuk otentikasi Push API.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </div>
                        
                        {/* Pricing & Campaign Policies */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-primary border-b pb-2">Harga & Kebijakan Kampanye</h3>
                            <div className="space-y-6 pt-4">
                               <FormField control={form.control} name="freeCampaignsPerMonth" render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-1 md:grid-cols-3 items-start md:items-center gap-2 md:gap-4">
                                            <div className="md:col-span-1">
                                                <FormLabel>Kampanye Gratis</FormLabel>
                                                <FormDescription className="mt-1">Jumlah kampanye gratis yang didapat setiap member per bulan.</FormDescription>
                                            </div>
                                            <div className="md:col-span-2">
                                                <FormControl>
                                                    <Input type="number" className="max-w-xs" placeholder="1" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        </div>
                                    </FormItem>
                                )} />
                                <Separator />
                                <h4 className="text-base font-semibold">Harga Paket Langganan (per Bulan)</h4>
                                <FormField control={form.control} name="satuCabang" render={({ field }) => ( <PriceInput field={field} label="Satu Cabang" /> )}/>
                                <FormField control={form.control} name="banyakCabang" render={({ field }) => ( <PriceInput field={field} label="Banyak Cabang" /> )}/>
                                <FormField control={form.control} name="multiBisnis" render={({ field }) => ( <PriceInput field={field} label="Multi Bisnis" /> )}/>
                                <Separator />
                                <h4 className="text-base font-semibold">Harga Add-on</h4>
                               <FormField control={form.control} name="addonCampaign" render={({ field }) => ( <PriceInput field={field} label="Kampanye Tambahan" description="Per kampanye." /> )}/>
                               <FormField control={form.control} name="addonBranch" render={({ field }) => ( <PriceInput field={field} label="Cabang Tambahan" description="Per cabang/bulan." /> )}/>
                               <FormField control={form.control} name="addonBrand" render={({ field }) => ( <PriceInput field={field} label="Brand Tambahan" description="Per brand/bulan." /> )}/>
                            </div>
                        </div>
                        
                        <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                           {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                           Simpan Pengaturan Global
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
