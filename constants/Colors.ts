// constants/Colors.ts
// The Ultimate Pocket Guide to America — Elite Color System

// Primary Gold — Your signature color
export const GOLD = "#D4AF37";
export const GOLD_DARK = "#B8972A";
export const GOLD_LIGHT = "#E8D9A6";

// Accent & Status
export const SUCCESS = "#34C759";
export const WARNING = "#FF9500";
export const ERROR = "#FF3B30";
export const INFO = "#007AFF";

// Neutral Palette (Zinc)
export const zinc = {
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

// Apple Standard Colors
export const apple = {
  blue: "#007AFF",
  red: "#FF3B30",
  green: "#34C759",
  orange: "#FF9500",
  purple: "#AF52DE",
  teal: "#30B0C7",
  pink: "#FF2D55",
  yellow: "#FFCC00",
} as const;

// Background & Surface Colors
export const backgroundColors = [
  "#fef2f2", "#fee2e2", "#fecaca", "#fca5a5", "#f87171", "#ef4444", "#dc2626",
  "#fff7ed", "#ffedd5", "#fed7aa", "#fdba74", "#fb923c", "#f97316", "#ea580c",
  "#fffbeb", "#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b", "#d97706",
  "#fefce8", "#fef9c3", "#fef08a", "#fde047", "#facc15", "#eab308", "#ca8a04",
  "#f7fee7", "#ecfccb", "#d9f99d", "#bef264", "#a3e635", "#84cc16", "#65a30d",
  "#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#22c55e", "#16a34a",
  "#ecfdf5", "#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669",
  "#f0fdfa", "#ccfbf1", "#99f6e4", "#5eead4", "#2dd4bf", "#14b8a6", "#0d9488",
  "#f0f9ff", "#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7",
  "#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb",
  "#eef2ff", "#e0e7ff", "#c7d2fe", "#a5b4fc", "#818cf8", "#6366f1", "#4f46e5",
  "#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed",
  "#faf5ff", "#f3e8ff", "#e9d5ff", "#d8b4fe", "#c084fc", "#a855f7", "#9333ea",
  "#fdf4ff", "#fae8ff", "#f5d0fe", "#f0abfc", "#e879f9", "#d946ef", "#c026d3",
  "#fdf2f8", "#fce7f3", "#fbcfe8", "#f9a8d4", "#f472b6", "#ec4899", "#db2777",
  "#fff1f2", "#ffe4e6", "#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48",
] as const;

// Emoji collection for future use (favorites, reactions, etc.)
export const emojis = [
  "🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍈","🍒","🍑","🥭","🍍","🥥","🥝",
  "🍅","🍆","🥑","🥦","🥬","🥒","🌶","🫑","🌽","🥕","🥔","🧄","🧅","🍄",
  "🍞","🥖","🥨","🥐","🥯","🧀","🥚","🍳","🥞","🧇",
  "🥓","🥩","🍗","🍖","🌭","🍔","🍟","🍕","🥪","🌮","🌯","🫔","🥙","🧆",
  "🍜","🍝","🍣","🍤","🍙","🍚","🍛","🍲","🥘","🥗","🍿","🧈","🥫","🍱","🥮","🍠","🍥","🥟","🥠","🥡",
  "🍦","🍧","🍨","🍩","🍪","🧁","🍰","🎂","🍮","🍭","🍬","🍫","🍯","🥜","🌰",
  "🥛","🧃","🧉","🥤","🍶","🍵","🍺","🍻","🥂","🍷","🍸","🍹","🥃","🍾","☕️","🫖",
  "🥄","🍴","🍽","🥢","🧂",
  "🛒","🛍️","🧺","💳","💸","💵","💰","💲","🧾","🔖","🏪","🏬","🏦","🏧","📦","📮","🏷️",
  "✅","📋","📜","✏️","📝","🔍","📆","⏰","📱","💻","🌐","🔗","🔒","🔑","🗃️","🗂️","🔄","💡","⭐️","📌","📍","📊","💯","🎉","🎊","🎁","🏆","⚖️","🏠",
  "🚗","🏃‍♂️","🏃‍♀️","🚶‍♂️","🚶‍♀️",
  "👕","👖","👗","👔","🩳","👠","👟","🧥","🧤","🧣","🧦","🎒","👜","👛","👓","🕶️","👒",
  "🪣","🪑","🛋️","🚪","🪟","🏺","🖼️","📺","📻","🔌","🧴","🪥","🧹","🧽","🗑️","🪒","💊","💉","🩹",
  "❤️","💔","💘","💙","💚","💛","💜"
] as const;

// Legacy exports (for any old code)
export const tintColorLight = GOLD;
export const tintColorDark = "#FFFFFF";
export const appleBlue = apple.blue;
export const appleRed = apple.red;
export const appleGreen = apple.green;
export const borderColor = zinc[400] + "40";

// Final export — use this everywhere
export const Colors = {
  primary: GOLD,
  primaryDark: GOLD_DARK,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  info: INFO,

  zinc,
  apple,

  light: {
    text: "#11181C",
    background: "#FFFFFF",
    surface: "#F8F9FA",
    border: zinc[300] + "60",
    tint: GOLD,
    iconDefault: zinc[600],
    iconSelected: GOLD,
  },

  dark: {
    text: "#ECEDEE",
    background: "#0F0F0F",
    surface: "#1A1A1A",
    border: zinc[700] + "60",
    tint: GOLD,
    iconDefault: zinc[400],
    iconSelected: GOLD,
  },
} as const;