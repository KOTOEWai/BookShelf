import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
import "./globals.css";
import Navbar from "@/components/adminNav";
import { Provider } from "@/app/(customer)/prodiver";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

       
        <Suspense fallback={<Loading />}>
        <div className="flex ">
          <Provider>
                    <Navbar />
                      {children}
           </Provider>
                 </div></Suspense>
      
      </body>
    </html>
  );
}
