'use client';
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import ComboboxDemo from '@/components/dashboard/form/ComboboxName'

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

    const [field, setField] = React.useState({
        value: 0,
        onChange: (newValue: number) => {
            setField((prev) => ({ ...prev, value: newValue }));
            setLastTwoFields((prev) => {
                const updatedFields = [...prev, newValue];
                return updatedFields.length > 2 ? updatedFields.slice(-2) : updatedFields;
            });
        },
    });

    const [lastTwoFields, setLastTwoFields] = React.useState<number[]>([]);

    React.useEffect(() => {
        if (lastTwoFields.length === 2) {
            // Llamar al endpoint con los últimos dos valores
            console.log('Llamando al endpoint con:', lastTwoFields);
            // Aquí puedes hacer la llamada al endpoint
        }
    }, [lastTwoFields]);

    console.log('Los campos seleccionados son:', field);
    console.log('Los últimos dos valores son:', lastTwoFields);
    

  return (
    <>
<Card className='w-5/12 bg-grey-light/20'>
                    <CardContent className='flex justify-between items-center w-full '>

                        <ComboboxDemo
                            projects={projectsList}
                            field={field}
                            setSymbol={(sth: void) => {return}}
                            clearErrors={(name: string) => {return}}
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
                            setSymbol={(sth: void) => {return}}
                            clearErrors={(name: string ) => {return}}
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