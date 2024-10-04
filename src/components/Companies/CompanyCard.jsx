import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CompanyCard = ({ company }) => {

    const { logo, name, address, companyType, typesOfJobs, salaryScales } = company;

    return (
        <div>
            <div className='mx-2'>
                <div className="bg-sky-50 shadow-2xl p-6 rounded-xl border-l-4 border-sky-600 flex flex-col justify-center md:justify-between hover:border-2 hover:border-sky-500 box-border h-auto max-w-[350px] md:w-auto">
                    <div className="">
                        <div>
                            <Image src={logo} alt='Logo' width={300} height={300} className='rounded-xl border-2 border-sky-400 mx-auto'></Image>
                            <h1 className='text-2xl font-semibold animate-pulse text-center mt-2'>{name}</h1>
                        </div>

                        <div className="text-gray-700 mt-2">
                            <p>
                                <span className="font-bold">Address:</span>{" "}
                                {address}
                            </p>
                            <p className='mt-3'>
                                <span className="font-bold">Company Type:</span>{" "}
                                {companyType}
                            </p>
                            
                        </div>
                        <div className="mt-4">
                            <p className="font-bold">Type of Jobs: <span className="space-x-2 mt-2 flex flex-wrap gap-1">
                                {typesOfJobs.map((type, index) => (
                                    <span
                                        key={index}
                                        className="badge badge-outline  badge-primary bg-sky-100 px-3 py-1 rounded-lg border-2 border-blue-400"
                                    >
                                        {type}
                                    </span>
                                ))}
                            </span>
                            </p>
                            <div className='mt-3'> <span className='font-bold'>Salary Scale:</span>
                                <ul>
                                    {Object.entries(salaryScales).map(([position, salary]) => (
                                        <li key={position} className='mt-2'> {" - "}
                                            <span className='font-bold'>{position.charAt(0).toUpperCase() + position.slice(1).replace(/([A-Z])/g, ' $1')}</span> : {salary}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button className="bg-sky-500 btn hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg w-auto">
                            <Link href={`/jobs`}>View Posted Jobs</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyCard;