"use client"
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';


const RegisterPage = () => {
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleRegister = async (data) => {
        console.log(data);
        const { name, image, email, password } = data;
        try {
            console.log({
                name,
                image,
                email,
                password
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleGoogleLogin = () => {
        console.log("Google Login")
    }
    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-100px)]'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white  text-black shadow-lg border'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-3xl font-bold'>Sign Up</h1>
                </div>
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        {/* Name */}
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Name
                            </label>
                            <input
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "This field is required.",
                                    },
                                })}
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Enter Your Name Here'
                                className='w-full  placeholder:text-gray-700 px-4 py-3 rounded-md border-2 border-gray-500 bg-main text-gray-800 focus:border-violet-100 bg-transparent appearance-none'
                            />
                            {errors?.name?.message && (
                                <span className="text-red-500">{errors.name.message}</span>
                            )}
                        </div>
                        {/* Image */}
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: "This field is required.",
                                    },
                                })}
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                            />
                            {errors?.name?.message && (
                                <span className="block text-red-500">{errors.name.message}</span>
                            )}
                        </div>
                        {/* Email */}
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "This field is required.",
                                    },
                                })}
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Enter Your Email Here'
                                className='w-full  placeholder:text-gray-700 px-4 py-3 rounded-md border-2 border-gray-500 bg-main text-gray-800 focus:border-violet-100 bg-transparent appearance-none'
                            />
                            {errors?.email?.message && (
                                <span className='text-red-500'>{errors.email.message}</span>
                            )}
                        </div>
                        {/* Password */}
                        <div>
                            <label htmlFor='password' className='block mb-2 text-sm'>
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "This field is required."
                                        }
                                    })}
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="w-full  placeholder:text-gray-700 px-4 py-3 rounded-md border-2 border-gray-500 bg-main text-gray-800 focus:border-violet-100 bg-transparent appearance-none"
                                />
                                {errors?.password?.message && (
                                    <span className='text-red-500'>{errors.password.message}</span>
                                )}
                                <span
                                    className="absolute top-4 right-3 text-black  cursor-pointer p-1"
                                    onClick={() => {
                                        setShowPass(!showPass);
                                    }}
                                >
                                    {showPass ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Submit button */}
                    <div>
                        <button
                            type='submit'
                            className='bg-[#1d4ed8] w-full rounded-md py-3 text-white'
                        >
                            Continue
                        </button>
                    </div>
                </form>
                {/* Socials login */}
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Signup with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div onClick={handleGoogleLogin} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />
                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account?{' '}
                    <Link
                        href={'/login'}
                        className='hover:underline text-gray-600'
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage;