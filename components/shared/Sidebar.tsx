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
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                                    <path d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"></path>
                                </svg>
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
