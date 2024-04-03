import React from 'react'
import Sidebar from '@/components/shared/Sidebar';
import Navbar from '@/components/shared/Navbar';
import{ ContextProvider} from '@/contexts/ContextProvider';
//import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Footer from '@/components/shared/Footer';


const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <ContextProvider>
      <main className='root'>
        <Navbar />
        
          <div className="root-container overflow-hidden md:flex">
              <Sidebar />
              
              <div className='wrapper w-full relative overflow-y-scroll'>
                    {children} 
                    <Footer />  
              </div>
              
                    
          </div>
      </main>
    </ContextProvider>
  )
}

export default Layout