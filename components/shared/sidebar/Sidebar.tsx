"use client";
//Imports for the component.
//React
import React from "react";
import { useStateContext } from "@/contexts/ContextProvider";
//Next
import Link from "next/link";
import Image from "next/image";

//Components
import ModulesAccordion from "./ModulesAccordion";
import { LessonProps } from "@/index";

type SidebarProps = {
  module1: LessonProps[] | undefined;
  module2: LessonProps[] | undefined;
  module3: LessonProps[] | undefined;
};

const Sidebar = ({ module1, module2, module3 }: SidebarProps) => {
  const { activeMenu } = useStateContext();
  //2xl:w-72 xl:w-64 md:w-56
  return (
    <div className={`${activeMenu ? " max-xl:w-1/5" : "w-0"} hidden lg:flex `}>
      {activeMenu && (
        <aside className="sidebar ">
          <nav className="sidebar-nav">
            <ul className="sidebar-nav_elements">
              <Link className="sidebar-nav_element" href="/portfolio">
                <Image
                  src="/icons/navigation/wallet-fill.svg"
                  alt="wallet"
                  height={25}
                  width={25}
                  className="dark:inline hidden "
                />
                <Image
                  src="/dark/icons/navigation/wallet.png"
                  alt="wallet"
                  height={25}
                  width={25}
                  className="inline dark:hidden"
                />
                Portafolio
              </Link>

              <Link className="sidebar-nav_element" href="/dashboard">
                <Image
                  src="/icons/navigation/table-fill.svg"
                  alt="Home"
                  height={25}
                  width={25}
                  className="dark:inline hidden"
                />
                <Image
                  src="/dark/icons/navigation/dashboard.svg"
                  alt="Home"
                  height={25}
                  width={25}
                  className="inline dark:hidden"
                />
                Dashboard
              </Link>

              <Link className="sidebar-nav_element" href="/analysis">
                <Image
                  src="/tools-fill.svg"
                  alt="tools"
                  height={25}
                  width={25}
                  className="dark:inline hidden"
                />
                <Image
                  src="/dark/icons/navigation/analisis.png"
                  alt="tools"
                  height={25}
                  width={25}
                  className="inline dark:hidden"
                />
                Análisis Express
              </Link>
              <Link className="sidebar-nav_element" href="/compare-assets">
                <Image
                  src="/icons/navigation/Comparativa.png"
                  alt="tools"
                  height={25}
                  width={25}
                  className="dark:inline hidden"
                />
                <Image
                  src="/dark/icons/navigation/comparar.png"
                  alt="tools"
                  height={25}
                  width={25}
                  className="inline dark:hidden"
                />
                Comparar assets
              </Link>

              <ModulesAccordion
                module1={module1}
                module2={module2}
                module3={module3}
              />

              {/* <Link 
                            className='sidebar-nav_element'
                            href="/data-on-chain"
                        >
                                <Image
                                    src='/data-on-chain.svg'
                                    alt='data-on-chain'
                                    height={25}
                                    width={20}
                                />
                            Data on Chain
                        </Link> */}
            </ul>
          </nav>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
