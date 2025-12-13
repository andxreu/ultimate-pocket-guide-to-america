/**
 * Colors Constants
 * 
 * Centralized color definitions for the application including:
 * - Theme colors (light/dark)
 * - Zinc color palette
 * - Apple system colors
 * - Background color swatches
 * - Emoji collections
 * 
 * @module constants/Colors
 */

// ============================================================================
// THEME COLORS
// ============================================================================

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

/**
 * Main theme color definitions
 */
export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
} as const;

// ============================================================================
// COLOR PALETTES
// ============================================================================

/**
 * Zinc color palette (neutral grays)
 * From Tailwind CSS
 */
export const zincColors = {
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#52525b",
  700: "#3f3f46",
  800: "#27272a",
  900: "#18181b",
  950: "#09090b",
} as const;

/**
 * Apple system colors
 */
export const appleBlue = "#007AFF";
export const appleRed = "#FF3B30";
export const appleGreen = "#34C759";

/**
 * Border color with opacity
 */
export const borderColor = "#A1A1AA80";

// ============================================================================
// BACKGROUND COLORS
// ============================================================================

/**
 * Background color swatches
 * Full spectrum of colors organized by hue (red → pink)
 * From Tailwind CSS color palette
 */
export const backgroundColors = [
  // Red (50-900)
  "#fef2f2", "#fee2e2", "#fecaca", "#fca5a5", "#f87171",
  "#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d",

  // Orange (50-900)
  "#fff7ed", "#ffedd5", "#fed7aa", "#fdba74", "#fb923c",
  "#f97316", "#ea580c", "#c2410c", "#9a3412", "#7c2d12",

  // Amber (50-900)
  "#fffbeb", "#fef3c7", "#fde68a", "#fcd34d", "#fbbf24",
  "#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f",

  // Yellow (50-900)
  "#fefce8", "#fef9c3", "#fef08a", "#fde047", "#facc15",
  "#eab308", "#ca8a04", "#a16207", "#854d0e", "#713f12",

  // Lime (50-900)
  "#f7fee7", "#ecfccb", "#d9f99d", "#bef264", "#a3e635",
  "#84cc16", "#65a30d", "#4d7c0f", "#3f6212", "#365314",

  // Green (50-900)
  "#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80",
  "#22c55e", "#16a34a", "#15803d", "#166534", "#14532d",

  // Emerald (50-900)
  "#ecfdf5", "#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399",
  "#10b981", "#059669", "#047857", "#065f46", "#064e3b",

  // Teal (50-900)
  "#f0fdfa", "#ccfbf1", "#99f6e4", "#5eead4", "#2dd4bf",
  "#14b8a6", "#0d9488", "#0f766e", "#115e59", "#134e4a",

  // Cyan (50-900)
  "#f0f9ff", "#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8",
  "#0ea5e9", "#0284c7", "#0369a1", "#075985", "#0c4a6e",

  // Blue (50-900)
  "#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa",
  "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a",

  // Indigo (50-900)
  "#eef2ff", "#e0e7ff", "#c7d2fe", "#a5b4fc", "#818cf8",
  "#6366f1", "#4f46e5", "#4338ca", "#3730a3", "#312e81",

  // Violet (50-900)
  "#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa",
  "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95",

  // Purple (50-900)
  "#faf5ff", "#f3e8ff", "#e9d5ff", "#d8b4fe", "#c084fc",
  "#a855f7", "#9333ea", "#7e22ce", "#6b21a8", "#581c87",

  // Fuchsia (50-900)
  "#fdf4ff", "#fae8ff", "#f5d0fe", "#f0abfc", "#e879f9",
  "#d946ef", "#c026d3", "#a21caf", "#86198f", "#701a75",

  // Pink (50-900)
  "#fdf2f8", "#fce7f3", "#fbcfe8", "#f9a8d4", "#f472b6",
  "#ec4899", "#db2777", "#be185d", "#9d174d", "#831843",

  // Rose (50-900)
  "#fff1f2", "#ffe4e6", "#fecdd3", "#fda4af", "#fb7185",
  "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337",
] as const;

// ============================================================================
// EMOJIS
// ============================================================================

/**
 * Emoji collection organized by category
 * Useful for avatars, icons, decorations, etc.
 */
export const emojies = [
  // 🍎 Fruits
  "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐",
  "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝",

  // 🥦 Vegetables
  "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶", "🫑", "🌽", "🥕",
  "🥔", "🧄", "🧅", "🍄",

  // 🍞 Breads & Bakery
  "🍞", "🥖", "🥨", "🥐", "🥯",

  // 🧀 Dairy & Eggs
  "🧀", "🥚", "🍳", "🥞", "🧇",

  // 🥓 Meats
  "🥓", "🥩", "🍗", "🍖",

  // 🍔 Fast Foods
  "🌭", "🍔", "🍟", "🍕",

  // 🌮 Wraps, Sandwiches & Ethnic Foods
  "🥪", "🌮", "🌯", "🫔", "🥙", "🧆",

  // 🍜 Pasta, Rice & Asian Foods
  "🍜", "🍝", "🍣", "🍤", "🍙", "🍚", "🍛", "🍲", "🥘", "🥗",

  // 🍿 Snacks & Misc
  "🍿", "🧈", "🥫", "🍱", "🥮", "🍠", "🍥", "🥟", "🥠", "🥡",

  // 🍦 Desserts & Sweets
  "🍦", "🍧", "🍨", "🍩", "🍪", "🧁", "🍰", "🎂", "🍮", "🍭",
  "🍬", "🍫", "🍯",

  // 🥜 Nuts
  "🥜", "🌰",

  // 🥛 Drinks
  "🥛", "🧃", "🧉", "🥤", "🍶", "🍵", "🍺", "🍻", "🥂", "🍷",
  "🍸", "🍹", "🥃", "🍾", "☕️", "🫖",

  // 🍴 Utensils & Condiments
  "🥄", "🍴", "🍽", "🥢", "🧂",

  // 🛒 Shopping & Payment
  "🛒", "🛍️", "🧺", "💳", "💸", "💵", "💰", "💲", "🧾", "🔖",
  "🏪", "🏬", "🏦", "🏧", "📦", "📮", "🏷️",

  // 📋 Organizational / Utility
  "✅", "📋", "📜", "✏️", "📝", "🔍", "📆", "⏰", "📱", "💻",
  "🌐", "🔗", "🔒", "🔑", "🗃️", "🗂️", "🔄", "💡", "⭐️", "📌",
  "📍", "📊", "💯", "🎉", "🎊", "🎁", "🏆", "⚖️", "🏠",

  // 🚗 Transportation & Movement
  "🚗", "🏃‍♂️", "🏃‍♀️", "🚶‍♂️", "🚶‍♀️",

  // 👕 Clothing
  "👕", "👖", "👗", "👔", "🩳", "👠", "👟", "🧥", "🧤", "🧣",
  "🧦", "🎒", "👜", "👛", "👓", "🕶️", "👒",

  // 🏺 Household Items
  "🪣", "🪑", "🛋️", "🚪", "🪟", "🏺", "🖼️", "📺", "📻", "🔌",
  "🧴", "🪥", "🧹", "🧽", "🗑️", "🪒", "💊", "💉", "🩹",

  // ❤️ Hearts
  "❤️", "💔", "💘", "💙", "💚", "💛", "💜",
] as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

/**
 * Type definitions for better TypeScript support
 */
export type ZincColorKey = keyof typeof zincColors;
export type BackgroundColor = typeof backgroundColors[number];
export type Emoji = typeof emojies[number];
export type ThemeMode = keyof typeof Colors;