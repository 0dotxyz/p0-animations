# p0-animations

Animated social media templates for [Project 0](https://p0.wtf), built with [Remotion](https://remotion.dev), React, TypeScript, and TailwindCSS v4.

Designed to make it easy to vibe code new marketing animations — duplicate an existing template, describe what you want to an LLM, and render an MP4.

**Output**: 1600x900 (16:9), 30fps, 8-9 second looping MP4s.

## Quick Start

```bash
npm install
npm run dev        # Open Remotion Studio to preview compositions
```

## Rendering

```bash
npx remotion render NewAssetIntegration out/integration.mp4
npx remotion render NewAsset out/new-asset.mp4
npx remotion render Statement out/statement.mp4
```

Or use the shortcuts:

```bash
npm run render:integration
npm run render:new-asset
npm run render:statement
```

## Example Templates

| Template                | Description                                                                     |
| ----------------------- | ------------------------------------------------------------------------------- |
| **NewAssetIntegration** | Partner integration announcement — P0 + partner logos, headline, token icon row |
| **NewAsset**            | Single asset listing — token icon, asset name, badge pill                       |
| **Statement**           | General announcement — headline, subtitle, P0 wordmark                          |

All templates are parametrized with [Zod](https://zod.dev) schemas, so props can be changed directly in Remotion Studio or passed via CLI.

## Creating a New Animation

1. Copy an existing template:

   ```bash
   cp src/examples/NewAsset.tsx src/examples/MyVideo.tsx
   ```

2. Rename the component and schema exports in the new file

3. Register the composition in `src/Root.tsx`:

   ```tsx
   <Composition
     id="MyVideo"
     component={MyVideo}
     durationInFrames={270}
     fps={COMP_FPS}
     width={COMP_WIDTH}
     height={COMP_HEIGHT}
     schema={myVideoSchema}
     defaultProps={{ ... }}
   />
   ```

4. Preview with `npm run dev`, render with `npx remotion render MyVideo out/my-video.mp4`

### Using an LLM Agent

This repo includes detailed agent instructions in `AGENTS.md` (also mirrored to `CLAUDE.md` and `.cursorrules`). These files document every shared component, brand constant, animation pattern, and asset convention so that LLM coding agents (Claude Code, Cursor, etc.) can create and modify compositions accurately.

To create a new animation with an agent, open the repo and describe what you want:

> "Create a new composition called WelcomeJito that announces the Jito integration. Use the dark theme with the rings Lottie background. Show the P0 logo and the Jito logo side by side, with a headline that says 'Welcome Jito' and a row of token icons for SOL and jitoSOL."

The agent will duplicate an existing template, wire up the correct shared components, resolve token icon URLs from mint addresses, and register the composition in Root.tsx.

## Token Icons

Token icons are loaded from a remote Supabase bucket using the Solana mint address:

```
https://xcdlwgvabmruuularsvn.supabase.co/storage/v1/object/public/p0-tokens/{MINT_ADDRESS}.png
```

No need to download or store token icons locally.

## Project Structure

```
src/
  Root.tsx                      — Composition registry
  lib/brand.ts                  — Colors, gradients, fonts, dimensions
  lib/fonts.ts                  — Font loading (ABCOracle, AeonikMono)
  components/                   — Shared layers (GradientBackground, NodesBackground, P0Logo)
  examples/                     — Example compositions (templates to duplicate)
public/assets/
  fonts/                        — Brand font files (.woff)
  lottie/dark/                  — Dark theme Lottie animations
  lottie/light/                 — Light theme Lottie animations
  logos/                        — Partner/brand logos (SVG, PNG)
```

## Tech Stack

- **Remotion** — Programmatic video in React
- **React 19** + **TypeScript** (strict mode)
- **TailwindCSS v4** — Utility-first styling
- **Zod** — Schema validation for composition props
- **@remotion/lottie** — Lottie animation support

## License

See [LICENSE](LICENSE).
