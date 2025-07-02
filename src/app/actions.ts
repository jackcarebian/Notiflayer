"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus memiliki setidaknya 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  preferences: z.record(z.array(z.string())).refine(
    (value) => Object.keys(value).length > 0 && Object.values(value).some((arr) => arr.length > 0),
    {
      message: "Anda harus memilih setidaknya satu minat promo.",
    }
  ),
  outletSlug: z.string(),
  fcmToken: z.string().optional().nullable(),
});

type RegisterUserPayload = z.infer<typeof formSchema>;

export async function registerUserAction(payload: RegisterUserPayload) {
  const validation = formSchema.safeParse(payload);
  
  if (!validation.success) {
    console.error("Validation failed:", validation.error.flatten().fieldErrors);
    return {
      success: false,
      message: "Data yang dimasukkan tidak valid. Silakan periksa kembali isian Anda.",
      errors: validation.error.flatten().fieldErrors,
    };
  }
  
  const { name, email, preferences, outletSlug, fcmToken } = validation.data;

  const dataToSave = {
    nama: name,
    email: email,
    token_fcm: fcmToken,
    waktu_daftar: new Date().toISOString(),
    preferensi: preferences,
    outlet: outletSlug,
  };
  
  // =================================================================
  // LOGIKA BACKEND: MENYIMPAN DATA KE FIRESTORE
  // =================================================================
  // Kode di bawah ini adalah contoh bagaimana Anda akan menyimpan data ke Firestore.
  // Ini memerlukan konfigurasi Firebase Admin SDK di sisi server.
  // 
  // 1. Pastikan Anda sudah menginisialisasi Firebase Admin di aplikasi Anda.
  //    (Biasanya dilakukan di file terpisah, misal: `src/lib/firebase-admin.ts`)
  // 2. Impor 'db' dari file inisialisasi tersebut.
  // 3. Gunakan 'addDoc' untuk menambahkan data baru.

  try {
    // import { db } from '@/lib/firebase-admin';
    // import { collection, addDoc } from 'firebase/firestore';
    // const docRef = await addDoc(collection(db, "pelanggan"), dataToSave);
    
    // Untuk sekarang, kita hanya akan log ke konsol.
    console.log("Data pelanggan yang akan disimpan ke Firestore:", JSON.stringify(dataToSave, null, 2));
    // console.log("Data berhasil disimpan dengan ID:", docRef.id);

    // Simulasi sukses
    return {
      success: true,
      message: `Pendaftaran untuk ${name} berhasil!`,
    };

  } catch (error) {
    console.error("Error saving to Firestore:", error);
    return {
      success: false,
      message: "Terjadi kesalahan di server. Gagal menyimpan data.",
    };
  }
}