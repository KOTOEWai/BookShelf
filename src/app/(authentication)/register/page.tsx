import Register from "./register"

import { Metadata } from "next"

export const metadata:Metadata = {
  title: "Register | BookLibrary",
  description: "Register to your BookLibrary account",
};

export default function Page(){
    return <Register/>
}