'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathName = usePathname();
    if (pathName.includes('dashboard')) return;

    return (
        <footer className="px-2 md:px-0 divide-y custom-container pt-10">
            <div className="flex flex-col justify-between mx-auto space-y-8 lg:flex-row lg:space-y-0 pb-4">
                <div className="lg:w-3/5">
                    <Link href="/" className="flex justify-center space-x-3 lg:justify-start">
                        {/* <span className="self-center text-2xl md:text-3xl font-bold">Job<span className="text-sky-600">Sphere</span></span> */}
                        <Image
                            src={"https://i.ibb.co.com/k0YQWJD/Footer-Logo.png"}
                            alt="Logo"
                            width={150}
                            height={100}
                            className="w-[100px] md:w-[150px]" />
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row text-sm md:text-left text-center justify-center md:gap-x-20 gap-y-8">
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase font-semibold">Company</h3>
                        <ul className="space-y-1 min-w-40">
                            <li>
                                <Link href={`/termsCondition`}>Terms and Conditions</Link>
                            </li>
                            <li>
                                <Link href={`/security`}>Security & Privacy</Link>
                            </li>
                            <li>
                                <Link href={`/aboutus`}>About Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3 col-span-2 min-w-52 md:col-span-1 pb-5 md:pb-0">
                        <h3 className="uppercase  font-semibold">Contact Us</h3>
                        <ul className="space-y-1">
                            <li>
                                <a href="#">Helpline: +4401999999999</a>
                            </li>
                            <li>
                                <a href="#">Support: jobsphere@gmail.com</a>
                            </li>
                            <li className="flex gap-1 md:justify-start justify-center">
                                <a className="" href="#">Address: Dhaka, Bangladesh </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="py-3 md:py-0 flex flex-col-reverse md:flex-row mx-auto items-center justify-between">
                <p className="py-3 md:my-2 text-sm text-center mx-auto">© 2024 Job Sphere all rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;