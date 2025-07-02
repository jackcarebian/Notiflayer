'use server';
/**
 * @fileOverview An AI flow to generate promotional marketing ideas.
 *
 * - generatePromoIdea - A function that handles the promo idea generation process.
 * - GeneratePromoIdeaInput - The input type for the generatePromoIdea function.
 * - GeneratePromoIdeaOutput - The return type for the generatePromoIdea function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePromoIdeaInputSchema = z.object({
  businessType: z.string().describe('The type of business (e.g., Cafe, Boutique, Salon).'),
  product: z.string().describe('The specific product or service being promoted.'),
  audience: z.string().describe('The target audience for the promotion.'),
  languageStyle: z.string().describe('The desired tone or style for the promotional text (e.g., Casual, Formal, Humorous).'),
});
export type GeneratePromoIdeaInput = z.infer<typeof GeneratePromoIdeaInputSchema>;

const GeneratePromoIdeaOutputSchema = z.object({
  headline: z.string().describe('A catchy and compelling headline for the promotion.'),
  body: z.string().describe('The main body of the promotional text, explaining the offer.'),
  callToAction: z.string().describe('A clear call to action for the customer.'),
});
export type GeneratePromoIdeaOutput = z.infer<typeof GeneratePromoIdeaOutputSchema>;

export async function generatePromoIdea(input: GeneratePromoIdeaInput): Promise<GeneratePromoIdeaOutput> {
  return generatePromoIdeaFlow(input);
}

const promoIdeaPrompt = ai.definePrompt({
  name: 'promoIdeaPrompt',
  input: {schema: GeneratePromoIdeaInputSchema},
  output: {schema: GeneratePromoIdeaOutputSchema},
  prompt: `You are an expert marketing assistant. Your task is to create a short, compelling promotional text based on the user's input. The language should be in Indonesian.

Generate a promotional idea with a headline, body, and a call to action.

Business Type: {{{businessType}}}
Product/Service: {{{product}}}
Target Audience: {{{audience}}}
Language Style: {{{languageStyle}}}

Create a promotion that is attractive and persuasive for the specified audience.
`,
});

const generatePromoIdeaFlow = ai.defineFlow(
  {
    name: 'generatePromoIdeaFlow',
    inputSchema: GeneratePromoIdeaInputSchema,
    outputSchema: GeneratePromoIdeaOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
