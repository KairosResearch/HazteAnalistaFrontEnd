'use client';
import React, {useEffect, useState} from 'react'
// import { Progress } from "@/components/ui/progress"
// import Image from 'next/image'
import { useComparativeTokens } from '@/hooks/useComparative';

const ProgressBars = () => {
    const {comparativeInfo, token1, token2, loading} = useComparativeTokens();
    const [higherMarketCap, setHigherMarketCap] = useState(0);
    const [lowerMarketCap, setLowerMarketCap] = useState(0);

    useEffect(() => {
        if (comparativeInfo.length != 0) {
            const { MakCapA, MakCapB } = comparativeInfo[0];
            if (MakCapA > MakCapB) {
                setHigherMarketCap(MakCapA);
                setLowerMarketCap(MakCapB);
            } else if (MakCapB > MakCapA) {
                setHigherMarketCap(MakCapB);
                setLowerMarketCap(MakCapA);
            } 
        }
    }, [comparativeInfo]);

  return (
    <>
        {comparativeInfo.length === 0 && <p>Selecciona dos activos para comparar</p>}
        {loading && <p>Cargando...</p>}
        {!loading && comparativeInfo.length != 0 && (
            <>
                <h2 className='text-center text-lg font-light  text-grey-light'>
                 Averigua el precio de ${token1} si tuviera el market cap de ${token2}
            </h2>
            <div className='flex items-center w-3/5 mx-auto justify-between font-bold text-2xl'>
            {/* <Image
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                            alt="btc"
                            width={40}
                            height={40}
                        /> */}
                <p>
                $ {comparativeInfo[0].ProyecPrecio.toFixed(2).toLocaleString()}
                </p>
                <p>
                    {"("}{comparativeInfo[0].PorcentajeX.toFixed(1).toLocaleString()}%{")"}
                </p>
                <p>
                    {comparativeInfo[0].NoX.toFixed(2)}X
                </p>
            </div>
            <div className='w-4/5 mx-auto flex flex-col gap-1'>
                <div className='flex justify-between items-center'>
                    {/* <div className='w-1/2'>
                        <Progress variant="first" value={50} /> 
                    </div> */}
                    <div>
                        {/* <Image
                                src="https://static.alchemyapi.io/images/assets/825.png"
                                alt="usdt"
                                width={20}
                                height={20}
                            /> */}
                        <span>
                            {
                                higherMarketCap === comparativeInfo[0].MakCapA ? token1 : token2
                            }
                        </span>
                    </div>
                    <p className='text-green-dark'>
                        $ {higherMarketCap.toLocaleString()}
                    </p>
                   
                    
                
                </div>
                 
                <div className='flex justify-between items-center'>
                    {/* <div className='w-1/2'>
                        <Progress variant="last" value={20} /> 
                    </div> */}
                    <div>
                        
                    {/* <Image
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                            alt="btc"
                            width={20}
                            height={20}
                        /> */}
                        <span>
                            {
                                lowerMarketCap === comparativeInfo[0].MakCapA ? token1 : token2
                            }
                        </span>
                    </div>
                    <p className='text-destructive'>
                        $ {lowerMarketCap.toLocaleString()}
                    </p>
                   
                    
                
                </div>
                
                <div className='flex justify-center items-center'>
                        <p className='text-lg font-light  text-grey-light'>
                            {
                                lowerMarketCap === comparativeInfo[0].MakCapA ? 
                                `Porcentaje del market cap de ${token1} para alcanzar el market cap de ${token2}`
                                : `Porcentaje del market cap de ${token1} por encima del market cap de ${token2}`
                            }
                            :
                        </p>
                </div>
                
                <div className='flex justify-center gap-4 items-center'>
                    {/* <div className='w-1/2'>
                        <Progress variant="progress" value={35} /> 
                    </div> */}
                    <div>
                        <span>
                            Porcentaje:
                        </span>
                    </div>
                    <p className='text-green-light'>
                        {comparativeInfo[0].Progreso.toFixed(2).toLocaleString()}%
                    </p>
                </div>
                
                <div>
                    
                </div>
            </div>

            
            </>
        )}
        
    </>
  )
}

export default ProgressBars