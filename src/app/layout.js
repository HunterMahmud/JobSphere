import Navbar from "@/components/shared/Navbar";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "../components/shared/Footer";
import AuthProvider from "@/services/AuthProvider";
import { Toaster } from "react-hot-toast";

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
  title: "Job Sphere",
  description: "Job Sphere is a hiring platform. Find your dream job here.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://i.ibb.co.com/1MkVX5R/logoOnly.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <AuthProvider>
          <div>
            <div className="bg-sky-50">
              <div className="custom-container">
                <Navbar />
              </div>
            </div>
            <div className="lg:min-h-[calc(100vh-287px)] md:min-h-[calc(100vh-355px)] min-h-[calc(100vh-510px)]">
              {children}
            </div>
          </div>
          <div className="bg-sky-50 text-white bg-cover bg-no-repeat">
            <Footer />
          </div>
        </AuthProvider>

        <Toaster />
      </body>
    </html>
  );
}
