'use client'
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const router = useRouter();
    const session = useSession();
    const searchParams = useSearchParams();
    const path = searchParams.get("redirect");


    const handleLogIn = async (data) => {
        const { email, password } = data;
    
        try {
            const resp = await signIn("credentials", {
                email,
                password,
                redirect: false,  // Disable automatic redirect
            });
    
            // If login is successful, redirect to the desired page
            if (resp?.ok) {
                toast.success('SignIn Successful');
                router.push(path ? path : "/");  // Redirect to the target path or home
            } 
            // If there is an error, display a message
            else if (resp?.error) {
                toast.error("Enter correct email or password");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        }
    };
    
   
    const handleSignInWithGoogle = async () => {
        try {
            //
        }
        catch (err) {
            console.log(err);
            toast.error(err?.message)
        }
    }


    return (
        <div className='flex justify-center items-center my-10 min-h-[550px]'>
            <div className='flex w-full  mx-auto overflow-hidden bg-white rounded-lg shadow-lg border lg:max-w-4xl '>
                <div
                    className=' bg-cover bg-center md:block md:w-1/2'
                    style={{
                        backgroundImage: `url(${'https://i.imghippo.com/files/aXSPo1715364590.svg'})`,
                    }}
                ></div>


                <div className='w-full px-3 py-8 lg:px-8 md:w-1/2'>
                    <div className='flex justify-center mx-auto'>
                        {/* <img
                            className='w-auto h-7 sm:h-8'
                            src={''}
                            alt=''
                        /> */}
                    </div>


                    <p className='mt-3 text-2xl text-center text-gray-600 '>
                        Welcome back!
                    </p>


                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b  lg:w-1/4'></span>


                        <div className='text-xs text-center text-gray-500 uppercase  hover:underline'>
                            login with email
                        </div>


                        <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
                    </div>
                    <form onSubmit={handleSubmit(handleLogIn)}>
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium text-gray-600 '
                                htmlFor='LoggingEmailAddress'
                            >
                                Email Address
                            </label>
                            <input
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "This field is required.",
                                    },
                                })}
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='email'
                            />
                            {errors?.email?.message && (
                                <span className='text-red-500'>{errors.email.message}</span>
                            )}
                        </div>


                        <div className='mt-4'>
                            <div className='flex justify-between'>
                                <label
                                    className='block mb-2 text-sm font-medium text-gray-600 '
                                    htmlFor='loggingPassword'
                                >
                                    Password
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "This field is required."
                                        }
                                    })}
                                    name='password'
                                    className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                    type={show ? 'text' : 'password'}
                                />
                                {errors?.password?.message && (
                                    <span className='text-red-500'>{errors.password.message}</span>
                                )}
                                <div onClick={() => setShow(!show)} className="absolute top-[30%] right-3 cursor-pointer">
                                    {
                                        !show ? <IoEyeOffOutline /> : <IoEyeOutline />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='mt-6'>
                            <button
                                type='submit'
                                className='w-full px-5 py-3 text-lg font-medium text-white bg-primary rounded-md hover:bg-hoverColor'
                            >
                                Login
                            </button>
                        </div>
                    </form>


                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b  md:w-1/4'></span>


                        <Link
                            href={"/register-user"}
                            className='text-xs text-gray-500 uppercase  hover:underline'
                        >
                            or Register
                        </Link>


                        <span className='w-1/5 border-b  md:w-1/4'></span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginPage;



