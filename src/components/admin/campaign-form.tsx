
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { promoInterests } from "@/lib/outlets";
import { Calendar as CalendarIcon, Upload, Users, X, Loader2, Printer, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "../ui/separator";

const businessCategories = Object.keys(promoInterests);
const ADDON_CAMPAIGN_PRICE = 30000;

function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}


export function CampaignForm() {
  const [campaignName, setCampaignName] = useState("");
  const [date, setDate] = useState<DateRange | undefined>();
  const [category, setCategory] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  
  // --- State untuk simulasi kuota & invoice ---
  const [usedCampaigns, setUsedCampaigns] = useState(1);
  const [freeCampaignQuota] = useState(1); // Kuota gratis, bisa dari API
  const [isConfirmingPurchase, setIsConfirmingPurchase] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePreferenceChange = (checked: boolean, item: string) => {
    if (checked) {
        setPreferences([...preferences, item]);
    } else {
        setPreferences(preferences.filter((p) => p !== item));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usedCampaigns >= freeCampaignQuota) {
        setIsConfirmingPurchase(true);
    } else {
        publishCampaign();
    }
  };

  const publishCampaign = () => {
    setIsSubmitting(true);
    console.log("Menyimpan kampanye...");
    toast({
        title: "Kampanye Dipublikasikan!",
        description: `Kampanye "${campaignName}" telah berhasil dibuat.`,
    });
    setUsedCampaigns(prev => prev + 1); // Tambah jumlah kampanye terpakai
    // Reset form di sini jika perlu
    setIsSubmitting(false);
    setIsConfirmingPurchase(false);
  }

  const handlePrintInvoice = () => {
    window.print();
  }

  // Mock targeted customers based on selection for demo purposes
  const targetedCustomers = Math.floor(Math.random() * 50) + (preferences.length * 10); 

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Buat Kampanye Baru</CardTitle>
        <CardDescription>
          Isi detail di bawah ini untuk meluncurkan kampanye Anda berikutnya. Kuota gratis Anda bulan ini: {Math.max(0, freeCampaignQuota - usedCampaigns)}/{freeCampaignQuota}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="campaign-name">Nama Kampanye</Label>
              <Input
                id="campaign-name"
                placeholder="Contoh: Diskon Kemerdekaan"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Tanggal Berlaku Kampanye</Label>
               <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "d LLL y", { locale: id })} -{" "}
                          {format(date.to, "d LLL y", { locale: id })}
                        </>
                      ) : (
                        format(date.from, "d LLL y", { locale: id })
                      )
                    ) : (
                      <span>Pilih rentang tanggal</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    locale={id}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
                <Label htmlFor="category">Kategori Bisnis</Label>
                <Select onValueChange={(value) => {setCategory(value); setPreferences([])}} value={category}>
                <SelectTrigger id="category">
                    <SelectValue placeholder="Pilih kategori bisnis Anda" />
                </SelectTrigger>
                <SelectContent>
                    {businessCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                        {cat}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label>Preferensi Minat Pelanggan</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between font-normal" disabled={!category}>
                           <div className="flex items-center gap-2">
                             <span>{category ? `${preferences.length} minat terpilih` : 'Pilih kategori bisnis terlebih dahulu'}</span>
                           </div>
                           <div className="flex items-center gap-2 bg-blue-100 text-primary px-2 py-0.5 rounded-md text-xs font-semibold">
                             <Users className="h-3 w-3" />
                             {category ? targetedCustomers : 0} Pelanggan Tertarget
                           </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-4" align="start">
                        <div className="font-semibold mb-4 text-sm">Pilih Minat untuk Kategori: {category}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                            {category && promoInterests[category as keyof typeof promoInterests].map(item => (
                                <div key={item} className="flex items-center space-x-2">
                                    <Checkbox 
                                        id={item}
                                        checked={preferences.includes(item)}
                                        onCheckedChange={(checked) => handlePreferenceChange(checked as boolean, item)}
                                    />
                                    <label htmlFor={item} className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Gambar Kampanye</Label>
            <div className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
                {imagePreview ? (
                    <>
                       <img src={imagePreview} alt="Pratinjau Gambar" className="object-contain h-full w-full rounded-lg" />
                       <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => {setImage(null); setImagePreview(null)}}>
                            <X className="h-4 w-4" />
                            <span className="sr-only">Hapus gambar</span>
                       </Button>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Klik untuk mengunggah</span> atau seret dan lepas</p>
                        <p className="text-xs text-gray-500">PNG, JPG atau GIF (MAX. 800x400px)</p>
                    </div>
                )}
                 <Input id="image" type="file" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/png, image/jpeg, image/gif" />
            </div>
            <p className="text-xs text-muted-foreground">Gambar yang menarik dapat meningkatkan keterlibatan.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Deskripsi Kampanye</Label>
            <Textarea
              id="description"
              placeholder="Jelaskan detail promo atau kampanye Anda di sini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" size="lg" disabled={isSubmitting}>
             {isSubmitting ? (
                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
             ) : (
                 <ShoppingCart className="mr-2 h-4 w-4" />
             )}
            Simpan dan Publikasikan Kampanye
          </Button>
        </form>
      </CardContent>
    </Card>

    <AlertDialog open={isConfirmingPurchase} onOpenChange={setIsConfirmingPurchase}>
        <AlertDialogContent className="printable-area">
             <div id="invoice-content">
                <AlertDialogHeader>
                    <AlertDialogTitle>Konfirmasi Pembelian Kampanye Tambahan</AlertDialogTitle>
                    <AlertDialogDescription>
                        Kuota kampanye gratis Anda bulan ini telah habis. Lanjutkan untuk membeli satu (1) slot kampanye tambahan.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="my-4 space-y-4">
                    <Separator />
                    <div className="space-y-2">
                        <h4 className="font-semibold">Rincian Invoice</h4>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Item</span>
                            <span className="text-muted-foreground">Harga</span>
                        </div>
                        <div className="flex justify-between font-medium">
                            <span>1x Kampanye Tambahan</span>
                            <span>{formatRupiah(ADDON_CAMPAIGN_PRICE)}</span>
                        </div>
                    </div>
                    <Separator />
                     <div className="flex justify-between font-bold text-lg">
                        <span>Total Tagihan</span>
                        <span>{formatRupiah(ADDON_CAMPAIGN_PRICE)}</span>
                    </div>
                </div>
             </div>
            <AlertDialogFooter className="no-print">
                <Button variant="outline" onClick={handlePrintInvoice}><Printer className="mr-2 h-4 w-4" />Cetak Invoice</Button>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={publishCampaign} disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Konfirmasi & Publikasikan
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
