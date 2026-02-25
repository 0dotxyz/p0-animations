import { AbsoluteFill } from "remotion";
import { GRADIENTS } from "../lib/brand";

export const GradientBackground: React.FC<{
  readonly theme: "dark" | "light";
}> = ({ theme }) => {
  const gradient = GRADIENTS[theme];
  const cssGradient = gradient.stops
    .map((s) => `${s.color} ${s.offset}`)
    .join(", ");

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(to bottom, ${cssGradient})`,
      }}
    />
  );
};
