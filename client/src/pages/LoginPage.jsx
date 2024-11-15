import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'

const LoginPage = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    const navigate = useNavigate()
    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    })


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const handleForm = async (values) => {
        try {
            const response = await fetch(`${baseUrl}/api/auth/login`, {
                method: 'Post',
                headers: { "Content-type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(values)
            })
            const data = await response.json()
            if (data.status) {
                toast({
                    title: "Login Status!",
                    description: data.message,
                })
                navigate('/dashboard')
            } else {
                toast({
                    title: "Login Status!",
                    description: data.message,
                    variant: "destructive"
                })
            }

        } catch (error) {
            toast({
                title: "Login Status!",
                description: error.message,
                variant: "destructive"
            })
        }
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <Card className="pt-5 w-[400px]">
                <CardContent>
                    <h2 className='text-center font-semibold text-xl mb-3'>Login Into Account</h2>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(handleForm)}>

                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='mt-4'>
                                <Button className="w-full">Login</Button>
                            </div>

                            <div className='flex justify-center text-sm mt-4'>
                                <p>Don't have account? <Link to="/register" className='underline text-blue-500'>Register now</Link></p>
                            </div>

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage