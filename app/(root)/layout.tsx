import React from "react";
import Sidebar from "@/components/shared/sidebar/Sidebar";
import Navbar from "@/components/shared/Navbar";
//import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Footer from "@/components/shared/Footer";
//import { usePrivy } from '@privy-io/react-auth';
import Collapser from "@/components/ui/Collapser";
import { getLessons } from "@/services/backend/lessons";
// import { cookies } from 'next/headers';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  // const {user} = usePrivy();
  // const cookiesStore = cookies();
  // const userString = cookiesStore.get('user')?.value;
  // const user = userString ? JSON.parse(userString) : null;
  const lessons = await getLessons();
  return (
    <main className="root">
      <Navbar
        module1={lessons && lessons["Módulo 1"]}
        module2={lessons && lessons["Módulo 2"]}
        module3={lessons && lessons["Módulo 3"]}
      />
      <Collapser />

      <div className="root-container overflow-hidden md:flex">
        <Sidebar
          module1={lessons && lessons["Módulo 1"]}
          module2={lessons && lessons["Módulo 2"]}
          module3={lessons && lessons["Módulo 3"]}
        />

        <div className="wrapper w-full flex flex-col justify-between relative overflow-auto overflow-y-hidden md:overflow-y-scroll bg-background dark:bg-transparent dark:bg-page-texture">
          <div className={`md:w-full px-2 md:px-4 2xl:w-full  `}>
            <div className="2xl:px-24 pl-1 my-20 md:my-8">{children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Layout;
