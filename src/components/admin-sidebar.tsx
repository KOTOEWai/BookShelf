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

const navigation = [
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
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Content",
    href: "/admin/content",
    icon: FileText,
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
    <div className="flex h-screen w-36 md:w-60 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <LayoutDashboard className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">Admin Panel</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
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
                      "w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      hasActiveChild && "bg-sidebar-accent text-sidebar-accent-foreground",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </span>
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pl-1 pt-1">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          pathname === child.href && "bg-sidebar-accent text-sidebar-accent-foreground",
                        )}
                      >
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
                  "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-sidebar-border p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/admin-interface.png" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col items-start text-sm">
                <span className="font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">admin@example.com</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
