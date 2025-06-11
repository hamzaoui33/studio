
'use server';

/**
 * @fileOverview An AI agent that analyzes quiz responses, generates a personalized home decor style guide,
 * and determines a primary style category.
 *
 * - generateStyleGuide - A function that handles the style guide generation process.
 * - GenerateStyleGuideInput - The input type for the generateStyleGuide function.
 * - GenerateStyleGuideOutput - The return type for the generateStyleGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the valid style categories based on the provided URLs
const validStyleCategories = [
  "midcentury-modern",
  "bohemian",
  "coastal",
  "modern",
  "rustic",
  "traditional",
  "scandinavian",
  "glam",
  "industrial",
  "eclectic",
  "farmhouse",
  "japandi",
  "transitional",
  "minimalist",
];
export type StyleCategory = (typeof validStyleCategories)[number];


const GenerateStyleGuideInputSchema = z.object({
  swoonWorthyRooms: z
    .array(z.string())
    .describe('List of selected room image URLs from the swoon-worthy rooms step.'),
  styleSelections: z
    .array(z.string())
    .describe('List of selected style IDs from the style selection step.'),
  colorMoodSelection: z
    .string()
    .describe('The selected color and mood preference (e.g., "light_airy_neutrals").'),
  materialDetailSelections: z
    .array(z.string())
    .describe('List of selected material and detail preferences (e.g., ["natural_woods_woven", "sleek_metals_lines"]).'),
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
  styleCategory: z.enum(validStyleCategories as [StyleCategory, ...StyleCategory[]]) // Ensures AI picks from the list
    .describe(`The primary style category determined for the user. Must be one of: ${validStyleCategories.join(', ')}.`),
});
export type GenerateStyleGuideOutput = z.infer<typeof GenerateStyleGuideOutputSchema>;

export async function generateStyleGuide(input: GenerateStyleGuideInput): Promise<GenerateStyleGuideOutput> {
  return generateStyleGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStyleGuidePrompt',
  input: { // Input for the prompt itself, includes user answers and the list of valid categories
    schema: GenerateStyleGuideInputSchema.extend({
      validStyleCategories: z.array(z.string()),
    })
  },
  output: {schema: GenerateStyleGuideOutputSchema},
  prompt: `You are an expert home decor stylist. Analyze the following quiz responses to generate a personalized home decor style guide for the user AND determine their primary style category.

Quiz Responses:
Swoon-Worthy Rooms: {{swoonWorthyRooms}}
Style Selections: {{styleSelections}}
Color & Mood Preference: {{colorMoodSelection}}
Material & Detail Preferences: {{#if materialDetailSelections}}{{#each materialDetailSelections}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}No specific material/detail preferences listed.{{/if}}
Room Improvement Selections: {{#if roomImprovementSelections}}Rooms to improve (room: count/focus level): {{#each roomImprovementSelections}}{{@key}}: {{this}}{{#unless @last}}, {{/unless}}{{/each}}.{{else}}No specific rooms listed for improvement focus.{{/if}}
Room Focus Selection: {{roomFocusSelection}}

Based on these responses:

1.  **Determine the primary style category** for the user. The style category MUST be one of the following exact strings:
    {{#each validStyleCategories}}
    - \`{{this}}\`
    {{/each}}
    Set this chosen category in the \`styleCategory\` output field. Choose the single best fit.

2.  **Create a style guide** (the \`styleGuide\` output field) that includes:
    - A summary of the user's style preferences (considering all inputs), aligning with the chosen \`styleCategory\`.
    - Specific decor recommendations for the focused room.
    - General tips for incorporating the selected styles and preferences into their home.
    - How the user's other selections (like room improvement counts, color/mood, material/details) influenced the output. Consider the quantities in 'Room Improvement Selections' as indicators of priority or number of spaces if applicable.

Make the style guide engaging, friendly, and easy to understand. Ensure the \`styleCategory\` is one of the provided valid options.
`,
});

const generateStyleGuideFlow = ai.defineFlow(
  {
    name: 'generateStyleGuideFlow',
    inputSchema: GenerateStyleGuideInputSchema,
    outputSchema: GenerateStyleGuideOutputSchema,
  },
  async (input: GenerateStyleGuideInput) => {
    // Pass the user's input AND the list of valid categories to the prompt
    const {output} = await prompt({
      ...input,
      validStyleCategories: validStyleCategories,
    });
    if (!output) {
      // Fallback if AI fails to generate output or a valid category
      console.error("AI did not produce an output or a valid category. Falling back.");
      return {
        styleGuide: "We encountered an issue generating your detailed style guide. Please try again!",
        styleCategory: "modern" as StyleCategory, // Default fallback category
      };
    }
     // Ensure the category is valid, otherwise use a fallback. This is a safeguard.
     if (!validStyleCategories.includes(output.styleCategory)) {
      console.warn(`AI returned an invalid category: ${output.styleCategory}. Falling back to 'modern'.`);
      return {
        styleGuide: output.styleGuide,
        styleCategory: "modern" as StyleCategory,
      };
    }
    return output;
  }
);
