
import { NextProvider } from "./NextAuthProvider";
import type { Metadata } from "next";
import "../globals.css";
import {Inter} from "next/font/google";
const inter = Inter({ subsets: ['latin'], weight: ['400','700'] });

import Navbar from "@/components/nav";

import Head from 'next/head'
import { Footer } from "@/components/footer";
import { SavedBooksProvider } from "../context/SavedBooksContext";

export const metadata: Metadata = {
  title : {
    default: 'Book Shelf',
    template: '%s | Book Shelf',
  },
  description: "This is Book Shelf Application built with Next.js 13 and TypeScript!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}> 
      <body>
        <Head>
               <link rel="icon" href='/favicon.ico' />
        </Head>

  <NextProvider >
      <Navbar/>
      
        <SavedBooksProvider> {children}</SavedBooksProvider>
     
      <Footer/>
 </NextProvider>
      </body>
    </html>
  );
}
