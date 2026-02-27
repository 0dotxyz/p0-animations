import "./index.css";
import { Composition, Folder } from "remotion";
import { COMP_FPS, COMP_HEIGHT, COMP_WIDTH } from "./lib/brand";
import {
  NewAssetIntegration,
  newAssetIntegrationSchema,
} from "./examples/NewAssetIntegration";
import { NewAsset, newAssetSchema } from "./examples/NewAsset";
import { Statement, statementSchema } from "./examples/Statement";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Examples">
      {/* Example 1: New asset integration — "New Drift LSTs" style */}
      <Composition
        id="NewAssetIntegration"
        component={NewAssetIntegration}
        durationInFrames={270}
        fps={COMP_FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
        schema={newAssetIntegrationSchema}
        defaultProps={{
          headline: "New Drift LSTs",
          partnerLogoSrc: "assets/logos/drift.svg",
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
        durationInFrames={240}
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

      {/* Example 3: Statement — headline + body over dark gradient */}
      <Composition
        id="Statement"
        component={Statement}
        durationInFrames={270}
        fps={COMP_FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
        schema={statementSchema}
        defaultProps={{
          headline: "Heading goes here",
          subtitle:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.",
        }}
      />
    </Folder>
  );
};
