"use client";
import React, { useEffect } from "react";
import Link from "next/link";
//UI comps
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import PopoverForm from "../auth/PopoverForm";

//Auth Stuff
import { usePrivy } from "@privy-io/react-auth";

// import DialogAlert from './DialogAlert';
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Navbar = () => {
  //Añadir el de twitter y validar si es web 2 poner nombre completo, si es web 3 poner la direccion cortada

  return (
    <header className="navbar fixed md:relative bg-black/90 md:bg-inherit md:z-0 z-50">
      <div>
        <Link className=" text-xl font-bold md:text-2xl" href="#">
          <Image src="/kairos-main.svg" alt="Kairos" width={50} height={50} />
        </Link>
      </div>
     
      <div className="flex gap-4 flex-center">
        <PopoverForm usage="userinfo" />

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

            <SheetContent className="w-64">
              <SheetHeader>
                <SheetTitle>Kairos</SheetTitle>
              </SheetHeader>
              <nav>
                <ul className="header-nav_elements">
                  <Link className="header-nav_text" href="/dashboard">
                    <Image
                      src="/home-4-line.svg"
                      alt="Kairos"
                      width={20}
                      height={20}
                    />
                    Home
                  </Link>

                  <Link className="header-nav_text" href="/lessons">
                    <Image
                      src="/lessons.svg"
                      alt="Kairos"
                      width={20}
                      height={20}
                    />
                    Metodología 4E
                  </Link>
                  {/* 
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
                              </Link> */}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
