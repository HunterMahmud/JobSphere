import Navbar from "@/components/shared/Navbar";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "../components/shared/Footer";
import AuthProvider from "@/services/AuthProvider";
import { Toaster } from "react-hot-toast";
import { HiOutlineTemplate } from "react-icons/hi";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default :"Job Sphere - Find Your Dream Job",
    template : "%s | Job Sphere - Find Your Dream Job"
  },
  description:
    "Job Sphere is a comprehensive hiring and job-seeking platform. Discover top job opportunities, skill-based assessments, job alerts, and premium job postings for recruiters. Join us to connect with top companies and take your career to the next level.",
  keywords: [
    "Job Sphere",
    "hiring platform",
    "job search",
    "career growth",
    "job posting",
    "recruiters",
    "job seekers",
    "resume download",
    "skill-based assessment",
    "job alerts",
    "companies",
    "live chat",
    "job platform",
    "career development",
  ],
  openGraph: {
    title: "Job Sphere - Find Your Dream Job",
    description:
      "Your go-to platform for job seekers and recruiters alike. Find jobs, connect with companies, and take skill assessments. Job Sphere is here to support your career growth.",
    url: "https://your-website.com", // Replace with the actual website URL
    type: "website",
    images: [
      {  
        url: "https://i.ibb.co/1MkVX5R/logoOnly.png",
        width: 800,
        height: 600,
        alt: "Job Sphere logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@JobSphere", // Replace with actual Twitter handle if available
    title: "Job Sphere - Find Your Dream Job",
    description:
      "Discover top job opportunities and grow your career with Job Sphere. The ultimate job-seeking and hiring platform.",
    image: "https://i.ibb.co/1MkVX5R/logoOnly.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://i.ibb.co/1MkVX5R/logoOnly.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <AuthProvider>
          <div>
            <div className="bg-gray-800">
              <div className="custom-container">
                <Navbar />
              </div>
            </div>
            <div className="lg:min-h-[calc(100vh-287px)] md:min-h-[calc(100vh-355px)] min-h-[calc(100vh-510px)]">
              {children}
            </div>
          </div>
          <div className="bg-[#1f2937] text-white bg-cover bg-no-repeat">
            <Footer />
          </div>
        </AuthProvider>

        <Toaster />
      </body>
    </html>
  );
}
