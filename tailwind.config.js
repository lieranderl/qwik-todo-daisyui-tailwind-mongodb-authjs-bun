/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
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
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        rotate45: {
          "0%": { opacity: 0.1, transform: "rotate(45deg)" },
          "100%": { opacity: 1, transform: "rotate(0deg)" },
        },
        slide_in_right: {
          "0%": {
            transform: "translate3d(110%, 0, 0);",
            visibility: "visible",
          },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
        slide_out_right: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": {
            transform: "translate3d(110%, 0, 0);",
            visibility: "hidden",
          },
        },
        progress_slide: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
      animation: {
        rotate45: "rotate45 0.5s ease-out",
        "slide-in-right": "slide_in_right 0.5s",
        "slide-out-right": "slide_out_right 0.5s",
        "progress-slide": "progress_slide var(--bar-duration) linear",
      },
    },
  },
  plugins: [require("daisyui")],
};
