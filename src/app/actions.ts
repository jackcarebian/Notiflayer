
"use server";

import { z } from "zod";
import { db } from "@/lib/firebase-admin";
import { slugify } from "@/lib/utils";
import type { Member, Outlet } from "@/lib/types";

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
  ownerName: z.string().min(2, { message: "Nama Anda minimal 2 karakter." }),
  businessName: z.string().min(2, { message: "Nama Outlet minimal 2 karakter." }),
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

  const { ownerName, businessName, email, password } = validation.data;
  
  const newMemberData = {
    businessName: businessName,
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
  const { businessName, ownerName, email, planId, address, businessType, ...otherDetails } = validation.data;

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
    const memberDocRef = await db.collection("members").add(newMemberData);
    console.log("Member baru disimpan ke Firestore dengan ID:", memberDocRef.id);
    
    // Also create the first outlet for this new member
    const firstOutletData = {
      memberId: memberDocRef.id,
      name: businessName,
      slug: slugify(businessName),
      address: address,
      category: businessType,
    };
    await db.collection("outlets").add(firstOutletData);
    console.log("Outlet pertama untuk member baru telah dibuat.");

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
// ACTION UNTUK MENAMBAH OUTLET BARU
// =================================================================
const outletFormSchema = z.object({
  name: z.string().min(2, { message: "Nama outlet minimal 2 karakter." }),
  address: z.string().min(10, { message: "Alamat lengkap minimal 10 karakter." }),
  category: z.string({ required_error: "Pilih jenis bisnis Anda." }),
  memberId: z.string(), // In real app, this would come from session
});

export async function addOutletAction(payload: z.infer<typeof outletFormSchema>) {
  const validation = outletFormSchema.safeParse(payload);

  if (!validation.success) {
    return {
      success: false,
      message: "Data yang dimasukkan tidak valid.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { name, address, category, memberId } = validation.data;
  
  const newOutletData = {
    name,
    address,
    category,
    memberId,
    slug: slugify(name),
  };

  try {
    const docRef = await db.collection("outlets").add(newOutletData);
    console.log("Outlet baru disimpan ke Firestore dengan ID:", docRef.id);
    return {
      success: true,
      message: `Outlet "${name}" berhasil ditambahkan.`,
    };
  } catch (error) {
    console.error("Gagal menyimpan outlet ke Firestore:", error);
    return {
      success: false,
      message: "Terjadi kesalahan pada server saat menyimpan data.",
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

// =================================================================
// ACTION UNTUK MENGAMBIL SEMUA MEMBER
// =================================================================
export async function getMembersAction() {
  try {
    const membersSnapshot = await db.collection("members").orderBy('joined', 'desc').get();
    if (membersSnapshot.empty) {
      return { success: true, members: [] };
    }
    const members = membersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Member[];
    
    // Ensure data is serializable
    return { success: true, members: JSON.parse(JSON.stringify(members)) };
  } catch (error) {
    console.error("Gagal mengambil data member dari Firestore:", error);
    return {
      success: false,
      message: "Terjadi kesalahan pada server saat mengambil data member.",
      members: [],
    };
  }
}

// =================================================================
// ACTION UNTUK MENGAMBIL DATA HALAMAN OUTLET
// =================================================================
export async function getOutletsPageDataAction() {
  try {
    // In a real app, you'd get the logged-in member's ID from a session.
    // For this prototype, we'll find a specific member ('Cafe Inyong') to act as the logged-in user.
    const membersSnapshot = await db.collection('members').where('businessName', '==', 'Cafe Inyong').limit(1).get();
    
    let memberDoc;
    if (membersSnapshot.empty) {
      const firstMemberSnapshot = await db.collection('members').orderBy('joined', 'desc').limit(1).get();
      if(firstMemberSnapshot.empty) {
          return { success: false, message: "Tidak ada member yang terdaftar di database.", outlets: [], member: null };
      }
      memberDoc = firstMemberSnapshot.docs[0];
    } else {
        memberDoc = membersSnapshot.docs[0];
    }
    
    const member = { id: memberDoc.id, ...memberDoc.data() } as Member;

    const outletsSnapshot = await db.collection('outlets').where('memberId', '==', member.id).get();
    const outlets = outletsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Outlet[];
    
    return { success: true, outlets: JSON.parse(JSON.stringify(outlets)), member: JSON.parse(JSON.stringify(member)) };
  } catch (error) {
    console.error("Gagal mengambil data halaman outlet dari Firestore:", error);
    return {
      success: false,
      message: "Terjadi kesalahan pada server saat mengambil data.",
      outlets: [],
      member: null,
    };
  }
}

// =================================================================
// ACTION UNTUK MENGAMBIL OUTLET BERDASARKAN SLUG
// =================================================================
export async function getOutletBySlugAction(slug: string): Promise<{ success: boolean; outlet: Outlet | null; message?: string }> {
    if (!slug) {
        return { success: false, outlet: null, message: "Slug tidak ditemukan." };
    }
    try {
        const outletSnapshot = await db.collection('outlets').where('slug', '==', slug).limit(1).get();
        if (outletSnapshot.empty) {
            return { success: false, outlet: null, message: "Outlet tidak ditemukan." };
        }
        const doc = outletSnapshot.docs[0];
        const outlet = { id: doc.id, ...doc.data() } as Outlet;
        return { success: true, outlet: JSON.parse(JSON.stringify(outlet)) };
    } catch (error) {
        console.error("Gagal mengambil outlet by slug dari Firestore:", error);
        return { success: false, outlet: null, message: "Gagal mengambil data dari server." };
    }
}
