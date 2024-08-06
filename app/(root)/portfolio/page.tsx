import React from 'react'
import Chart from '@/components/portfolio/PieChartComponent'
import PortfolioInfo from '@/components/portfolio/PortfolioInfo'
import TokensInfo from '@/components/portfolio/TokensInfo'
import { Card, CardContent } from '@/components/ui/card'
import { getBalances } from '@/services/backend/balances'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import TotalBalance from '@/components/portfolio/TotalBalance'

const page =  () => {
   
  return (
    <div>
        <section id="tokens" className='mb-9'>
            <h1>
                ¿Como está distribuido tu portafolio?
            </h1>

            
                <div>
                    <p>
                        Aquí puedes ver como está distribuido tu portafolio en base a las categorías que has creado.
                    </p>
                </div>
            <Card className='grid grid-cols-1 lg:grid-cols-2 p-6 items-center'>
                <Chart />
                <CardContent className='flex lg:flex-col gap-16 text-lg lg:text-xl '>
                    <section className='grid w-2/5 lg:w-full'>
                        <div className="stat    s gap-9 bg-background stats-vertical lg:stats-horizontal ">
                        

                            <div className="stat py-1 rounded-md bg-black" >
                                <div className="text-sm lg:text-lg">Saldo total</div>
                                <div className="text-xl lg:text-3xl font-extrabold">
                                    <TotalBalance />    
                                </div>
                                
                            </div>

                            {/* <div className="stat py-1 bg-black rounded-md" >
                                <div className="stat-title">New Registers</div>
                                <div className="stat-value text-lg lg:text-2xl ">1,200</div>
                                <div className="stat-desc">↘︎ 90 (14%)</div>
                            </div> */}
                        </div>
                    </section>
                    <section className='grid grid-cols-2 w-3/5 lg:w-full gap-4'>

                            <PortfolioInfo />

                    </section>
        
    </CardContent>

            </Card>
            
            
                 

            
        </section>
        <section>
        <Table>
            <TableHeader className='bg-black'>
                <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Monto</TableHead>
                    
                </TableRow>
            </TableHeader>
            <TableBody>
               
            <TokensInfo />
            </TableBody>
        </Table>
        </section>
        
    </div>
  )
}

export default page