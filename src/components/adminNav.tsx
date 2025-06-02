'use client';

import Link from "next/link";
import profile from "../public/profile.webp";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function AdminNav() {
   const { data:session} = useSession();
  
  return (
    <div className="bg-[#e7dcd9] h-screen flex flex-col md:w-50 w-20 transition-all duration-300 shadow-lg">
      {/* Top section */}
      <div className="bg-[#5b5958] p-3 md:p-5 flex flex-col items-center">

       {session?.user?.image ? (
              <Image 
              width={100}
              height={80}
              src={session.user?.image}
               alt ='profile'
               className=" rounded-full "
               /> ) : (
                <Image 
              width={50}
              height={40}
              src={profile}
               alt ='profile'
               className="rounded-full md:p-3"
               />
               )
              }
        <Link
          href="/dashboard"
          className="text-white font-bold text-xs md:text-lg mt-2 text-center"
        >
        Admin
        </Link>
      </div>

  
    </div>
  );
}
