import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-scrollbar-thumb': '#117dbe',
        'custom-scrollbar-track': '#F1F1F1',
      },
      keyframes: {
        slide: {
          '0%': {
            transform: 'translateX(0)', /* Show the first image */
          },
          '30%': {
            transform: 'translateX(0)', /* Pause on the first image */
          },
          '33.333%': {
            transform: 'translateX(-100%)', /* Transition to the second image */
          },
          '63.333%': {
            transform: 'translateX(-100%)', /* Pause on the second image */
          },
          '66.666%': {
            transform: 'translateX(-200%)', /* Transition to the third image */
          },
          '96.666%': {
            transform: 'translateX(-200%)', /* Pause on the third image */
          },
          '100%': {
            transform: 'translateX(0)', /* Reset to the first image */
          },
        },
      },
      
      animation: {
        slide: 'slide 10s linear infinite', // Adjust the duration as needed
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};

export default config;
