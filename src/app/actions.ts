"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus memiliki setidaknya 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  preferences: z.record(z.array(z.string())),
  outletSlug: z.string(),
  fcmToken: z.string().nullable(),
});

type RegisterUserPayload = z.infer<typeof formSchema>;

export async function registerUserAction(payload: RegisterUserPayload) {
  const validation = formSchema.safeParse(payload);
  
  if (!validation.success) {
    return {
      success: false,
      message: "Data yang dimasukkan tidak valid.",
    };
  }
  
  const dataToSave = {
    nama: validation.data.name,
    email: validation.data.email,
    token_fcm: validation.data.fcmToken,
    waktu_daftar: new Date().toISOString(),
    preferensi: validation.data.preferences,
    outlet: validation.data.outletSlug,
  };
  
  // Di sini nanti logika untuk menyimpan data ke Firestore
  console.log("Akan menyimpan data pelanggan:", JSON.stringify(dataToSave, null, 2));

  // Simulasi sukses
  return {
    success: true,
  };
}