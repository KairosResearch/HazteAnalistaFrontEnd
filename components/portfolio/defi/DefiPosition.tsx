'use client'
import React, { useEffect } from 'react'
import {
    TableCell,
    TableRow,
} from "@/components/ui/table";
import Image from 'next/image';
import {useDefiPositions} from '@/hooks/usePortafolio'
import { DefiPositionsBody } from '@/index';
import SkeletonTable  from '../../shared/skeletons/SkeletonTable';
import { useSelectNetwork } from '@/hooks/usePortafolio';

type DefiPositionProps = {
    mode: 'loked' | 'staked',
    
}

const DefiPosition = (
  {mode}: DefiPositionProps
) => {

  const {network} = useSelectNetwork();

  const [address, setAddress] = React.useState('');

  const [dataToRender, setDataToRender] = React.useState<DefiPositionsBody[]>();

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const addr = window.localStorage.getItem('wallet');
    if(typeof window !== 'undefined' && addr != null){
        setAddress(addr);
    }
}, []);
  const { defiPositions, isLoading } = useDefiPositions(address);

  useEffect(() => {
    if(defiPositions){
      switch (mode) {
        case 'loked':
            switch(network){
                case 'ethereum':
                    console.log('ethereum locked:', defiPositions.lockedEthereum)
                    setDataToRender(defiPositions.lockedEthereum);
                    break;
                case 'arbitrum':
                    setDataToRender(defiPositions.lockedArbitrum);
                    break;
                case 'scroll':
                    setDataToRender(defiPositions.lockedScroll);
                    break;
            }
            break;
        default:
            switch(network){
                case 'ethereum':
                    setDataToRender(defiPositions.stackedEthereum);
                    break;
                case 'arbitrum':
                    setDataToRender(defiPositions.stackedArbitrum);
                    break;
                case 'scroll':
                    setDataToRender(defiPositions.stackedScroll);
                    break;
            }
            break;
      }
    }
    console.log('defi Positions:', defiPositions)
}


, [defiPositions, network]);

useEffect(() => {
  if(isLoading){
      setLoading(true);
  } else
  {
      setLoading(false);
  }
}, [isLoading]);
  return (
    <>
      {
          loading && <SkeletonTable />
      }

      {
        !dataToRender || dataToRender?.length === 0 && <div>No encontramos posiciones DeFi en tu wallet</div>
      }
      {
          dataToRender && dataToRender.map((position, index) => (
              <TableRow key={index}>
                  <TableCell>
                      <div className='flex gap-4 items-center '>
                          <Image alt="arbitrum" src={position.icon_url ? position.icon_url.url : '/kairos-main.svg'} width={30} height={30} />
                          <span>
                              {position.name_protocol}
                          </span>
                      </div>
                      
                  </TableCell>
                  <TableCell>{position.monto_loked.toFixed(2).toLocaleString()} {position.simbolo}</TableCell>
                  {
                      position.fiat_value && (
                          <TableCell>${position.fiat_value.toFixed(2).toLocaleString()}</TableCell>
                      )
                  }
                  {/* <TableCell>{token.USDValue}</TableCell> */}
              </TableRow>
          ))
      }
              
    </>
  )
}

export default DefiPosition