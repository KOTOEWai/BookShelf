import connectToMongo from "@/app/lib/db";
import { NextResponse } from "next/server";
import User  from "@/app/models/user"



export async function addUser(
    image: string,
    name:string,
    email:string,
    password:string
){
    console.log(name)
    try{
        await new Promise((resolve)=> setTimeout(resolve,1500));
        await connectToMongo();
        const CreateUser = await User.create({
            image,
            name,
            email,
            password
        })
        return NextResponse.json(CreateUser)
    }catch(error){
        console.error(error)
    }
}

