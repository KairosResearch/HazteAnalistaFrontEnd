


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
import { useDefiPositions } from "@/hooks/usePortafolio"
import { BalancesDefi, BalancesDefiInPie } from "@/index"
import { useSelectNetwork } from "@/hooks/usePortafolio"

 

const ChartDefiPositions = () => {

      const {network} = useSelectNetwork();  

      const [address, setAddress] = React.useState('');
      const [chartData,  setChartData] = React.useState<BalancesDefiInPie[]>([]);
      const [loading, setLoading] = React.useState(false);

      function colorAsigner (balances: BalancesDefi[]) {
        const updatedBalancesObj = balances.map((balance, index) => ({
          ...balance,
          color: `hsl(var(--chart-${index+1 }))`, // Color dinámico basado en el índice
        }));
        return updatedBalancesObj;
      }

      React.useEffect(() => {
          const addr = window.localStorage.getItem('wallet');
          if(typeof window !== 'undefined' && addr != null){
              setAddress(addr);
          }
      }, []);
      
      const { defiPositions, isLoading } = useDefiPositions(address);
     
      useEffect(() => {
          if(isLoading){
              setLoading(true);
          } else
          {
              setLoading(false);
          }
      }, [isLoading]);
      useEffect(() => {
        if (defiPositions) {
            switch (network) {
                case 'ethereum':
                    setChartData(colorAsigner(defiPositions.ethereum.totalBalanceArray));
                    break;
                case 'arbitrum':
                    setChartData(colorAsigner(defiPositions.arbitrum.totalBalanceArray));
                    break;
                case 'scroll':
                    setChartData(colorAsigner(defiPositions.scroll.totalBalanceArray));
                    break;
                case 'polygon':
                    setChartData(colorAsigner(defiPositions.polygon.totalBalanceArray));
                    break;
                case 'optimism':
                    setChartData(colorAsigner(defiPositions.optimism.totalBalanceArray));
                    break;
                case 'base':
                    setChartData(colorAsigner(defiPositions.base.totalBalanceArray))
                    break;
            }
        }
      }, [defiPositions, network]);

      // const totalVisitors = React.useMemo(() => {
      //   return chartData.reduce((acc, curr) => acc + curr.balanceFiat, 0)
      // }, [chartData])

      
  const chartConfig = React.useMemo(() => {
    if (chartData.length === 0) {
      return { totalBalance: { label: "Distribución de tus balances" } };
    }

    const balancesConfig = chartData.reduce((acc, curr) => {
      acc[curr.protocolName] = {
        label: `${curr.protocolName} $`,
        color: curr.color, // Usar el color ya asignado
      };
      return acc;
    }, {} as Record<string, { label: string; color: string }>);

    

    return {
      totalBalance: balancesConfig,
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
          No logramos acceder a ninguna posición DeFi en tu portafolio. Esto puede ser porque:
          <ol>
            <li>- Debes estar logueado en la plataforma con una wallet</li>
            <li>- La wallet debe tener posiciones Defi  en la red correspondiente</li>
            
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
              dataKey="totalBalance"
              nameKey="protocolName"
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
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {network === 'ethereum' && defiPositions && defiPositions.ethereum.totalBalance.toLocaleString()}
                          {network === 'arbitrum' && defiPositions && defiPositions.arbitrum.totalBalance.toLocaleString()}
                          {network === 'scroll' && defiPositions && defiPositions.scroll.totalBalance.toLocaleString()}
                          {network === 'polygon' && defiPositions && defiPositions.polygon.totalBalance.toLocaleString()}
                          {network === 'optimism' && defiPositions && defiPositions.optimism.totalBalance.toLocaleString()}
                          {network === 'base' && defiPositions && defiPositions.base.totalBalance.toLocaleString()}
                        </tspan> 
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="text-green-light fill-foreground"
                          
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

export default ChartDefiPositions