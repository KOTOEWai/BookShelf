"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { RegisterFormSchema } from "@/lib/validation-shcemas"
import Link from "next/link"
export default function MyForm() {
   const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null)
   const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      image: undefined,
      name: "",
      email: "",
      password: "",
    },
  })

  // ✅ handle image change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("image", file)
      setPreview(URL.createObjectURL(file))
    }
  }

 async function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
  
  try {
    setLoading(true)
    // ✅ Image Upload
    let imageUrl = ""
    if (values.image) {
      const formData = new FormData()
      formData.append("file", values.image)
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await uploadRes.json()
      if(!uploadRes.ok || !data.url) throw new Error("Upload failed")
      imageUrl = data.url
    }

    // ✅ User register
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      image: imageUrl,
    }

    const res = await fetch("/api/fetchUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    
    if(res.ok) {
      toast.success("Registration successful!")
       await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })
      router.push("/")
    }
  } catch (error) {
    console.error("Form submission error", error)
    toast.error("Upload or submit failed!")
  }finally {
    setLoading(false)
  }
}


  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-linear-to-b from-gray-50 to-gray-100">
      <Card className="w-full max-w-md border border-gray-200 shadow-lg rounded-2xl">
        
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Create Account</CardTitle>
          <CardDescription>Fill in your details to register</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ToastContainer />

              {/* ✅ Image Upload */}
              <div className="flex flex-col items-center">
                <label
                  htmlFor="upload"
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  {preview ? (
                    <Image
                      src={preview}
                      alt="preview"
                      width={80}
                      height={80}
                      className="object-cover border border-gray-300 rounded-full"
                    />
                  ) : (
                    <Image
                      src="/default-profile.png"
                      alt="profile"
                      width={80}
                      height={80}
                      className="object-cover border border-gray-300 rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-600">
                    Upload Image
                  </span>
                </label>
                <input
                  id="upload"
                  name="image"
                  type="file"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* ✅ Username */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name..." {...field} />
                    </FormControl>
                    <FormDescription>This is your display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email..." type="email" {...field} />
                    </FormControl>
                    <FormDescription>Your email address.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Enter your password..." {...field} />
                    </FormControl>
                    <FormDescription>Enter a secure password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
  {loading ? (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
      Processing...
    </div>
  ) : (
    "Submit"
  )}
</Button>

            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center text-sm text-gray-500">
          Already have an account?{" "}
          <span className="ml-1 text-blue-600 cursor-pointer hover:underline">
             <Link href="/login" className="underline">
              Login
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  )
}
