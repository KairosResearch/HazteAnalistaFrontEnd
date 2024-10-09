'use client';
import React from 'react'
import { Button } from '../ui/button'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { useSelectNetwork } from '@/hooks/usePortafolio';


const NetworkTabs = () => {
    const {setNetwork, network} = useSelectNetwork();
  return (
    <>
    <Tabs>

        <TabsList className="gap-5" defaultValue="arb">
            <TabsTrigger onClick={() => setNetwork('arbitrum')}
             className={`border border-black/80 dark:border-foreground mr-4 rounded-sm text-2xl font-bold 
             }`} value="arb">Arbitrum</TabsTrigger>
            <TabsTrigger onClick={() => setNetwork('ethereum')}className={`border border-black/80 dark:border-foreground mr-4 rounded-sm text-2xl font-bold 
              `} value="asja">Ethereum</TabsTrigger>
            <TabsTrigger onClick={() => setNetwork('scroll')}className={`border border-black/80 dark:border-foreground rounded-sm text-2xl font-bold 
             `} value="adja">Scroll</TabsTrigger>
        </TabsList>
    </Tabs>
        {/* <Button variant={'outline'} size={"lg"} className='text-2xl bg-transparent text-primary font-bold dark:text-white'>Ethereum</Button>
        <Button variant={'outline'} size={"lg"} className='text-2xl bg-transparent text-primary font-bold dark:text-white'>Scroll</Button>
        <Button variant={'outline'} size={"lg"} className='text-2xl bg-transparent text-primary font-bold dark:text-white'>Arbitrum</Button> */}
    </>
  )
}

export default NetworkTabs