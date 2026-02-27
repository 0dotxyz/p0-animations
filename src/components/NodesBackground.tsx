import { Lottie, LottieAnimationData } from "@remotion/lottie";
import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
  useVideoConfig,
} from "remotion";

type NodesVariant = "waves" | "rings";

// Native dimensions of each Lottie variant (from p0-app)
const LOTTIE_DIMENSIONS: Record<
  NodesVariant,
  { width: number; height: number }
> = {
  waves: { width: 2560, height: 300 },
  rings: { width: 2790, height: 1600 },
};

// Map variant name to the file path within the lottie directory
const LOTTIE_PATH: Record<NodesVariant, string> = {
  waves: "waves.json",
  rings: "rings.json",
};

export const NodesBackground: React.FC<{
  readonly theme: "dark" | "light";
  readonly variant?: NodesVariant;
  readonly opacity?: number;
  readonly color?: "white" | "black" | "original";
}> = ({ theme, variant = "waves", opacity = 0.6, color = "original" }) => {
  const { height: frameHeight } = useVideoConfig();
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

  // For rings, render at native size centered horizontally,
  // and shift so the visual focal point (rings convergence at ~40%)
  // aligns with the frame center.
  if (variant === "rings") {
    const focalPointY = 0.4;
    const topOffset = frameHeight / 2 - dims.height * focalPointY;

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

  // For waves, render at native dimensions
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
