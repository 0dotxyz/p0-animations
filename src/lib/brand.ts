// P0 Brand Constants
// Colors extracted from p0-app globals.css and logo.tsx

export const COLORS = {
  purple: "#AA87FA",
  darkBlue: "#1E468C",
  mediumBlue: "#345AAD",
  lightBlue: "#BED7F5",
  paleBlue: "#D6E8F9",
  nearBlack: "#0A0A0A",
  darkBg: "#171721",
  white: "#FFFFFF",
  lightGray: "#F9F9FB",
  palePurple: "#EDE5FF",
} as const;

// Background gradient presets
export const GRADIENTS = {
  // Used by GradientBackground component for NewAssetIntegration, NewAsset
  dark: {
    stops: [
      { offset: "0%", color: COLORS.darkBg },
      { offset: "35%", color: COLORS.darkBlue },
      { offset: "65%", color: COLORS.purple },
      { offset: "85%", color: COLORS.lightBlue },
      { offset: "100%", color: COLORS.paleBlue },
    ],
  },
  light: {
    stops: [
      { offset: "0%", color: COLORS.white },
      { offset: "60%", color: COLORS.lightGray },
      { offset: "100%", color: COLORS.palePurple },
    ],
  },
  // Used by Statement composition — exact brand gradient from design
  statement: {
    stops: [
      { offset: "0%", color: COLORS.nearBlack },
      { offset: "25%", color: COLORS.darkBlue },
      { offset: "60%", color: COLORS.purple },
      { offset: "90%", color: COLORS.lightBlue },
    ],
  },
} as const;

// Font families — loaded via src/lib/fonts.ts
export const FONT_FAMILY_SANS = "ABCOracle, sans-serif";
export const FONT_FAMILY_MONO = "AeonikMono, monospace";

// Lottie animation native dimensions
export const LOTTIE_DIMENSIONS = {
  waves: { width: 2560, height: 300 },
  rings: { width: 2790, height: 1600 },
} as const;

// Common composition settings
export const COMP_WIDTH = 1600;
export const COMP_HEIGHT = 900;
export const COMP_FPS = 30;
