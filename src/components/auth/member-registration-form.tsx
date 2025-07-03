
"use client";

import { useState, useMemo, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { promoInterests } from '@/lib/outlets';
import { registerMemberAction } from '@/app/actions';

const formSchema = z.object({
  ownerName: z.string().min(2, { message: "Nama lengkap harus diisi." }),
  businessName: z.string().min(2, { message: "Nama outlet/bisnis harus diisi." }),
  address: z.string().min(10, { message: "Alamat lengkap minimal 10 karakter." }),
  postalCode: z.string().min(5, { message: "Kode pos minimal 5 digit." }).max(5, { message: "Kode pos maksimal 5 digit."}),
  businessType: z.string({ required_error: "Pilih jenis bisnis Anda." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  whatsappNumber: z.string().min(10, { message: "Nomor WhatsApp minimal 10 digit." }),
  planId: z.string({ required_error: "Anda harus memilih paket langganan." }),
});

const plans = [
    { id: 'satu-cabang', name: 'Satu Cabang', price: 49000 },
    { id: 'banyak-cabang', name: 'Banyak Cabang', price: 99000 },
    { id: 'multi-bisnis', name: 'Multi Bisnis', price: 199000 },
];

const addonPrices = {
    campaign: 30000,
    branch: 40000,
    brand: 99000,
};

function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount).replace("Rp", "Rp ");
}

function Stepper({ label, value, onIncrement, onDecrement }: { label: string, value: number, onIncrement: () => void, onDecrement: () => void }) {
    return (
        <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm">{label}</h4>
            <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={onDecrement} disabled={value === 0}>
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="text-base font-bold w-8 text-center">{value}</span>
                <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={onIncrement}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}


export function MemberRegistrationForm() {
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [extraCampaigns, setExtraCampaigns] = useState(0);
    const [extraBranches, setExtraBranches] = useState(0);
    const [extraBrands, setExtraBrands] = useState(0);
    
    const defaultPlan = searchParams.get('plan') || 'banyak-cabang';

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ownerName: "",
            businessName: "",
            address: "",
            postalCode: "",
            email: "",
            whatsappNumber: "",
            planId: defaultPlan,
        },
    });
    
    const selectedPlanId = form.watch('planId');

    const total = useMemo(() => {
        const selectedPlan = plans.find(p => p.id === selectedPlanId);
        if (!selectedPlan) return 0;
        const planCost = selectedPlan.price;
        const campaignCost = extraCampaigns * addonPrices.campaign;
        const branchCost = extraBranches * addonPrices.branch;
        const brandCost = extraBrands * addonPrices.brand;
        return planCost + campaignCost + branchCost + brandCost;
    }, [selectedPlanId, extraCampaigns, extraBranches, extraBrands]);
    
    useEffect(() => {
        const planFromUrl = searchParams.get('plan');
        if (planFromUrl && plans.some(p => p.id === planFromUrl)) {
            form.setValue('planId', planFromUrl);
        }
    }, [searchParams, form]);


    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        const result = await registerMemberAction(values);

        if (result.success) {
            toast({
                title: "Pendaftaran Berhasil!",
                description: result.message,
            });
            // Di aplikasi nyata, Anda akan diarahkan ke halaman pembayaran.
            // Untuk sekarang, kita redirect ke halaman login.
            router.push('/login');
        } else {
            toast({
                variant: "destructive",
                title: "Pendaftaran Gagal",
                description: result.message || "Terjadi kesalahan. Silakan coba lagi.",
            });
        }
        setIsSubmitting(false);
    }

    return (
        <Card>
            <CardContent className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Personal & Outlet Information */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="ownerName" render={({ field }) => (
                                    <FormItem><FormLabel>Nama Lengkap Anda</FormLabel><FormControl><Input placeholder="Contoh: Budi Santoso" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="businessName" render={({ field }) => (
                                    <FormItem><FormLabel>Nama Outlet/Bisnis</FormLabel><FormControl><Input placeholder="Contoh: Kedai Kopi Senja" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                 <div className="md:col-span-2">
                                    <FormField control={form.control} name="address" render={({ field }) => (
                                        <FormItem><FormLabel>Alamat Outlet</FormLabel><FormControl><Input placeholder="Contoh: Jl. Merdeka No. 17, Boyolali" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                 </div>
                                 <FormField control={form.control} name="postalCode" render={({ field }) => (
                                    <FormItem><FormLabel>Kode Pos</FormLabel><FormControl><Input placeholder="57311" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                 <FormField control={form.control} name="businessType" render={({ field }) => (
                                    <FormItem><FormLabel>Jenis Bisnis</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Pilih jenis bisnis Anda" /></SelectTrigger></FormControl>
                                            <SelectContent>{Object.keys(promoInterests).map(cat => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}</SelectContent>
                                        </Select>
                                    <FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem><FormLabel>Alamat Email</FormLabel><FormControl><Input type="email" placeholder="email@bisnisanda.com" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="whatsappNumber" render={({ field }) => (
                                    <FormItem><FormLabel>Nomor WhatsApp</FormLabel><FormControl><Input placeholder="081234567890" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                        </div>

                        <Separator />
                        
                        {/* Package Selection & Billing */}
                        <Card className="bg-gray-50/50">
                             <CardHeader>
                                <CardTitle>Pilih Paket & Estimasi Biaya</CardTitle>
                             </CardHeader>
                             <CardContent>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <FormField control={form.control} name="planId" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold">Paket Langganan</FormLabel>
                                                <FormControl>
                                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                                                        {plans.map((plan) => (
                                                            <FormItem key={plan.id} className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value={plan.id} id={plan.id} />
                                                                </FormControl>
                                                                <Label htmlFor={plan.id} className="flex justify-between items-center w-full font-normal cursor-pointer">
                                                                    <span>{plan.name}</span>
                                                                    <span className="font-semibold">{formatRupiah(plan.price)}</span>
                                                                </Label>
                                                            </FormItem>
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}/>
                                        <div>
                                            <h4 className="font-semibold mb-3">Penambahan (Opsional)</h4>
                                            <div className="space-y-3">
                                                <Stepper label="Kampanye Tambahan" value={extraCampaigns} onIncrement={() => setExtraCampaigns(v => v + 1)} onDecrement={() => setExtraCampaigns(v => Math.max(0, v - 1))}/>
                                                <Stepper label="Cabang Tambahan" value={extraBranches} onIncrement={() => setExtraBranches(v => v + 1)} onDecrement={() => setExtraBranches(v => Math.max(0, v - 1))} />
                                                <Stepper label="Brand Tambahan" value={extraBrands} onIncrement={() => setExtraBrands(v => v + 1)} onDecrement={() => setExtraBrands(v => Math.max(0, v - 1))} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg border">
                                        <h4 className="font-semibold mb-4">Rincian Estimasi Biaya:</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between"><span className="text-muted-foreground">Paket {plans.find(p => p.id === selectedPlanId)?.name}</span><span>{formatRupiah(plans.find(p => p.id === selectedPlanId)?.price || 0)}</span></div>
                                            <div className="flex justify-between"><span className="text-muted-foreground">Tambahan Kampanye ({extraCampaigns}x)</span><span>{formatRupiah(extraCampaigns * addonPrices.campaign)}</span></div>
                                            <div className="flex justify-between"><span className="text-muted-foreground">Tambahan Cabang ({extraBranches}x)</span><span>{formatRupiah(extraBranches * addonPrices.branch)}</span></div>
                                            <div className="flex justify-between"><span className="text-muted-foreground">Tambahan Brand ({extraBrands}x)</span><span>{formatRupiah(extraBrands * addonPrices.brand)}</span></div>
                                            <Separator className="my-3" />
                                            <div className="flex justify-between text-base font-bold"><span >Total Estimasi per Bulan</span><span>{formatRupiah(total)}</span></div>
                                        </div>
                                    </div>
                                </div>
                             </CardContent>
                        </Card>
                        
                        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Daftar Sekarang
                        </Button>
                         <p className="text-xs text-muted-foreground text-center">Sudah punya akun? <Link href="/login" className="underline font-semibold">Login di sini</Link></p>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
