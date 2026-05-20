import { Lottie } from "@remotion/lottie";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { LOTTIE_DIMENSIONS } from "../lib/brand";
import { useLottie } from "../lib/useLottie";

type NodesVariant = "waves" | "rings";

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
  const animationData = useLottie(
    `assets/lottie/${theme}/${LOTTIE_PATH[variant]}`,
  );

  if (!animationData) {
    return null;
  }

  const dims = LOTTIE_DIMENSIONS[variant];

  const colorFilter =
    color === "white"
      ? "brightness(0) invert(1)"
      : color === "black"
        ? "brightness(0)"
        : undefined;

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
