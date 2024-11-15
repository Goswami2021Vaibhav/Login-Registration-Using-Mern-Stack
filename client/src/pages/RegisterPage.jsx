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

const RegisterPage = () => {

    const baseUrl = import.meta.env.VITE_API_BASE_URL
    const navigate = useNavigate()
    const formSchema = z.object({
        name: z.string().min(3, {
            message: "Name must be at least 3 characters.",
        }),
        email: z.string().email(),
        password: z.string().min(8, { message: "Password must be at least 8 characters." }),
        confirm_password: z.string().min(8, { message: "Confirm password must be at least 8 characters." })
    }).refine((data) => data.password === data.confirm_password, { message: 'Password and confirm password should be same.' })


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
        },
    })

    const handleForm = async (values) => {
        try {
            const response = await fetch(`${baseUrl}/api/auth/register`, {
                method: 'Post',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(values)
            })
            const data = await response.json()
            if (data.status) {
                toast({
                    title: "Registration Status!",
                    description: data.message,
                })
                navigate('/login')
            } else {
                toast({
                    title: "Registration Status!",
                    description: data.message,
                    variant: "destructive"
                })
            }

        } catch (error) {
            toast({
                title: "Registration Status!",
                description: error.message,
                variant: "destructive"
            })
        }
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <Card className="pt-5 w-[400px]">
                <CardContent>
                    <h2 className='text-center font-semibold text-xl mb-3'>Register Here</h2>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(handleForm)}>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

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
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter your password again" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='mt-4'>
                                <Button className="w-full">Register</Button>
                            </div>

                            <div className='flex justify-center text-sm mt-4'>
                                <p>Already have account? <Link to="/login" className='underline text-blue-500'>Login now</Link></p>
                            </div>

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegisterPage