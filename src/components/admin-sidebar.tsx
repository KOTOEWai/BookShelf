"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  BarChart3,
  Package,
  ShoppingCart,
  MessageSquare,
  ChevronDown,
  LogOut,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
const navigation = [
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    name: "Products",
    icon: Package,
    children: [
      { name: "All Products", href: "/dashboard/products" },
      { name: "Categories", href: "/admin/products/categories" },
      { name: "Inventory", href: "/admin/products/inventory" },
    ],
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = React.useState<string[]>([])

  const toggleItem = (name: string) => {
    setOpenItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border/10 bg-card/30 backdrop-blur-3xl">
      {/* Logo/Brand */}
      <div className="flex h-20 items-center px-8">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/20">
            <Sparkles className="h-6 w-6 text-accent-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter text-foreground leading-none">BookShelf</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Admin</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto p-6">
        <div className="mb-4">
          <p className="px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-4">Main Menu</p>
        </div>

        {navigation.map((item) => {
          if (item.children) {
            const isOpen = openItems.includes(item.name)
            const hasActiveChild = item.children.some((child) => pathname === child.href)

            return (
              <Collapsible key={item.name} open={isOpen} onOpenChange={() => toggleItem(item.name)}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full h-12 justify-between px-3 rounded-xl transition-all duration-300 font-bold text-muted-foreground hover:bg-accent/5 hover:text-accent",
                      (isOpen || hasActiveChild) && "bg-accent/5 text-accent",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </span>
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pl-4 pt-1">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full h-10 justify-start px-4 text-xs font-bold transition-all duration-300 text-muted-foreground/70 hover:text-accent rounded-lg",
                          pathname === child.href && "text-accent bg-accent/5",
                        )}
                      >
                        <div className={cn("w-1 h-3 rounded-full bg-accent/20 mr-3 opacity-0", pathname === child.href && "opacity-100")} />
                        {child.name}
                      </Button>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )
          }

          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full h-12 justify-start gap-4 px-3 rounded-xl transition-all duration-300 font-bold text-muted-foreground hover:bg-accent/5 hover:text-accent",
                  pathname === item.href && "bg-accent/5 text-accent shadow-sm",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
                {pathname === item.href && (
                  <motion.div
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-6 rounded-full bg-accent"
                  />
                )}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full h-16 justify-start gap-3 p-2 rounded-2xl bg-accent/5 border border-accent/10 hover:bg-accent/10 transition-all group"
            >
              <Avatar className="h-10 w-10 border-2 border-background group-hover:scale-110 transition-transform">
                <AvatarImage src="/admin-interface.png" alt="Admin" />
                <AvatarFallback className="bg-accent text-accent-foreground font-black">AD</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col items-start truncate">
                <span className="text-sm font-black text-foreground">Admin User</span>
                <span className="text-[10px] font-bold text-muted-foreground/70">Main Administrator</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl border-border/10">
            <DropdownMenuLabel className="px-3 py-2 text-xs font-black uppercase tracking-widest text-muted-foreground">Account Access</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/10" />
            <DropdownMenuItem className="rounded-xl h-10 font-bold focus:bg-accent/5 focus:text-accent cursor-pointer">
              <Settings className="mr-3 h-4 w-4" />
              <span>Security Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/10" />
            <DropdownMenuItem className="rounded-xl h-10 font-bold text-destructive focus:bg-destructive/5 focus:text-destructive cursor-pointer">
              <LogOut className="mr-3 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
