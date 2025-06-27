"use server";

import { z } from "zod";
import { validateRegistrationData } from "./ai/flows/validate-registration-data";

const registrationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  interests: z.array(z.string()),
  outletSlug: z.string(),
});

type RegistrationInput = z.infer<typeof registrationSchema>;

export async function registerUserAction(input: RegistrationInput) {
  const parsedInput = registrationSchema.safeParse(input);
  if (!parsedInput.success) {
    return { success: false, message: "Input tidak valid." };
  }

  try {
    const validationResult = await validateRegistrationData({
      email: parsedInput.data.email,
      qrCode: parsedInput.data.outletSlug,
    });

    if (!validationResult.isValidEmail || !validationResult.isValidQrCode) {
      return { 
        success: false, 
        message: validationResult.reason || "Data registrasi tidak valid." 
      };
    }

    // Data is valid, proceed to save to Firestore
    // This is where you would add your Firebase Firestore logic
    console.log("Registration data is valid. Saving to database:", parsedInput.data);
    
    // Simulate a successful database write
    // await db.collection('pelanggan').add({ ...parsedInput.data, tgl_daftar: new Date() });

    return { success: true };
  } catch (error) {
    console.error("Error during registration action:", error);
    return { success: false, message: "Terjadi kesalahan server." };
  }
}
