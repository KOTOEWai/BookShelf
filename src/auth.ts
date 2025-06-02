import { getServerSession } from "next-auth";

import { authOptions }  from "@/app/lib/auth/authOptions"
export async function auth(){
    const session  = await getServerSession(authOptions)
    return session?.user ;
}