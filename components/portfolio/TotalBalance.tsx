'use client'

import React, {useEffect} from 'react'
import {getBalances} from '@/services/backend/balances'

const TotalBalance = () => {
    const [balance, setBalance] = React.useState(0);
    useEffect(() => {
        // Fetch the data from the backend
        async function fetchData() {
            const addr = window.localStorage.getItem('wallet');

            if(typeof window != 'undefined' && addr != null){
                const response = await getBalances('0x25681Ab599B4E2CEea31F8B498052c53FC2D74db');

                console.log(response);
                setBalance(response.TotalBalance);
            }
        }
        fetchData();
    }, []   )
  return (
    <div>
        $ {balance}
    </div>
  )
}

export default TotalBalance