import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: "#F0BB78",
        bgDark: {
          "100": "#9290C3",
          "200": "#535C91",
          "300": "#070F2B",
          "400": "#00071d",
        },
        bgLight: {
          "100": "#FFF0DC",
          "200": "#F0BB78",
          "300": "#543A14",
          "400": "##131010",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
