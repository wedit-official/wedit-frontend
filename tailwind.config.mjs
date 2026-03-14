const coral = {
  100: "#FFEAED",
  200: "#FFEAD9",
  300: "#FFC9C8",
  400: "#FF6669",
  500: "#E65251",
  600: "#CC5254",
  700: "#B24647",
  800: "#983D3D",
  900: "#732E2F",
};

const pink = {
  100: "#FFF3F5",
  200: "#FFE2E7",
  300: "#FFC6CF",
  400: "#FF9B9D",
  500: "#E68C8E",
  600: "#CC7C7E",
  700: "#B26A6F",
  800: "#995A5F",
  900: "#814F50",
};

const grey = {
  100: "#FBFBFB",
  200: "#E0E0E0",
  300: "#C7C7C7",
  400: "#B4B4B4",
  500: "#919191",
  600: "#7A7A7A",
  700: "#616161",
  800: "#4B4B4B",
  900: "#333333",
};

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        coral,
        pink,
        grey,
        white: "#FFFFFF",
        black: {
          default: "#000000",
          secondary: grey[800],
          tertiary: grey[600],
          disabled: grey[500],
          DEFAULT: "#000000",
        },
        brand: {
          primary: coral[400],
          secondary: pink[400],
          tertiary: pink[100],
          DEFAULT: coral[400],
        },
        text: {
          default: "#000000",
          secondary: grey[800],
          tertiary: grey[600],
          disabled: grey[500],
        },
        gray: {
          100: grey[100],
          200: grey[200],
          300: grey[300],
          400: grey[400],
          500: grey[500],
          600: grey[600],
          700: grey[700],
          800: grey[800],
          900: grey[900],
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        "head-1": ["48px", { lineHeight: "140%", letterSpacing: "-2.5px" }], // Semi Bold
        "head-2": ["26px", { lineHeight: "140%", letterSpacing: "-2.5px" }], // Semi Bold
        "head-3": ["20px", { lineHeight: "140%", letterSpacing: "-2.5px" }], // Regular
        "head-4": ["18px", { lineHeight: "140%", letterSpacing: "-2.5px" }], // Extra Bold
        "head-5": ["18px", { lineHeight: "140%", letterSpacing: "-2.5px" }], // Semi Bold
        "body-1": ["18px", { lineHeight: "140%", letterSpacing: "-2.5px" }], // Regular
        "body-2": ["15px", { lineHeight: "140%", letterSpacing: "-2.5px" }], // Regular
        "body-3": ["15px", { lineHeight: "140%", letterSpacing: "-2.5px" }], // Semi Bold
        caption: ["15px", { lineHeight: "140%", letterSpacing: "-2.5px" }], // Regular
      },
      fontWeight: {
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

