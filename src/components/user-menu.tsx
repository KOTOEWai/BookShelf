"use client"

import {
  User,
  Settings,
  Bookmark,
  LogOut,
  CreditCard,
  HelpCircle,
  PlusCircle,
  ShieldCheck
} from "lucide-react"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function UserMenu() {
  const { data: session } = useSession()

  if (!session?.user) {
    return (
      <Button asChild variant="default" className="rounded-full px-6 bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95">
        <Link href="/login">Login</Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-accent/20 p-0 hover:bg-accent/5 transition-all hover:scale-110 active:scale-95">
          <Avatar className="h-full w-full">
            <AvatarImage src={session.user.image ?? ""} alt={session.user.name ?? "User"} />
            <AvatarFallback className="bg-accent/10 text-accent font-bold">
              {session.user.name?.charAt(0) ?? "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 mt-2 p-2 border-none shadow-2xl bg-card/95 backdrop-blur-md" align="end">
        <DropdownMenuLabel className="flex flex-col p-4 mb-2 rounded-xl bg-accent/5">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-background shadow-md">
              <AvatarImage src={session.user.image ?? ""} alt={session.user.name ?? "User"} />
              <AvatarFallback className="bg-accent/10 text-accent text-lg font-bold">
                {session.user.name?.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-base font-bold truncate text-foreground">
                {session.user.name}
              </span>
              <span className="text-xs font-medium truncate text-muted-foreground/80">
                {session.user.email}
              </span>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-500/10 text-green-600 text-[10px] font-bold uppercase tracking-wider w-fit">
            <ShieldCheck className="w-3 h-3" />
            Verified Reader
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-border/50" />

        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent/10 focus:bg-accent/10">
              <User size={18} className="text-accent" />
              <span className="font-semibold text-sm">View Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/saveBooks" className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-black/10 hover:text-accent focus:bg-black/10">
              <Bookmark size={18} className="text-accent" />
              <span className="font-semibold hover:text-accent text-sm">My Library</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/pricing" className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent/10 focus:bg-accent/10">
              <CreditCard size={18} className="text-accent" />
              <span className="font-semibold hover:text-accent text-sm">Subscription</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border/50" />

        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent/10 focus:bg-accent/10">
            <Settings size={18} className="text-muted-foreground" />
            <span className="font-medium hover:text-accent text-sm">Account Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent/10 focus:bg-accent/10">
            <HelpCircle size={18} className="text-muted-foreground" />
            <span className="font-medium hover:text-accent text-sm">Support Center</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border/50" />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center gap-3 p-3 m-1 rounded-lg cursor-pointer transition-colors hover:bg-destructive/10 text-destructive focus:bg-destructive/10"
        >
          <LogOut size={18} className="text-accent" />
          <span className="font-bold hover:text-accent text-sm">Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
