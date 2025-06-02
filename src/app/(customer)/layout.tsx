
import { Provider } from "./prodiver";
import type { Metadata } from "next";
import "../globals.css";

import Navbar from "@/components/nav";
import Footer from "@/components/footer";
import Head from 'next/head'

export const metadata: Metadata = {
  title: "Book Store",
  description: "Book Store",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    
    <html lang="en">
      <body>
        <Head>
               <link rel="icon" href='/favicon.ico' />
        </Head>

  <Provider >
      <Navbar/>
      
       {children}
        
      <Footer/>
 </Provider>
      </body>
    </html>
  );
}
