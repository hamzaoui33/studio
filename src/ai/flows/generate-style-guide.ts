
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
  colorMoodSelection: z
    .string()
    .describe('The selected color and mood preference (e.g., "light_airy_neutrals").'), // New
  materialDetailSelections: z
    .array(z.string())
    .describe('List of selected material and detail preferences (e.g., ["natural_woods_woven", "sleek_metals_lines"]).'), // New
  roomImprovementSelections: z
    .record(z.string(), z.number())
    .describe('An object mapping selected room IDs to a desired quantity or focus level (e.g., {"living_room": 2, "bedroom": 1}). Helps prioritize improvements.'),
  roomFocusSelection: z
    .string()
    .describe('The selected room ID from the room focus selection step.'),
});
export type GenerateStyleGuideInput = z.infer<typeof GenerateStyleGuideInputSchema>;

const GenerateStyleGuideOutputSchema = z.object({
  styleGuide: z.string().describe('A personalized home decor style guide based on the quiz responses.'),
});
export type GenerateStyleGuideOutput = z.infer<typeof GenerateStyleGuideOutputSchema>;

export async function generateStyleGuide(input: GenerateStyleGuideInput): Promise<GenerateStyleGuideOutput> {
  return generateStyleGuideFlow(input);
}

// The prompt is NOT yet updated to use colorMoodSelection or materialDetailSelections.
// This will be a separate step if requested. For now, the data is just passed.
const prompt = ai.definePrompt({
  name: 'generateStyleGuidePrompt',
  input: {schema: GenerateStyleGuideInputSchema},
  output: {schema: GenerateStyleGuideOutputSchema},
  prompt: `You are an expert home decor stylist. Analyze the following quiz responses to generate a personalized home decor style guide for the user.

Quiz Responses:
Swoon-Worthy Rooms: {{swoonWorthyRooms}}
Style Selections: {{styleSelections}}
Color & Mood Preference: {{colorMoodSelection}}
Material & Detail Preferences: {{#if materialDetailSelections}}{{materialDetailSelections}}{{#unless @last}}, {{/unless}}{{else}}No specific material/detail preferences listed.{{/if}}
Room Improvement Selections: {{#if roomImprovementSelections}}Rooms to improve (room: count/focus level): {{#each roomImprovementSelections}}{{@key}}: {{this}}{{#unless @last}}, {{/unless}}{{/each}}.{{else}}No specific rooms listed for improvement focus.{{/if}}
Room Focus Selection: {{roomFocusSelection}}

Based on these responses, create a style guide that includes:
- A summary of the user's style preferences (considering all inputs).
- Specific decor recommendations for the focused room.
- General tips for incorporating the selected styles and preferences into their home.
- How the user's other selections (like room improvement counts, color/mood, material/details) influenced the output. Consider the quantities in 'Room Improvement Selections' as indicators of priority or number of spaces if applicable.

Make the style guide engaging, friendly, and easy to understand.
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
