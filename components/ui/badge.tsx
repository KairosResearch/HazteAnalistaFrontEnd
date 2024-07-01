import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";
import { BINANCE, COINBASE, KRAKEN } from "@/lib/constants";

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
          "rounded-full border border-transparent bg-primary text-primary-foreground ",
        // typeProyect:
        //   "border-transparent rounded bg-typeProyect/50",
        // typeNarrative:
        // 'border-transparent rounded bg-typeNarrative/50',
        // typeReflection:
        //   "border-transparent rounded bg-typeReflection/50",
        decisionWatchlist: "border-transparent rounded bg-decisionWatchlist/50",
        desicionLeave: "border-transparent rounded bg-desicionLeave/50",
        desicionInvest: "border-transparent rounded bg-desicionInvest/50",
        range: "text-foreground",
        sectorAndExchange: "bg-primary rounded  text-primary-foreground",
        binance: `bg-binance text-[#1E1F24]`,
        coinbase: `bg-coinbase`,
        kraken: `bg-kraken`,
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
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
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
