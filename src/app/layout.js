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
            <div className="min-h-[calc(100vh-381px)]">
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
