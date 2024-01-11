import type { Config } from "tailwindcss";

const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      padding: { DEFAULT: "1.5rem" },
      screens: { lg: "1024px" },
      center: true,
    },

    extend: {
      keyframes: {
        dvijeniya: {
          "100%": { transform: "translateX(calc(-1 * (100% + 48px)))" },
        },
      },
      animation: {
        dvijeniya: "dvijeniya 10s linear infinite",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
