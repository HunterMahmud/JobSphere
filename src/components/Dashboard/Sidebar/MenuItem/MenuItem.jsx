'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItem = ({ label, address, icon: Icon }) => {
  const pathName = usePathname();
    return (
        <Link
            href={address}
            end
            className={`${pathName === address
                ? "bg-gray-300  text-gray-700"
                : "text-gray-600"
                } flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700`}
        >
            <Icon className='w-5 h-5' />

            <span className='mx-4 font-medium'>{label}</span>
        </Link>
    )
}

export default MenuItem;