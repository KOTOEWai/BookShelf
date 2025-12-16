"use client"

import {
  BoltIcon,
  BookOpenIcon,
  Layers2Icon,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
} from "lucide-react"

import {
  Avatar,

  AvatarImage,
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
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react"
import Link from "next/link"
import { p } from "node_modules/vitest/dist/chunks/reporters.d.D-el0219"
export default function UserMenu() {
     const { data:session} = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 ">
        
            {
            session?.user.image ? (
                <Avatar>
            <AvatarImage src={session?.user.image} alt="Profile image" />
             </Avatar>
            ) : (
              <Link href="/login">Login</Link>
            )
            }   
        
        </Button>
      </DropdownMenuTrigger>
       {session?.user ?
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex flex-col min-w-0">
          <span className="text-sm font-medium truncate text-foreground">
            {session?.user.name}
          </span>
          <span className="text-xs font-normal truncate text-muted-foreground">
            {session?.user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
            <span><Link href="/profile">View Profile</Link></span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <span><Link href="/saveBooks">See Saved Books</Link></span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PinIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 5</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span onClick={() => signOut()}>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      : null}
 
      
    </DropdownMenu>
  )
}
