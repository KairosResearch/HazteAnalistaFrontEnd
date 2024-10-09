//Imports for the component.
//React
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
//Values and utilities
import { cn } from "@/utils";

const colorMap = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-500",
  brown: "bg-orange-950",
  grey: "bg-gray-500",
  // Add more colors as needed
};

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded",
  {
    variants: {
      variant: {
        fourE:
          "border border-transparent bg-primary text-primary-foreground text-background ",
          decisionSeguimiento: "border-transparent  bg-cyan-200 text-foreground dark:text-background ",
          desicionInvertir: "border-transparent  bg-green-400 text-foreground dark:text-background ",
        range: "text-foreground bg-background text-foreground",
        sectorAndExchange: "bg-primary   text-primary-foreground text-background ",
        binance: `bg-binance text-[#1E1F24] text-background ` ,
        coinbase: `text-background  bg-coinbase dark:text-foreground text-white`,
        kraken: `text-background  bg-kraken`,
        DAO: `dark:text-background  bg-dao`,
        Defi: `dark:text-background  bg-defi`,
        Blockchain: "dark:text-background  bg-blockchain",
        NFT: "dark:text-background  bg-nft",
        Gaming: "dark:text-background  bg-gaming",
        Metaverse: "dark:text-background  bg-metaverso",
        Lending: "dark:text-background  bg-lending",
        Web3: "dark:text-background  bg-web3",
        DEX: "dark:text-background  bg-dex",
        Staking: "dark:text-background  bg-staking",
        Oraculo: "dark:text-background  bg-oraculo",
        Marketplace: "dark:text-background  bg-marketplace",
        Ninguno: " bg-none text-black ",
      },
    },
    defaultVariants: {
      variant: "sectorAndExchange",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, color, ...props }: BadgeProps) {
  const colorClass = colorMap[color as keyof typeof colorMap] || colorMap.blue;
  return (
    <div
      className={cn(badgeVariants({ variant }), className, (variant  === 'range') ? "text-foreground ": " ")}
      {...props}
    >
      {(variant === "fourE" || variant === "range") && (
        <span
          className={`inline-block  ${variant === "range" ? "h-4 w-4 mr-2" : "h-3 w-3 mr-1"}  rounded-full ${colorClass} align-middle`}
        />
      )}
      {props.children}
    </div>
  );
}

export { Badge, badgeVariants };
