import { z } from "zod";
import {
  AbsoluteFill,
  Img,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ensureFontsLoaded } from "../lib/fonts";
import { COLORS, FONT_FAMILY_SANS } from "../lib/brand";
import { GradientBackground } from "../components/GradientBackground";
import { NodesBackground } from "../components/NodesBackground";

export const newAssetSchema = z.object({
  assetName: z.string(),
  tokenIconSrc: z.string(),
  badgeText: z.string(),
  theme: z.enum(["dark", "light"]),
});

export const NewAsset: React.FC<z.infer<typeof newAssetSchema>> = ({
  assetName,
  tokenIconSrc,
  badgeText,
  theme,
}) => {
  ensureFontsLoaded();

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textColor = theme === "dark" ? COLORS.white : COLORS.nearBlack;

  // Token icon — scales in with spring
  const iconEntrance = spring({
    frame,
    fps,
    config: { damping: 100, mass: 0.8 },
  });

  // Asset name — springs in after icon
  const nameEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 8,
  });

  // Badge — slides up and fades in last
  const badgeEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 18,
  });

  return (
    <AbsoluteFill>
      {/* Layer 1: Gradient background */}
      <GradientBackground theme={theme} />

      {/* Layer 2: Animated node lines */}
      <NodesBackground
        theme={theme}
        variant="rings"
        opacity={0.15}
        color={theme === "dark" ? "white" : "black"}
      />

      {/* Layer 3: Content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: -20,
        }}
      >
        {/* Token icon */}
        <div
          style={{
            opacity: iconEntrance,
            transform: `scale(${iconEntrance})`,
            marginBottom: 24,
          }}
        >
          <Img
            src={tokenIconSrc}
            style={{
              width: 120,
              height: 120,
              borderRadius: 12,
            }}
          />
        </div>

        {/* Asset name — large text */}
        <h1
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontWeight: 500,
            fontSize: 120,
            color: textColor,
            textAlign: "center",
            margin: 0,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            opacity: nameEntrance,
            transform: `translateY(${(1 - nameEntrance) * 30}px)`,
          }}
        >
          {assetName}
        </h1>

        {/* Badge pill */}
        <div
          style={{
            marginTop: 32,
            opacity: badgeEntrance,
            transform: `translateY(${(1 - badgeEntrance) * 20}px)`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              borderRadius: 999,
              backgroundColor:
                theme === "dark"
                  ? "rgba(170, 135, 250, 0.2)"
                  : "rgba(170, 135, 250, 0.15)",
              color: COLORS.purple,
              fontFamily: FONT_FAMILY_SANS,
              fontWeight: 500,
              fontSize: 24,
              letterSpacing: "0.05em",
            }}
          >
            <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
              <circle
                cx={11}
                cy={11}
                r={9.5}
                stroke={COLORS.purple}
                strokeWidth={2}
              />
              <line
                x1={11}
                y1={6}
                x2={11}
                y2={16}
                stroke={COLORS.purple}
                strokeWidth={1.5}
              />
              <line
                x1={6}
                y1={11}
                x2={16}
                y2={11}
                stroke={COLORS.purple}
                strokeWidth={1.5}
              />
            </svg>
            {badgeText}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
