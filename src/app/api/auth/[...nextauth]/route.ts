
import NextAuth from "next-auth";   //Authentication logic တွေကို handle လုပ်ပေးတဲ့ core function
import { authOptions } from "../authOption";  //Auth configuration (providers, callbacks, session logic) တွေပါတဲ့ object တစ်ခု
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };//Next.js မှာ API route တစ်ခုပြုလုပ်တဲ့အခါ GET နဲ့ POST request နှစ်မျိုးစလုံးကို handle လုပ်ဖို့လိုတယ်။
//ဒီလိုရေးခြင်းဖြင့် login request တွေကို handle လုပ်နိုင်တယ်
