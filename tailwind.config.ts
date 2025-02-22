import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        offWhite: "#FDF7F1",
        orange: "#EE6451",
        lightDark: "#111235",
        cream: "#B9E1D7"
      },
      screens: {
        "2xl-1600": "1600px",
        "xl-1200": "1200px",
        "lg-992": "992px",
        "md-custom": "768px",
        "mobile": "576px",
        "mobile-400": "412px",
        "mobile-300": "330px"
      }
    }
  },
  
  plugins: []
};
export default config;
