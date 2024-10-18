import type { Config } from "tailwindcss";
import {
  BINANCE,
  COINBASE,
  KRAKEN,
  DAO,
  DEFI,
  BLOCKCHAIN,
  NFT,
  GAMING,
  LENDING,
  WEB3,
  DEX,
  STAKING,
  ORACULO,
  METAVERSO,
  MARKETPLACE,
  NONE,
} from "./lib/constants";
let greenDark = "#319383";
let greyLight = "#d9d9d9";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      backgroundImage: {
        "hero-pattern": "url('/backgrounds/login.png')",
        "footer-texture": "url('/img/footer-texture.png')",
        "page-texture": "url('/backgrounds/rombos.png')",
      },
      scrollbar: {
        thin: "10px",
        thumb: "#888",
        track: "hsl(var(--background))",
      },
      colors: {
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        green: {
          light: "#57FFDC",
          dark: greenDark,
        },
        white: "#edf4fb",
        dark: {
          black: "#000",
          grey: "#2b2b2b",
        },
        grey: {
          light: greyLight,
        },

        //Light theme staff

        darkerBackground: "#edecef",
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
        destructive: {
          DEFAULT: "#913F3B",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: greyLight,
        },
        typeProyect: {
          DEFAULT: "#3b82f6", // blue-500
        },
        typeNarrative: {
          DEFAULT: "#fb923c", // orange-400
        },
        typeReflection: {
          DEFAULT: "#10b981", // green-500
        },
        decisionWatchlist: {
          DEFAULT: "#06b6d4", // cyan-500
        },
        desicionLeave: {
          DEFAULT: "#9ca3af", // neutral-500
        },
        desicionInvest: {
          DEFAULT: "#10b981", // green-500
        },
        binance: {
          DEFAULT: BINANCE,
        },
        coinbase: {
          DEFAULT: COINBASE,
        },
        kraken: {
          DEFAULT: KRAKEN,
        },
        dao: {
          DEFAULT: DAO,
        },
        defi: {
          DEFAULT: DEFI,
        },
        blockchain: {
          DEFAULT: BLOCKCHAIN,
        },
        nft: {
          DEFAULT: NFT,
        },
        gaming: {
          DEFAULT: GAMING,
        },
        lending: {
          DEFAULT: LENDING,
        },
        dex: {
          DEFAULT: DEX,
        },
        web3: {
          DEFAULT: WEB3,
        },
        staking: {
          DEFAULT: STAKING,
        },
        oraculo: {
          DEFAULT: ORACULO,
        },
        metaverso: {
          DEFAULT: METAVERSO,
        },
        marketplace: {
          DEFAULT: MARKETPLACE,
        },
        none: {
          DEFAULT: NONE,
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
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
  corePlugins: {
    position: true,
  },
} satisfies Config;

export default config;
