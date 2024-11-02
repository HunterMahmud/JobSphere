"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { TbFidgetSpinner } from "react-icons/tb"; // Icons from react-icons

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = useSession();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (session?.status === "authenticated") {
      // Redirect if the user is already authenticated
      router.push(redirectPath);
    }
  }, [session?.status, redirectPath, router]);

  const handleLogIn = async (data) => {
    const { email, password } = data;
    try {
        setLoading(true);
      const resp = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (resp?.ok) {
        toast.success("SignIn Successful");
        router.push(redirectPath); // Redirect to the target path or home
      } else if (resp?.error) {
        toast.error("Enter correct email or password");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
    finally{
        setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="flex w-full mx-auto overflow-hidden bg-white rounded-lg shadow-lg border lg:max-w-4xl">
        <div
          className="bg-cover bg-center md:block md:w-1/2"
          style={{
            backgroundImage: `url(${"https://i.imghippo.com/files/aXSPo1715364590.svg"})`,
          }}
        ></div>

        <div className="w-full px-3 py-8 lg:px-8 md:w-1/2">
          <p className="mt-3 text-2xl text-center text-gray-600">
            Welcome back!
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <div className="text-xs text-center text-gray-500 uppercase">
              login with email
            </div>
            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>

          <form onSubmit={handleSubmit(handleLogIn)}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "This field is required.",
                })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
              />
              {errors?.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "This field is required.",
                  })}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  type={show ? "text" : "password"}
                />
                {errors?.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
                <div
                  onClick={() => setShow(!show)}
                  className="absolute top-[30%] right-3 cursor-pointer"
                >
                  {show ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </div>
              </div>
            </div>

            
            {/* Submit button */}
          <div className="mt-5">
            <button
              disabled={loading}
              type="submit"
              className="bg-primary hover:bg-hover w-full rounded-md py-3 font-medium text-white"
            >
              {loading === true ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Login"}
            </button>
          </div>
          </form>

          <div className="flex items-center mt-4 justify-center">
            <span className="text-gray-600 text-sm">
              Don&apos;t have an account?
            </span>
            <Link
              href="/register-user"
              className="text-primary font-semibold ml-2 hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
