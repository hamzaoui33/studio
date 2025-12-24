
import type { AllQuizData, Step5RoomImprovementData, Step6RoomFocusData, Step7LoadingData } from '@/types/quiz';
import type { LucideIcon } from 'lucide-react';
import {
  Sofa, BedDouble, Home, Trees, Building, Paintbrush, LayoutGrid, Lamp, Target, CheckCircle, Wallet, Mail, HandHeart, Briefcase, Key, CookingPot, GlassWater, Bath, Building2, User, Hand, Loader, Baby, BookOpen, ToyBrick, HelpCircle, Edit3, Palette, Gem, Sparkles, Droplets, Layers, SunMedium, Moon, Puzzle
} from 'lucide-react';

export const TOTAL_QUIZ_STEPS = 7;

export const quizData: AllQuizData = {
  step1: {
    id: 1,
    title: "Swoon-Worthy Rooms",
    question: "Which rooms make your heart skip a beat?",
    instruction: "Can’t decide? No problem, choose as many as you like! These images help us get a feel for your style.",
    options: [
      { id: "room1", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Water-Features-for-a-Serene-Minimalist-Garden.webp", alt: "Minimalist Garden", hint: "minimalist garden" },
      { id: "room2", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Functional-Layouts-for-a-Mid-Century-Dining-Room.webp", alt: "Mid-Century Dining Room", hint: "mid-century dining" },
      { id: "room3", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Embrace-handleless-cabinets-in-your-Minimalist-Kitchen.webp", alt: "Minimalist Kitchen", hint: "minimalist kitchen" },
      { id: "room4", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Open-Concept-Mid-Century-Living-Room-Layouts-600x857.webp", alt: "Mid-Century Living Room", hint: "mid-century living" },
      { id: "room5", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/07/Craft-an-Elegant-Traditional-Home-Office-with-Dark-Wood.webp", alt: "Traditional Home Office", hint: "traditional office" },
      { id: "room6", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Seaside-Colors-for-Your-Bathroom.webp", alt: "Coastal Bathroom", hint: "coastal bathroom" },
      { id: "room7", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/07/Boho-bedroom-natural-wood-accents-717x1024.webp", alt: "Boho Bedroom", hint: "boho bedroom" },
      { id: "room8", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Color-Palettes-for-a-Mid-Century-Hallway.webp", alt: "Mid-Century Hallway", hint: "mid-century hallway" },
      { id: "room9", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Natural-Materials-for-your-Boho-Garden-Sanctuary.webp", alt: "Boho Garden", hint: "boho garden" },
      { id: "room10", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Bring-in-Darker-Color-Palette.webp", alt: "Industrial Dining Room", hint: "industrial dining" },
      { id: "room11", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Tech-Integration-in-an-Industrial-Style-Office.webp", alt: "Industrial Home Office", hint: "industrial office" },
      { id: "room12", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/05/Boho-Beach-Coastal-Nursery-Colors.webp", alt: "Coastal Nursery", hint: "coastal nursery" },
      { id: "room13", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Brighten-Your-Coastal-Living-Room-with-Natural-Light.webp", alt: "Coastal Living Room", hint: "coastal living" },
      { id: "room14", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Use-Dark-Color-Palettes-for-Your-Kitchen-Space.webp", alt: "Industrial Kitchen", hint: "industrial kitchen" },
      { id: "room15", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Statement-Art-Pieces-in-Your-Urban-Modern-Home-Office.webp", alt: "Modern Home Office", hint: "modern office" },
      { id: "room16", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Mixing-Metals-for-an-Eclectic-Bathroom-Statement.webp", alt: "Eclectic Bathroom", hint: "eclectic bathroom" },
      { id: "room17", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Introduce-Charming-Lanterns-for-Evening-Ambiance.webp", alt: "Farmhouse Garden", hint: "farmhouse garden" },
      { id: "room18", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Arranging-furniture-for-seamless-flow.webp", alt: "Traditional Dining Room", hint: "traditional dining" },
      { id: "room19", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Wood-Accents-for-a-Cozy-Scandinavian-Bathroom.webp", alt: "Scandinavian Bathroom", hint: "scandinavian bathroom" },
      { id: "room20", imageUrl: "https://decorwhisper.com/wp-content/uploads/2025/06/Sustainable-Choices-for-Your-Babys-Room.webp", alt: "Minimalist Nursery", hint: "minimalist nursery" },
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
        id: "midcentury-modern",
        name: "Timeless Midcentury Modern",
        description: "You love clean lines, tapered legs, and a healthy dose of nostalgia. Midcentury Modern is your style sweet spot where form meets function with a retro twist. Your space is filled with warm woods, bold shapes, and iconic furniture that makes you feel like you’ve stepped into a scene from Mad Men (cocktails optional, but encouraged).",
        imageUrl: "https://aveladecor.com/wp-content/uploads/2025/12/final-photorealistic-3d-designs.webp",
        hint: "midcentury modern"
      },
      {
        id: "bohemian",
        name: "Free-Spirited Bohemian",
        description: "You’re drawn to rich textures, eclectic treasures, and layered patterns that tell a story. Bohemian style is all about self-expression, creative freedom, and a touch of wanderlust. Your space is filled with global finds, lush plants, and cozy corners that invite you to relax, dream, and stay a while.",
        imageUrl: "https://aveladecor.com/wp-content/uploads/2025/06/Free-Spirited-Bohemian.webp",
        hint: "bohemian decor"
      },
      {
        id: "coastal",
        name: "Relaxed Coastal",
        description: "You love that breezy, beachy feel—even if you live far from the shore. Coastal style brings in soft blues, sun-washed neutrals, and natural textures that make your space feel like a serene seaside retreat. It’s all about light, air, and effortless ease.",
        imageUrl: "https://aveladecor.com/wp-content/uploads/2025/06/Relaxed-Coastal.webp",
        hint: "coastal home"
      },
       {
        id: "modern",
        name: "Sleek Modern",
        description: "Clean lines, open spaces, and a bold approach to simplicity define your vibe. Sleek Modern style is all about minimal ornamentation and high-impact design choices. Think polished finishes, smart storage, and a space that feels both current and quietly confident.",
        imageUrl: "https://aveladecor.com/wp-content/uploads/2025/06/Sleek-Modern.webp",
        hint: "sleek modern"
      },
      {
        id: "rustic",
        name: "Warm Rustic",
        description: "You love the feeling of a cozy cabin or countryside retreat. Warm Rustic style brings in weathered woods, stone textures, and a lived-in look that’s full of charm. It’s all about authenticity, comfort, and embracing the beauty of imperfections.",
        imageUrl: "https://aveladecor.com/wp-content/uploads/2025/06/Warm-Rustic.webp",
        hint: "rustic decor"
      },
      {
        id: "traditional",
        name: "Elegant Traditional",
        description: "Classic, refined, and timeless—your space tells a story of heritage and harmony. Elegant Traditional style is rooted in symmetry, rich furnishings, and sophisticated details. It’s where timeless design meets a graceful sense of order.",
        imageUrl: "https://aveladecor.com/wp-content/uploads/2025/06/Elegant-Traditional.webp",
        hint: "traditional interior"
      },
      {
        id: "scandinavian",
        name: "Clean Scandinavian",
        description: "You gravitate toward simplicity, function, and calm. Clean Scandinavian style is all about bright whites, soft woods, and minimal clutter. Every piece has a purpose, and the whole space breathes with light, clarity, and coziness (or as the Danes say—hygge).",
        imageUrl: "https://aveladecor.com/wp-content/uploads/2025/06/Clean-Scandinavian.webp",
        hint: "scandinavian design"
      },
      {
        id: "glam",
        name: "Luxurious Glam",
        description: "You’re all about drama, sparkle, and sophistication. Luxurious Glam style turns your home into a statement with mirrored finishes, metallic accents, and plush textures. It's Hollywood regency meets modern elegance—bold, beautiful, and unapologetically chic.",
        imageUrl: "https://aveladecor.com/wp-content/uploads/2025/06/Luxurious-Glam.webp",
        hint: "glam decor"
      },
      {
        id: "industrial",
        name: "Edgy Industrial",
        description: "Raw, urban, and effortlessly cool—your style is inspired by loft living and city grit. Edgy Industrial design blends exposed brick, metal elements, and reclaimed wood with utilitarian charm. It’s minimal, masculine, and full of character.",
        imageUrl: "https://aveladecor.com/wp-content/uploads/2025/06/Edgy-Industrial.webp",
        hint: "industrial style"
      },
      {
        id: "eclectic",
        name: "Vibrant Eclectic",
        description: "You thrive on mixing it up. Vibrant Eclectic style means no rules—just layers of personality, color, and pattern. From vintage finds to modern art, your home is a curated collection of everything you love, tied together by confidence and creativity.",
        imageUrl: "https://aveladecor.com/wp-content/uploads/2025/06/Vibrant-Eclectic.webp",
        hint: "eclectic interior"
      },
      {
        id: "farmhouse",
        name: "Charming Farmhouse",
        description: "Think fresh, cozy, and welcoming. Charming Farmhouse style blends old and new with soft neutrals, shiplap walls, and vintage accents. It’s about creating a space that feels lived-in and loved, like a warm hug after a long day.",
        imageUrl: "https://aveladecor.com/wp-content/uploads/2025/06/Charming-Farmhouse.webp",
        hint: "farmhouse decor"
      },
      {
        id: "japandi",
        name: "Serene Japandi",
        description: "A harmonious blend of Japanese minimalism and Scandinavian warmth, Serene Japandi style is calm, intentional, and elegant. You love low-profile furniture, organic shapes, and natural materials that bring peace and purpose to every corner.",
        imageUrl: "https://aveladecor.com/wp-content/uploads/2025/06/Serene-Japandi.webp",
        hint: "japandi style"
      },
      {
        id: "transitional",
        name: "Balanced Transitional",
        description: "You love a little tradition and a little trend. Balanced Transitional style bridges the gap between classic and contemporary, mixing timeless silhouettes with fresh finishes. It’s versatile, polished, and never too much of one thing.",
        imageUrl: "https://aveladecor.com/wp-content/uploads/2025/06/Balanced-Transitional.webp",
        hint: "transitional interior"
      },
      {
        id: "minimalist",
        name: "Refined Minimalist",
        description: "Less is more, and every item in your space has meaning. Refined Minimalist style is all about clarity, calm, and quality over quantity. With clean lines, neutral palettes, and intentional choices, your home feels like a breath of fresh air.",
        imageUrl: "https://aveladecor.com/wp-content/uploads/2025/06/Refined-Minimalist.webp",
        hint: "minimalist design"
      }
    ],
  },
  step3: {
    id: 3,
    title: "Color & Mood",
    question: "Which color atmosphere and mood do you envision?",
    instruction: "Select the one that best reflects your desired feeling for your space.",
    maxSelections: 1,
    options: [
      {
        id: "light_airy_neutrals",
        name: "Light, Airy & Neutral",
        description: "Serene, Calm, Bright", // Keywords
        longDescription: "A monochromatic neutral scheme with gradually deepening values ensures cohesion and visual breathing room.",
        icon: SunMedium,
        colorPalette: ["#F5F3EE", "#E1DDD8", "#C9C5C0", "#A8A49F", "#8E8A86"],
      },
      {
        id: "earthy_warm_tones",
        name: "Earthy & Warm Tones",
        description: "Cozy, Natural, Grounded", // Keywords
        longDescription: "An analogous palette (yellow-orange to reddish-brown) evokes warmth and comfort.",
        icon: Palette,
        colorPalette: ["#DCC2A6", "#C49A6C", "#A66A3A", "#7F4A28", "#5C3925"],
      },
      {
        id: "bold_vibrant_accents",
        name: "Bold & Vibrant with Accents",
        description: "Energetic, Playful, Statement", // Keywords
        longDescription: "A split-complementary scheme (golden yellow ↔ red-violet, plus teal) creates dynamic contrast without clashing.",
        icon: Sparkles,
        colorPalette: ["#F29E4C", "#E63946", "#2A9D8F", "#D62828", "#264653"],
      },
      {
        id: "cool_serene_hues",
        name: "Cool & Serene Hues",
        description: "Refreshing, Peaceful, Crisp", // Keywords
        longDescription: "Analogous cool-tone progression (green-blue spectrum) fosters calm and harmony.",
        icon: Droplets,
        colorPalette: ["#E0F2F1", "#A8DADC", "#6BB7B7", "#409394", "#225E60"],
      },
      {
        id: "dark_moody_elegance",
        name: "Dark, Moody & Elegant",
        description: "Sophisticated, Dramatic, Intimate", // Keywords
        longDescription: "A near-monochrome, low-value scheme with slight hue shifts adds intrigue while maintaining elegance.",
        icon: Moon,
        colorPalette: ["#2B2D42", "#3B3E5B", "#5D6071", "#8D99AE", "#12131A"],
      },
    ],
  },
  step4: {
    id: 4,
    title: "Materials & Details",
    question: "What materials and design details catch your eye?",
    instruction: "Choose up to 2 that you're most drawn to.",
    maxSelections: 2,
    options: [
      { id: "natural_woods_woven", name: "Natural Woods & Woven Textures", description: "Rattan, Jute, Linen", icon: Trees },
      { id: "sleek_metals_lines", name: "Sleek Metals & Clean Lines", description: "Polished Chrome, Minimalist Forms", icon: Layers },
      { id: "plush_textiles_luxe", name: "Plush Textiles & Luxe Finishes", description: "Velvet, Silk, Metallics", icon: Gem },
      { id: "artistic_eclectic_patterns", name: "Artistic Patterns & Eclectic Decor", description: "Bold Prints, Unique Art", icon: Paintbrush },
      { id: "raw_industrial_elements", name: "Raw & Industrial Elements", description: "Exposed Brick, Concrete", icon: Building },
    ],
  },
  step5: {
    id: 5,
    title: "Room for Improvement",
    question: "Which rooms are you looking to improve?",
    instruction: "Select the rooms you want to focus on. You can adjust the quantity for each.",
    options: [
      { id: "living_room", name: "Living Room", icon: Sofa },
      { id: "bedroom", name: "Bedroom", icon: BedDouble },
      { id: "kitchen", name: "Kitchen", icon: CookingPot },
      { id: "dining_room", name: "Dining Room", icon: GlassWater },
      { id: "bathroom", name: "Bathroom", icon: Bath },
      { id: "home_office", name: "Home Office", icon: Briefcase },
      { id: "outdoor_space", name: "Outdoor Space", icon: Trees },
      { id: "entryway", name: "Entryway / Hallway", icon: Home },
      { id: "nursery", name: "Nursery / Kid's Room", icon: Baby },
      { id: "other", name: "Other", icon: Edit3 },
      { id: "not_sure_yet", name: "Not Sure Yet", icon: HelpCircle },
    ],
  } as Step5RoomImprovementData,
  step6: {
    id: 6,
    title: "Primary Room Focus",
    question: "Which one room is your top priority for a makeover?",
    instruction: "Select one room you'd like to concentrate on first. We'll show options based on your previous selections.",
  } as Step6RoomFocusData,
  step7: {
    id: 7,
    title: "Generating Your Style",
    question: "",
    instruction: "",
  } as Step7LoadingData,
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
  loading: Loader,
  default: Target,
  submit: CheckCircle,
  light_airy_neutrals: SunMedium,
  earthy_warm_tones: Palette,
  bold_vibrant_accents: Sparkles,
  cool_serene_hues: Droplets,
  dark_moody_elegance: Moon,
  natural_woods_woven: Trees,
  sleek_metals_lines: Layers,
  plush_textiles_luxe: Gem,
  artistic_eclectic_patterns: Paintbrush,
  raw_industrial_elements: Building,
};

export function getStepData<T extends keyof AllQuizData>(stepKey: T): AllQuizData[T] {
  return quizData[stepKey];
}
