import React from 'react'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



const Navbar = () => {
  return (
    
    <header className="navbar">
          <div>
              <Link className=" text-xl font-bold md:text-2xl" href="#">
                Kairos
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
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>Us</AvatarFallback>
            </Avatar>

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
                                <Link href="/about">
                                    Home
                                </Link>
                            </li>
                            <li className='header-nav_text'>
                                <Link href="/services">
                                    Apredizaje
                                </Link>
                            </li>
                            <li className='header-nav_text'>
                                <Link href="/contact">
                                    Herramientas
                                </Link>
                            </li>
                            <li className='header-nav_text'>
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