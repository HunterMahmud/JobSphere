'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathName = usePathname();
    if(pathName.includes('dashboard')) return;

    return (
        <footer className="px-2 md:px-0 divide-y custom-container pt-10">
            <div className="flex flex-col justify-between mx-auto space-y-8 lg:flex-row lg:space-y-0 pb-4">
                <div className="lg:w-3/5">
                    <a href="#" className="flex justify-center space-x-3 lg:justify-start">
                        <span className="self-center text-2xl md:text-3xl font-bold">Job<span className="text-sky-600">Sphere</span></span>
                    </a>
                </div>
                <div className="flex flex-col md:flex-row text-sm md:gap-x-20 gap-y-8">
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase font-semibold">Company</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link href={`/terms`}>Terms of Service</Link>
                            </li>
                            <li>
                                <Link href={`/security`}>Security & Privacy</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3 col-span-2 md:col-span-1 pb-5 md:pb-0">
                        <h3 className="uppercase  font-semibold">Contact Us</h3>
                        <ul className="space-y-1">
                            <li>
                                <a href="#">Helpline: +4401999999999</a>
                            </li>
                            <li>
                                <a href="#">Support: jobsphere@gmail.com</a>
                            </li>
                            <li className="flex gap-1">
                                <a className="" href="#">Address: Dhaka, Bangladesh </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="py-3 md:py-0 flejtax flex-col-reverse md:flex-row mx-auto items-center justify-between">
                <p className="py-3 md:my-2 text-sm text-center mx-auto">© 2024 Job Sphere All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;