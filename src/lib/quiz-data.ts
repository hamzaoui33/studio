
import type { AllQuizData } from '@/types/quiz';
import type { LucideIcon } from 'lucide-react';
import {
  Sofa, BedDouble, Home, Trees, Building, Paintbrush, LayoutGrid, Lamp, Target, CheckCircle, Wallet, Mail, HandHeart, Briefcase, Key, CookingPot, GlassWater, Bath, Building2, User, Hand, Loader, Baby, BookOpen, ToyBrick, HelpCircle, Edit3
} from 'lucide-react';

export const TOTAL_QUIZ_STEPS = 5; // Updated from 8

export const quizData: AllQuizData = {
  step1: {
    id: 1,
    title: "Swoon-Worthy Rooms",
    question: "Which rooms make your heart skip a beat?",
    instruction: "Can’t decide? No problem, choose as many as you like! These images help us get a feel for your style.",
    options: [
      { id: "room1", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/05/Pendant-Lights-Define-Industrial-Kitchen-Island-Zones.webp", alt: "Pendant Lights Define Industrial Kitchen Island Zones", hint: "Industrial Kitchen" },
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
    question: "Which style feels most like you?",
    instruction: "Pick up to 3 that speak to you. Think about the vibe you want your home to have.",
    maxSelections: 3,
    options: [
      {
        id: "iconic_midcentury_modern",
        name: "Iconic Midcentury Modern",
        description: "You love clean lines, tapered legs, and a healthy dose of nostalgia. Midcentury Modern is your style sweet spot where form meets function with a retro twist. Your space is filled with warm woods, bold shapes, and iconic furniture that makes you feel like you’ve stepped into a scene from Mad Men (cocktails optional, but encouraged).",
        imageUrl: "https://placehold.co/300x200.png",
        hint: "midcentury modern"
      },
      {
        id: "free_spirited_bohemian",
        name: "Free-Spirited Bohemian",
        description: "Your home is your canvas, and you paint it with textiles, trinkets, and treasures from around the world. Bohemian style is all about freedom layered rugs, macramé wall hangings, and plants in every corner. Whether it’s Moroccan poufs or handwoven throws, your space tells stories only you could write.",
        imageUrl: "https://placehold.co/300x200.png",
        hint: "bohemian decor"
      },
      {
        id: "breezy_coastal",
        name: "Breezy Coastal",
        description: "Breezy and blissful, your home channels seaside serenity. You gravitate toward a soft color palette of whites, sandy neutrals, and ocean blues. Driftwood accents, linen upholstery, and rattan textures make your space feel like a beach house getaway even if you're miles from the coast.",
        imageUrl: "https://placehold.co/300x200.png",
        hint: "coastal home"
      },
      {
        id: "refined_modern",
        name: "Refined Modern",
        description: "Less is more in your design playbook. Your space is sleek, refined, and minimal without feeling cold. Clean architecture, neutral tones, and understated decor set the tone, while thoughtful statement pieces bring just enough edge. Function and aesthetics are perfectly in sync in your modern sanctuary.",
        imageUrl: "https://placehold.co/300x200.png",
        hint: "refined modern"
      },
      {
        id: "cozy_rustic",
        name: "Cozy Rustic",
        description: "Home is where the heart and the reclaimed wood is. Rustic design is your go-to, featuring cozy textures, natural materials, and that perfect patina. Your dream space feels like a mountain lodge or farmhouse retreat, complete with chunky knits, stone accents, and vintage finds that tell a story.",
        imageUrl: "https://placehold.co/300x200.png",
        hint: "rustic decor"
      },
      {
        id: "timeless_traditional",
        name: "Timeless Traditional",
        description: "You believe timeless is always in style. Traditional design speaks to your love of symmetry, structure, and refinement. Think elegant drapery, carved wood furniture, and detailed millwork. Your space feels classic and comforting, with just the right amount of polish and old-world charm.",
        imageUrl: "https://placehold.co/300x200.png",
        hint: "traditional interior"
      },
      {
        id: "minimalist_scandinavian",
        name: "Minimalist Scandinavian",
        description: "Your home is a masterclass in “hygge.” Scandinavian design combines simplicity, warmth, and a touch of nature. You love soft lighting, clean lines, and neutral palettes. Add a cozy sheepskin throw and a few houseplants, and your space becomes a serene escape from the everyday hustle.",
        imageUrl: "https://placehold.co/300x200.png",
        hint: "scandinavian design"
      },
      {
        id: "luxe_glam",
        name: "Luxe Glam",
        description: "More is more and you make it work beautifully. Glam style is your way of life, mixing luxe fabrics, metallic finishes, and bold design choices. From velvet sofas to crystal chandeliers, your space is equal parts drama and sophistication. It’s not just decorated it’s dressed to impress.",
        imageUrl: "https://placehold.co/300x200.png",
        hint: "glam decor"
      },
      {
        id: "urban_industrial",
        name: "Urban Industrial",
        description: "Urban edge meets raw elegance in your industrial-inspired home. You love exposed brick, matte black finishes, and repurposed materials that add character. Your space blends function and grit with comfort, whether it's a loft apartment or a house with warehouse vibes. It's moody, modern, and unapologetically bold.",
        imageUrl: "https://placehold.co/300x200.png",
        hint: "industrial style"
      },
      {
        id: "artful_eclectic",
        name: "Artful Eclectic",
        description: "You break all the design rules and the result is magic. Eclectic style is all about mixing eras, cultures, and colors in a way that’s uniquely you. Your space might have a mid-century chair, a Persian rug, and contemporary art and somehow, it all works. Bold, vibrant, and full of personality, your home is anything but ordinary.",
        imageUrl: "https://placehold.co/300x200.png",
        hint: "eclectic interior"
      }
    ],
  },
  step3: {
    id: 3,
    title: "Room Improvement",
    question: "Which rooms feel like they need a little something?",
    instruction: "Pick as many as you like, and let us know how many of each. We’ll help you sort out the priorities later.",
    options: [
      { id: "living_room", name: "Living Room", icon: Sofa },
      { id: "dining_room", name: "Dining Room", icon: GlassWater },
      { id: "bedroom", name: "Bedroom", icon: BedDouble },
      { id: "nursery", name: "Nursery", icon: Baby },
      { id: "home_office", name: "Office", icon: Briefcase },
      { id: "kitchen", name: "Kitchen", icon: CookingPot },
      { id: "bathroom", name: "Bathroom", icon: Bath },
      { id: "reading_room", name: "Reading Room", icon: BookOpen },
      { id: "outdoor_space", name: "Outdoor Space", icon: Trees },
      { id: "entryway", name: "Entryway", icon: Home },
      { id: "playroom", name: "Playroom", icon: ToyBrick },
      { id: "other", name: "Other", icon: Edit3 },
      { id: "not_sure_yet", name: "Not Sure Yet", icon: HelpCircle },
    ],
  },
  step4: {
    id: 4,
    title: "Room Focus",
    question: "Awesome! Which room should we tackle first?",
    instruction: "This will be the main space we’ll use to create your personalized style guide.",
  },
  // Steps 5, 6, 7 (Name, Greeting, Email) are removed.
  // Step 8 (Loading) becomes the new Step 5.
  step5: {
    id: 5, // Was 8
    title: "Calculating Results",
    question: "",
    instruction: "",
  },
};

export const iconMap: { [key: string]: LucideIcon } = {
  living_room: Sofa,
  bedroom: BedDouble,
  kitchen: CookingPot,
  dining_room: GlassWater,
  bathroom: Bath,
  home_office: Briefcase,
  outdoor_space: Trees,
  entryway: Home,
  nursery: Baby,
  reading_room: BookOpen,
  playroom: ToyBrick,
  other: Edit3,
  not_sure_yet: HelpCircle,
  // name: User, // Removed
  // greeting: Hand, // Removed
  // email: Mail, // Removed
  loading: Loader,
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
  wallet: Wallet,
};

export function getStepData<T extends keyof AllQuizData>(stepKey: T): AllQuizData[T] {
  return quizData[stepKey];
}
