import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // 기본 중립 팔레트는 Tailwind 기본 색상을 사용 (필요 시 교체)
        gray: colors.zinc,

        // 프로젝트 브랜드 컬러(초기안) - 추후 디자인 확정 시 교체
        brand: {
          50: "#fff1f4",
          100: "#ffe4ea",
          200: "#ffb8c6",
          300: "#ff8ba4",
          400: "#ff5f83",
          500: "#ff3d6c",
          600: "#f21f57",
          700: "#cc1243",
          800: "#a30f37",
          900: "#7f0f2e",
          DEFAULT: "#f21f57",
        },
        success: colors.emerald,
        warning: colors.amber,
        danger: colors.rose,
      },
      fontFamily: {
        // next/font에서 주입하는 CSS 변수와 매핑
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        // 디자인 시스템 확정 전까지 기본 라운드 값
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
