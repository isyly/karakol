import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-nunito-sans)", "sans"],
        display: ["var(--font-nunito)", "serif"],
      },
      colors: {
        'red-orange': { DEFAULT: '#FB3232', 50: '#FEE6E6', 100: '#FED2D2', 200: '#FDAAAA', 300: '#FC8282', 400: '#FC5A5A', 500: '#FB3232', 600: '#F00505', 700: '#B90404', 800: '#820303', 900: '#4B0202', 950: '#2F0101' },
      },

    },
  },
  plugins: [],
};
export default config;
