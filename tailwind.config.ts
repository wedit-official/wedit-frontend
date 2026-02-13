type TailwindConfig = {
  content: string[];
  theme: {
    extend: Record<string, unknown>;
  };
  plugins: unknown[];
};

const colors = {
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
  },
};

const config: TailwindConfig = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // BRAND COLOR
        brand: {
          primary: "#FF6669",
          secondary: "#FF9B9D",
          tertiary: "#FFEDEE",
          DEFAULT: "#FF6669",
        },
        // BLACK
        black: {
          default: "#111111",
          secondary: "#505050",
          tertiary: "#767676",
          disabled: "#999999",
          DEFAULT: "#111111",
        },
        // GRAY
        gray: {
          300: "#DDDDDD",
          200: "#F2F2F2",
          100: "#F7F7F7",
          white: "#FFFFFF",
        },
        success: colors.emerald,
        warning: colors.amber,
        danger: colors.rose,
      },
      fontFamily: {
        sans: ["Pretendard", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        // Typography
        "head-1": ["48px", { lineHeight: "140%", letterSpacing: "-2.5px" }],
        "head-2": ["26px", { lineHeight: "140%", letterSpacing: "-2.5px" }],
        "head-3": ["20px", { lineHeight: "140%", letterSpacing: "-2.5px" }],
        "head-4": ["18px", { lineHeight: "140%", letterSpacing: "-2.5px" }],
        "head-5": ["18px", { lineHeight: "140%", letterSpacing: "-2.5px" }],
        "body-1": ["18px", { lineHeight: "140%", letterSpacing: "-2.5px" }],
        "body-2": ["15px", { lineHeight: "140%", letterSpacing: "-2.5px" }],
        "body-3": ["15px", { lineHeight: "140%", letterSpacing: "-2.5px" }],
      },
      fontWeight: {
        // Pretendard 폰트 weight
        regular: "400",
        semibold: "600",
        extrabold: "800",
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
