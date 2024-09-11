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
import Link from 'next/link'
import Image from 'next/image'
import {Badge }from '@/components/ui/badge'
import DefiPosition from '@/components/portfolio/defi/DefiPosition'

const page =  () => {
   
  return (
    <div>
        <section id="tokens" className='mb-9'>
            <h1>
                ¿Cómo está distribuido tu portafolio?
            </h1>

            
                <div>
                    <p>
                        {/* Aquí puedes ver como está distribuido tu portafolio en base a las categorías que has creado. */}
                        n este apartado, podrás monitorear las posiciones y activos que tienes en tu cartera conectada a la aplicación. 
                        Actualmente, esta visualización te permite el seguimiento dentro de la red de Arbitrum.
                    </p>
                </div>
            <Card className='grid grid-cols-1 lg:grid-cols-2 p-6 items-center'>
                <Chart />
                <CardContent className='flex lg:flex-col gap-16 text-lg lg:text-xl '>
                    <section className='grid w-1/2 lg:w-full'>
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
                    <Badge className='absolute left-[-10px] top-2'>
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
                        className='absolute left-[-10px] top-2 rounded-sm'>
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
                    
                    <DefiPosition mode='staking' />
            
            </TableBody>
        </Table>
                </div>
                
            </article>


            {/* <article>
                <header className='flex justify-between items-center'>
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
                </header>
                <div className='bg-grey-light/10 relative'>
                    <Badge 
                        variant={'Staking'}
                        className='absolute left-[-10px] top-2 rounded-sm'>
                        Staking
                    </Badge>
                <Table className='mt-7'>
            <TableHeader>
                <TableRow>
                    <TableHead>Pool</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Valor en USD</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
               
            <TableRow >
                        <TableCell>
                            <div className='flex gap-4 items-center '>
                                <Image alt="arbitrum" src='https://static.alchemyapi.io/images/assets/11841.png' width={40} height={40} />
                                <span>
                                   $ARB
                                </span>
                            </div>
                            
                        </TableCell>
                        <TableCell>123 ARB</TableCell>
                        <TableCell>$123.45 </TableCell>
                         <TableCell>{token.USDValue}</TableCell> 
                    </TableRow>
            </TableBody>
        </Table>
                </div>
                
            </article> */}
        </section>
        
    </div>
  )
}

export default page