'use client'
import React, {useEffect, useState} from 'react'
import { usePortafolio } from '@/hooks/usePortafolio'; 

import Image from 'next/image';
import { Balances } from '@/index';
import SkeletonTable from '../shared/skeletons/SkeletonTable';

const PortfolioInfo = () => {


    const [address, setAddress] = React.useState('');
    const [tokensData, setTokensData] = React.useState<Balances[]>();
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        const addr = window.localStorage.getItem('wallet');
        if(typeof window !== 'undefined' && addr != null){
            setAddress(addr);
        }
    }, []);
    const { portafolio, isLoading } = usePortafolio(address);
   
    useEffect(() => {
        if(isLoading){
            setLoading(true);
        } else
        {
            setLoading(false);
        }
    }, [isLoading]);
    useEffect(() => {
        if(portafolio){
            setTokensData(portafolio.Balances);
        }
    }, [portafolio]);

    
   
  return (
    <>
    {
        loading && <SkeletonTable />
    }
        {tokensData && tokensData.map((token, index) => (

            <div key={index} className='flex gap-4 bg-black p-2 rounded-md items-center'>
                <div className='hidden sm:block'>
                    <Image src={token.logo} alt={token.simbolo} width={30} height={30} />
                </div>
                <div className='flex flex-col gap-1 items-start'>
                    <h6 className='text-xs lg:text-md'>
                        {token.simbolo}
                    </h6>
                    <p className=' p-0 m-0 text-xs lg:text-xl font-extrabold'>
                     {token.balanceCrypto.toLocaleString()}
                    </p>
                </div>
            
                
            </div>
        ))}
        
    </>
  )
}

export default PortfolioInfo