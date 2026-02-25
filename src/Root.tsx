import "./index.css";
import { Composition, Folder } from "remotion";
import { COMP_FPS, COMP_HEIGHT, COMP_WIDTH } from "./lib/brand";
import {
  NewAssetPartnership,
  newAssetPartnershipSchema,
} from "./examples/NewAssetPartnership";
import { NewAsset, newAssetSchema } from "./examples/NewAsset";
import { EcosystemMap, ecosystemMapSchema } from "./examples/EcosystemMap";
import {
  BrandStatement,
  brandStatementSchema,
} from "./examples/BrandStatement";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Examples">
      {/* Example 1: New asset partnership — "New Drift LSTs" style */}
      <Composition
        id="NewAssetPartnership"
        component={NewAssetPartnership}
        durationInFrames={120}
        fps={COMP_FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
        schema={newAssetPartnershipSchema}
        defaultProps={{
          headline: "New Drift LSTs",
          partnerLogoSrc:
            "https://xcdlwgvabmruuularsvn.supabase.co/storage/v1/object/public/p0-tokens/J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn.png",
          tokenIcons: [
            "https://xcdlwgvabmruuularsvn.supabase.co/storage/v1/object/public/p0-tokens/So11111111111111111111111111111111111111112.png",
            "https://xcdlwgvabmruuularsvn.supabase.co/storage/v1/object/public/p0-tokens/J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn.png",
            "https://xcdlwgvabmruuularsvn.supabase.co/storage/v1/object/public/p0-tokens/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So.png",
          ],
          theme: "dark" as const,
        }}
      />

      {/* Example 2: New asset listing — "STKESOL" style */}
      <Composition
        id="NewAsset"
        component={NewAsset}
        durationInFrames={90}
        fps={COMP_FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
        schema={newAssetSchema}
        defaultProps={{
          assetName: "STKESOL",
          tokenIconSrc:
            "https://xcdlwgvabmruuularsvn.supabase.co/storage/v1/object/public/p0-tokens/So11111111111111111111111111111111111111112.png",
          badgeText: "NEW ASSET LIVE",
          theme: "light" as const,
        }}
      />

      {/* Example 3: Ecosystem map — protocol network graph */}
      <Composition
        id="EcosystemMap"
        component={EcosystemMap}
        durationInFrames={150}
        fps={COMP_FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
        schema={ecosystemMapSchema}
        defaultProps={{
          protocols: [
            { name: "Hyperliquid", x: 8, y: 8 },
            { name: "Kamino", x: 18, y: 30 },
            { name: "Save", x: 28, y: 48 },
            { name: "Exponent", x: 5, y: 65 },
            { name: "Loopscale", x: 20, y: 78 },
            { name: "Drift", x: 85, y: 15 },
            { name: "Asgard", x: 90, y: 35 },
            { name: "Aave", x: 82, y: 52 },
            { name: "Jupiter", x: 82, y: 78 },
            { name: "Lulo", x: 95, y: 65 },
          ],
          theme: "dark" as const,
        }}
      />

      {/* Example 4: Brand statement — "Your DeFi Native Prime Broker" style */}
      <Composition
        id="BrandStatement"
        component={BrandStatement}
        durationInFrames={120}
        fps={COMP_FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
        schema={brandStatementSchema}
        defaultProps={{
          headline: "Your DeFi Native Prime Broker",
          theme: "light" as const,
        }}
      />
    </Folder>
  );
};
