import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#080A0F",
        panel: "#10141D",
        line: "#273044",
        signal: "#37E0C2",
        voltage: "#7C8CFF"
      },
      boxShadow: {
        glow: "0 0 40px rgba(55, 224, 194, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
