import { Lottie, LottieAnimationData } from "@remotion/lottie";
import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
} from "remotion";

type NodesVariant = "main" | "detail" | "orb" | "pay-hero" | "pay-footer";

// Native dimensions of each Lottie variant (from p0-app)
const LOTTIE_DIMENSIONS: Record<
  NodesVariant,
  { width: number; height: number }
> = {
  main: { width: 2560, height: 395 },
  detail: { width: 2560, height: 300 },
  orb: { width: 1407, height: 1340 },
  "pay-hero": { width: 2790, height: 1600 },
  "pay-footer": { width: 2560, height: 620 },
};

// Map variant name to the file path within the lottie directory
const LOTTIE_PATH: Record<NodesVariant, string> = {
  main: "main.json",
  detail: "detail.json",
  orb: "orb.json",
  "pay-hero": "pay/hero.json",
  "pay-footer": "pay/footer.json",
};

export const NodesBackground: React.FC<{
  readonly theme: "dark" | "light";
  readonly variant?: NodesVariant;
  readonly opacity?: number;
  readonly color?: "white" | "black" | "original";
}> = ({ theme, variant = "main", opacity = 0.6, color = "original" }) => {
  const [handle] = useState(() =>
    delayRender("Loading nodes Lottie animation"),
  );
  const [animationData, setAnimationData] =
    useState<LottieAnimationData | null>(null);

  useEffect(() => {
    const path = staticFile(`assets/lottie/${theme}/${LOTTIE_PATH[variant]}`);

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

  if (!animationData) {
    return null;
  }

  const dims = LOTTIE_DIMENSIONS[variant];

  // CSS filter to force white or black color on all Lottie elements
  const colorFilter =
    color === "white"
      ? "brightness(0) invert(1)"
      : color === "black"
        ? "brightness(0)"
        : undefined;

  // For orb variant, center in the frame at native size
  if (variant === "orb") {
    return (
      <AbsoluteFill
        style={{
          opacity,
          overflow: "hidden",
          filter: colorFilter,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Lottie
            animationData={animationData}
            style={{
              width: dims.width,
              height: dims.height,
            }}
          />
        </div>
      </AbsoluteFill>
    );
  }

  // For pay-hero, render at native size centered horizontally,
  // and shift down so the visual focal point (rings convergence)
  // aligns with the frame center. The focal point in this Lottie
  // is at roughly 35% of its height.
  if (variant === "pay-hero") {
    const focalPointY = 0.3;
    const topOffset = 1080 / 2 - dims.height * focalPointY;

    return (
      <AbsoluteFill
        style={{
          opacity,
          overflow: "hidden",
          filter: colorFilter,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: topOffset,
            transform: "translateX(-50%)",
          }}
        >
          <Lottie
            animationData={animationData}
            style={{
              width: dims.width,
              height: dims.height,
            }}
          />
        </div>
      </AbsoluteFill>
    );
  }

  // For main/detail variants, render at native dimensions
  // and center vertically within the frame
  return (
    <AbsoluteFill
      style={{
        opacity,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        filter: colorFilter,
      }}
    >
      <Lottie
        animationData={animationData}
        style={{
          width: dims.width,
          height: dims.height,
        }}
      />
    </AbsoluteFill>
  );
};
