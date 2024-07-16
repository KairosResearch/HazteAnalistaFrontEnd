"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { useStateContext } from "@/contexts/ContextProvider";
import Image from "next/image";

const Sidebar = () => {
  const { activeMenu } = useStateContext();
  //2xl:w-72 xl:w-64 md:w-56
  return (
    <div className={`${activeMenu ? " max-xl:w-1/5" : "w-0"} hidden md:flex `}>
      {activeMenu && (
        <aside className="sidebar ">
          <nav className="sidebar-nav">
            <ul className="sidebar-nav_elements">
              <Link className="sidebar-nav_element" href="/dashboard">
                <Image
                  src="/home-4-line.svg"
                  alt="Home"
                  height={20}
                  width={20}
                />
                Dashboard
              </Link>

              <Link href="/lessons" className="sidebar-nav_element">
                <Image
                  src="/lessons.svg"
                  alt="lessons"
                  height={20}
                  width={20}
                />
                Metodología 4 E
              </Link>
              
                        <Link 
                        className='sidebar-nav_element'
                        href='/analisys'>
                                <Image
                                    src='/tools-fill.svg'
                                    alt='tools'
                                    height={20}
                                    width={20}
                                />

                             
                                Analisis Profundo 
                        </Link>
                        
                        {/* <Link 
                            className='sidebar-nav_element'
                            href="/data-on-chain"
                        >
                                <Image
                                    src='/data-on-chain.svg'
                                    alt='data-on-chain'
                                    height={20}
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
