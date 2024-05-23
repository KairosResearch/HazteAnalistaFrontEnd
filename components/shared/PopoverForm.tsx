import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { usePrivy } from '@privy-io/react-auth';
import { useLogout } from '@privy-io/react-auth';

import { useRouter } from 'next/navigation';

import SearcherResults from './SearcherResults';
import LinkAccounts from './LinkAccounts';


interface PopoverFormProps {
    usage: 'searcher' | 'userinfo';
}


const PopoverForm = ({usage}: PopoverFormProps) => {
    const router = useRouter();
    const {user} = usePrivy();
    const name = user?.wallet?.address || user?.google?.name || user?.email?.address;

    const {logout} = useLogout({
        onSuccess: () => {
          router.push('/')
        },
      });


    
    return (
        <Popover>
            <PopoverTrigger asChild className='cursor-pointer'>
                <Avatar>
                <AvatarImage src="" />
                <AvatarFallback></AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="px-3 py-2">
                {
                    usage === 'userinfo' && (
                        
                            <div >
                                <div className="flex flex-col justify-center gap-3">
                                    <div className='flex gap-1'>
                                        <h2>Hola,  </h2>
                                        <h2>{name?.length ?? 0 > 10 ? `${name?.substring(0, 5)}...${name?.substring(name?.length - 3)}` : name}</h2>
                                    </div>

                                        <LinkAccounts />
                                        <div className='flex justify-center mt-1 '>
                                            <Button variant={'destructive'} 
                                                size={'sm'} 
                                                className='w-2/5 '  
                                                onClick={logout}>
                                                Cerrar sesion
                                            </Button>
                                        </div>

                                        
                                    
                                </div>      
                            </div>
                    ) 
                }
                
                {
                    usage === 'searcher' && <SearcherResults />
                }
                
                
            </PopoverContent>
        </Popover>
    );
};

export default PopoverForm