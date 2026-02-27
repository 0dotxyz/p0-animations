import { z } from "zod";
import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  cancelRender,
  continueRender,
  delayRender,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Lottie, LottieAnimationData } from "@remotion/lottie";
import { ensureFontsLoaded } from "../lib/fonts";
import {
  COLORS,
  FONT_FAMILY_SANS,
  GRADIENTS,
  LOTTIE_DIMENSIONS,
} from "../lib/brand";
import { P0Logo } from "../components/P0Logo";

export const statementSchema = z.object({
  headline: z.string(),
  subtitle: z.string(),
});

// Inline Lottie loader for custom positioning (top/bottom with flip)
const LottieLayer: React.FC<{
  readonly theme: "dark" | "light";
  readonly variant: string;
  readonly style?: React.CSSProperties;
  readonly lottieStyle?: React.CSSProperties;
}> = ({ theme, variant, style, lottieStyle }) => {
  const [handle] = useState(() => delayRender(`Loading ${variant} Lottie`));
  const [animationData, setAnimationData] =
    useState<LottieAnimationData | null>(null);

  useEffect(() => {
    const path = staticFile(`assets/lottie/${theme}/${variant}`);
    fetch(path)
      .then((res) => res.json())
      .then((json) => {
        setAnimationData(json as LottieAnimationData);
        continueRender(handle);
      })
      .catch((err) => {
        cancelRender(err);
      });
  }, [handle, theme, variant]);

  if (!animationData) return null;

  return (
    <div style={style}>
      <Lottie animationData={animationData} style={lottieStyle} />
    </div>
  );
};

export const Statement: React.FC<z.infer<typeof statementSchema>> = ({
  headline,
  subtitle,
}) => {
  ensureFontsLoaded();

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Build gradient CSS from shared brand constant
  const gradientCss = GRADIENTS.statement.stops
    .map((s) => `${s.color} ${s.offset}`)
    .join(", ");

  // Waves Lottie native dimensions from shared constant
  const { width: lottieWidth, height: lottieHeight } = LOTTIE_DIMENSIONS.waves;

  // Headline entrance
  const headlineEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 4,
  });

  // Subtitle entrance
  const subtitleEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 14,
  });

  // Logo entrance
  const logoEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 22,
  });

  return (
    <AbsoluteFill>
      {/* Layer 1: Brand gradient background */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, ${gradientCss})`,
        }}
      />

      {/* Layer 2: Top Lottie — waves, white, at top */}
      <LottieLayer
        theme="dark"
        variant="waves.json"
        style={{
          position: "absolute",
          top: -40,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.8,
          filter: "brightness(0) invert(1)",
        }}
        lottieStyle={{
          width: lottieWidth,
          height: lottieHeight,
        }}
      />

      {/* Layer 3: Bottom Lottie — waves (no text), white, flipped vertically */}
      <LottieLayer
        theme="dark"
        variant="waves-notext.json"
        style={{
          position: "absolute",
          bottom: -40,
          left: "50%",
          transform: "translateX(-50%) scaleY(-1)",
          opacity: 0.8,
          filter: "brightness(0) invert(1)",
        }}
        lottieStyle={{
          width: lottieWidth,
          height: lottieHeight,
        }}
      />

      {/* Layer 4: Content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontWeight: 500,
            fontSize: 96,
            color: COLORS.white,
            textAlign: "center",
            margin: 0,
            letterSpacing: "-0.02em",
            opacity: headlineEntrance,
            transform: `translateY(${(1 - headlineEntrance) * 30}px)`,
          }}
        >
          {headline}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontWeight: 400,
            fontSize: 32,
            color: "rgba(255, 255, 255, 0.75)",
            textAlign: "center",
            margin: 0,
            marginTop: 24,
            maxWidth: 900,
            lineHeight: 1.4,
            opacity: subtitleEntrance,
            transform: `translateY(${(1 - subtitleEntrance) * 20}px)`,
          }}
        >
          {subtitle}
        </p>
      </AbsoluteFill>

      {/* Layer 5: Bottom logo — "Project 0" wordmark */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - logoEntrance) * 15}px)`,
          opacity: logoEntrance,
        }}
      >
        <P0Logo width={160} fill="rgba(255, 255, 255, 0.7)" />
      </div>
    </AbsoluteFill>
  );
};
