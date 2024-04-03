'use client';
import React, { useContext } from 'react'
import Link from 'next/link'
import {useStateContext} from '@/contexts/ContextProvider';

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
                            <Link href='#'>
                                
                                <span>Home</span>
                                
                            </Link>
                        </li>
                        <li className='sidebar-nav_element'>
                            <Link href='#'>Aprendizaje</Link>
                        </li>
                        <li className='sidebar-nav_element'>
                            <Link href='#'>Herramientas</Link>
                        </li>
                        <li className='sidebar-nav_element'>
                            <Link href='#'>Data On Chain</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        }   
        </div>
        
    );
};

export default Sidebar;
