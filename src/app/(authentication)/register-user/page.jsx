"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Select from "react-select";
import axios from "axios";

const skillOptions = [
  { value: "Select", label: "Select" },
  { value: "Accounting/Finance", label: "Accounting/Finance" },
  {
    value: "Bank/Non-Bank Fin. Institution",
    label: "Bank/Non-Bank Fin. Institution",
  },
  { value: "Supply Chain/Procurement", label: "Supply Chain/Procurement" },
  { value: "Education/Training", label: "Education/Training" },
  { value: "Engineer/Architect", label: "Engineer/Architect" },
  { value: "Garments/ Textile", label: "Garments/ Textile" },
  { value: "General Management/Admin", label: "General Management/Admin" },
  { value: "IT/Telecommunication", label: "IT/Telecommunication" },
  { value: "Marketing/Sales", label: "Marketing/Sales" },
  {
    value: "Media/Advertisement/Event Mgt.",
    label: "Media/Advertisement/Event Mgt.",
  },
  { value: "Medical/Pharma", label: "Medical/Pharma" },
  { value: "NGO/Development", label: "NGO/Development" },
  { value: "Research/Consultancy", label: "Research/Consultancy" },
  { value: "Receptionist/ PS", label: "Receptionist/ PS" },
  { value: "Data Entry/Operator/BPO", label: "Data Entry/Operator/BPO" },
  {
    value: "Customer Service/Call Centre",
    label: "Customer Service/Call Centre",
  },
  { value: "HR/Org. Development", label: "HR/Org. Development" },
  { value: "Design/Creative", label: "Design/Creative" },
  { value: "Production/Operation", label: "Production/Operation" },
  {
    value: "Hospitality/ Travel/ Tourism",
    label: "Hospitality/ Travel/ Tourism",
  },
  {
    value: "Beauty Care/ Health & Fitness",
    label: "Beauty Care/ Health & Fitness",
  },
  { value: "Law/ Legal", label: "Law/ Legal" },
  {
    value: "Electrician/ Construction/ Repair",
    label: "Electrician/ Construction/ Repair",
  },
  { value: "Security/Support Service", label: "Security/Support Service" },
  { value: "Driving/Motor Technician", label: "Driving/Motor Technician" },
  {
    value: "Agro (Plant/Animal/Fisheries)",
    label: "Agro (Plant/Animal/Fisheries)",
  },
  { value: "Commercial", label: "Commercial" },
  {
    value: "Company Secretary/Regulatory affairs",
    label: "Company Secretary/Regulatory affairs",
  },
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

const RegisterUser = () => {
  const pathName = usePathname();
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState("");
  const [skill, setSkill] = useState();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    setLoading(true);
    const {
      name,
      email,
      cityName,
      education,
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
          education,
          mobileNumber,
          userIMG: data?.data?.display_url,
          password,
          role: "seeker",
        } || {};

      const result = await axios.post(
        "http://localhost:3000/register-user/api",
        newUser
      );
      if (result?.status === 200) {
        toast.success("User created successfully");
        reset();
        router.push("/");
      }
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

  return (
    <div className="flex justify-center items-center custom-container">
      <div className="flex flex-col p-3 rounded-md sm:p-10 bg-white  text-black shadow-lg border my-5 w-full lg:w-[90%]">
        <div className="flex justify-center items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:bg-gray-100 dark:text-gray-800">
          <a rel="noopener noreferrer" href="register-user" className={`${pathName === '/register-user' && "border-b-primary"} flex items-center flex-shrink-0 px-5 py-2 border-b-4  dark:text-gray-600`}>Job Seeker</a>
          <a rel="noopener noreferrer" href="register-recruiter" className="flex items-center flex-shrink-0 px-5 py-2 border-b-4 dark:border-gray-300 dark:text-gray-600">Recruiter</a>
        </div>
        <div className="mb-8 text-center">
          {/* <h1 className="my-3 text-2xl font-medium">Register - Job Seeker</h1> */}
        </div>
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-5">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
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
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
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
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            {/* Country Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Country Name
              </label>
              <Select
                onChange={(countryOptions) => setCountry(countryOptions.value)}
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
            {/* Education Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Education
              </label>
              <input
                {...register("education", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
                type="text"
                placeholder="Enter Your Education level"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors?.email?.message && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            {/* Skills */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Skill
              </label>
              <Select
                onChange={(e) => setSkill(e.value)}
                options={skillOptions}
                className="w-full"
              />
              {errors?.email?.message && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
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
                <span className="text-red-500">{errors.email.message}</span>
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
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors?.name?.message && (
                <span className="block text-red-500">
                  {errors.name.message}
                </span>
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
              By clicking &apos;Continue&apos;, you acknowledge that you have read and
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

export default RegisterUser;
