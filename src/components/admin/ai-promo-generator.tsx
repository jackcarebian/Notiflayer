'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { promoInterests } from '@/lib/outlets';
import { Bot, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { generatePromoIdea, type GeneratePromoIdeaOutput } from '@/ai/flows/generate-promo-idea';
import { useToast } from '@/hooks/use-toast';

const businessTypes = Object.keys(promoInterests);
const languageStyles = ['Santai & Ramah', 'Profesional & Elegan', 'Lucu & Jenaka', 'Singkat & Langsung'];

export function AiPromoGenerator() {
  const [businessType, setBusinessType] = useState('');
  const [product, setProduct] = useState('');
  const [audience, setAudience] = useState('');
  const [languageStyle, setLanguageStyle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [promoIdea, setPromoIdea] = useState<GeneratePromoIdeaOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessType || !product || !audience || !languageStyle) {
        toast({
            variant: 'destructive',
            title: 'Form Belum Lengkap',
            description: 'Mohon isi semua field untuk mendapatkan hasil terbaik.',
        });
      return;
    }

    setIsLoading(true);
    setPromoIdea(null);

    try {
      const result = await generatePromoIdea({
        businessType,
        product,
        audience,
        languageStyle,
      });
      setPromoIdea(result);
    } catch (error) {
      console.error('Error generating promo idea:', error);
      toast({
        variant: 'destructive',
        title: 'Terjadi Kesalahan',
        description: 'Gagal membuat ide promosi. Silakan coba lagi.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Sihir Pemasaran dalam Sekejap</CardTitle>
          <CardDescription>
            Cukup isi beberapa detail, dan biarkan asisten AI kami meracik kalimat promosi paling ciamik untuk bisnismu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="business-type">Jenis Bisnis</Label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger id="business-type">
                  <SelectValue placeholder="Pilih jenis bisnismu" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="product">Produk/Layanan Spesifik</Label>
              <Input
                id="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Contoh: Kopi Susu Aren, Potong Rambut Pria"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience">Target Audiens</Label>
              <Input
                id="audience"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="Contoh: Mahasiswa, Pekerja Kantoran"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language-style">Gaya Bahasa</Label>
              <Select value={languageStyle} onValueChange={setLanguageStyle}>
                <SelectTrigger id="language-style">
                  <SelectValue placeholder="Pilih gaya bahasa yang cocok" />
                </SelectTrigger>
                <SelectContent>
                  {languageStyles.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Membuat Keajaiban...' : 'Buatkan Saya Promosi!'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="h-full">
        <CardHeader className="flex flex-row items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>Ide Promosi dari AI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-slate-50 rounded-lg p-6 flex flex-col justify-center items-center text-center">
            {isLoading && (
              <div className="space-y-4">
                <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
                <p className="text-muted-foreground">AI sedang meracik ide terbaik untuk Anda...</p>
              </div>
            )}
            {!isLoading && !promoIdea && (
              <div className="space-y-4">
                <Bot className="h-10 w-10 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">
                  Hasilnya bakal nongol di sini! <br />
                  Isi form di samping & biarkan keajaiban dimulai.
                </p>
              </div>
            )}
            {promoIdea && (
              <div className="text-left w-full space-y-4 animate-in fade-in">
                <div>
                  <h3 className="font-bold text-lg text-primary">{promoIdea.headline}</h3>
                </div>
                <div className="prose prose-sm text-gray-700">
                    <p>{promoIdea.body}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{promoIdea.callToAction}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
