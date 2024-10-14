import React from 'react'
import ChartBalancesWallet from '@/components/portfolio/PieChartComponent'
import ChartDefiPositions from '@/components/portfolio/defi/PieChartDefiPositions'
import PortfolioInfo from '@/components/portfolio/PortfolioInfo'
import TokensInfo from '@/components/portfolio/TokensInfo'
import { Card, CardContent } from '@/components/ui/card'
import { getBalances } from '@/services/backend/balances'
import NetworkTabs from '@/components/portfolio/NetworkTabs'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import TotalBalance from '@/components/portfolio/TotalBalance'
import DefiPositionsCategories from '@/components/portfolio/defi/DefiPositionsCategories'

const page =  () => {
   
  return (
    <div>
        <section className=' my-5'>
           <NetworkTabs />

        </section>
        

        {/* Seccion de wallets */}

        <section>
            <section id="tokens" className='mb-9'>
            
            <Card className='p-6 bg-[#fff] dark:bg-transparent '>
            

            
                <div>
                    <h1>
                    ¿Cómo está distribuido tu portafolio?
                </h1>
                    <p>
                        {/* Aquí puedes ver como está distribuido tu portafolio en base a las categorías que has creado. */}
                        En este apartado, podrás monitorear activos que tienes en tu cartera conectada a la aplicación. 
                        
                    </p>
                </div>
                
                <section  className='grid grid-cols-1 lg:grid-cols-2 p-6 items-center'>
                <ChartBalancesWallet />

                <CardContent className='flex lg:flex-col gap-16 text-lg lg:text-xl '>
                    <section className='grid w-1/2 lg:w-full'>
                        
                        

                            <div className="stat py-1 rounded-md border border-foreground dark:border-0 bg-grey-light dark:bg-black" >
                                <div className="text-sm lg:text-lg">Saldo total</div>
                                <div className="text-xl lg:text-3xl font-extrabold">
                                    <TotalBalance 
                                        section='wallet'
                                    />    
                                </div>
                                
                           

                           
                        </div>
                    </section>
                    <section className='grid grid-cols-2 w-3/5 lg:w-full gap-4'>

                            <PortfolioInfo />

                    </section>
        
                </CardContent>
                </section>
                
               
                

            </Card>
            
            
                 

            
            </section>
            <section>
                <Table>
                    <TableHeader className='bg-black text-white '>
                        <TableRow>
                            <TableHead>Token</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Monto</TableHead>
                            <TableHead>Valor en USD</TableHead>
                            
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    
                        <TokensInfo />

                    </TableBody>
                </Table>
            </section>


        </section>
        


        {/* Seccion de posiciones */}
        <section>
            <section>
            <Card className='p-6 bg-[#fff] dark:bg-transparent '>
            

            
            <div>
                <h1>
                    ¿Cuales son tus posiciones DeFi?
                </h1>
                <p>
                    {/* Aquí puedes ver como está distribuido tu portafolio en base a las categorías que has creado. */}
                    En este apartado, podrás monitorear las posiciones que tienes en tu cartera conectada a la aplicación. 
                    
                </p>
            </div>
            
            <section  className='grid grid-cols-1 lg:grid-cols-2 p-6 items-center'>
            <ChartDefiPositions />

            <CardContent className='flex lg:flex-col gap-16 text-lg lg:text-xl '>
                <section className='grid w-1/2 lg:w-full'>
                    
                    

                        <div className="stat py-1 rounded-md border border-foreground dark:border-0 bg-grey-light dark:bg-black" >
                            <div className="text-sm lg:text-lg">Saldo total</div>
                            <div className="text-xl lg:text-3xl font-extrabold">
                                <TotalBalance 
                                    section='defi'
                                />    
                            </div>
                            
                       

                       
                    </div>
                </section>
                {/* <section className='grid grid-cols-2 w-3/5 lg:w-full gap-4'>

                        <PortfolioInfo />

                </section> */}
    
            </CardContent>
            </section>
            
           
            

        </Card>

            </section>


            <section>
            <DefiPositionsCategories />

            </section>
            
        </section>
        
    </div>
  )
}

export default page