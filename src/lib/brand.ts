// P0 Brand Constants
// Colors extracted from p0-app globals.css and logo.tsx

export const COLORS = {
  purple: "#AA87FA",
  darkBlue: "#1E468C",
  mediumBlue: "#345AAD",
  lightBlue: "#BED7F5",
  nearBlack: "#0A0A0A",
  darkBg: "#171721",
  white: "#FFFFFF",
  lightGray: "#F9F9FB",
} as const;

// Logo gradient stops (top to bottom)
export const LOGO_GRADIENT_STOPS = [
  { offset: 0, color: COLORS.nearBlack },
  { offset: 0.25, color: COLORS.darkBlue },
  { offset: 0.6, color: COLORS.purple },
  { offset: 0.9, color: COLORS.lightBlue },
] as const;

// Background gradient presets
export const GRADIENTS = {
  dark: {
    // Navy at top → purple in middle → light blue at bottom
    stops: [
      { offset: "0%", color: COLORS.darkBg },
      { offset: "35%", color: COLORS.darkBlue },
      { offset: "65%", color: COLORS.purple },
      { offset: "85%", color: COLORS.lightBlue },
      { offset: "100%", color: "#D6E8F9" },
    ],
  },
  light: {
    // White at top → very light purple/white at bottom
    stops: [
      { offset: "0%", color: COLORS.white },
      { offset: "60%", color: COLORS.lightGray },
      { offset: "100%", color: "#EDE5FF" },
    ],
  },
} as const;

// Font families — loaded via src/lib/fonts.ts
export const FONT_FAMILY_SANS = "ABCOracle, sans-serif";
export const FONT_FAMILY_MONO = "AeonikMono, monospace";

// Common composition settings
export const COMP_WIDTH = 1600;
export const COMP_HEIGHT = 900;
export const COMP_FPS = 30;
