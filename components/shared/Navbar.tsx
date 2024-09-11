//Imports for the component
//React.
import React from "react";
//Next
import Link from "next/link";
import Image from "next/image";
//Values and utilities
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import PopoverForm from "../auth/PopoverForm";
import NotesButton from "./notes/NotesButton";
import ModulesAccordion from "./sidebar/ModulesAccordion";
import { LessonProps } from "@/index";

type NavProps = {
  module1: LessonProps[] | undefined
    module2: LessonProps[] | undefined
    module3: LessonProps[] | undefined
}

const Navbar = (
  {
    module1, module2, module3
 }: NavProps
) => {
  //Añadir el de twitter y validar si es web 2 poner nombre completo, si es web 3 poner la direccion cortada

  return (
    <header className="navbar fixed md:relative w-11/12 mx-auto flex justify-between bg-black/90 md:bg-inherit md:z-0 z-50">
      <div>
        <Link className=" text-xl font-bold md:text-2xl" href="/dashboard">
          <Image src="/kairos-main.svg" alt="Kairos" width={50} height={50} />
        </Link>
      </div>

      

      <div className="flex gap-4 md:gap-8 flex-center">
         <NotesButton />
      
        <PopoverForm usage="userinfo" />

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <svg
                className="w-8 h-6"
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
                <Link className="header-nav_text" href="/portfolio">
                    <Image
                      src="/icons/navigation/wallet-fill.svg"
                      alt="Kairos"
                      width={20}
                      height={20}
                    />
                    Portafolio
                  </Link>
                  <Link className="header-nav_text" href="/dashboard">
                    <Image
                      src="/icons/navigation/table-fill.svg"
                      alt="Kairos"
                      width={20}
                      height={20}
                    />
                    Dashboard
                  </Link>
                  

                  
                  <Link className="header-nav_text" href="/analysis">
                    <Image
                      src="/tools-fill.svg"
                      alt="tools"
                      height={20}
                      width={20}
                    />
                    Análisis Express
                  </Link>
                  <Link className="header-nav_text" href="/compare-assets">
                    <Image
                      src="/icons/navigation/Comparativa.png"
                      alt="tools"
                      height={20}
                      width={20}
                    />
                    Comparar assets
                  </Link>
                  <ModulesAccordion 
                    module1={module1}
                    module2={module2}
                    module3={module3}
                  />
               
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
