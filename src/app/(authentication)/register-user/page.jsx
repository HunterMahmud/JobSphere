"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // use 'next/navigation' instead of 'next/router'
import { useSession } from "next-auth/react";
// import TermsConditions from "@/components/termsAndConditions/TermsConditions";
// import Terms from "@/app/termsCondition/page";
// import Terms from "../termsCondition/page";
// import TermsConditions from "@/components/Modal/ModalOfTerms";
// import ModalOfTerms from '../../components/Modal/ModalOfTerms';
import ModalOfTerms from '../../../components/Modal/ModalOfTerms';
import ModalOfSecurity from '../../../components/Modal/ModalOfSecurity';


const RegisterUser = () => {
  const pathName = usePathname();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Next.js router from 'next/navigation'
  const [isOpenTerms, setIsOpenTerms] = useState(false);
  const [isOpenSecurity, setIsOpenSecurity] = useState(false);
  const session = useSession();
  console.log(session)

  useEffect(() => {
    if (session?.status==="authenticated") {
      // If user is logged in, redirect to home page
      router.push('/');
    }
  }, [session?.status, router]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const handleRegister = async (data) => {
    setLoading(true);
    const {
      name,
      email,
      cityName,
      mobileNumber,
      image,
      password,
      acceptTerms,
    } = data;
    const formData = new FormData();
    formData.append("image", image[0]);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData
      );

      const newUser =
        {
          name,
          email,
          cityName,
          mobileNumber,
          userIMG: data?.data?.display_url,
          password,
          role: "seeker",
        } || {};

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

      const seekerInformation = {
        contactInformation: {
          email,
          phoneNumber: mobileNumber,
        },
        profileOverview: {
          fullName: name,
          profilePicture: data?.data?.display_url,
        },
      };
      await axios.put(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/${email}`,
        { ...seekerInformation }
      );
    } catch (err) {
      console.log(err);
      if (err.response && err?.response?.status === 409) {
        toast.error("User already exists");
      } else if (err.response && err?.response?.status === 500) {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to close the modal
  const closeModalTerms = () => setIsOpenTerms(false);

  // Function to open the modal
  const openModalTerms = () => setIsOpenTerms(true);

  // Function to close the modal
  const closeModalSecurity = () => setIsOpenSecurity(false);

  // Function to open the modal
  const openModalSecurity = () => setIsOpenSecurity(true);

  return (
    <div className="flex justify-center items-center custom-container min-h-[550px]">
      <div className="flex flex-col p-3 rounded-md sm:p-10 bg-white text-black shadow-lg border my-5 w-full lg:w-[90%]">
        <div className="mb-8 flex justify-center items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap">
          <a
            rel="noopener noreferrer"
            href="/register-user"
            className={`${
              pathName === "/register-user" && "border-b-primary"
            } flex items-center flex-shrink-0 px-5 py-2 border-b-4`}
          >
            Job Seeker
          </a>
          <a
            rel="noopener noreferrer"
            href="/register-recruiter"
            className="flex items-center flex-shrink-0 px-5 py-2 border-b-4"
          >
            Recruiter
          </a>
        </div>
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-5">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors?.name?.message && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Email Address
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
                id="email"
                placeholder="Enter Your Email"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors?.email?.message && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Mobile Number
              </label>
              <input
                {...register("mobileNumber", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
                type="number"
                placeholder="Enter Your Number"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors?.email?.message && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Select Image:
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
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full  placeholder-gray-400/70  focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
              />
              {errors?.name?.message && (
                <span className="block text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            {/* Password */}
            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600"
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
                  <span className="text-red-500 text-sm">
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
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Confirm Password
                </label>
              </div>
              <div className="relative">
                <input
                  name="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  type={show ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                />
                {errors?.confirmPassword?.message && (
                  <span className="text-red-500 text-sm">
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
          </div>

          <div>
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
                  onClick={openModalTerms}
                >
                  Terms and Conditions
                </span>{" "}
                and <span className="font-medium text-blue-600 cursor-pointer" onClick={openModalSecurity}>Privacy Policy</span>.
              </label>
            </div>

            {/* Error Message */}
            {errors?.acceptTerms?.message && (
              <span className="text-red-500 flex items-start md:justify-center">
                {errors?.acceptTerms?.message}
              </span>
            )}

            {/* Modal for Terms of Service */}
            <ModalOfTerms isOpenTerms={isOpenTerms} closeModalTerms={closeModalTerms} />

            {/* Modal for Terms of Privacy */}
            <ModalOfSecurity isOpenSecurity={isOpenSecurity} closeModalSecurity={closeModalSecurity} />
            
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="bg-primary hover:bg-hoverColor w-full rounded-md py-3 text-white"
            >
              {loading === true ? "Loading..." : "Register"}
            </button>
          </div>
        </form>

        <p className="px-6 mt-3 text-sm text-center text-black">
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

export default RegisterUser;
