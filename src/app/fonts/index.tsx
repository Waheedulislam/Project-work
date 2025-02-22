import local from "next/font/local";

export const formular = local({
  src: [
    { path: "./Formular.ttf", weight: "400" },
    {
      path: "./Formular-Light.ttf",
      weight: "300"
    },
    { path: "./Formular-Medium.ttf", weight: "500" },
    { path: "./Formular-Black.ttf", weight: "900" },
    { path: "./Formular-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "./Thin-Regular.ttf", weight: "1000" }
  ],
  display: "swap"
});
