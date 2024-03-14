import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      scrollbar: {
        thin: '10px',
        thumb: '#888',
        track: '#f1f1f1',
      },
      colors: {
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        green:{
          light: "#57FFDC",
          dark: "#319383"
        },
        white: '#edf4fb',
        dark: {
          black: '#000',
          grey: '#2b2b2b',
        },
        grey: {
          light: '#d9d9d9',
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // popover: {
        //   DEFAULT: "hsl(var(--popover))",
        //   foreground: "hsl(var(--popover-foreground))",
        // },
        card: {
           DEFAULT: "hsl(var(--card))",
           foreground: "hsl(var(--card-foreground))",
        },
        typeProyect: {
          DEFAULT: '#3b82f6', // blue-500
        },
        typeNarrative: {
          DEFAULT: '#fb923c', // orange-400
        },
        typeReflection: {
          DEFAULT: '#10b981', // green-500
        },
        decisionWatchlist: {
          DEFAULT: '#06b6d4', // cyan-500
        },
        desicionLeave: {
          DEFAULT: '#9ca3af', // neutral-500
        },
        desicionInvest: {
          DEFAULT: '#10b981', // green-500
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
  ],
  
} satisfies Config

export default config