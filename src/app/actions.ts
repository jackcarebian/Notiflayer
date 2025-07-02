
"use server";

import { z } from "zod";

// =================================================================
// ACTION UNTUK REGISTRASI PELANGGAN (DARI QR CODE)
// =================================================================
const customerFormSchema = z.object({
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

type RegisterCustomerPayload = z.infer<typeof customerFormSchema>;

export async function registerCustomerAction(payload: RegisterCustomerPayload) {
  const validation = customerFormSchema.safeParse(payload);
  
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
  
  console.log("Data pelanggan yang akan disimpan ke Firestore:", JSON.stringify(dataToSave, null, 2));

  return {
    success: true,
    message: `Pendaftaran untuk ${name} berhasil!`,
  };
}


// =================================================================
// ACTION UNTUK REGISTRASI OUTLET DEMO BARU
// =================================================================
const demoOutletFormSchema = z.object({
  businessName: z.string().min(2, { message: "Nama bisnis minimal 2 karakter." }),
  ownerName: z.string().min(2, { message: "Nama Anda minimal 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
});

type RegisterDemoOutletPayload = z.infer<typeof demoOutletFormSchema>;

export async function registerDemoOutletAction(payload: RegisterDemoOutletPayload) {
  const validation = demoOutletFormSchema.safeParse(payload);

  if (!validation.success) {
    return {
      success: false,
      message: "Data yang dimasukkan tidak valid.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { businessName, ownerName, email } = validation.data;
  const now = new Date();
  const expiryDate = new Date(now.setDate(now.getDate() + 30));

  const newOutletData = {
    businessName,
    ownerName,
    email,
    subscription: {
      type: 'demo',
      status: 'active',
      startDate: new Date().toISOString(),
      expiryDate: expiryDate.toISOString(),
      campaignsUsed: 0,
      campaignLimit: 1,
      campaignDurationLimit: 14, // Batas durasi kampanye 2 minggu
    },
    createdAt: new Date().toISOString(),
  };

  // --- LOGIKA BACKEND YANG SEBENARNYA ---
  // Di aplikasi nyata, di sinilah Anda akan:
  // 1. Menggunakan Firebase Auth untuk membuat user baru dengan email dan password.
  //    const userRecord = await admin.auth().createUser({ email, password });
  //
  // 2. Membuat dokumen baru di koleksi 'outlets' (atau 'businesses') di Firestore.
  //    const outletRef = await db.collection('outlets').add({
  //      ...newOutletData,
  //      ownerUid: userRecord.uid, // Tautkan outlet dengan UID pengguna
  //    });
  //
  // 3. (Opsional) Membuat dokumen 'userProfile' untuk menyimpan info tambahan.
  //    await db.collection('users').doc(userRecord.uid).set({
  //      name: ownerName,
  //      role: 'demo_user',
  //      outletId: outletRef.id,
  //    });
  //
  // 4. Setelah berhasil, kirim email selamat datang.

  console.log("SIMULASI: Membuat outlet demo baru di backend...");
  console.log(JSON.stringify(newOutletData, null, 2));
  console.log("SIMULASI: Akun demo akan aktif hingga:", expiryDate.toLocaleDateString('id-ID'));

  return {
    success: true,
    message: `Pendaftaran demo untuk ${businessName} berhasil! Silakan login untuk memulai.`,
  };
}
