import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Design Tokens (Figma)
        brand: {
          primary: "#FF6669",
          secondary: "#FF9B9D",
          tertiary: "#FFEDEE",
          DEFAULT: "#FF6669",
        },
        text: {
          default: "#111111",
          secondary: "#505050",
          tertiary: "#767676",
          disabled: "#999999",
        },
        gray: {
          100: "#F7F7F7",
          200: "#F2F2F2",
          3000: "#DDDDDD",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
