import type { Config } from "tailwindcss";

const config: Config = {
  content: [
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
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
