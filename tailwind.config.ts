import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "zomato-red": "rgb(239, 79, 95)",
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0px)" },
        },
        slideUpAndFade: {
          from: { opacity: "1", transform: "translateY(0px)" },
          to: { opacity: "0", transform: "translateY(-12px)" },
        },
      },
      animation: {
        slideDownAndFade: "slideDownAndFade 0.2s ease-out",
        slideUpAndFade: "slideUpAndFade 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
