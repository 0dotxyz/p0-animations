# AGENTS.md — p0-animations

P0 animated social media templates built with Remotion, React, TypeScript, Zod, and TailwindCSS v4. Designed for the growth team to duplicate and customize via LLM-assisted vibe coding.

## Build / Lint / Render Commands

```bash
npm run dev          # Start Remotion Studio (preview server)
npm run build        # Bundle for production (remotion bundle)
npm run lint         # ESLint + TypeScript type check (eslint src && tsc)
npx tsc --noEmit     # Type checking only
npx remotion render <CompositionId>                   # Render a specific composition
npx remotion render Partnership out/partnership.mp4   # Render Partnership example
npx remotion upgrade                                  # Upgrade Remotion packages
```

### Render shortcuts

```bash
npm run render:partnership   # Render Partnership example
npm run render:new-asset     # Render NewAsset example
npm run render:ecosystem     # Render EcosystemMap example
npm run render:brand         # Render BrandStatement example
```

There is **no test framework** configured.

## Project Structure

```
src/
  index.ts                  — Entry point: registerRoot(RemotionRoot)
  index.css                 — Tailwind import (@import "tailwindcss")
  Root.tsx                  — Composition registry (all <Composition> definitions)
  lib/
    brand.ts                — P0 color palette, font families, composition defaults
    fonts.ts                — Font loading utility (ABCOracle, AeonikMono)
  components/
    GradientBackground.tsx  — Dark/light gradient background layer
    NodesBackground.tsx     — Lottie node/line animation background
    P0Logo.tsx              — P0 logomark and full wordmark SVG components
  examples/
    Partnership.tsx         — Partnership announcement template (dark bg, multi-logo)
    NewAsset.tsx            — New asset listing template (light bg, single token)
    EcosystemMap.tsx        — Protocol network graph template (dark bg, SVG lines)
    BrandStatement.tsx      — Brand statement template (light bg, gradient text)
public/
  assets/
    fonts/                  — ABCOracle and AeonikMono .woff files
    lottie/dark/            — Dark theme Lottie JSON animations (main, detail, orb)
    lottie/light/           — Light theme Lottie JSON animations
    logos/                  — Partner/brand logos (SVG, PNG)
    icons/                  — Token icons (PNG, SVG)
remotion.config.ts          — Remotion CLI config (JPEG output, overwrite, Tailwind webpack)
.agents/skills/             — Remotion best-practice rules for AI agents (36 rule files)
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
   cp src/examples/Partnership.tsx src/examples/MyNewVideo.tsx
   ```

2. **Rename** the component and schema exports in the new file

3. **Register** the new composition in `src/Root.tsx`:

   ```tsx
   <Composition
     id="MyNewVideo"
     component={MyNewVideo}
     durationInFrames={120}
     fps={30}
     width={1920}
     height={1080}
     schema={myNewVideoSchema}
     defaultProps={{ ... }}
   />
   ```

4. **Drop assets** into the correct directories:
   - Partner/brand logos: `public/assets/logos/`
   - Token icons: `public/assets/icons/`
   - Reference them via `staticFile("assets/logos/drift.svg")`

5. **Preview** with `npm run dev` — opens Remotion Studio in browser

6. **Render** with `npx remotion render MyNewVideo out/my-new-video.mp4`

### Available shared components

| Component            | Props                                                      | Description                      |
| -------------------- | ---------------------------------------------------------- | -------------------------------- |
| `GradientBackground` | `theme: "dark" \| "light"`                                 | Full-frame gradient background   |
| `NodesBackground`    | `theme`, `variant: "main" \| "detail" \| "orb"`, `opacity` | Lottie node/line animation layer |
| `P0LogoMark`         | `size`, `fill`, `gradient`                                 | P0 twisted-S logomark            |
| `P0Logo`             | `width`, `fill`                                            | Full "project 0" wordmark        |

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
| `COMP_WIDTH`        | `1920`                  | Standard composition width  |
| `COMP_HEIGHT`       | `1080`                  | Standard composition height |
| `COMP_FPS`          | `30`                    | Standard frame rate         |

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

- **Components**: PascalCase (`Partnership`, `NodesBackground`)
- **Files**: PascalCase for components, camelCase for utilities (`brand.ts`, `fonts.ts`)
- **Variables/functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE (`COMP_FPS`, `FONT_FAMILY_SANS`)
- **Zod schemas**: camelCase (`partnershipSchema`, `newAssetSchema`)
- **Composition IDs**: PascalCase strings (`"Partnership"`, `"NewAsset"`)

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
- Use `spring()` for natural motion (returns 0→1 progression)
- Write timing in seconds: multiply by `fps` from `useVideoConfig()`
- Common spring configs: smooth `{ damping: 200 }`, snappy `{ damping: 20, stiffness: 200 }`, bouncy `{ damping: 8 }`
- Use `<Sequence from={frame}>` to delay child appearance
- Use `<AbsoluteFill>` for full-size absolutely positioned layers
- **No `useState` for animation state** — derive everything from the current frame

### Assets

- Place static assets in `public/assets/` and reference with `staticFile("assets/...")`
- Use `<Img>` from remotion for images (not `<img>`)
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
