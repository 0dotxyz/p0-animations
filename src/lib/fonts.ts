import { cancelRender, continueRender, delayRender, staticFile } from "remotion";

let fontsLoaded = false;
let fontsHandle: number | null = null;
let fontsLoadStarted = false;

export const ensureFontsLoaded = () => {
  if (fontsLoaded) {
    return;
  }

  if (fontsHandle === null) {
    fontsHandle = delayRender("Loading P0 brand fonts");
  }

  if (fontsLoadStarted) {
    return;
  }

  fontsLoadStarted = true;

  const fonts = [
    {
      family: "ABCOracle",
      src: staticFile("assets/fonts/ABCOracle-Book.woff"),
      weight: "400",
    },
    {
      family: "ABCOracle",
      src: staticFile("assets/fonts/ABCOracle-Medium.woff"),
      weight: "500",
    },
    {
      family: "AeonikMono",
      src: staticFile("assets/fonts/AeonikMono-Regular.woff"),
      weight: "400",
    },
    {
      family: "AeonikMono",
      src: staticFile("assets/fonts/AeonikMono-Medium.woff"),
      weight: "500",
    },
  ];

  const loadPromises = fonts.map((font) => {
    const face = new FontFace(font.family, `url(${font.src})`, {
      weight: font.weight,
    });
    return face.load().then((loaded) => {
      document.fonts.add(loaded);
      return font.src;
    });
  });

  Promise.all(loadPromises)
    .then(() => {
      fontsLoaded = true;
      if (fontsHandle !== null) {
        continueRender(fontsHandle);
      }
    })
    .catch((err) => {
      const message =
        err instanceof Error ? err.message : String(err);
      cancelRender(
        new Error(
          `Failed to load P0 brand fonts (check public/assets/fonts/). ${message}`,
        ),
      );
    });
};
