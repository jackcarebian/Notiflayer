"use client";

import { useState } from "react";
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
import { outlets } from "@/lib/outlets";
import { Send, Upload } from "lucide-react";

export function CampaignForm() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [outlet, setOutlet] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const campaignData = {
        title,
        message,
        link,
        image: image?.name,
        outlet
    };
    console.log("Mengirim kampanye:", campaignData);
    // TODO: Implement logic to send notification via FCM
    alert("Fitur pengiriman belum terhubung. Data kampanye tercatat di console.");
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Buat Kampanye Baru</CardTitle>
        <CardDescription>
          Isi detail di bawah ini untuk dikirim sebagai notifikasi push.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Judul Promo</Label>
            <Input
              id="title"
              placeholder="Contoh: Diskon 50% Kopi Susu!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Isi Pesan Notifikasi</Label>
            <Textarea
              id="message"
              placeholder="Contoh: Khusus hari ini, nikmati kopi susu gula aren dengan setengah harga."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="link">Link Tujuan (URL)</Label>
            <Input
              id="link"
              type="url"
              placeholder="https://contoh.com/promo-spesial"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Gambar Promo</Label>
            <div className="flex items-center gap-4">
                <Input id="image" type="file" onChange={handleImageChange} className="w-full" accept="image/*" />
            </div>
            {image && <p className="text-sm text-muted-foreground">File dipilih: {image.name}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="outlet">Target Outlet</Label>
            <Select onValueChange={setOutlet} value={outlet} required>
              <SelectTrigger id="outlet">
                <SelectValue placeholder="Pilih outlet target" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Outlet</SelectItem>
                {outlets.map((o) => (
                  <SelectItem key={o.id} value={o.slug}>
                    {o.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" size="lg">
            <Send className="mr-2 h-4 w-4" />
            Kirim Notifikasi
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
