// components/ThemeProvider.tsx
"use client";
import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

const ThemeProviderApp  = ( {children, attribute}: Readonly<{
  children: React.ReactNode;
  attribute: any
}> ) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


  

  return (
    <>
    {mounted ? <ThemeProvider attribute={attribute}>
       {children}
    </ThemeProvider> : <>{children}</>}

    
    </>
  );
};

export default ThemeProviderApp;