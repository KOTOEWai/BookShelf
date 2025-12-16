import InfoMenu from "@/components/info-menu"

import NotificationMenu from "@/components/notification-menu"
import UserMenu from "@/components/user-menu"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link"
import Image from "next/image";
import Logo from "@/public/book.jpg"
// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "books" },
  { href: "#", label: "Pricing" },
  { href: "/about", label: "About" },
]

export default function Component() {
  return (
    <header className="sticky top-0 z-50 px-4 border-b md:px-6 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-1 w-36 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <Link href={link.href} className="py-1.5">
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary hover:text-primary/90">
            <Image src={Logo} alt="Logo" width={50} height={50}/>
            </a>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-4">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <Link
                      href={link.href}
                      className="py-1.5 px-3 font-medium text-muted-foreground hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Info menu */}
            <InfoMenu />
            {/* Notification */}
            <NotificationMenu />
          </div>
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
