import { Lottie, LottieAnimationData } from "@remotion/lottie";
import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
} from "remotion";

type NodesVariant = "main" | "detail" | "orb";

export const NodesBackground: React.FC<{
  readonly theme: "dark" | "light";
  readonly variant?: NodesVariant;
  readonly opacity?: number;
}> = ({ theme, variant = "main", opacity = 0.6 }) => {
  const [handle] = useState(() =>
    delayRender("Loading nodes Lottie animation"),
  );
  const [animationData, setAnimationData] =
    useState<LottieAnimationData | null>(null);

  useEffect(() => {
    const path = staticFile(`assets/lottie/${theme}/${variant}.json`);

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

  return (
    <AbsoluteFill style={{ opacity }}>
      <Lottie
        animationData={animationData}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </AbsoluteFill>
  );
};
