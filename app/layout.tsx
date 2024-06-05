import type { Metadata, NextPageContext } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import PrivyProviderWrapper from "@/providers/AuthProvider";
import{ ContextProvider} from '@/contexts/ContextProvider';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kairos | Hazte Analista",
  description: "Generated by create next app",
  icons: ['/kairos-main.svg']
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
        <body className={inter.className}>
          <ContextProvider>
            <PrivyProviderWrapper>
              {children}
            </PrivyProviderWrapper>
          </ContextProvider>
          
          
        </body>
    </html>
    

  );
}
