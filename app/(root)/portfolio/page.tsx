import React from 'react'
import Chart from '@/components/portfolio/PieChartComponent'
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
import Link from 'next/link'
import Image from 'next/image'
import {Badge }from '@/components/ui/badge'
import DefiPosition from '@/components/portfolio/defi/DefiPosition'

const page =  () => {
   
  return (
    <div>
        <section className=' my-5'>
           <NetworkTabs />

        </section>

        <section id="tokens" className='mb-9'>
            
            <Card className='p-6 bg-[#fff] dark:bg-transparent '>
            

            
                <div>
                    <h1>
                    ¿Cómo está distribuido tu portafolio?
                </h1>
                    <p>
                        {/* Aquí puedes ver como está distribuido tu portafolio en base a las categorías que has creado. */}
                        En este apartado, podrás monitorear las posiciones y activos que tienes en tu cartera conectada a la aplicación. 
                        
                    </p>
                </div>
                
                <section  className='grid grid-cols-1 lg:grid-cols-2 p-6 items-center'>
                <Chart />

                <CardContent className='flex lg:flex-col gap-16 text-lg lg:text-xl '>
                    <section className='grid w-1/2 lg:w-full'>
                        
                        

                            <div className="stat py-1 rounded-md border border-foreground dark:border-0 bg-grey-light dark:bg-black" >
                                <div className="text-sm lg:text-lg">Saldo total</div>
                                <div className="text-xl lg:text-3xl font-extrabold">
                                    <TotalBalance />    
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

        <section>
            {/* Loked */}
            <article>
                {/* <header className='flex justify-between items-center'>
                    <div>
                        
                        <Link
                            href={`/dashobard`}
                        >
                        <h2 className='hover:underline mt-0'>Arbitrum</h2>
                        </Link>
                    </div>
                    <div className='flex items-center gap-4'>
                        <p>Balance:</p>
                        <span>$123.45</span>
                    </div>
                </header> */}
                <div className='bg-grey-light/10 relative'>
                    <Badge className='absolute left-[-10px] z-20 top-2'>
                        Bloqueo
                    </Badge>
                <Table className='mt-7'>
            <TableHeader className=''>
                <TableRow>
                    <TableHead>Pool</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Valor en USD</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
               
        <DefiPosition mode='loked'/>
            </TableBody>
        </Table>
                </div>
                
            </article>

            {/* Staking */}

            <article>
                {/* <header className='flex justify-between items-center'>
                    <div>
                        
                        <Link
                            href={`/dashobard`}
                        >
                        <h2 className='hover:underline mt-0'>Arbitrum</h2>
                        </Link>
                    </div>
                    <div className='flex items-center gap-4'>
                        <p>Balance:</p>
                        <span>$123.45</span>
                    </div>
                </header> */}
                <div className='bg-grey-light/10 relative'>
                    <Badge 
                        variant={'Lending'}
                        className='absolute left-[-10px] z-20 top-2 rounded-sm'>
                        Staking
                    </Badge>
                <Table className='mt-7'>
            <TableHeader >
                <TableRow>
                    <TableHead>Pool</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Valor en USD</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                    
                    <DefiPosition mode='staked' />
            
            </TableBody>
        </Table>
                </div>
                
            </article>


        </section>
        
    </div>
  )
}

export default page