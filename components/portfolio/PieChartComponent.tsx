


"use client"
import  React, { useEffect } from "react"
import { TrendingUp } from "lucide-react"
import { Cell, Label, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import { usePortafolio } from "@/hooks/usePortafolio"
import { Balances, BalancesInPie } from "@/index"

  // const chartData = [
  //   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  //   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  //   { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  //   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  //   { browser: "other", visitors: 190, fill: "var(--color-other)" },
  // ]
  const chartConfig = {
    
    chrome: {
      label: "USDC.e",
      color: "hsl(var(--chart-1))",
    },
    USDC: {
      label: "USDC",
      color: "hsl(var(--chart-2))",
    },
    USDT: {
      label: "USDT",
      color: "hsl(var(--chart-3))",
    },
    DAI: {
      label: "DAI",
      color: "hsl(var(--chart-4))",
    },
    ARB: {
      label: "ARB",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

const Chart = () => {

    

      const [address, setAddress] = React.useState('');
      const [chartData,  setChartData] = React.useState<BalancesInPie[]>([]);
      const [loading, setLoading] = React.useState(false);
      React.useEffect(() => {
          const addr = window.localStorage.getItem('wallet');
          if(typeof window !== 'undefined' && addr != null){
              setAddress(addr);
          }
      }, []);
      
      const { portafolio, isLoading } = usePortafolio(address);
     
      useEffect(() => {
          if(isLoading){
              setLoading(true);
          } else
          {
              setLoading(false);
          }
      }, [isLoading]);
      useEffect(() => {
        if (portafolio) {
          const updatedBalances = portafolio.Balances.map((balance, index) => ({
            ...balance,
            color: `hsl(var(--chart-${index +1}))`, // Color dinámico basado en el índice
          }));
          setChartData(updatedBalances);
          setLoading(false);
        }
      }, [portafolio]);

      // const totalVisitors = React.useMemo(() => {
      //   return chartData.reduce((acc, curr) => acc + curr.balanceFiat, 0)
      // }, [chartData])

      
  const chartConfig = React.useMemo(() => {
    if (chartData.length === 0) {
      return { balances: { label: "Distribución de tus balances" } };
    }

    const balancesConfig = chartData.reduce((acc, curr) => {
      acc[curr.simbolo] = {
        label: `${curr.simbolo} $`,
        color: curr.color, // Usar el color ya asignado
      };
      return acc;
    }, {} as Record<string, { label: string; color: string }>);

    

    return {
      balances: balancesConfig,
    };
  }, [chartData]);

      if (loading) {
        return <div>Loading...</div>;
      }
     
   return (
    <div>
      {
        /**Sí el arreglo de chartData es vacio, mostrar un mensaje de cambio de wallet */
        chartData.length === 0 && <div>
          No logramos acceder a ningun balance en tu portafolio. Esto puede ser porque:
          <ol>
            <li>- Debes estar logueado en la plataforma con una wallet</li>
            <li>- La wallet debe estar conectada a la red de arbitrum</li>
            
          </ol>
        </div>
      }
      {
        chartData && <>
      
      <CardContent className="flex-1 pb-0">
        
        {/* Chart */}
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[330px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="balanceFiat"
              nameKey="simbolo"
              innerRadius={65}
              strokeWidth={5}
            >
               {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Label
              className="text-green-light"
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {/* <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan> */}
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="text-green-light"
                        >
                          Activos en USD
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
      </>
}
    </div>
  )
}

export default Chart