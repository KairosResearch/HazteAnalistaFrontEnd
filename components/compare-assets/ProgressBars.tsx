'use client';
import React, {useEffect, useState} from 'react'
// import { Progress } from "@/components/ui/progress"
// import Image from 'next/image'
import { useComparativeTokens } from '@/hooks/useComparative';
import { getComparativeMarketCap } from '@/services/backend/comparativeMarketCap';
import { ComparativeInfo } from '@/index';
import SkeletonComparative from '../shared/skeletons/SkeletonComparative';

const ProgressBars = () => {
    // const {comparativeInfo, token1, token2, loading} = useComparativeTokens();
    const [comparativeInfo, setComparativeInfo] = useState<ComparativeInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const { token1, token2} = useComparativeTokens();
    const [higherMarketCap, setHigherMarketCap] = useState(0);
    const [lowerMarketCap, setLowerMarketCap] = useState(0);

    React.useEffect(() => {
        if (token1 && token2) {
            

            // Llamar al endpoint con los últimos dos valores
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await getComparativeMarketCap(token1, token2);
                    if(response){
                        setComparativeInfo(response)
                    }
                    
                    // Aquí puedes manejar los datos recibidos
                } catch (error) {
                    console.error('Fetch error:', error);
                }
                setLoading(false)
            };
            fetchData()
            
        }
    }, [token1, token2]);

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

    console.log('Esta loading?',loading)

  return (
    <>
        {/* {comparativeInfo.length === 0 && <p>Selecciona dos activos para comparar</p>} */}
        {loading && <SkeletonComparative />}    
        {!loading && comparativeInfo.length != 0 && (
            <>
                <h2 className='text-center text-lg font-light  dark:text-grey-light'>
                ${token1} con  el market cap de ${token2}
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
                        <p className='text-lg font-light  dark:text-grey-light'>
                            {
                                lowerMarketCap === comparativeInfo[0].MakCapA ? 
                                `El market cap de $${token1} por debajo del market cap de $${token2} por:`
                                : `El market cap de  $${token1} por encima del market cap de $${token2} por:`
                            }
                            
                        </p>
                </div>
                
                <div className='flex justify-center gap-4 items-center'>
                    {/* <div className='w-1/2'>
                        <Progress variant="progress" value={35} /> 
                    </div> */}
                    <div>
                       
                    </div>
                    <p className='text-green-light bg-primary dark:bg-transparent p-2 rounded-sm'>
                        {((comparativeInfo[0].MakCapA / comparativeInfo[0].MakCapB) * 100).toFixed(2).toLocaleString()}%
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