/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/qwik-theme-toggle/**/*.{cjs,mjs}",
    "./node_modules/qwik-toasts/**/*.{cjs,mjs}",
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#1d69cc",
          secondary: "#596069",
          accent: "#753BCC",
          neutral: "#656C75",
          "base-100": "#f7f7f7",
          info: "#1D69CC",
          success: "#45991F",
          warning: "#BD7202",
          error: "#CC2D37",
          "--rounded-box": ".25rem",
          "--rounded-btn": ".25rem",
          "--rounded-badge": "1.9rem",

          "--animation-btn": ".25s",
          "--animation-input": ".2s",

          "--btn-text-case": "normal-case",
          "--navbar-padding": ".5rem",
          "--border-btn": "1.5px",
        },
        dark: {
          primary: "#649EF5",
          secondary: "#D0D4D9",
          accent: "#9B5FF5",
          neutral: "#889099",
          "base-100": "#23282E",
          info: "#649EF5",
          success: "#6BBF41",
          warning: "#f0c243",
          error: "#FA5762",
          "--rounded-box": ".25rem",
          "--rounded-btn": ".25rem",
          "--rounded-badge": "1.9rem",

          "--animation-btn": ".25s",
          "--animation-input": ".2s",

          "--btn-text-case": "normal-case",
          "--navbar-padding": ".5rem",
          "--border-btn": "1.5px",
        },
      },
    ],
    darkTheme: "dark",
  },
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
