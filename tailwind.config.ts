import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: { min: "576px", max: "639px" },
        xxs: { min: "350px", max: "575px" },
      },
      fontSize: {
        xxs: ["10px", "14px"],
      },

      container: {
        padding: {
          DEFAULT: "0.5rem",
          xs: "0.3rem",
          xxs: "0.2rem",
        },
      },
    },
  },
  plugins: [],
};
export default config;
