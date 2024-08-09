"use client"
import  React, { useEffect } from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
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
import { Balances } from "@/index"

  // const chartData = [
  //   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  //   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  //   { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  //   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  //   { browser: "other", visitors: 190, fill: "var(--color-other)" },
  // ]
  const chartConfig = {
    visitors: {
      label: "Distribución de tus balances",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

const Chart = () => {

    

      const [address, setAddress] = React.useState('');
      const [chartData,  setChartData] = React.useState<Balances[]>([]);
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
          if(portafolio){
              setChartData(portafolio.Balances);
          }
      }, [portafolio]);

      const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.balance, 0)
      }, [chartData])

      // const chartConfig: ChartConfig = React.useMemo(() => {
      //   if (chartData.length === 0) {
      //     return {balances:{label: "Distribución de tus balances"}};
      //   }
      
      //   return {
      //     balances: {
      //       label: "Distribución de tus balances",
      //     },
      //     ...chartData.reduce((acc, curr, index) => {
      //       acc[curr.balance] = {
      //         label: curr.simbolo,
      //         color: `hsl(var(--chart-${index + 1}))`,
      //       };
      //       return acc;
      //     }, {} as ChartConfig),
      //   };
      // }, [chartData]);

      if (!chartConfig) {
        return <div>Loading...</div>;
      }
      console.log(chartData);
   return (
    <div>
      {
        /**Sí el arreglo de chartData es vacio, mostrar un mensaje de cambio de wallet */
        chartData.length === 0 && <div>
          No logramos acceder a ningun balance en tu portafolio. Esto puede ser porque:
          <ol>
            <li>Debes estar logueado en la plataforma con una wallet</li>
            <li>La wallet debe estar conectada a la red de arbitrum</li>
            
          </ol>
        </div>
      }
      {
        chartData && <>
      
      <CardContent className="flex-1 pb-0">
        {/* Chart */}
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
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