'use client';
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import ComboboxDemo from '@/components/dashboard/form/ComboboxName'
import {getComparativeMarketCap} from '@/services/backend/comparativeMarketCap'
import {useComparativeTokens} from '@/hooks/useComparative'
import { set } from 'zod';

interface SelectAssetsNameProps {
    projectsList: {
        id: number;
        proyecto: string;
        ticker: string;
        symbol: string;
    }[];
}


const SelectAssetsName = ({
    projectsList
}: SelectAssetsNameProps) => {
    
    const {setComparativeInfo, token1, token2, setLoading} = useComparativeTokens()
    
    const field= {
        value: 0,
        onChange: (newValue: number) => {
           return
        },
    };


    const [symbol, setSymbol] = React.useState<string>('');
    // const [lastTwoFields, setLastTwoFields] = React.useState<string[]>([]);

     // Efecto para actualizar lastTwoFields cuando symbol cambie
     

    React.useEffect(() => {
        if (token1 && token2) {
            setLoading(true);

            // Llamar al endpoint con los últimos dos valores
            const fetchData = async () => {
                try {
                    const response = await getComparativeMarketCap(token1, token2);
                    if(response){
                        setComparativeInfo(response)
                    }
                    
                    // Aquí puedes manejar los datos recibidos
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            };
            fetchData()
            setLoading(false)
        }
    }, [token1, token2]);

    // console.log('Los campos seleccionados son:', field);
    

  return (
    <>
            <Card className='w-5/12 bg-grey-light/20'>
                    <CardContent className='flex justify-between items-center w-full '>

                        <ComboboxDemo
                            projects={projectsList}
                            field={field}
                            setSymbol={setSymbol}
                            clearErrors={(name: string) => {return}}
                            comboSide={'left'}
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
                            projects={projectsList}
                            field={field}
                            setSymbol={setSymbol}
                            clearErrors={(name: string ) => {return}}
                            comboSide={'right'}
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

    </>
  )
}

export default SelectAssetsName