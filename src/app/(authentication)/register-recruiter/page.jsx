"use client";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Select from "react-select";

const companyTypes = [
  { value: "", label: "Select Company Type" },
  { value: "LLC", label: "Limited Liability Company (LLC)" },
  { value: "Corporation", label: "Corporation" },
  { value: "Sole Proprietorship", label: "Sole Proprietorship" },
  { value: "Partnership", label: "Partnership" },
  { value: "Non-Profit", label: "Non-Profit Organization" },
  { value: "Cooperative", label: "Cooperative" },
  { value: "Franchise", label: "Franchise" },
  { value: "Government Agency", label: "Government Agency" },
  { value: "Public Sector", label: "Public Sector" },
  { value: "Private Sector", label: "Private Sector" },
];

const countryOptions = [
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Albania", label: "Albania" },
  { value: "Algeria", label: "Algeria" },
  { value: "Andorra", label: "Andorra" },
  { value: "Angola", label: "Angola" },
  { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
  { value: "Argentina", label: "Argentina" },
  { value: "Armenia", label: "Armenia" },
  { value: "Australia", label: "Australia" },
  { value: "Austria", label: "Austria" },
  { value: "Azerbaijan", label: "Azerbaijan" },
  { value: "Bahamas", label: "Bahamas" },
  { value: "Bahrain", label: "Bahrain" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "Barbados", label: "Barbados" },
  { value: "Belarus", label: "Belarus" },
  { value: "Belgium", label: "Belgium" },
  { value: "Belize", label: "Belize" },
  { value: "Benin", label: "Benin" },
  { value: "Bhutan", label: "Bhutan" },
  { value: "Bolivia", label: "Bolivia" },
  { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
  { value: "Botswana", label: "Botswana" },
  { value: "Brazil", label: "Brazil" },
  { value: "Brunei", label: "Brunei" },
  { value: "Bulgaria", label: "Bulgaria" },
  { value: "Burkina Faso", label: "Burkina Faso" },
  { value: "Burundi", label: "Burundi" },
  { value: "Cabo Verde", label: "Cabo Verde" },
  { value: "Cambodia", label: "Cambodia" },
  { value: "Cameroon", label: "Cameroon" },
  { value: "Canada", label: "Canada" },
  { value: "Central African Republic", label: "Central African Republic" },
  { value: "Chad", label: "Chad" },
  { value: "Chile", label: "Chile" },
  { value: "China", label: "China" },
  { value: "Colombia", label: "Colombia" },
  { value: "Comoros", label: "Comoros" },
  { value: "Congo", label: "Congo" },
  { value: "Costa Rica", label: "Costa Rica" },
  { value: "Croatia", label: "Croatia" },
  { value: "Cuba", label: "Cuba" },
  { value: "Cyprus", label: "Cyprus" },
  { value: "Czech Republic", label: "Czech Republic" },
  { value: "Denmark", label: "Denmark" },
  { value: "Djibouti", label: "Djibouti" },
  { value: "Dominica", label: "Dominica" },
  { value: "Dominican Republic", label: "Dominican Republic" },
  { value: "Ecuador", label: "Ecuador" },
  { value: "Egypt", label: "Egypt" },
  { value: "El Salvador", label: "El Salvador" },
  { value: "Equatorial Guinea", label: "Equatorial Guinea" },
  { value: "Eritrea", label: "Eritrea" },
  { value: "Estonia", label: "Estonia" },
  { value: "Eswatini", label: "Eswatini" },
  { value: "Ethiopia", label: "Ethiopia" },
  { value: "Fiji", label: "Fiji" },
  { value: "Finland", label: "Finland" },
  { value: "France", label: "France" },
  { value: "Gabon", label: "Gabon" },
  { value: "Gambia", label: "Gambia" },
  { value: "Georgia", label: "Georgia" },
  { value: "Germany", label: "Germany" },
  { value: "Ghana", label: "Ghana" },
  { value: "Greece", label: "Greece" },
  { value: "Grenada", label: "Grenada" },
  { value: "Guatemala", label: "Guatemala" },
  { value: "Guinea", label: "Guinea" },
  { value: "Guinea-Bissau", label: "Guinea-Bissau" },
  { value: "Guyana", label: "Guyana" },
  { value: "Haiti", label: "Haiti" },
  { value: "Honduras", label: "Honduras" },
  { value: "Hungary", label: "Hungary" },
  { value: "Iceland", label: "Iceland" },
  { value: "India", label: "India" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Iran", label: "Iran" },
  { value: "Iraq", label: "Iraq" },
  { value: "Ireland", label: "Ireland" },
  { value: "Israel", label: "Israel" },
  { value: "Italy", label: "Italy" },
  { value: "Jamaica", label: "Jamaica" },
  { value: "Japan", label: "Japan" },
  { value: "Jordan", label: "Jordan" },
  { value: "Kazakhstan", label: "Kazakhstan" },
  { value: "Kenya", label: "Kenya" },
  { value: "Kiribati", label: "Kiribati" },
  { value: "Korea, North", label: "Korea, North" },
  { value: "Korea, South", label: "Korea, South" },
  { value: "Kuwait", label: "Kuwait" },
  { value: "Kyrgyzstan", label: "Kyrgyzstan" },
  { value: "Laos", label: "Laos" },
  { value: "Latvia", label: "Latvia" },
  { value: "Lebanon", label: "Lebanon" },
  { value: "Lesotho", label: "Lesotho" },
  { value: "Liberia", label: "Liberia" },
  { value: "Libya", label: "Libya" },
  { value: "Liechtenstein", label: "Liechtenstein" },
  { value: "Lithuania", label: "Lithuania" },
  { value: "Luxembourg", label: "Luxembourg" },
  { value: "Madagascar", label: "Madagascar" },
  { value: "Malawi", label: "Malawi" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Maldives", label: "Maldives" },
  { value: "Mali", label: "Mali" },
  { value: "Malta", label: "Malta" },
  { value: "Marshall Islands", label: "Marshall Islands" },
  { value: "Mauritania", label: "Mauritania" },
  { value: "Mauritius", label: "Mauritius" },
  { value: "Mexico", label: "Mexico" },
  { value: "Micronesia", label: "Micronesia" },
  { value: "Moldova", label: "Moldova" },
  { value: "Monaco", label: "Monaco" },
  { value: "Mongolia", label: "Mongolia" },
  { value: "Montenegro", label: "Montenegro" },
  { value: "Morocco", label: "Morocco" },
  { value: "Mozambique", label: "Mozambique" },
  { value: "Myanmar", label: "Myanmar" },
  { value: "Namibia", label: "Namibia" },
  { value: "Nauru", label: "Nauru" },
  { value: "Nepal", label: "Nepal" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "New Zealand", label: "New Zealand" },
  { value: "Nicaragua", label: "Nicaragua" },
  { value: "Niger", label: "Niger" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "North Macedonia", label: "North Macedonia" },
  { value: "Norway", label: "Norway" },
  { value: "Oman", label: "Oman" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Palau", label: "Palau" },
  { value: "Panama", label: "Panama" },
  { value: "Papua New Guinea", label: "Papua New Guinea" },
  { value: "Paraguay", label: "Paraguay" },
  { value: "Peru", label: "Peru" },
  { value: "Philippines", label: "Philippines" },
  { value: "Poland", label: "Poland" },
  { value: "Portugal", label: "Portugal" },
  { value: "Qatar", label: "Qatar" },
  { value: "Romania", label: "Romania" },
  { value: "Russia", label: "Russia" },
  { value: "Rwanda", label: "Rwanda" },
  { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
  { value: "Saint Lucia", label: "Saint Lucia" },
  {
    value: "Saint Vincent and the Grenadines",
    label: "Saint Vincent and the Grenadines",
  },
  { value: "Samoa", label: "Samoa" },
  { value: "San Marino", label: "San Marino" },
  { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "Senegal", label: "Senegal" },
  { value: "Serbia", label: "Serbia" },
  { value: "Seychelles", label: "Seychelles" },
  { value: "Sierra Leone", label: "Sierra Leone" },
  { value: "Singapore", label: "Singapore" },
  { value: "Slovakia", label: "Slovakia" },
  { value: "Slovenia", label: "Slovenia" },
  { value: "Solomon Islands", label: "Solomon Islands" },
  { value: "Somalia", label: "Somalia" },
  { value: "South Africa", label: "South Africa" },
  { value: "South Sudan", label: "South Sudan" },
  { value: "Spain", label: "Spain" },
  { value: "Sri Lanka", label: "Sri Lanka" },
  { value: "Sudan", label: "Sudan" },
  { value: "Suriname", label: "Suriname" },
  { value: "Sweden", label: "Sweden" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Syria", label: "Syria" },
  { value: "Taiwan", label: "Taiwan" },
  { value: "Tajikistan", label: "Tajikistan" },
  { value: "Tanzania", label: "Tanzania" },
  { value: "Thailand", label: "Thailand" },
  { value: "Timor-Leste", label: "Timor-Leste" },
  { value: "Togo", label: "Togo" },
  { value: "Tonga", label: "Tonga" },
  { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
  { value: "Tunisia", label: "Tunisia" },
  { value: "Turkey", label: "Turkey" },
  { value: "Turkmenistan", label: "Turkmenistan" },
  { value: "Tuvalu", label: "Tuvalu" },
  { value: "Uganda", label: "Uganda" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States", label: "United States" },
  { value: "Uruguay", label: "Uruguay" },
  { value: "Uzbekistan", label: "Uzbekistan" },
  { value: "Vanuatu", label: "Vanuatu" },
  { value: "Vatican City", label: "Vatican City" },
  { value: "Venezuela", label: "Venezuela" },
  { value: "Vietnam", label: "Vietnam" },
  { value: "Yemen", label: "Yemen" },
  { value: "Zambia", label: "Zambia" },
  { value: "Zimbabwe", label: "Zimbabwe" },
];

const companyServices = [
  { value: "", label: "Select Service Type" },
  { value: "Consulting", label: "Consulting Services" },
  { value: "IT Services", label: "Information Technology Services" },
  { value: "Marketing", label: "Marketing and Advertising" },
  { value: "Finance", label: "Financial Services" },
  { value: "Legal", label: "Legal Services" },
  { value: "Manufacturing", label: "Manufacturing Services" },
  { value: "Logistics", label: "Logistics and Supply Chain" },
  { value: "Real Estate", label: "Real Estate Services" },
  { value: "Education", label: "Educational Services" },
  { value: "Healthcare", label: "Healthcare Services" },
  { value: "Construction", label: "Construction Services" },
  { value: "Maintenance", label: "Maintenance and Repair" },
  { value: "Retail", label: "Retail Services" },
  { value: "E-commerce", label: "E-commerce Services" },
  { value: "Tourism", label: "Tourism and Hospitality" },
  { value: "Event Planning", label: "Event Planning Services" },
  { value: "Telecommunications", label: "Telecommunications Services" },
  { value: "Transportation", label: "Transportation Services" },
  { value: "Media", label: "Media and Entertainment" },
  { value: "Research", label: "Research and Development" },
];

const RegisterRecruter = () => {
  const pathName = usePathname()
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companyService, setCompanyService] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    setLoading(true);
    const {
      userName,
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
        userName,
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
        "http://localhost:3000/register-recruter/api/",
        newUser
      );

      if (result.status === 200) {
        toast.success("User created successfully");
        reset();
        router.push("/");
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
  console.log(pathName)

  return (
    <div className="flex justify-center items-center custom-container">
      <div className="flex flex-col p-3 rounded-md sm:p-10 bg-white  text-black shadow-lg border my-5 w-full lg:w-[90%]">
        <div className="mb-8 flex justify-center items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:bg-gray-100 dark:text-gray-800">
          <a rel="noopener noreferrer" href="register-user" className="flex items-center flex-shrink-0 px-5 py-2 border-b-4  dark:text-gray-600">Job Seeker</a>
          <a rel="noopener noreferrer" href="register-recruiter" className={`${pathName === '/register-recruiter' && "border-b-primary"} flex items-center flex-shrink-0 px-5 py-2 border-b-4  dark:text-gray-600`}>Recruiter</a>
        </div>
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-5">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                User Name
              </label>
              <input
                {...register("userName", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
                type="text"
                placeholder="Type Username"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors?.name?.message && (
                <span className="text-red-500">{errors.name.message}</span>
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
                    required: {
                      value: true,
                      message: "This field is required.",
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
                    required: {
                      value: true,
                      message: "This field is required.",
                    },
                  })}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                  type={show ? "text" : "password"}
                  placeholder="Enter Confirm password "
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
            {/* Country Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Country Name
              </label>
              <Select
                onChange={(e) => setCountry(e.value)}
                options={countryOptions}
                className="w-full"
              />
              {errors?.email?.message && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            {/* City Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                City Name
              </label>
              <input
                {...register("cityName", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
                type="text"
                placeholder="Enter City Name"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors?.email?.message && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            {/* Company Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Company Name
              </label>
              <input
                {...register("companyName", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
                type="text"
                placeholder="Enter Company Name"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors?.email?.message && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            {/* Company Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Company Type
              </label>
              <Select
                onChange={(e) => setCompanyType(e.value)}
                options={companyTypes}
                className="w-full"
              />
              {errors?.email?.message && (
                <span className="text-red-500">{errors?.email.message}</span>
              )}
            </div>
            {/* Company services */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Company Services
              </label>
              <Select
                onChange={(e) => setCompanyService(e.value)}
                options={companyServices}
                className="w-full"
              />
              {errors?.email?.message && (
                <span className="text-red-500">{errors?.email?.message}</span>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Contact Number
              </label>
              <input
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
                type="number"
                placeholder="Enter Contact Number"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors?.email?.message && (
                <span className="text-red-500">{errors?.email?.message}</span>
              )}
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
              {errors?.name?.message && (
                <span className="block text-red-500">
                  {errors?.name?.message}
                </span>
              )}
            </div>
            {/* Website URL */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Website URL
              </label>
              <input
                {...register("websiteURL", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
                type="text"
                placeholder="Enter Website URL"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors?.email?.message && (
                <span className="text-red-500">{errors?.email?.message}</span>
              )}
            </div>
          </div>
          {/* Business Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600 ">
              Business Description
            </label>
            <textarea
              {...register("bsinessDescription", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
              })}
              type="textarea"
              placeholder="Write Business Description"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors?.email?.message && (
              <span className="text-red-500">{errors?.email?.message}</span>
            )}
          </div>
          <div className="flex items-start md:justify-center gap-1">
            <input
              id="acceptTerms"
              type="checkbox"
              {...register("acceptTerms", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
              })}
              className="mt-1"
            />
            {errors?.acceptTerms?.message && (
              <span className="text-red-500">{errors?.password?.message}</span>
            )}
            <label for="acceptTerms" className="text-sm">
              By clicking 'Continue', you acknowledge that you have read and
              accept the <span className="font-medium">Terms of Service</span>{" "}
              and <span className="font-medium">Privacy Policy</span>.
            </label>
          </div>
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

export default RegisterRecruter;
