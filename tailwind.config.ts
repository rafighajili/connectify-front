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

    extend: {},
  },
  plugins: [nextui()],
};
export default config;
