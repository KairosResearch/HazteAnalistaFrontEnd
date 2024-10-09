'use client'

import React, {useEffect} from 'react'
// import {getBalances} from '@/services/backend/balances'
import { usePortafolio } from '@/hooks/usePortafolio';
import Loading from '../shared/Loading';
import { useSelectNetwork } from '@/hooks/usePortafolio'; 

const TotalBalance = () => {
    const {network} = useSelectNetwork();

    const [balance, setBalance] = React.useState(0);
    const [address, setAddress] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        const addr = window.localStorage.getItem('wallet');
        if(typeof window !== 'undefined' && addr != null){
            setAddress(addr);
        }
    }, []);

    const { portafolio, isLoading } = usePortafolio(address);

    useEffect(() => {
        if(isLoading){
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [isLoading]);

    useEffect(() => {
        if(portafolio){
            switch(network){
                case 'ethereum':
                    setBalance(portafolio.ethereum.TotalBalance);
                    break;
                case 'arbitrum':
                    setBalance(portafolio.arbitrum.TotalBalance);
                    break;
                case 'scroll':
                    setBalance(portafolio.scroll.TotalBalance);
                    break;
            }
        }
    }, [portafolio, network]);
    
  return (
    <div>
        {
            loading && <Loading />
        }
        $ {balance.toLocaleString()}
    </div>
  )
}

export default TotalBalance