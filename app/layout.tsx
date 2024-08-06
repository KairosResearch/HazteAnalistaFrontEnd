import type { Metadata, NextPageContext } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import PrivyProviderWrapper from "@/providers/AuthProvider";
import { ContextProvider } from "@/contexts/ContextProvider";
import { SWRProvider } from "@/providers/SwrProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kairos Research | Hazte Analista",
  description: "Plataforma de análisis de proyectos web3",
  icons: ["/kairos-main.svg"],
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
          <SWRProvider>
            
              {children}
            </SWRProvider>
          </PrivyProviderWrapper>
        </ContextProvider>
      </body>
    </html>
  


  );  
}
