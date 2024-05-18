'use client';
import React, { useEffect } from 'react'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePrivy } from '@privy-io/react-auth';

// import DialogAlert from './DialogAlert';
import { handleLogout } from '@/actions/login';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const {user, logout, authenticated} = usePrivy();
  const router = useRouter()

  useEffect(() => {
    if(!authenticated){
      router.push('/')
    }
  }, [])
  
  useEffect(() => {
    if(!authenticated){
      router.push('/')
    }
  }, [authenticated])
  
  
  const handleLogoutSubmit = async () => {
      logout();
      // const success = await handleLogout();
      // if(success === true){
        router.push('/')
      // }
  }

  


  //Añadir el de twitter y validar si es web 2 poner nombre completo, si es web 3 poner la direccion cortada
  const name = user?.wallet?.address || user?.google?.name || user?.email?.address;

  return (
    
    <header className="navbar">
          <div>
              <Link className=" text-xl font-bold md:text-2xl" href="#">
                <Image 
                  src='/kairos-main.svg'
                  alt='Kairos'
                  width={50}
                  height={50}
                />
              </Link>
          </div>
          <nav className='hidden sm:block'>
                <ul className="flex space-evenly">
                    <li className='mr-9'>
                        <a href="#">Home</a>
                    </li>
                    <li className='mr-9'>
                        <a href="#">About</a>
                    </li>
                    <li className='mr-9'>
                        <a href="#">Services</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>
            </nav>
          
          <div className='flex gap-4 flex-center'>
            <div className='flex flex-col justify-center items-center'>
              {name?.length ?? 0 > 10 ? `${name?.substring(0, 5)}...${name?.substring(name?.length - 3)}` : name}
              <span className="cursor-pointer" onClick={handleLogoutSubmit}>
                Cerrar sesion
              </span>
            </div>
            

            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            

            <div>

            </div>
            <div className="md:hidden">
            <Sheet>
                <SheetTrigger>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  
                </SheetTrigger>

                <SheetContent className='w-64'>
                    <SheetHeader>
                        <SheetTitle>Kairos</SheetTitle>
                    </SheetHeader>
                    <nav>
                        <ul className='header-nav_elements'>
                            <li className='header-nav_text'>
                                  <Image 
                                    src='/icons8-casa.svg'
                                    alt='Kairos'
                                    width={20}
                                    height={20}
                                  />
                                <Link href="/about">
                                    Home
                                </Link>
                            </li>
                            <li className='header-nav_text'>
                                  <Image 
                                    src='/lessons.svg'
                                    alt='Kairos'
                                    width={20}
                                    height={20}
                                  />
                                <Link href="/services">
                                    Apredizaje
                                </Link>
                            </li>
                            <li className='header-nav_text'>
                                  <Image 
                                    src='/tools-fill.svg'
                                    alt='Kairos'
                                    width={20}
                                    height={20}
                                  />
                                <Link href="/contact">
                                    Herramientas
                                </Link>
                            </li>
                            <li className='header-nav_text'>
                                  <Image 
                                    src='/data-on-chain.svg'
                                    alt='Kairos'
                                    width={20}
                                    height={20}
                                  />
                                <Link href="/contact">
                                    Data On Chain
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </SheetContent>

            </Sheet>
            </div>
              
                
          </div>
            
    
    </header>

  )
}

export default Navbar