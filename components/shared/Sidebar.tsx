'use client';
import React, { useContext } from 'react'
import Link from 'next/link'
import {useStateContext} from '@/contexts/ContextProvider';

const Sidebar = () => {
    const {activeMenu} = useStateContext();

    return (
        <div className={`${activeMenu ? 'w-72' : 'w-0'} hidden md:flex transition-all duration-300 ease-in-out`}>
            {activeMenu &&
            <aside className='sidebar'>
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
