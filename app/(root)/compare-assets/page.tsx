import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import ComboboxDemo from '@/components/dashboard/form/ComboboxName'
import { getProjectsList } from '@/services/backend/proyectsInfo'



const page = async () => {
    const projectsList = await getProjectsList()
  return (
    <div>
        
        <h1>
                Compara  el market cap de diferentes activos
            </h1>

        <section className='flex flex-col gap-4 my-6 mx-auto w-7/12'>
            <div className='flex justify-between items-center'>
                <Card className='w-5/12 bg-grey-light/20'>
                    <CardContent className='flex justify-between items-center w-full '>

                        <ComboboxDemo
                            projects={projectsList.proyectos}
                            field={''}
                            setSymbol={''}
                            clearErrors={''}
                        />
                     
                        {/* <Image
                            src="https://static.alchemyapi.io/images/assets/825.png"
                            alt="usdt"
                            width={40}
                            height={40}
                        />

                        
                        USDT
                        <ChevronDown size={24} /> */}
                    </CardContent>
                </Card>
                <Image
                    src="/icons/navigation/Comparativa.png"
                    alt="compare"
                    width={40}
                    height={40}
                >

                </Image>

                <Card className='w-5/12 bg-grey-light/20'>
                    <CardContent className='flex justify-between items-center w-full '>

                    <ComboboxDemo
                            projects={projectsList.proyectos}
                            field={''}
                            setSymbol={''}
                            clearErrors={''}
                        />
                        
                        {/* <Image
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                            alt="btc"
                            width={40}
                            height={40}
                        />

                        
                        ETH
                        <ChevronDown size={24} /> */}
                    </CardContent>
                </Card>
            </div>
            <h2 className='text-center text-lg font-light  text-grey-light'>
                USDT con el market cap de ETH
            </h2>
            <div className='flex items-center w-3/5 mx-auto justify-between font-bold text-2xl'>
            <Image
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                            alt="btc"
                            width={40}
                            height={40}
                        />
                <p>
                $1,234,567,890.123
                </p>
                <p>
                    (1.23 X)
                </p>
            </div>
            <div className='w-4/5 mx-auto flex flex-col gap-1'>
                <div className='flex justify-between items-center'>
                    <div className='w-1/2'>
                        <Progress variant="first" value={50} /> 
                    </div>
                    <div>
                        <Image
                                src="https://static.alchemyapi.io/images/assets/825.png"
                                alt="usdt"
                                width={20}
                                height={20}
                            />
                    </div>
                    <p className='text-green-dark'>
                        $1,234,567,890.123
                    </p>
                   
                    
                
                </div>
                 
                <div className='flex justify-between items-center'>
                    <div className='w-1/2'>
                        <Progress variant="last" value={20} /> 
                    </div>
                    <div>
                        
                    <Image
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                            alt="btc"
                            width={20}
                            height={20}
                        />
                    </div>
                    <p className='text-destructive'>
                        $1,234,567,890.123
                    </p>
                   
                    
                
                </div>
                <div className='flex justify-between items-center'>
                    <div className='w-1/2'>
                        <Progress variant="progress" value={35} /> 
                    </div>
                    <div>
                        <span>
                            progreso
                        </span>
                    </div>
                    <p className='text-green-light'>
                        $1,234,567,890.123
                    </p>
                   
                    
                
                </div>
                
            </div>

            <h2 className='text-center text-lg text-grey-light font-light mt-0'>
            BTC está  1.23X por encima de ETH
            </h2>

        </section>
    </div>
  )
}

export default page