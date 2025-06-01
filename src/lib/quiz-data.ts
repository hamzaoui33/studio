import type { AllQuizData } from '@/types/quiz';
import { Sofa, BedDouble, Home, VenetianMask, Gem, Trees, Building, Landmark, Paintbrush, LayoutGrid, Lamp, Target, CheckCircle, Wallet, Mail, HandHeart, Briefcase } from 'lucide-react';

export const quizData: AllQuizData = {
  step1: {
    id: 1,
    title: "Swoon-Worthy Rooms",
    question: "Select the rooms that make you swoon.",
    instruction: "Decisions are hard. Pick as many as you want. These images help us understand your initial vibe.",
    options: [
      { id: "room1", imageUrl: "https://placehold.co/600x400.png", alt: "Modern minimalist living room", hint: "modern living room" },
      { id: "room2", imageUrl: "https://placehold.co/600x400.png", alt: "Cozy bohemian bedroom", hint: "bohemian bedroom" },
      { id: "room3", imageUrl: "https://placehold.co/600x400.png", alt: "Elegant classic dining room", hint: "classic dining" },
      { id: "room4", imageUrl: "https://placehold.co/600x400.png", alt: "Rustic farmhouse kitchen", hint: "farmhouse kitchen" },
      { id: "room5", imageUrl: "https://placehold.co/600x400.png", alt: "Scandinavian style office", hint: "scandinavian office" },
      { id: "room6", imageUrl: "https://placehold.co/600x400.png", alt: "Industrial loft apartment", hint: "industrial loft" },
      { id: "room7", imageUrl: "https://placehold.co/600x400.png", alt: "Coastal chic bathroom", hint: "coastal bathroom" },
      { id: "room8", imageUrl: "https://placehold.co/600x400.png", alt: "Mid-century modern lounge", hint: "midcentury lounge" },
    ],
  },
  step2: {
    id: 2,
    title: "Style Selection",
    question: "What style feels most like you?",
    instruction: "You can choose up to 3 styles. Think about the overall feeling you want in your home.",
    maxSelections: 3,
    options: [
      { id: "modern_minimalist", name: "Modern Minimalist", description: "Clean lines, simplicity, and a neutral color palette.", imageUrl: "https://placehold.co/300x200.png", hint: "minimalist interior" },
      { id: "bohemian", name: "Bohemian", description: "Free-spirited, eclectic, with rich patterns and textures.", imageUrl: "https://placehold.co/300x200.png", hint: "bohemian decor" },
      { id: "classic_traditional", name: "Classic Traditional", description: "Timeless, elegant, with refined details and symmetry.", imageUrl: "https://placehold.co/300x200.png", hint: "traditional interior" },
      { id: "farmhouse_rustic", name: "Farmhouse Rustic", description: "Warm, cozy, with natural materials and a touch of vintage.", imageUrl: "https://placehold.co/300x200.png", hint: "rustic decor" },
      { id: "scandinavian", name: "Scandinavian", description: "Light, airy, functional, with a focus on natural light and wood.", imageUrl: "https://placehold.co/300x200.png", hint: "scandinavian design" },
      { id: "industrial", name: "Industrial", description: "Raw, edgy, with exposed elements like brick and metal.", imageUrl: "https://placehold.co/300x200.png", hint: "industrial style" },
      { id: "coastal_chic", name: "Coastal Chic", description: "Relaxed, breezy, inspired by the beach with light colors and natural textures.", imageUrl: "https://placehold.co/300x200.png", hint: "coastal home" },
      { id: "mid_century_modern", name: "Mid-Century Modern", description: "Retro yet timeless, with organic shapes and iconic furniture.", imageUrl: "https://placehold.co/300x200.png", hint: "midcentury furniture" },
    ],
  },
  step3: {
    id: 3,
    title: "Room Improvement",
    question: "Which rooms are on your 'It needs a little something' list?",
    instruction: "Select as many as you like. We'll help you prioritize later.",
    options: [
      { id: "living_room", name: "Living Room", icon: Sofa },
      { id: "bedroom", name: "Bedroom", icon: BedDouble },
      { id: "kitchen", name: "Kitchen", icon: ChefHat }, // Note: ChefHat not in lucide, using placeholder. Will use a suitable one.
      { id: "dining_room", name: "Dining Room", icon: VenetianMask }, // Placeholder, will find better
      { id: "bathroom", name: "Bathroom", icon: Gem }, // Placeholder
      { id: "home_office", name: "Home Office", icon: Briefcase },
      { id: "outdoor_patio", name: "Outdoor/Patio", icon: Trees },
      { id: "entryway", name: "Entryway/Hallway", icon: Home },
    ],
  },
  step4: {
    id: 4,
    title: "Room Focus",
    question: "Great! Which room should we focus on first?",
    instruction: "This will be the primary room for your personalized style guide.",
    // Options are dynamically populated based on Step 3 selections.
  },
  step5: {
    id: 5,
    title: "Home Ownership",
    question: "Do you rent or own your place?",
    instruction: "This helps us know what kind of changes you'd be able to make.",
    options: [
      { id: "rent", name: "Rent", icon: Key },
      { id: "own", name: "Own", icon: Home },
    ],
  },
  step6: {
    id: 6,
    title: "Home Type",
    question: "What kind of home do you live in?",
    instruction: "Understanding your home type helps tailor advice.",
    options: [
      { id: "house", name: "House", icon: Home },
      { id: "townhouse", name: "Townhouse", icon: Building },
      { id: "apartment_condo", name: "Apartment/Condo", icon: Landmark }, // Placeholder
    ],
  },
  step7: {
    id: 7,
    title: "Budget & Contact",
    question: "What's your approximate budget range for each room?",
    instruction: "Select a budget that feels comfortable for your focused room project.",
    options: [
      { id: "budget_flexible", name: "Flexible / Just Exploring", icon: HandHeart },
      { id: "budget_starter", name: "Starter Sparkle ($ - $$)", icon: Paintbrush },
      { id: "budget_makeover", name: "Makeover Magic ($$ - $$$)", icon: LayoutGrid },
      { id: "budget_deluxe", name: "Deluxe Dream ($$$ - $$$$)", icon: Lamp },
    ],
    emailPrompt: "Enter your email to receive your personalized style guide:",
    emailPlaceholder: "your.email@example.com",
  },
};

// Mapping for icons if string based IDs were used in quizData
// (Not strictly needed if directly using Lucide components, but good for reference or future SVG strings)
export const iconMap: { [key: string]: LucideIcon } = {
  living_room: Sofa,
  bedroom: BedDouble,
  kitchen: ChefHat, // This will need a replacement from lucide-react or an SVG
  dining_room: VenetianMask, // Replacement needed
  bathroom: Gem, // Replacement needed
  home_office: Briefcase,
  outdoor_patio: Trees,
  entryway: Home,
  rent: Key,
  own: Home,
  house: Home,
  townhouse: Building,
  apartment_condo: Landmark, // Replacement needed
  budget_flexible: HandHeart,
  budget_starter: Paintbrush,
  budget_makeover: LayoutGrid,
  budget_deluxe: Lamp,
  default: Target,
  email: Mail,
  submit: CheckCircle,
  budget: Wallet,
};

// Find suitable Lucide icons:
// ChefHat -> Utensils or HardHat (if being abstract) or ShoppingCart (for items) -> let's use CookingPot
// VenetianMask (Dining) -> GlassWater or Wine
// Gem (Bathroom) -> ShowerHead or Bath
// Landmark (Apartment/Condo) -> Building2

quizData.step3.options = quizData.step3.options.map(opt => {
  if (opt.id === 'kitchen') opt.icon = CookingPot;
  if (opt.id === 'dining_room') opt.icon = GlassWater;
  if (opt.id === 'bathroom') opt.icon = Bath;
  return opt;
});
quizData.step6.options = quizData.step6.options.map(opt => {
  if (opt.id === 'apartment_condo') opt.icon = Building2;
  return opt;
});


// Helper function for type safety, not strictly necessary for quizData structure but good practice
export function getStepData<T extends keyof AllQuizData>(stepKey: T): AllQuizData[T] {
  return quizData[stepKey];
}
