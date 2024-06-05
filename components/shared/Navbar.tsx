'use client';
import React, { useEffect } from 'react'
import Link from 'next/link'
//UI comps
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image';
import PopoverForm from './PopoverForm';

//Auth Stuff
import { usePrivy } from '@privy-io/react-auth';

// import DialogAlert from './DialogAlert';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const Navbar = () => {

const {logout} = usePrivy();

window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  logout();
})


  //Añadir el de twitter y validar si es web 2 poner nombre completo, si es web 3 poner la direccion cortada

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
          {/* <nav className='hidden sm:block'>
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
           */}
          <div className='flex gap-4 flex-center'>
            


            <PopoverForm 
              usage='userinfo'
            />  
            

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
                              <Link className='header-nav_text'
                                href='/dashboard'
                              >
                                    <Image 
                                      src='/icons8-casa.svg'
                                      alt='Kairos'
                                      width={20}
                                      height={20}
                                    />
                                      Home
                                  </Link>
                              
                              <Link className='header-nav_text'
                                href='/lessons'
                              >
                                    <Image 
                                      src='/lessons.svg'
                                      alt='Kairos'
                                      width={20}
                                      height={20}
                                    />
                                  
                                      Apredizaje
                                  </Link>
                              
                              <Link className='header-nav_text'
                                href='/tools'
                              >
                                    <Image 
                                      src='/tools-fill.svg'
                                      alt='Kairos'
                                      width={20}
                                      height={20}
                                    />
                                    Herramientas
                                  </Link>
                              
                              <Link className='header-nav_text'
                                href="/data-on-chain"
                              >
                                    <Image 
                                      src='/data-on-chain.svg'
                                      alt='Kairos'
                                      width={20}
                                      height={20}
                                    />

                                      Data On Chain
                                  </Link>
                              
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