

import type { Metadata } from "next";
import StoreProvider from "./storeProvider";
import "./globals.css";


export const metadata: Metadata = {
  title: "Book Shelf",
  description: "Book Shelf",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
       {children}
         </StoreProvider>
      </body>
    </html>
  );
}
