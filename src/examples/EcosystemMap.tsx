import { z } from "zod";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ensureFontsLoaded } from "../lib/fonts";
import { COLORS, FONT_FAMILY_MONO } from "../lib/brand";
import { GradientBackground } from "../components/GradientBackground";
import { P0LogoMark } from "../components/P0Logo";

const protocolSchema = z.object({
  name: z.string(),
  x: z.number(),
  y: z.number(),
});

export const ecosystemMapSchema = z.object({
  protocols: z.array(protocolSchema),
  theme: z.enum(["dark", "light"]),
});

// Deterministic icon shape for each protocol node
const NodeIcon: React.FC<{
  readonly shape: number;
  readonly color: string;
  readonly size: number;
}> = ({ shape, color, size }) => {
  const half = size / 2;
  // Cycle through 3 simple geometric shapes
  const shapeType = shape % 3;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {shapeType === 0 && (
        <circle
          cx={half}
          cy={half}
          r={half * 0.6}
          stroke={color}
          strokeWidth={1.5}
          fill="none"
        />
      )}
      {shapeType === 1 && (
        <rect
          x={half * 0.4}
          y={half * 0.4}
          width={size * 0.6}
          height={size * 0.6}
          stroke={color}
          strokeWidth={1.5}
          fill="none"
        />
      )}
      {shapeType === 2 && (
        <polygon
          points={`${half},${half * 0.3} ${half + half * 0.6},${half + half * 0.5} ${half - half * 0.6},${half + half * 0.5}`}
          stroke={color}
          strokeWidth={1.5}
          fill="none"
        />
      )}
      {/* Center dot */}
      <circle cx={half} cy={half} r={3} fill={color} />
    </svg>
  );
};

export const EcosystemMap: React.FC<z.infer<typeof ecosystemMapSchema>> = ({
  protocols,
  theme,
}) => {
  ensureFontsLoaded();

  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const lineColor =
    theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)";
  const textColor = theme === "dark" ? "#FFFFFF" : "#0A0A0A";
  const centerX = width / 2;
  const centerY = height / 2;

  // Center orb entrance
  const orbEntrance = spring({
    frame,
    fps,
    config: { damping: 100, mass: 0.8 },
  });

  // Orb subtle pulse
  const orbPulse = interpolate(frame, [0, 120], [1, 1.04], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Layer 1: Gradient background */}
      <GradientBackground theme={theme} />

      {/* Layer 2: SVG lines + nodes */}
      <AbsoluteFill>
        <svg width={width} height={height} style={{ position: "absolute" }}>
          {/* Connecting lines from center to each protocol */}
          {protocols.map((protocol, i) => {
            const lineProgress = spring({
              frame,
              fps,
              config: { damping: 200 },
              delay: 15 + i * 4,
            });

            const targetX = (protocol.x / 100) * width;
            const targetY = (protocol.y / 100) * height;

            // Animated endpoint
            const currentX = interpolate(
              lineProgress,
              [0, 1],
              [centerX, targetX],
            );
            const currentY = interpolate(
              lineProgress,
              [0, 1],
              [centerY, targetY],
            );

            return (
              <line
                key={`line-${protocol.name}`}
                x1={centerX}
                y1={centerY}
                x2={currentX}
                y2={currentY}
                stroke={lineColor}
                strokeWidth={1}
                strokeDasharray="4 6"
              />
            );
          })}
        </svg>

        {/* Protocol node labels */}
        {protocols.map((protocol, i) => {
          const nodeEntrance = spring({
            frame,
            fps,
            config: { damping: 100 },
            delay: 20 + i * 4,
          });

          const posX = (protocol.x / 100) * width;
          const posY = (protocol.y / 100) * height;

          return (
            <div
              key={protocol.name}
              style={{
                position: "absolute",
                left: posX,
                top: posY,
                transform: `translate(-50%, -50%) scale(${nodeEntrance})`,
                opacity: nodeEntrance,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <NodeIcon shape={i} color={textColor} size={28} />
              <span
                style={{
                  fontFamily: FONT_FAMILY_MONO,
                  fontSize: 14,
                  fontWeight: 400,
                  color: textColor,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {protocol.name}
              </span>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Layer 3: Center orb */}
      <div
        style={{
          position: "absolute",
          left: centerX,
          top: centerY,
          transform: `translate(-50%, -50%) scale(${orbEntrance * orbPulse})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Orb glow ring */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: `2px solid ${theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.1)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              theme === "dark" ? "rgba(255,255,255,0.9)" : COLORS.white,
          }}
        >
          <P0LogoMark size={50} fill={COLORS.nearBlack} />
        </div>
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 14,
            fontWeight: 400,
            color: textColor,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          PROJECT 0
        </span>
      </div>
    </AbsoluteFill>
  );
};
