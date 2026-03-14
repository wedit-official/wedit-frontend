import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: [
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/features/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    if (config.css?.postcss && typeof config.css.postcss === "object" && !Array.isArray(config.css.postcss)) {
      const existingPlugins = Array.isArray(config.css.postcss.plugins)
        ? config.css.postcss.plugins
        : [];
      
      config.css.postcss.plugins = [
        require("@tailwindcss/postcss"),
        ...existingPlugins,
      ];
    } else if (config.css) {
      config.css.postcss = {
        plugins: [require("@tailwindcss/postcss")],
      };
    }
    return config;
  },
};
export default config;
