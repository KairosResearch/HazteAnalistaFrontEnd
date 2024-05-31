'use client';
import React, { useContext } from 'react'
import Link from 'next/link'
import {useStateContext} from '@/contexts/ContextProvider';
import Image from 'next/image';

const Sidebar = () => {
    const {activeMenu} = useStateContext();
//2xl:w-72 xl:w-64 md:w-56
    return (
        <div className={`${activeMenu ? 'max-xl:w-1/5' : 'w-0'} hidden md:flex `}>
            {activeMenu &&
            <aside className='sidebar '>
                <nav className='sidebar-nav'>
                    <ul className='sidebar-nav_elements'>
                        <li className='sidebar-nav_element'>
                            <Image
                                    src='/icons8-casa.svg'
                                    alt='Home'
                                    height={20}
                                    width={20}
                                />
                            <Link href='#'>                                
                                <span>Home</span>
                            </Link>
                        </li>
                        <li className='sidebar-nav_element'>
                                <Image
                                    src='/lessons.svg'
                                    alt='lessons'
                                    height={20}
                                    width={20}
                                />
                            <Link href='/lessons'>
                                Aprendizaje
                            </Link>
                        </li>
                        <li className='sidebar-nav_element'>
                                <Image
                                    src='/tools-fill.svg'
                                    alt='tools'
                                    height={20}
                                    width={20}
                                />
                            <Link href='/tools'>
                             
                                Herramientas
                            </Link>
                        </li>
                        <li className='sidebar-nav_element'>
                                <Image
                                    src='/data-on-chain.svg'
                                    alt='data-on-chain'
                                    height={20}
                                    width={20}
                                />
                            <Link href='/data-on-chain'>
                                
                                Data On Chain
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        }   
        </div>
        
    );
};

export default Sidebar;
