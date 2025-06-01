'use server';

/**
 * @fileOverview An AI agent that analyzes quiz responses and generates a personalized home decor style guide.
 *
 * - generateStyleGuide - A function that handles the style guide generation process.
 * - GenerateStyleGuideInput - The input type for the generateStyleGuide function.
 * - GenerateStyleGuideOutput - The return type for the generateStyleGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStyleGuideInputSchema = z.object({
  swoonWorthyRooms: z
    .array(z.string())
    .describe('List of selected room image URLs from the swoon-worthy rooms step.'),
  styleSelections: z
    .array(z.string())
    .describe('List of selected style IDs from the style selection step.'),
  roomImprovementSelections: z
    .array(z.string())
    .describe('List of selected room IDs from the room improvement selection step.'),
  roomFocusSelection: z
    .string()
    .describe('The selected room ID from the room focus selection step.'),
  homeOwnershipStatus: z
    .string()
    .describe('The selected home ownership status (rent or own).'),
  homeTypeSelection: z.string().describe('The selected home type (house, townhouse, apartment).'),
  budgetRangeSelection: z
    .string()
    .describe('The selected budget range for each room.'),
});
export type GenerateStyleGuideInput = z.infer<typeof GenerateStyleGuideInputSchema>;

const GenerateStyleGuideOutputSchema = z.object({
  styleGuide: z.string().describe('A personalized home decor style guide based on the quiz responses.'),
});
export type GenerateStyleGuideOutput = z.infer<typeof GenerateStyleGuideOutputSchema>;

export async function generateStyleGuide(input: GenerateStyleGuideInput): Promise<GenerateStyleGuideOutput> {
  return generateStyleGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStyleGuidePrompt',
  input: {schema: GenerateStyleGuideInputSchema},
  output: {schema: GenerateStyleGuideOutputSchema},
  prompt: `You are an expert home decor stylist. Analyze the following quiz responses to generate a personalized home decor style guide for the user.

Quiz Responses:
Swoon-Worthy Rooms: {{swoonWorthyRooms}}
Style Selections: {{styleSelections}}
Room Improvement Selections: {{roomImprovementSelections}}
Room Focus Selection: {{roomFocusSelection}}
Home Ownership Status: {{homeOwnershipStatus}}
Home Type Selection: {{homeTypeSelection}}
Budget Range Selection: {{budgetRangeSelection}}

Based on these responses, create a style guide that includes:
- A summary of the user's style preferences.
- Specific decor recommendations for the focused room.
- General tips for incorporating the selected styles into their home.
- How the users other selections influenced the output

Make the style guide engaging and easy to understand.
`,
});

const generateStyleGuideFlow = ai.defineFlow(
  {
    name: 'generateStyleGuideFlow',
    inputSchema: GenerateStyleGuideInputSchema,
    outputSchema: GenerateStyleGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
