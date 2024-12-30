import React from 'react'
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'

function Signup() {
    const { register, control, handleSubmit } = useForm()
    return (
        <div className='container flex items-center justify-center'>
            <div className='bg-gray-400 w-2/4 '>
            <h1 className='text-3xl font-semibold'>SIGNUP</h1>
            <form>
            <Input
                type="text"
                placeholder="Enter your Name here"
            />
            <Input
                type="text"
                placeholder="Enter your Email here"
            />
         
            </form>
            </div>
            
        </div>
    )
}

export default Signup
