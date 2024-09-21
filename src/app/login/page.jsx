"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitLogin = (data) => {
    const { email, password } = data;
    console.log(email, password);
  };

  return (
    <div className="mx-2">
      <div
        data-aos="zoom-in"
        className="w-full mb-9 max-w-md mx-auto mt-12 p-8 space-y-3 rounded-xl border border-gray-200 bg-white text-black shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center text-black font-bugrasimo ">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block text-gray-900">
              Email
            </label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
              })}
              type="email"
              name="email"
              placeholder="Email"
              className="w-full placeholder:text-gray-700 px-4 py-3 rounded-md border-2 border-gray-500 bg-main text-gray-800 focus:border-violet-100 bg-transparent appearance-none"
            />
            {errors?.email?.message && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block text-gray-900">
              Password
            </label>

            <div className="relative">
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
                type={showPass ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="w-full placeholder:text-gray-700 px-4 py-3 rounded-md border-2 border-gray-500 bg-main text-gray-800 focus:border-violet-100 bg-transparent appearance-none"
              />
              <span
                className="absolute top-4 right-3 text-black cursor-pointer p-1"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {errors?.password?.message && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none font-bugrasimo"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-200"></div>
          <p className="px-3 text-sm text-gray-800">Login with social accounts</p>
          <div className="flex-1 h-px sm:w-16 bg-gray-200"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            title="Log in with Google"
            type="button"
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          >
            <svg
              className="w-4 h-auto"
              width="46"
              height="47"
              viewBox="0 0 46 47"
              fill="none"
            >
              <path
                d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                fill="#4285F4"
              ></path>
              <path
                d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                fill="#34A853"
              ></path>
              <path
                d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                fill="#FBBC05"
              ></path>
              <path
                d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                fill="#EB4335"
              ></path>
            </svg>
            Login with Google
          </button>
        </div>
        <p className="text-sm text-center sm:px-6 text-gray-800">
          Don&apos;t have an account?
          <Link
            href="/register"
            className="underline text-gray-700 font-bold ml-2"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
