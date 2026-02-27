# AGENTS.md — p0-animations

P0 animated social media templates built with Remotion, React, TypeScript, Zod, and TailwindCSS v4. Designed for the growth team to duplicate and customize via LLM-assisted vibe coding.

**Output format**: 1600x900 (16:9), 30fps, 3-4 second loops rendered to MP4.

## Build / Lint / Render Commands

```bash
npm run dev          # Start Remotion Studio (preview server)
npm run build        # Bundle for production (remotion bundle)
npm run lint         # ESLint + TypeScript type check (eslint src && tsc)
npx tsc --noEmit     # Type checking only
npx remotion render <CompositionId>                       # Render a specific composition
npx remotion render Statement out/statement.mp4           # Render Statement example
npx remotion upgrade                                      # Upgrade Remotion packages
```

### Render shortcuts

```bash
npm run render:integration   # Render NewAssetIntegration example
npm run render:new-asset     # Render NewAsset example
npm run render:statement     # Render Statement example
```

There is **no test framework** configured.

## Project Structure

```
src/
  index.ts                      — Entry point: registerRoot(RemotionRoot)
  index.css                     — Tailwind import (@import "tailwindcss")
  Root.tsx                      — Composition registry (all <Composition> definitions)
  lib/
    brand.ts                    — P0 color palette, font families, composition defaults
    fonts.ts                    — Font loading utility (ABCOracle, AeonikMono)
  components/
    GradientBackground.tsx      — Dark/light gradient background layer
    NodesBackground.tsx         — Lottie animation background (waves, rings)
    P0Logo.tsx                  — P0 logomark and "project 0" wordmark SVG components
  examples/
    NewAssetIntegration.tsx     — Integration announcement (dark bg, P0 + partner logos, token row)
    NewAsset.tsx                — New asset listing (light bg, single token icon, badge pill)
    Statement.tsx               — Statement/announcement (dark gradient, headline + body + wordmark)
public/
  assets/
    fonts/                      — ABCOracle and AeonikMono .woff files
    lottie/dark/                — Dark theme Lottie JSON (waves.json, rings.json)
    lottie/light/               — Light theme Lottie JSON (waves.json, rings.json)
    logos/                      — Partner/brand logos (SVG, PNG)
    icons/                      — Token icons (PNG, SVG) — mostly loaded from remote URLs
remotion.config.ts              — Remotion CLI config (JPEG output, overwrite, Tailwind webpack)
```

## Tech Stack

- **Remotion** 4.0.428 — Programmatic video creation in React
- **@remotion/lottie** 4.0.428 — Lottie animation support synced to frame clock
- **React** 19.2.3 with `react-jsx` transform
- **TypeScript** 5.9.3 — Strict mode, `noUnusedLocals`, target ES2018
- **Zod** 4.3.6 — Schema validation for parametrized rendering
- **TailwindCSS** 4.0 — Utility-first CSS via `@remotion/tailwind-v4`

## Creating New Compositions (Growth Team Workflow)

To create a new animation, duplicate an existing example and customize it:

1. **Copy** an example file:

   ```
   cp src/examples/NewAsset.tsx src/examples/MyNewVideo.tsx
   ```

2. **Rename** the component and schema exports in the new file

3. **Register** the new composition in `src/Root.tsx`:

   ```tsx
   <Composition
     id="MyNewVideo"
     component={MyNewVideo}
     durationInFrames={120}
     fps={COMP_FPS}
     width={COMP_WIDTH}
     height={COMP_HEIGHT}
     schema={myNewVideoSchema}
     defaultProps={{ ... }}
   />
   ```

4. **Preview** with `npm run dev` — opens Remotion Studio in browser

5. **Render** with `npx remotion render MyNewVideo out/my-new-video.mp4`

## Token Icons and Assets

### Token icons (remote — preferred)

Token icons are loaded from Supabase. You only need the **Solana mint address** to construct the URL:

```
https://xcdlwgvabmruuularsvn.supabase.co/storage/v1/object/public/p0-tokens/{MINT_ADDRESS}.png
```

Examples of common mint addresses:

| Token   | Mint Address                                   |
| ------- | ---------------------------------------------- |
| SOL     | `So11111111111111111111111111111111111111112`  |
| jitoSOL | `J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn` |
| mSOL    | `mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So`  |

Use in components: `<Img src="https://xcdlwgvabmruuularsvn.supabase.co/storage/v1/object/public/p0-tokens/So11111111111111111111111111111111111111112.png" />`

### Partner logos (local)

Place SVG or PNG files in `public/assets/logos/` and reference with `staticFile()`:

```tsx
import { staticFile } from "remotion";
<Img src={staticFile("assets/logos/drift.svg")} />;
```

### Resolving local vs remote paths

The `NewAssetIntegration` example includes a `resolveSrc()` helper that detects whether a path is a remote URL or local file:

```tsx
const resolveSrc = (src: string) =>
  src.startsWith("http") ? src : staticFile(src);
```

Use this pattern when a prop could be either a remote URL or a local asset path.

## Existing Example Compositions

### NewAssetIntegration

**Use for**: Announcing a new partner integration with multiple token assets.

| Prop             | Type                | Description                                                 |
| ---------------- | ------------------- | ----------------------------------------------------------- |
| `headline`       | `string`            | Main headline (e.g., "New Drift LSTs")                      |
| `partnerLogoSrc` | `string`            | Partner logo path — local (`assets/logos/drift.svg`) or URL |
| `tokenIcons`     | `string[]`          | Array of token icon URLs (use Supabase mint address URLs)   |
| `theme`          | `"dark" \| "light"` | Color theme                                                 |

**Layers**: Gradient background, rings Lottie (white, 0.8 opacity), P0 + partner logos, headline, token icon row.

### NewAsset

**Use for**: Announcing a single new asset listing.

| Prop           | Type                | Description                                    |
| -------------- | ------------------- | ---------------------------------------------- |
| `assetName`    | `string`            | Asset ticker (e.g., "STKESOL")                 |
| `tokenIconSrc` | `string`            | Token icon URL (use Supabase mint address URL) |
| `badgeText`    | `string`            | Badge pill text (e.g., "NEW ASSET LIVE")       |
| `theme`        | `"dark" \| "light"` | Color theme                                    |

**Layers**: Gradient background, rings Lottie (faded, 0.15 opacity), token icon, asset name, badge pill with + icon.

### Statement

**Use for**: General announcements, partner welcomes, brand statements.

| Prop       | Type     | Description                           |
| ---------- | -------- | ------------------------------------- |
| `headline` | `string` | Main headline (e.g., "Welcome Drift") |
| `subtitle` | `string` | Body text below headline              |

**Layers**: Dark gradient background (#0A0A0A → #1E468C → #AA87FA → #BED7F5), waves Lottie at top + flipped at bottom (white, 0.8 opacity), centered headline + subtitle, "Project 0" wordmark at bottom.

## Available Shared Components

| Component            | Props                                                      | Description                         |
| -------------------- | ---------------------------------------------------------- | ----------------------------------- |
| `GradientBackground` | `theme: "dark" \| "light"`                                 | Full-frame gradient background      |
| `NodesBackground`    | `theme`, `variant: "waves" \| "rings"`, `opacity`, `color` | Lottie animation background layer   |
| `P0LogoMark`         | `size`, `fill`, `gradient`                                 | P0 twisted-S logomark               |
| `P0Logo`             | `width`, `fill`                                            | Full "project 0" wordmark (compact) |

### NodesBackground variants

| Variant | Shape              | Native Size | Best For                       |
| ------- | ------------------ | ----------- | ------------------------------ |
| `waves` | Flowing wave lines | 2560x300    | Top/bottom decorative bands    |
| `rings` | Concentric rings   | 2790x1600   | Full-frame centered background |

The `color` prop applies a CSS filter: `"white"` = `brightness(0) invert(1)`, `"black"` = `brightness(0)`, `"original"` = native Lottie colors.

### Brand constants (`src/lib/brand.ts`)

| Constant            | Value                   | Description                 |
| ------------------- | ----------------------- | --------------------------- |
| `COLORS.purple`     | `#AA87FA`               | Primary brand purple        |
| `COLORS.darkBlue`   | `#1E468C`               | Dark blue                   |
| `COLORS.mediumBlue` | `#345AAD`               | Medium blue                 |
| `COLORS.lightBlue`  | `#BED7F5`               | Light pastel blue           |
| `COLORS.nearBlack`  | `#0A0A0A`               | Near black                  |
| `COLORS.darkBg`     | `#171721`               | Dark background             |
| `FONT_FAMILY_SANS`  | `ABCOracle, sans-serif` | Brand sans-serif            |
| `FONT_FAMILY_MONO`  | `AeonikMono, monospace` | Brand monospace             |
| `COMP_WIDTH`        | `1600`                  | Standard composition width  |
| `COMP_HEIGHT`       | `900`                   | Standard composition height |
| `COMP_FPS`          | `30`                    | Standard frame rate         |

### Brand gradient (dark theme — used in Statement)

```
#0A0A0A at 0% → #1E468C at 25% → #AA87FA at 60% → #BED7F5 at 90%
```

## Code Style Guidelines

### Formatting (Prettier)

- 2-space indentation, no tabs
- Bracket spacing enabled
- Run `npx prettier --write .` to format

### TypeScript

- Strict mode is on (`strict: true` in tsconfig)
- `noUnusedLocals: true` — remove unused variables
- Use `type` declarations over `interface` for component props

### Imports

- Named imports from `remotion`: `AbsoluteFill`, `interpolate`, `spring`, `useCurrentFrame`, `useVideoConfig`, `Sequence`, `Composition`
- Named imports from `zod`: `z`
- Import order: external packages first, then local modules (relative paths)

### Naming Conventions

- **Components**: PascalCase (`NewAsset`, `NodesBackground`)
- **Files**: PascalCase for components, camelCase for utilities (`brand.ts`, `fonts.ts`)
- **Variables/functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE (`COMP_FPS`, `FONT_FAMILY_SANS`)
- **Zod schemas**: camelCase (`newAssetSchema`, `statementSchema`)
- **Composition IDs**: PascalCase strings (`"NewAsset"`, `"Statement"`)

### Exports

- Use **named exports** only — no default exports
- Export Zod schemas alongside their components for use in Root.tsx

### Component Patterns

- Type components as `React.FC<z.infer<typeof schema>>`
- Use `readonly` modifier on component prop type members
- Destructure props in function signature
- Call `ensureFontsLoaded()` at the top of every composition component

### Styling

- Use TailwindCSS utility classes or inline `React.CSSProperties`
- **NEVER** use CSS transitions, CSS animations, or Tailwind `transition-*`/`animate-*` classes

### Animation Rules (Critical)

- **ALL animations MUST be driven by `useCurrentFrame()`**
- Use `interpolate()` for linear mappings between frame ranges and output values
- Use `spring()` for natural motion (returns 0-1 progression)
- Write timing in seconds: multiply by `fps` from `useVideoConfig()`
- Common spring configs: smooth `{ damping: 200 }`, snappy `{ damping: 20, stiffness: 200 }`, bouncy `{ damping: 8 }`
- Use `<Sequence from={frame}>` to delay child appearance
- Use `<AbsoluteFill>` for full-size absolutely positioned layers
- **No `useState` for animation state** — derive everything from the current frame
- Stagger multiple elements by incrementing the `delay` prop on each `spring()` call

### Assets

- Use `<Img>` from remotion for images (not `<img>`) — handles `delayRender` automatically
- **Remote URLs** work directly: `<Img src="https://..." />` (preferred for token icons)
- **Token icon URL pattern**: `https://xcdlwgvabmruuularsvn.supabase.co/storage/v1/object/public/p0-tokens/{mint_address}.png`
- **Local files**: Place in `public/assets/` and reference with `staticFile("assets/...")`
- Lottie files loaded via `@remotion/lottie` with `delayRender`/`continueRender` pattern

## Remotion Best Practices (Reference)

Detailed rules in `.agents/skills/remotion-best-practices/rules/`:

| Rule File            | Topic                                      |
| -------------------- | ------------------------------------------ |
| `animations.md`      | Frame-driven animation fundamentals        |
| `timing.md`          | `interpolate()`, `spring()`, easing curves |
| `sequencing.md`      | `<Sequence>`, `<Series>`, timing patterns  |
| `transitions.md`     | `<TransitionSeries>`, fade/slide/wipe      |
| `compositions.md`    | Composition definitions, stills, folders   |
| `parameters.md`      | Zod schema parametrization                 |
| `lottie.md`          | Lottie animation embedding                 |
| `tailwind.md`        | TailwindCSS usage rules                    |
| `assets.md`          | Importing images/videos/audio/fonts        |
| `fonts.md`           | Google Fonts and local fonts               |
| `text-animations.md` | Typewriter, word highlight patterns        |

## Key Pitfalls

1. **No CSS animations** — Always use `useCurrentFrame()` + `interpolate()`/`spring()`
2. **No Tailwind animate/transition classes** — They break Remotion rendering
3. **No default exports** — Project uses named exports exclusively
4. **SVG ID uniqueness** — Use `random()` from remotion for unique IDs in SVGs
5. **Compositions must be in Root.tsx** — The entry point expects `RemotionRoot` to contain all `<Composition>` definitions
6. **Always call `ensureFontsLoaded()`** — Required at top of every composition to load brand fonts
7. **Use `<Img>` not `<img>`** — Remotion's `<Img>` component handles `delayRender` for loading
8. **Token icons only need a mint address** — Construct the URL with the Supabase pattern above; do not download or store token icons locally
