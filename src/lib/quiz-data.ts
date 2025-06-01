
import type { AllQuizData } from '@/types/quiz';
import type { LucideIcon } from 'lucide-react';
import {
  Sofa, BedDouble, Home, Trees, Building, Paintbrush, LayoutGrid, Lamp, Target, CheckCircle, Wallet, Mail, HandHeart, Briefcase, Key, CookingPot, GlassWater, Bath, Building2, User, Hand
} from 'lucide-react';

export const TOTAL_QUIZ_STEPS = 10; // Updated from 9 to 10

export const quizData: AllQuizData = {
  step1: {
    id: 1,
    title: "Swoon-Worthy Rooms",
    question: "Select the rooms that make you swoon.",
    instruction: "Decisions are hard. Pick as many as you want. These images help us understand your initial vibe.",
    options: [
      { id: "room1", imageUrl: "https://placehold.co/600x800.png", alt: "Modern minimalist living room", hint: "modern living room" },
      { id: "room2", imageUrl: "https://placehold.co/600x800.png", alt: "Cozy bohemian bedroom", hint: "bohemian bedroom" },
      { id: "room3", imageUrl: "https://placehold.co/600x800.png", alt: "Elegant classic dining room", hint: "classic dining" },
      { id: "room4", imageUrl: "https://placehold.co/600x800.png", alt: "Rustic farmhouse kitchen", hint: "farmhouse kitchen" },
      { id: "room5", imageUrl: "https://placehold.co/600x800.png", alt: "Scandinavian style office", hint: "scandinavian office" },
      { id: "room6", imageUrl: "https://placehold.co/600x800.png", alt: "Industrial loft apartment", hint: "industrial loft" },
      { id: "room7", imageUrl: "https://placehold.co/600x800.png", alt: "Coastal chic bathroom", hint: "coastal bathroom" },
      { id: "room8", imageUrl: "https://placehold.co/600x800.png", alt: "Mid-century modern lounge", hint: "midcentury lounge" },
      { id: "room9", imageUrl: "https://placehold.co/600x800.png", alt: "Art deco hallway", hint: "art deco hallway" },
      { id: "room10", imageUrl: "https://placehold.co/600x800.png", alt: "Minimalist kitchen", hint: "minimalist kitchen" },
      { id: "room11", imageUrl: "https://placehold.co/600x800.png", alt: "Maximalist living space", hint: "maximalist living" },
      { id: "room12", imageUrl: "https://placehold.co/600x800.png", alt: "Japandi style bedroom", hint: "japandi bedroom" },
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
    instruction: "Select as many as you like, and specify how many of each. We'll help you prioritize later.",
    options: [
      { id: "living_room", name: "Living Room", icon: Sofa },
      { id: "bedroom", name: "Bedroom", icon: BedDouble },
      { id: "kitchen", name: "Kitchen", icon: CookingPot },
      { id: "dining_room", name: "Dining Room", icon: GlassWater },
      { id: "bathroom", name: "Bathroom", icon: Bath },
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
  },
  step5: {
    id: 5,
    title: "Your Name",
    question: "Let's get to know each other.",
    instruction: "Type your name below. If you're an existing member, you can Log in (feature coming soon!).",
    placeholder: "Type your name here",
  },
  step6: { 
    id: 6,
    title: "Greeting",
    question: "", 
    instruction: "", 
  },
  step7: { // New Email Collection Step
    id: 7,
    title: "Unlock Your Results",
    question: "You're almost there!",
    instruction: "Enter your email to see your style results.\nAlready a member? Log in",
    placeholder: "Type your email here",
  },
  step8: { // Was Step 7 (Home Ownership)
    id: 8,
    title: "Home Ownership",
    question: "Do you rent or own your place?",
    instruction: "This helps us know what kind of changes you'd be able to make.",
    options: [
      { id: "rent", name: "Rent", icon: Key },
      { id: "own", name: "Own", icon: Home },
    ],
  },
  step9: { // Was Step 8 (Home Type)
    id: 9,
    title: "Home Type",
    question: "What kind of home do you live in?",
    instruction: "Understanding your home type helps tailor advice.",
    options: [
      { id: "house", name: "House", icon: Home },
      { id: "townhouse", name: "Townhouse", icon: Building },
      { id: "apartment_condo", name: "Apartment/Condo", icon: Building2 },
    ],
  },
  step10: { // Was Step 9 (Budget & Email), now only Budget
    id: 10,
    title: "Final Touch: Budget",
    question: "What's your budget for the focused room?",
    instruction: "Select a budget range. This helps us tailor recommendations effectively.",
    options: [
      { id: "budget_flexible", name: "Flexible / Just Exploring", icon: HandHeart },
      { id: "budget_starter", name: "Starter Sparkle ($ - $$)", icon: Paintbrush },
      { id: "budget_makeover", name: "Makeover Magic ($$ - $$$)", icon: LayoutGrid },
      { id: "budget_deluxe", name: "Deluxe Dream ($$$ - $$$$)", icon: Lamp },
    ],
  },
};

export const iconMap: { [key: string]: LucideIcon } = {
  living_room: Sofa,
  bedroom: BedDouble,
  kitchen: CookingPot,
  dining_room: GlassWater,
  bathroom: Bath,
  home_office: Briefcase,
  outdoor_patio: Trees,
  entryway: Home,
  name: User,
  greeting: Hand,
  email: Mail, // For new email step icon if needed, or use text input style
  rent: Key,
  own: Home,
  house: Home,
  townhouse: Building,
  apartment_condo: Building2,
  budget_flexible: HandHeart,
  budget_starter: Paintbrush,
  budget_makeover: LayoutGrid,
  budget_deluxe: Lamp,
  default: Target,
  submit: CheckCircle,
  budget: Wallet,
};

export function getStepData<T extends keyof AllQuizData>(stepKey: T): AllQuizData[T] {
  return quizData[stepKey];
}
