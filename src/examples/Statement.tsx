import React from "react";
import { z } from "zod";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Lottie, LottieAnimationData } from "@remotion/lottie";
import { useEffect, useState } from "react";
import {
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
} from "remotion";
import { ensureFontsLoaded } from "../lib/fonts";
import { FONT_FAMILY_SANS } from "../lib/brand";

export const statementSchema = z.object({
  headline: z.string(),
  subtitle: z.string(),
});

// Full "Project 0" wordmark at larger size (177x44 viewBox)
const ProjectZeroWordmark: React.FC<{
  readonly width?: number;
  readonly fill?: string;
}> = ({ width = 177, fill = "white" }) => {
  const scale = width / 177;
  const height = 44 * scale;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 177 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.3172 8.63607C15.3088 7.07564 12.5312 6.25134 9.28476 6.25134H0V35.8506H3.43086V23.5071H9.28476C15.812 23.5071 20.3707 19.9244 20.3707 14.7952C20.3707 12.3167 19.3143 10.1867 17.3172 8.63607ZM3.43086 9.14828H9.07033C11.4033 9.14828 13.346 9.63531 14.6912 10.5562C16.1265 11.54 16.8541 12.9661 16.8541 14.7952C16.8541 18.3835 13.945 20.5261 9.07033 20.5261H3.43086V9.14828Z"
        fill={fill}
      />
      <path
        d="M27.2322 18.4621V14.398H24.0586V35.8522H27.3179V24.7892C27.3179 21.0637 28.5516 18.6244 30.9875 17.537C32.1268 17.0192 33.512 16.8303 35.2232 16.959L35.339 16.9674V13.7738L35.2389 13.7682C31.4778 13.5415 28.5916 15.2447 27.2336 18.4621H27.2322Z"
        fill={fill}
      />
      <path
        d="M46.5959 13.7663C40.4947 13.7663 36.0674 18.5428 36.0674 25.1232C36.0674 31.7036 40.4961 36.48 46.5959 36.48C52.6956 36.48 57.1672 31.7036 57.1672 25.1232C57.1672 18.5428 52.7214 13.7663 46.5959 13.7663ZM46.5959 33.751C44.513 33.751 42.7304 32.9561 41.441 31.4531C40.1144 29.9066 39.4125 27.7178 39.4125 25.1232C39.4125 22.5285 40.1144 20.3397 41.441 18.7933C42.7304 17.2902 44.513 16.4953 46.5959 16.4953C48.6787 16.4953 50.4942 17.2902 51.7893 18.7933C53.1202 20.3383 53.8221 22.5271 53.8221 25.1232C53.8221 27.7192 53.1188 29.908 51.7893 31.4531C50.4942 32.9561 48.6987 33.751 46.5959 33.751Z"
        fill={fill}
      />
      <path
        d="M61.1558 37.1727C61.1558 39.8877 60.2895 41.0983 58.3467 41.0983C58.0151 41.0983 57.6834 41.0577 57.3761 41.0157L57.2532 40.9989V43.4746L57.3418 43.49C57.7978 43.5712 58.3982 43.6174 58.99 43.6174C62.641 43.6174 64.4151 41.5503 64.4151 37.2987V14.396H61.1558V37.1727Z"
        fill={fill}
      />
      <path
        d="M89.2443 25.7949C89.2014 22.1324 88.2236 19.0843 86.4153 16.9795C84.6084 14.8775 82.0209 13.7663 78.9303 13.7663C76.1785 13.7663 73.6068 14.8886 71.6898 16.9277C69.7085 19.0353 68.6163 21.9603 68.6163 25.1651C68.6163 32.0394 72.7991 36.48 79.2734 36.48C83.9908 36.48 87.5561 34.224 88.8098 30.4454L88.8555 30.3082H85.336L85.3074 30.3712C84.3325 32.5194 82.1639 33.7524 79.3592 33.7524C77.2406 33.7524 75.4194 33.0023 74.0942 31.5818C72.7819 30.1767 72.0472 28.2132 71.9657 25.9012H89.2472V25.7949H89.2443ZM72.0171 23.1708C72.4746 19.2593 75.3208 16.5372 78.9746 16.5372C82.8544 16.5372 85.4632 19.0143 85.9736 23.1708H72.0171Z"
        fill={fill}
      />
      <path
        d="M108.419 29.4984C107.408 32.3323 105.436 33.7108 102.388 33.7108C97.6333 33.7108 95.5047 29.42 95.5047 25.1669C95.5047 19.951 98.2909 16.5811 102.602 16.5811C105.511 16.5811 107.454 17.9973 108.376 20.7907L108.4 20.8635H111.741L111.716 20.7375C111.305 18.7713 110.3 17.0877 108.811 15.8701C107.161 14.5224 104.957 13.8101 102.432 13.8101C96.3339 13.8101 92.0753 18.4802 92.0753 25.1669C92.0753 28.6251 93.1232 31.5304 95.1073 33.5681C96.9357 35.4476 99.4917 36.4818 102.304 36.4818C108.182 36.4818 111.042 32.9033 111.757 29.5543L111.784 29.4284H108.446L108.42 29.4984H108.419Z"
        fill={fill}
      />
      <path
        d="M125.436 33.1241C124.729 33.2878 124.056 33.3732 123.488 33.3732C121.368 33.3732 120.422 32.2536 120.422 29.7415V17.0411H125.139V14.3961H120.422V8.14035H117.205V14.3961H113.174V17.0411H117.205V30.3713C117.205 33.9862 119.245 36.0602 122.802 36.0602C123.724 36.0602 124.782 35.9091 125.495 35.6767L125.568 35.6529V33.0933L125.436 33.1241Z"
        fill={fill}
      />
      <path d="M64.4151 8.14032H61.1558V11.3312H64.4151V8.14032Z" fill={fill} />
      <path
        d="M173.603 7.48028C171.31 5.2355 168.168 4.15649 164.7 4.15649C163.817 4.15649 162.91 4.22646 161.994 4.36641C161.078 4.50636 160.271 3.81361 160.271 2.91654V0H157.275V33.8845C157.275 35.3637 156.149 36.6093 154.65 36.7954C154.037 36.871 153.434 36.9102 152.846 36.9102C150.899 36.9102 148.143 36.4819 146.062 34.4457C145.017 33.4226 144.286 32.1337 143.889 30.6153C143.689 29.8483 143.574 29.0226 143.55 28.162C143.526 27.2817 143.593 26.358 143.755 25.4176C143.919 24.4561 144.179 23.4695 144.529 22.487C144.888 21.4808 145.344 20.469 145.885 19.4837C147.022 17.4069 148.508 15.463 150.303 13.7052C151.4 12.6318 152.585 11.6578 153.824 10.8125C153.976 10.7089 154.129 10.6067 154.283 10.5074V7.06883C152.152 8.2472 150.083 9.77405 148.185 11.6312C139.994 19.6503 138.097 30.793 143.946 36.5197C146.239 38.7645 149.381 39.8435 152.849 39.8435C153.733 39.8435 154.639 39.7735 155.555 39.6336C156.462 39.4964 157.278 40.1864 157.278 41.0835V44H160.274V10.1155C160.274 8.63626 161.401 7.38931 162.9 7.20458C163.513 7.12901 164.117 7.08982 164.704 7.08982C166.65 7.08982 169.407 7.51807 171.489 9.55433C172.534 10.5774 173.264 11.8663 173.662 13.3847C173.862 14.1517 173.976 14.9774 174 15.838C174.025 16.7183 173.958 17.642 173.796 18.5824C173.632 19.5439 173.371 20.5305 173.021 21.513C172.662 22.5192 172.206 23.531 171.666 24.5163C170.528 26.5931 169.043 28.537 167.247 30.2948C166.151 31.3682 164.966 32.3422 163.726 33.1875C163.575 33.2911 163.422 33.3933 163.268 33.4926V36.9312C165.399 35.7528 167.468 34.226 169.366 32.3688C177.557 24.3497 179.454 13.207 173.604 7.48028H173.603Z"
        fill={fill}
      />
    </svg>
  );
};

// Inline Lottie loader for positioning control
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

  // Detail Lottie native dimensions
  const lottieWidth = 2560;
  const lottieHeight = 300;

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
      {/* Layer 1: Exact gradient background from design */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, #0A0A0A 0%, #1E468C 25%, #AA87FA 60%, #BED7F5 90%)",
        }}
      />

      {/* Layer 2: Top Lottie — detail variant, white, at top */}
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

      {/* Layer 3: Bottom Lottie — detail variant, white, flipped vertically */}
      <LottieLayer
        theme="dark"
        variant="waves.json"
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
            color: "#FFFFFF",
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
        <ProjectZeroWordmark width={160} fill="rgba(255, 255, 255, 0.7)" />
      </div>
    </AbsoluteFill>
  );
};
