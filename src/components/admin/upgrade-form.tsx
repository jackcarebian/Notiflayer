
"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Minus, Plus, ShoppingBasket } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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

function Stepper({ label, description, value, onIncrement, onDecrement }: { label: string, description?: string, value: number, onIncrement: () => void, onDecrement: () => void }) {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h4 className="font-medium">{label}</h4>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={onDecrement} disabled={value === 0}>
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-bold w-10 text-center">{value}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={onIncrement}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export function UpgradeForm() {
    const [selectedPlanId, setSelectedPlanId] = useState<string>('banyak-cabang');
    const [extraCampaigns, setExtraCampaigns] = useState(0);
    const [extraBranches, setExtraBranches] = useState(0);
    const [extraBrands, setExtraBrands] = useState(0);
    
    const selectedPlan = useMemo(() => plans.find(p => p.id === selectedPlanId), [selectedPlanId]);

    const total = useMemo(() => {
        if (!selectedPlan) return 0;
        const planCost = selectedPlan.price;
        const campaignCost = extraCampaigns * addonPrices.campaign;
        const branchCost = extraBranches * addonPrices.branch;
        const brandCost = extraBrands * addonPrices.brand;
        return planCost + campaignCost + branchCost + brandCost;
    }, [selectedPlan, extraCampaigns, extraBranches, extraBrands]);

    const handlePlanChange = (value: string) => {
        setSelectedPlanId(value);
        // Reset add-ons when plan changes, if needed
        setExtraCampaigns(0);
        setExtraBranches(0);
        setExtraBrands(0);
    };

    return (
        <Card className="w-full">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left Column: Plan Selection & Add-ons */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Paket Langganan</h3>
                            <RadioGroup value={selectedPlanId} onValueChange={handlePlanChange} className="space-y-3">
                                {plans.map((plan) => (
                                    <Label key={plan.id} htmlFor={plan.id} className="flex justify-between items-center p-4 border rounded-md cursor-pointer has-[:checked]:bg-primary/5 has-[:checked]:border-primary">
                                        <div className="flex items-center gap-4">
                                            <RadioGroupItem value={plan.id} id={plan.id} />
                                            <span>{plan.name}</span>
                                        </div>
                                        <span className="font-bold">{formatRupiah(plan.price)}</span>
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                        <div>
                             <h3 className="text-lg font-semibold mb-4">Penambahan (Opsional)</h3>
                             <p className="text-sm text-muted-foreground mb-4">Di luar kuota paket dasar Anda.</p>
                             <div className="space-y-4">
                                <Stepper
                                    label="Kampanye Tambahan"
                                    description="Gratis 1 per bulan."
                                    value={extraCampaigns}
                                    onIncrement={() => setExtraCampaigns(v => v + 1)}
                                    onDecrement={() => setExtraCampaigns(v => Math.max(0, v - 1))}
                                />
                                 <Stepper
                                    label="Cabang Tambahan"
                                    value={extraBranches}
                                    onIncrement={() => setExtraBranches(v => v + 1)}
                                    onDecrement={() => setExtraBranches(v => Math.max(0, v - 1))}
                                />
                                 <Stepper
                                    label="Brand Tambahan"
                                    value={extraBrands}
                                    onIncrement={() => setExtraBrands(v => v + 1)}
                                    onDecrement={() => setExtraBrands(v => Math.max(0, v - 1))}
                                />
                             </div>
                        </div>
                    </div>

                    {/* Right Column: Billing Summary */}
                    <div className="bg-gray-50 p-6 rounded-lg h-fit">
                        <h3 className="text-lg font-semibold mb-4">Rincian Estimasi Biaya:</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Paket {selectedPlan?.name || ''}</span>
                                <span className="font-medium">{formatRupiah(selectedPlan?.price || 0)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tambahan Kampanye ({extraCampaigns}x)</span>
                                <span className="font-medium">{formatRupiah(extraCampaigns * addonPrices.campaign)}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Tambahan Cabang ({extraBranches}x)</span>
                                <span className="font-medium">{formatRupiah(extraBranches * addonPrices.branch)}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Tambahan Brand ({extraBrands}x)</span>
                                <span className="font-medium">{formatRupiah(extraBrands * addonPrices.brand)}</span>
                            </div>
                            <Separator className="my-2" />
                             <div className="flex justify-between items-center text-base font-bold">
                                <span>Total Estimasi per Bulan</span>
                                <span>{formatRupiah(total)}</span>
                            </div>
                        </div>
                        <Button className="w-full mt-6" size="lg">
                            Daftar Sekarang
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

