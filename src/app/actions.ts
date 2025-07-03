
"use server";

import { z } from "zod";
import { db } from "@/lib/firebase-admin";

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
    name: name,
    email: email,
    fcmToken: fcmToken,
    registeredAt: new Date().toISOString(),
    preferences: preferences,
    outletSlug: outletSlug,
  };
  
  try {
    const docRef = await db.collection("customers").add(dataToSave);
    console.log("Pelanggan baru disimpan ke Firestore dengan ID:", docRef.id);

    return {
      success: true,
      message: `Pendaftaran untuk ${name} berhasil!`,
    };
  } catch (error) {
    console.error("Gagal menyimpan pelanggan ke Firestore:", error);
    return {
      success: false,
      message: "Terjadi kesalahan pada server saat menyimpan data. Silakan coba lagi.",
    };
  }
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

  const { businessName, ownerName, email, password } = validation.data;
  
  const newMemberData = {
    businessName,
    owner: ownerName,
    email,
    plan: 'Demo',
    status: 'Trial',
    joined: new Date().toISOString(),
  };

  try {
    // Di aplikasi nyata, Anda juga akan membuat user di Firebase Auth di sini
    // menggunakan email dan password.
    // const userRecord = await auth.createUser({ email, password });
    // const memberDataWithUid = { ...newMemberData, ownerUid: userRecord.uid };
    
    const docRef = await db.collection("members").add(newMemberData);
    console.log("Outlet demo baru disimpan ke Firestore dengan ID:", docRef.id);
    
    return {
      success: true,
      message: `Pendaftaran demo untuk ${businessName} berhasil! Silakan login untuk memulai.`,
    };
  } catch (error) {
     console.error("Gagal menyimpan outlet demo ke Firestore:", error);
     return {
       success: false,
       message: "Terjadi kesalahan pada server saat menyimpan data. Silakan coba lagi.",
     };
  }
}

// =================================================================
// ACTION UNTUK REGISTRASI MEMBER BARU (BERBAYAR)
// =================================================================
const memberFormSchema = z.object({
  ownerName: z.string().min(2, { message: "Nama lengkap harus diisi." }),
  businessName: z.string().min(2, { message: "Nama outlet/bisnis harus diisi." }),
  address: z.string().min(10, { message: "Alamat lengkap minimal 10 karakter." }),
  postalCode: z.string().min(5, { message: "Kode pos minimal 5 digit." }),
  businessType: z.string({ required_error: "Pilih jenis bisnis Anda." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  whatsappNumber: z.string().min(10, { message: "Nomor WhatsApp minimal 10 digit." }),
  planId: z.string({ required_error: "Anda harus memilih paket langganan." }),
});

type RegisterMemberPayload = z.infer<typeof memberFormSchema>;

export async function registerMemberAction(payload: RegisterMemberPayload) {
  const validation = memberFormSchema.safeParse(payload);

  if (!validation.success) {
    return {
      success: false,
      message: "Data yang dimasukkan tidak valid.",
      errors: validation.error.flatten().fieldErrors,
    };
  }
  const { businessName, ownerName, email, planId, ...otherDetails } = validation.data;

  // Simple mapping from planId to a more readable plan name
  const planMap: { [key: string]: string } = {
    'satu-cabang': 'Satu Cabang',
    'banyak-cabang': 'Banyak Cabang',
    'multi-bisnis': 'Multi Bisnis'
  }

  const newMemberData = {
    businessName,
    owner: ownerName,
    email,
    plan: planMap[planId] || 'Satu Cabang',
    status: 'Active', // In a real app, this might be 'Pending Payment'
    joined: new Date().toISOString(),
    ...otherDetails,
  };

  try {
    const docRef = await db.collection("members").add(newMemberData);
    console.log("Member baru disimpan ke Firestore dengan ID:", docRef.id);
    
    return {
      success: true,
      message: `Pendaftaran untuk ${businessName} berhasil! Silakan login untuk memulai.`,
    };
  } catch (error) {
     console.error("Gagal menyimpan member ke Firestore:", error);
     return {
       success: false,
       message: "Terjadi kesalahan pada server saat menyimpan data. Silakan coba lagi.",
     };
  }
}

// =================================================================
// ACTION UNTUK MENGHAPUS MEMBER
// =================================================================
export async function deleteMemberAction(memberId: string) {
  if (!memberId) {
    return { success: false, message: "Member ID tidak ditemukan." };
  }
  
  try {
    await db.collection("members").doc(memberId).delete();
    console.log(`Member dengan ID: ${memberId} telah dihapus dari Firestore.`);
    return { success: true, message: "Member berhasil dihapus." };
  } catch (error) {
    console.error("Error saat menghapus member dari Firestore:", error);
    return { success: false, message: "Gagal menghapus member dari server." };
  }
}
