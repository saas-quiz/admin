import localFont from "next/font/local";

const outfitLight = localFont({
  src: "./Outfit-Light.ttf",
  variable: "--font",
  weight: "100 900",
});
const outfitExtraLight = localFont({
  src: "./Outfit-ExtraLight.ttf",
  variable: "--font-extra-light",
  weight: "100 900",
});
const outfitThin = localFont({
  src: "./Outfit-Thin.ttf",
  variable: "--font-thin",
  weight: "100 900",
});
const outfitMedium = localFont({
  src: "./Outfit-Medium.ttf",
  variable: "--font-medium",
  weight: "100 900",
});
const outfitRegular = localFont({
  src: "./Outfit-Regular.ttf",
  variable: "--font-regular",
  weight: "100 900",
});
const outfitSemiBold = localFont({
  src: "./Outfit-SemiBold.ttf",
  variable: "--font-semi-bold",
  weight: "100 900",
});
const outfitBold = localFont({
  src: "./Outfit-Bold.ttf",
  variable: "--font-bold",
  weight: "100 900",
});
const outfitExtraBold = localFont({
  src: "./Outfit-ExtraBold.ttf",
  variable: "--font-extra-bold",
  weight: "100 900",
});

export default {
  Light: outfitLight.variable,
  ExtraLight: outfitExtraLight.variable,
  Thin: outfitThin.variable,
  Medium: outfitMedium.variable,
  Regular: outfitRegular.variable,
  SemiBold: outfitSemiBold.variable,
  Bold: outfitBold.variable,
  ExtraBold: outfitExtraBold.variable,
};
