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
  "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        fourE:
          "rounded-full border border-transparent bg-primary text-primary-foreground text-background ",
        decisionWatchlist: "border-transparent rounded bg-cyan-200 text-foreground",
        desicionLeave: "border-transparent rounded bg-green-400 text-background ",
        desicionInvest: "border-transparent rounded bg-desicionInvest text-background ",
        range: "text-foreground bg-background text-foreground rounded-sm",
        sectorAndExchange: "bg-primary rounded  text-primary-foreground text-background ",
        binance: `bg-binance text-[#1E1F24] text-background ` ,
        coinbase: `text-background  bg-coinbase dark:text-foreground text-white`,
        kraken: `text-background  bg-kraken`,
        DAO: `text-background  bg-dao`,
        Defi: `text-background  bg-defi`,
        Blockchain: "text-background  bg-blockchain",
        NFT: "text-background  bg-nft",
        Gaming: "text-background  bg-gaming",
        Metaverse: "text-background  bg-metaverso",
        Lending: "text-background  bg-lending",
        Web3: "text-background  bg-web3",
        DEX: "text-background  bg-dex",
        Staking: "text-background  bg-staking",
        Oraculo: "text-background  bg-oraculo",
        Marketplace: "text-background  bg-marketplace",
        Ninguno: " bg-none text-black dark:text-white",
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
