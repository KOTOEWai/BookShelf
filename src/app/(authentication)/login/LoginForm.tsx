'use client'

import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { loginFormSchema } from '@/lib/validation-shcemas'

const formSchema = loginFormSchema

export default function LoginPreview() {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values : z.infer<typeof formSchema>) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("Login successfully!", { position: "top-right" });
        router.push("/");
      } else if (res?.error) {
        toast.error(res.error || "Invalid credentials");
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen px-4">
      <ToastContainer />
      <Card className="w-[45vh]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">

                {/* EMAIL FIELD */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="johndoe@mail.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage /> {/* <-- shows validation error here */}
                    </FormItem>
                  )}
                />

                {/* PASSWORD FIELD */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link href="#" className="inline-block ml-auto text-sm underline">
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="******"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage /> {/* <-- shows validation error here */}
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full" onClick={() => signIn("google", { callbackUrl: "/" })}>
                  Login with Google
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-sm text-center">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
