import { Metadata } from "next";
import "../globals.css"

export const metadata: Metadata = {
 
  description: "Book Shelf ",
 
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
     
       {children}
      
      </body>
    </html>
  );
}