import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function Signup() {
    const { register, handleSubmit } = useForm()
    const [data, setData] = useState()

    const handleChange = (event) => {
        const { name, value } = event.target
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSignup = (formdata) => {
        const { name, email } = formdata
        if (!name || !email) {
            console.log("Both fields are required");
        }
        
    }
    return (
        <div className='py-5 container flex items-center justify-center'>
            <div className=' box- w-2/4 '>
                <h1 className='text-3xl font-semibold'>SIGNUP</h1>
                <form onSubmit={handleSubmit(handleSignup)} >
                    <Input
                        type="text"
                        placeholder="Name here"
                        {...register("name")}
                        onChange={handleChange}
                    /> <br />
                    <Input
                        type="text"
                        placeholder="Email here"
                        {...register("email")}
                        onChange={handleChange}

                    />
                    <Button type="submit">Submit</Button>
                </form>
                <br />
            </div>

        </div>
    )
}

export default Signup
