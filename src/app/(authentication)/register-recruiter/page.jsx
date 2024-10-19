"use client";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Terms from "@/components/termsAndConditions/Terms";

const RegisterRecruiter = () => {
  const pathName = usePathname();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const handleRegister = async (data) => {
    setLoading(true);
    const {
      fullName,
      email,
      password,
      cityName,
      companyName,
      contactNumber,
      image,
      websiteURL,
      businessDescription,
    } = data;

    const formData = new FormData();
    formData.append("image", image[0]);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData
      );

      const newUser = {
        fullName,
        email,
        password,
        cityName,
        companyName,
        contactNumber,
        companyLogoUrl: data?.data?.display_url,
        websiteURL,
        businessDescription,
        role: "recruiter",
      };

      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/register/api`,
        newUser
      );

      if (result.status === 200) {
        toast.success("User created successfully");

        // Automatic login after successful registration
        const loginResp = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (loginResp?.error) {
          toast.error("Auto-sign-in failed. Please login manually.");
        } else {
          toast.success("SignIn Successful");
          reset();
          router.push("/");
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error("User already exists");
      } else if (err.response && err.response.status === 500) {
        toast.error(err.message);
        // console.log(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  console.log(pathName);

  // Function to close the modal
  const closeModal = () => setIsOpen(false);

  // Function to open the modal
  const openModal = () => setIsOpen(true);

  return (
    <div className="flex justify-center items-center custom-container min-h-[550px]">
      <div className="flex flex-col p-3 rounded-md sm:p-10 bg-white  text-black shadow-lg border my-5 w-full lg:w-[90%]">
        <div className="mb-8 flex justify-center items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap">
          <a
            rel="noopener noreferrer"
            href="register-user"
            className="flex items-center flex-shrink-0 px-5 py-2 border-b-4"
          >
            Job Seeker
          </a>
          <a
            rel="noopener noreferrer"
            href="register-recruiter"
            className={`${
              pathName === "/register-recruiter" && "border-b-primary"
            } flex items-center flex-shrink-0 px-5 py-2 border-b-4`}
          >
            Recruiter
          </a>
        </div>
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-5">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Full Name
              </label>
              <input
                {...register("fullName", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
                type="text"
                placeholder="Type full name"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors?.fullName?.message && (
                <span className="text-red-500">{errors.fullName.message}</span>
              )}
            </div>
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Email address
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
                type="email"
                placeholder="Enter Your Email"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors?.email?.message && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            {/* Password */}
            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 "
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    validate: {
                      hasUpperCase: (value) =>
                        /[A-Z]/.test(value) ||
                        "Password must contain an uppercase letter",
                      hasLowerCase: (value) =>
                        /[a-z]/.test(value) ||
                        "Password must contain a lowercase letter",
                      hasNumber: (value) =>
                        /[0-9]/.test(value) || "Password must contain a number",
                    },
                  })}
                  name="password"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                {errors?.password?.message && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
                <div
                  onClick={() => setShow(!show)}
                  className="absolute top-[30%] right-3 cursor-pointer"
                >
                  {!show ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </div>
              </div>
            </div>
            {/* Confirm Password */}
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                  Confirm Password
                </label>
              </div>
              <div className="relative">
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                  type={show ? "text" : "password"}
                  placeholder="Enter Confirm password "
                />
                {errors?.confirmPassword?.message && (
                  <span className="text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
                <div
                  onClick={() => setShow(!show)}
                  className="absolute top-[30%] right-3 cursor-pointer"
                >
                  {!show ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </div>
              </div>
            </div>
            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Company Image/Logo:
              </label>
              <input
                {...register("image", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors?.image?.message && (
                <span className="block text-red-500">
                  {errors?.image?.message}
                </span>
              )}
            </div>
          </div>
          {/* Business Description */}
          <div className="flex items-start md:justify-center">
            <input
              id="acceptTerms"
              type="checkbox"
              {...register("acceptTerms", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
              })}
              className="mt-1 mr-1"
            />

            <label htmlFor="acceptTerms" className="text-sm">
              By clicking &apos;Continue&apos;, you acknowledge that you have
              read and accept the{" "}
              <span
                className="font-medium text-blue-600 cursor-pointer"
                onClick={openModal}
              >
                Terms and Conditions
              </span>{" "}
              and <span className="font-medium">Privacy Policy</span>.
            </label>
          </div>
          {errors?.acceptTerms?.message && (
            <span className="text-red-500 flex items-start md:justify-center">
              {errors?.acceptTerms?.message}
            </span>
          )}

          {/* Modal for Terms of Service */}
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-[550px] items-center justify-center p-16 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full lg:w-[75%] transform overflow-hidden rounded-none bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      ></Dialog.Title>

                      <div className="mt-2">
                        <Terms /> {/* Your Terms Component */}
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>

          {/* Submit button */}
          <div>
            <button
              disabled={loading}
              type="submit"
              className="bg-primary hover:bg-hoverColor w-full rounded-md py-3 text-white"
            >
              {loading === true ? "Loading..." : " Register"}
            </button>
          </div>
        </form>
        <p className="px-6 mt-3  text-sm text-center text-black">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="hover:underline text-gray-600 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterRecruiter;
