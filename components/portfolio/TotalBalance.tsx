'use client'

import React, {useEffect} from 'react'
// import {getBalances} from '@/services/backend/balances'
import { usePortafolio } from '@/hooks/usePortafolio';
import Loading from '../shared/Loading';

const TotalBalance = () => {
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
            setBalance(portafolio.TotalBalance);
        }
    }, [portafolio]);
    
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