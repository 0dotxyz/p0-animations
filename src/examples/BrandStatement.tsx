import { z } from "zod";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { random } from "remotion";
import { ensureFontsLoaded } from "../lib/fonts";
import { COLORS, FONT_FAMILY_SANS } from "../lib/brand";
import { GradientBackground } from "../components/GradientBackground";
import { NodesBackground } from "../components/NodesBackground";
import { P0Logo } from "../components/P0Logo";

export const brandStatementSchema = z.object({
  headline: z.string(),
  theme: z.enum(["dark", "light"]),
});

// Concentric rings background decoration
const ConcentricRings: React.FC<{
  readonly color: string;
  readonly opacity: number;
}> = ({ color, opacity }) => {
  const ringRadii = [120, 200, 300, 420, 560];
  const gradientId = String(random("concentric-rings-gradient"));

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute" }}
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity={0.15} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </radialGradient>
        </defs>
        {ringRadii.map((r, i) => (
          <circle
            key={i}
            cx={960}
            cy={400}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={1}
            strokeOpacity={0.12 - i * 0.015}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

export const BrandStatement: React.FC<z.infer<typeof brandStatementSchema>> = ({
  headline,
  theme,
}) => {
  ensureFontsLoaded();

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : COLORS.nearBlack;
  const ringColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)";

  // "Project [logo]" wordmark entrance
  const logoEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Words of the headline stagger in
  const words = headline.split(" ");

  return (
    <AbsoluteFill>
      {/* Layer 1: Gradient background */}
      <GradientBackground theme={theme} />

      {/* Layer 2: Concentric rings (decorative) */}
      <ConcentricRings color={ringColor} opacity={0.6} />

      {/* Layer 3: Bottom nodes wash */}
      <AbsoluteFill
        style={{
          top: "60%",
          height: "40%",
          overflow: "hidden",
        }}
      >
        <NodesBackground theme={theme} variant="main" opacity={0.7} />
        {/* Purple gradient wash over the bottom */}
        <AbsoluteFill
          style={{
            background: isDark
              ? `linear-gradient(to bottom, transparent 0%, ${COLORS.purple}44 50%, ${COLORS.purple}88 100%)`
              : `linear-gradient(to bottom, transparent 0%, rgba(170,135,250,0.15) 50%, rgba(170,135,250,0.4) 100%)`,
          }}
        />
      </AbsoluteFill>

      {/* Layer 4: Content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 80,
        }}
      >
        {/* "Project [logo]" wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
            opacity: logoEntrance,
            transform: `translateY(${(1 - logoEntrance) * 15}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 28,
              fontWeight: 400,
              color: textColor,
            }}
          >
            Project
          </span>
          <P0Logo width={28} fill={textColor} />
        </div>

        {/* Headline — gradient text, word-by-word stagger */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 20px",
            maxWidth: 1200,
          }}
        >
          {words.map((word, i) => {
            const wordEntrance = spring({
              frame,
              fps,
              config: { damping: 200 },
              delay: 8 + i * 5,
            });

            // Gradient text: dark -> purple across words
            const wordProgress = words.length > 1 ? i / (words.length - 1) : 0;
            const wordColor = isDark
              ? interpolateColor(wordProgress, "#FFFFFF", COLORS.lightBlue)
              : interpolateColor(wordProgress, COLORS.nearBlack, COLORS.purple);

            return (
              <span
                key={`${word}-${i}`}
                style={{
                  fontFamily: FONT_FAMILY_SANS,
                  fontWeight: 500,
                  fontSize: 100,
                  lineHeight: 1.1,
                  color: wordColor,
                  opacity: wordEntrance,
                  transform: `translateY(${(1 - wordEntrance) * 20}px)`,
                  display: "inline-block",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Simple linear color interpolation between two hex colors
function interpolateColor(t: number, from: string, to: string): string {
  const f = hexToRgb(from);
  const toRgb = hexToRgb(to);
  const r = Math.round(f.r + (toRgb.r - f.r) * t);
  const g = Math.round(f.g + (toRgb.g - f.g) * t);
  const b = Math.round(f.b + (toRgb.b - f.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}
