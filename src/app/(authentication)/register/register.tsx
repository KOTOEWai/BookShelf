"use client"


import photo from "@/public/smart-boy-reading-book_1308-146055.avif"
import Image from "next/image"
import Link from "next/link"
import {  useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profile from '@/public/profile.webp'
export type Data = {
    name: string,
    email: string,
    password:string,
}

export default function Register(){
   
const [ uploading,setUploading] = useState(false)
 const [ preview , setPreview] = useState<string|null>(null)

    const showToastMessage = ()=>{
        toast.success('Register created successfully', {
            position: "top-right",}
        )
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const form = e.currentTarget;
        const formData = new FormData(form);
        const imageFile = formData.get('image') as File;

    const upload = async (file: File) => {
    const uploadForm = new FormData();
    uploadForm.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: uploadForm,
    });

    const data = await res.json();
  
    return data.url;
  };
  setUploading(true)
  try{
  const imageUrl = await upload(imageFile);
  
  const payload = {
    name : formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    image: imageUrl
  }
  const res = await fetch('/api/fetchUser', {
    method: 'POST',
    headers : {
        'Content-Type': 'application/json',
        },
    body: JSON.stringify(payload),
    });
  
    if(res.ok){
    showToastMessage()
    window.location.href = '/login'
    }
 
}catch(error){
   console.log(error)
   toast.error("Failed to register. Please try again.", {
    position: "top-right",
  });


}finally{
    setUploading(false)
}
}


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  
        const file = e.target.files?.[0];
        if(file){
            const objUrl = URL.createObjectURL(file);
            setPreview(objUrl)
    }else{
        setPreview(null)
    }
}

useEffect (()=>{
    return ()=>{
        if(preview) URL.revokeObjectURL(preview)
    }
},[preview])
     
return (
       
<section className="bg-gray-100 min-h-screen  flex box-border justify-center items-center">
    <div className="bg-[#dfa674] rounded-2xl flex md:w-4xl p-5 items-center">
        <ToastContainer/>
        <div className="md:w-1/2 px-8">
            <h2 className="font-bold text-3xl text-[#002D74]">Register</h2>


            <form onSubmit={handleSubmit}  className="flex flex-col gap-3">
                
              <div className="rounded-md ">
    <label htmlFor="upload" className="flex flex-col items-center gap-2 cursor-pointer">
      {preview ? (
                
                <Image src={preview} alt="preview" width={70} height={70} className="rounded-full" />
              ) : (
                <Image src={profile} alt='profile' width={70} height={70} className="rounded-full" />
              )}
      <span className="text-gray-600 font-medium">Upload Image</span>
    </label>
    <input id="upload" name="image" type="file" onChange={handleChange} accept="image/*" className="hidden" required />
</div>
               
                 <input className="p-2 mt-1 rounded-xl border" type="text" name="name" placeholder="Your Name"/>
               
                <input  className="p-2  rounded-xl border" type="email" name="email" placeholder="Your Email"/>
               
                <div className="relative">
                    <input  className="p-2 rounded-xl border w-full" type="password" name="password" id="password" placeholder="Password"/>
                 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" id="togglePassword"
                        className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
                        viewBox="0 0 16 16">
                        <path
                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z">
                        </path>
                        <path
                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z">
                        </path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer hidden"
                        id="mama" viewBox="0 0 16 16">
                        <path
                            d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z">
                        </path>
                        <path
                            d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z">
                        </path>
                    </svg>
                </div>
                <button disabled={uploading} className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium" type="submit">{ uploading ? "Submitting...":"Submit"}</button>
            </form>


            <div className="mt-6  items-center text-gray-100">
                <hr className="border-gray-300"/>
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-300"/>
            </div>
            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium">
                    <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>

                    Login with Google
                </button>
            <div className="mt-10 text-sm border-b border-gray-500 py-5 playfair tooltip">Forget password?</div>

            <div className="mt-4 text-sm flex justify-between items-center container-mr">
                <p className="mr-3 md:mr-0 ">If you don&apos;t have an account..</p>
                <Link href={'/login'} className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">Login</Link>
            </div>
        </div>
        <div className="md:block hidden w-1/2">
            <Image className="rounded-2xl"
              width={500}
             src={photo} alt="login form image"/>
        </div>
    </div>
</section>
    )
}


