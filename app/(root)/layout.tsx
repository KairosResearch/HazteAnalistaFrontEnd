'use client';
import React from 'react'
import Sidebar from '@/components/shared/Sidebar';
import Navbar from '@/components/shared/Navbar';
import{ ContextProvider} from '@/contexts/ContextProvider';
//import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Footer from '@/components/shared/Footer';
//import { usePrivy } from '@privy-io/react-auth';

// import { cookies } from 'next/headers';


const Layout = ({children}: {children: React.ReactNode}) => {
 // const {user} = usePrivy();
  // const cookiesStore = cookies();
  // const userString = cookiesStore.get('user')?.value;
  // const user = userString ? JSON.parse(userString) : null;
  return (
    <ContextProvider>
      <main className='root'>
        <Navbar />
        
          <div className="root-container overflow-hidden md:flex">
              <Sidebar />
              
              <div className='wrapper w-full relative overflow-auto overflow-y-hidden md:overflow-y-scroll bg-page-texture'>
                    {children} 
                    <Footer />  
              </div>
              
          </div>
      </main>
    </ContextProvider> 
  )
}

export default Layout