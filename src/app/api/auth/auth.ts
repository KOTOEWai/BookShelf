import { getServerSession } from "next-auth";

import { authOptions }  from "./authOption";
export default async function auth(){
    const session  = await getServerSession(authOptions)   //Server side မှာ session ကိုယူဖို့သုံးတယ် (ဥပမာ - Dashboard page, API route တွေမှာ အသုံးပြုနိုင်တယ်။)
    return session?.user ;
}