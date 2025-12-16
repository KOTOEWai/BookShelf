
import { AdminSidebar } from "@/components/admin-sidebar"
import "./globals.css"
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ['latin'], weight: ['400','700'] });
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto bg-background">{children}</main>
    </div>
    </body>
    </html>
  )
}
