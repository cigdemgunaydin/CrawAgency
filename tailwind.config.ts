import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          100: "#FAF9F6",
          200: "#F7F5F0",
          300: "#EDE9E1",
        },
        terracotta: {
          300: "#e8c4a0",
          400: "#dfa875",
          500: "#c8905f",
          600: "#b07a4a",
        },
        sage: {
          300: "#9AB89D",
          400: "#7A9E7E",
          500: "#658568",
        },
        dustyrose: {
          300: "#E8C4C4",
          400: "#D4A5A5",
          500: "#BF8888",
        },
        sand: {
          300: "#E8DCC8",
          400: "#D4C4A8",
          500: "#C0AC88",
        },
        slate: {
          300: "#A8B8C8",
          400: "#8A9EB4",
          500: "#6E849A",
        },
        text: {
          primary: "#2D2D2D",
          secondary: "#5C5C5C",
          tertiary: "#8A8A8A",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 16px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 30px rgba(0, 0, 0, 0.10)",
        navbar: "0 1px 12px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        card: "14px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
