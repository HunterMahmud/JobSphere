import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./../components/Footer";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
