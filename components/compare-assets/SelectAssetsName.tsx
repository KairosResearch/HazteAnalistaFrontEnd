'use client';
import React, {useEffect} from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import ComboboxDemo from '@/components/dashboard/form/ComboboxName'
import {useComparativeTokens} from '@/hooks/useComparative'


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
    
    const {token1, token2, setToken1, setToken2} = useComparativeTokens();  
    
    //Restarting the value of tokens when page is reloaded
    useEffect(() => {
        setToken1('')
        setToken2('')
    }, [])

    //State to change the side of the combo boxes
    const [changedPosition, setChangedPosition] = React.useState<boolean>(false);
    //State to store the value of the combo box and change it
    const [valueA, setValueA] = React.useState("");
    const [valueB, setValueB] = React.useState("");
    
    //This field var does not affect anything, is just to avoid type errors
    const field= {
        value: 0,
        onChange: (newValue: number) => {
           return
        },
    };


    const [symbol, setSymbol] = React.useState<string>('');

    //Here we fetch the data from the backend
    

    // console.log('Los campos seleccionados son:', field);
    

  return (
    <>
            <Card className='w-5/12 bg-grey-light/20'>
                    <CardContent className='flex justify-between items-center w-full '>

                        <ComboboxDemo
                            projects={projectsList}
                            field={field}
                            setSymbol={setSymbol}
                            value={valueA}
                            setValue={setValueA}
                            clearErrors={(name: string) => {return}}
                            comboSide={changedPosition ? 'right' : 'left'}
                        />
                     
                      
                    </CardContent>
                </Card>
                <Image
                    src="/icons/navigation/Comparativa.png"
                    alt="compare"
                    width={40}
                    height={40}
                    className='cursor-pointer bg-primary p-2 rounded-full dark:bg-transparent'
                    onClick={() => {
                        setChangedPosition(!changedPosition);
                        setToken1(token2)
                        setToken2(token1)
                        setValueA(valueB)
                        setValueB(valueA)
                    }}
                >

                </Image>

                <Card className='w-5/12 bg-grey-light/20'>
                    <CardContent className='flex justify-between items-center w-full '>

                    <ComboboxDemo
                            projects={projectsList}
                            field={field}
                            setSymbol={setSymbol}
                            value={valueB}
                            setValue={setValueB}
                            clearErrors={(name: string ) => {return}}
                            comboSide={changedPosition ? 'left' : 'right'}
                        />
                        
                  
                  
                    </CardContent>
                </Card>

    </>
  )
}

export default SelectAssetsName