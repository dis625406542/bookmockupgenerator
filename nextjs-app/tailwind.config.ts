import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#e8536c",
          dark: "#d43d56",
        },
      },
    },
  },
  plugins: [],
};

export default config;
