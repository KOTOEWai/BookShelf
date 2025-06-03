import connectToMongo from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User  from "@/app/models/user"
import bcrypt from "bcryptjs";

export async function POST( req:NextRequest){
    try{
        await new Promise((resolve)=> setTimeout(resolve,1500));
        await connectToMongo();
        const {image,name,email,password} = await req.json();
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const CreateUser = await User.create({
            image,
            name,
            email,
            password:hashPassword 
        })
        return NextResponse.json(CreateUser)
    }catch(error){
        return NextResponse.json(error)
    }
}

