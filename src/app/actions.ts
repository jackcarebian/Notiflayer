
"use server";

import { z } from "zod";
// import { validateRegistrationData } from "./ai/flows/validate-registration-data";

const registrationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  preferences: z.record(z.array(z.string())),
  outletSlug: z.string(),
  fcmToken: z.string().nullable(),
});

type RegistrationInput = z.infer<typeof registrationSchema>;

export async function registerUserAction(input: RegistrationInput) {
  const parsedInput = registrationSchema.safeParse(input);
  if (!parsedInput.success) {
    console.error("Validation failed:", parsedInput.error.errors);
    return { success: false, message: "Input tidak valid." };
  }

  try {
    // The user's new spec describes a direct save, so AI validation is bypassed for now.
    // const validationResult = await validateRegistrationData({
    //   email: parsedInput.data.email,
    //   qrCode: parsedInput.data.outletSlug,
    // });
    // if (!validationResult.isValidEmail || !validationResult.isValidQrCode) {
    //   return { 
    //     success: false, 
    //     message: validationResult.reason || "Data registrasi tidak valid." 
    //   };
    // }

    const dataToSave = {
      nama: parsedInput.data.name,
      email: parsedInput.data.email,
      token_fcm: parsedInput.data.fcmToken,
      waktu_daftar: new Date().toISOString(),
      preferensi: parsedInput.data.preferences,
      outlet_slug: parsedInput.data.outletSlug,
    };

    // Data is valid, proceed to save to Firestore
    // This is where you would add your Firebase Firestore logic
    console.log("Registration data is valid. Saving to database:", dataToSave);
    
    // Simulate a successful database write. Replace this with your actual Firestore call.
    // await db.collection('pelanggan').add(dataToSave);

    return { success: true };
  } catch (error) {
    console.error("Error during registration action:", error);
    return { success: false, message: "Terjadi kesalahan server." };
  }
}
