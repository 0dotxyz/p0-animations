import { z } from "zod";
import {
  AbsoluteFill,
  Img,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ensureFontsLoaded } from "../lib/fonts";
import { FONT_FAMILY_SANS } from "../lib/brand";
import { GradientBackground } from "../components/GradientBackground";
import { NodesBackground } from "../components/NodesBackground";
import { P0LogoMark } from "../components/P0Logo";

export const newAssetPartnershipSchema = z.object({
  headline: z.string(),
  partnerLogoSrc: z.string(),
  tokenIcons: z.array(z.string()),
  theme: z.enum(["dark", "light"]),
});

export const NewAssetPartnership: React.FC<
  z.infer<typeof newAssetPartnershipSchema>
> = ({ headline, partnerLogoSrc, tokenIcons, theme }) => {
  ensureFontsLoaded();

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textColor = theme === "dark" ? "#FFFFFF" : "#0A0A0A";

  // Resolve asset src — remote URLs pass through, local paths use staticFile()
  const resolveSrc = (src: string) =>
    src.startsWith("http") ? src : staticFile(src);

  // P0 logo entrance
  const p0LogoEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Partner logo entrance — staggers after P0
  const partnerLogoEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 6,
  });

  // Headline entrance — springs in after logos
  const headlineEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 14,
  });

  // Token icon stagger — each icon enters with a slight delay
  const iconEntrances = tokenIcons.map((_, i) =>
    spring({
      frame,
      fps,
      config: { damping: 100 },
      delay: 24 + i * 6,
    }),
  );

  return (
    <AbsoluteFill>
      {/* Layer 1: Gradient background */}
      <GradientBackground theme={theme} />

      {/* Layer 2: Animated node lines */}
      <NodesBackground
        theme={theme}
        variant="pay-hero"
        opacity={0.8}
        color="white"
      />

      {/* Layer 3: Content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Logo row: P0 + Partner */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              opacity: p0LogoEntrance,
              transform: `scale(${p0LogoEntrance})`,
            }}
          >
            <P0LogoMark size={80} fill={textColor} />
          </div>
          {partnerLogoSrc && (
            <div
              style={{
                opacity: partnerLogoEntrance,
                transform: `scale(${partnerLogoEntrance})`,
              }}
            >
              <Img
                src={resolveSrc(partnerLogoSrc)}
                style={{ height: 80, width: "auto" }}
              />
            </div>
          )}
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontWeight: 500,
            fontSize: 112,
            color: textColor,
            textAlign: "center",
            margin: 0,
            opacity: headlineEntrance,
            transform: `translateY(${(1 - headlineEntrance) * 30}px)`,
          }}
        >
          {headline}
        </h1>

        {/* Token icon row */}
        {tokenIcons.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginTop: 40,
            }}
          >
            {tokenIcons.map((icon, i) => (
              <div
                key={icon}
                style={{
                  opacity: iconEntrances[i],
                  transform: `translateY(${(1 - iconEntrances[i]) * 40}px)`,
                }}
              >
                <Img
                  src={resolveSrc(icon)}
                  style={{
                    width: 125,
                    height: 125,
                    borderRadius: 12,
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
