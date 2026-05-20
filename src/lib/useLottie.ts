import { LottieAnimationData } from "@remotion/lottie";
import { useEffect, useState } from "react";
import { cancelRender, continueRender, delayRender, staticFile } from "remotion";

/** Load a Lottie JSON from public/ with delayRender until ready or cancel on error. */
export const useLottie = (
  relativePath: string,
): LottieAnimationData | null => {
  const [handle] = useState(() =>
    delayRender(`Loading Lottie animation: ${relativePath}`),
  );
  const [animationData, setAnimationData] =
    useState<LottieAnimationData | null>(null);

  useEffect(() => {
    const path = staticFile(relativePath);

    fetch(path)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to fetch Lottie (${res.status} ${res.statusText}): ${path}`,
          );
        }
        return res.json();
      })
      .then((json) => {
        setAnimationData(json as LottieAnimationData);
        continueRender(handle);
      })
      .catch((err) => {
        cancelRender(err);
      });
  }, [handle, relativePath]);

  return animationData;
};
