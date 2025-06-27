'use server';

/**
 * @fileOverview Validation flow for registration data, including email and QR code.
 *
 * - validateRegistrationData - Validates registration data using an LLM.
 * - ValidateRegistrationDataInput - The input type for the validateRegistrationData function.
 * - ValidateRegistrationDataOutput - The return type for the validateRegistrationData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateRegistrationDataInputSchema = z.object({
  email: z.string().email().describe('The email address to validate.'),
  qrCode: z.string().describe('The QR code to validate.'),
});
export type ValidateRegistrationDataInput = z.infer<typeof ValidateRegistrationDataInputSchema>;

const ValidateRegistrationDataOutputSchema = z.object({
  isValidEmail: z.boolean().describe('Whether the email is valid.'),
  isValidQrCode: z.boolean().describe('Whether the QR code is valid.'),
  reason: z.string().optional().describe('Reason for invalidation, if any.'),
});
export type ValidateRegistrationDataOutput = z.infer<typeof ValidateRegistrationDataOutputSchema>;

export async function validateRegistrationData(
  input: ValidateRegistrationDataInput
): Promise<ValidateRegistrationDataOutput> {
  return validateRegistrationDataFlow(input);
}

const validateRegistrationDataPrompt = ai.definePrompt({
  name: 'validateRegistrationDataPrompt',
  input: {schema: ValidateRegistrationDataInputSchema},
  output: {schema: ValidateRegistrationDataOutputSchema},
  prompt: `You are a validator for registration data.

  Your task is to determine whether the provided email and QR code are valid.

  Consider the email invalid if it is likely to be a bot or spam.
  Consider the QR code invalid if it does not follow a valid format.

  Email: {{{email}}}
  QR Code: {{{qrCode}}}

  Return a JSON object with the following format:
  {
    "isValidEmail": boolean,
    "isValidQrCode": boolean,
    "reason": string (optional)
  }`,
});

const validateRegistrationDataFlow = ai.defineFlow(
  {
    name: 'validateRegistrationDataFlow',
    inputSchema: ValidateRegistrationDataInputSchema,
    outputSchema: ValidateRegistrationDataOutputSchema,
  },
  async input => {
    const {output} = await validateRegistrationDataPrompt(input);
    return output!;
  }
);
