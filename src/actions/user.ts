'use server';

import { addUser } from '@/app/api/fetchUser/user';
import connectToMongo from "@/app/lib/db";
import  User  from "@/app/models/user";
import bcrypt from 'bcryptjs';



export type Errors = {
  image?: string;
  name?: string;
  email?: string;
  password?: string;
  message?: string;
};

export type FormState = {
  errors: Errors;
};






export async function createUser(prevState: FormState, formData: FormData) {
  const Image = formData.get("image") as string;
  const Name = formData.get("name") as string;
  const Email = formData.get('email') as string;
  const Password = formData.get('password') as string;
  
  const errors: Errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!Image) errors.image = 'Image is required';
  if (!Name) errors.name = 'Name is required';
  if (!Email) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(Email)) {
    errors.email = 'Invalid email format';
  }
  if (!Password) {
    errors.password = 'Password is required';
  } else if (Password.length < 5) {
    errors.password = 'Password must be at least 5 characters long';
  }

  if (Object.keys(errors).length > 0) return { errors };
   
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(Password, salt);

  try {
    await connectToMongo();

    const existingUser = await User.findOne({ email: Email });
    if (existingUser) {
      return { errors: { email: 'Email already exists' } };
    }

    await addUser(Image, Name, Email, hashedPassword);
  } catch (error) {
    console.error(error);
    return { errors: { message: "Server error occurred" } };
  }

  return { errors: {}  };
}


