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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { promoInterests } from "@/lib/outlets";
import type { Outlet } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { registerUserAction } from "@/app/actions";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus memiliki setidaknya 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  preferences: z.record(z.array(z.string())).refine(
    (value) => Object.keys(value).length > 0 && Object.values(value).some((arr) => arr.length > 0),
    {
      message: "Anda harus memilih setidaknya satu minat promo.",
    }
  ),
});

// =================================================================
// PENTING: Pindahkan konfigurasi ini ke file .env.local Anda!
// Jangan pernah menempatkan kunci API langsung di dalam kode.
// =================================================================
// Contoh isi file .env.local:
// NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY_HERE"
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_PROJECT_ID.firebaseapp.com"
// NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_PROJECT_ID.appspot.com"
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
// NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
// NEXT_PUBLIC_FIREBASE_VAPID_KEY="YOUR_VAPID_KEY_HERE"
// =================================================================
const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

type RegistrationFormProps = {
  outlet: Outlet;
};

export function RegistrationForm({ outlet }: RegistrationFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermission | 'loading'>('loading');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      preferences: {},
    },
  });

  const requestNotificationPermission = async () => {
    if (!firebaseConfig.apiKey || !VAPID_KEY) {
        console.error("Firebase config or VAPID key is not set in environment variables.");
        toast({
            variant: "destructive",
            title: "Konfigurasi Firebase Belum Lengkap",
            description: "Notifikasi tidak dapat diaktifkan. Harap hubungi pemilik situs.",
        });
        setNotificationPermissionStatus('denied');
        return;
    }

    try {
        if (!(await isSupported())) {
            console.log("FCM not supported in this browser");
            setNotificationPermissionStatus('denied');
            toast({ variant: "destructive", title: "Browser Tidak Mendukung", description: "Notifikasi push tidak didukung di browser ini." });
            return;
        }

        const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        const messaging = getMessaging(app);
        
        console.log("Requesting notification permission...");
        const permission = await Notification.requestPermission();
        setNotificationPermissionStatus(permission);
        
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
            if (currentToken) {
                setFcmToken(currentToken);
                console.log('FCM Token:', currentToken);
                toast({ title: "Notifikasi Diizinkan!", description: "Anda akan menerima promo dari kami." });
            } else {
                console.log('No registration token available. Request permission to generate one.');
                toast({ variant: "destructive", title: "Token Gagal Didapatkan" });
            }
        } else {
            console.log('Unable to get permission to notify.');
            toast({ variant: "destructive", title: "Izin Ditolak", description: "Anda tidak akan menerima notifikasi promo." });
        }
    } catch(error) {
        console.error("Error getting FCM token:", error);
        setNotificationPermissionStatus('denied');
        toast({
            variant: "destructive",
            title: "Izin Notifikasi Gagal",
            description: "Terjadi kesalahan saat meminta izin notifikasi.",
        });
    }
  }

  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
        setNotificationPermissionStatus(Notification.permission);
    }
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    if (notificationPermissionStatus !== 'granted') {
        toast({
            variant: "destructive",
            title: "Izin Notifikasi Diperlukan",
            description: "Silakan izinkan notifikasi terlebih dahulu untuk mendaftar.",
        });
        setIsSubmitting(false);
        return;
    }

    const result = await registerUserAction({ ...values, outletSlug: outlet.slug, fcmToken });
    
    if (result.success) {
      toast({
        title: "Pendaftaran Berhasil!",
        description: result.message || `Terima kasih, ${values.name}. Selamat datang!`,
      });
      form.reset();
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
        {notificationPermissionStatus === 'loading' && <p>Mengecek status notifikasi...</p>}

        {notificationPermissionStatus !== 'loading' && notificationPermissionStatus !== 'granted' && (
            <div className="text-center p-6 bg-slate-100 rounded-lg space-y-4">
                <h3 className="font-bold text-lg">Aktifkan Notifikasi untuk Mendaftar</h3>
                <p className="text-muted-foreground text-sm">
                    Kami memerlukan izin notifikasi browser Anda agar dapat mengirimkan info promo terbaru langsung ke perangkat Anda.
                </p>
                <Button onClick={requestNotificationPermission}>
                    Izinkan Notifikasi
                </Button>
            </div>
        )}

        {notificationPermissionStatus === 'granted' && (
             <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               <FormField
                 control={form.control}
                 name="name"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Nama</FormLabel>
                     <FormControl>
                       <Input placeholder="Nama Lengkap Anda" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
               <FormField
                 control={form.control}
                 name="email"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                       <Input type="email" placeholder="email@contoh.com" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
               <FormField
                 control={form.control}
                 name="preferences"
                 render={({ field }) => (
                   <FormItem>
                     <div className="mb-4">
                       <FormLabel className="text-base">Minat Promo</FormLabel>
                       <FormDescription>
                         Pilih kategori dan jenis promo yang Anda minati.
                       </FormDescription>
                     </div>
                     <Accordion type="multiple" className="w-full">
                       {Object.entries(promoInterests).map(([category, items]) => (
                         <AccordionItem value={category} key={category}>
                           <AccordionTrigger>{category}</AccordionTrigger>
                           <AccordionContent>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
                               {items.map((item) => (
                                 <FormItem
                                   key={item}
                                   className="flex flex-row items-center space-x-3 space-y-0"
                                 >
                                   <FormControl>
                                     <Checkbox
                                       checked={field.value?.[category]?.includes(item) ?? false}
                                       onCheckedChange={(checked) => {
                                         const currentCategoryPrefs = field.value?.[category] || [];
                                         let newCategoryPrefs;
                                         if (checked) {
                                           newCategoryPrefs = [...currentCategoryPrefs, item];
                                         } else {
                                           newCategoryPrefs = currentCategoryPrefs.filter(
                                             (value) => value !== item
                                           );
                                         }
                                         const newPreferences = {
                                           ...field.value,
                                           [category]: newCategoryPrefs,
                                         };
                                         if (newPreferences[category].length === 0) {
                                           delete newPreferences[category];
                                         }
                                         field.onChange(newPreferences);
                                       }}
                                     />
                                   </FormControl>
                                   <FormLabel className="font-normal text-sm">{item}</FormLabel>
                                 </FormItem>
                               ))}
                             </div>
                           </AccordionContent>
                         </AccordionItem>
                       ))}
                     </Accordion>
                     <FormMessage />
                   </FormItem>
                 )}
               />
               <Button type="submit" className="w-full" disabled={isSubmitting}>
                 {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                 Daftar
               </Button>
               <p className="text-xs text-muted-foreground text-center">Dengan mendaftar, Anda setuju untuk menerima notifikasi promo melalui browser.</p>
             </form>
           </Form>
        )}
      </CardContent>
    </Card>
  );
}
