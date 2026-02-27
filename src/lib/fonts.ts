import { continueRender, delayRender, staticFile } from "remotion";

let fontsLoaded = false;
let fontsHandle: number | null = null;

export const ensureFontsLoaded = () => {
  if (fontsLoaded) return;

  fontsHandle = delayRender("Loading P0 brand fonts");

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
      console.error("Failed to load P0 fonts:", err);
      if (fontsHandle !== null) {
        continueRender(fontsHandle);
      }
    });
};
