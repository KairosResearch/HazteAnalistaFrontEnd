import React from 'react'
//import Sidebar from '@/components/shared/Sidebar';
import Navbar from '@/components/shared/Navbar';
const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='root'>
      {/* <Sidebar /> */}

      <Navbar />

        <div className="root-container mt-10">
            <div className="wrapper">
                {children}
            </div>
        </div>
    </main>
  )
}

export default Layout