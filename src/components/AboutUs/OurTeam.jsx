import Image from 'next/image';
import React from 'react';

const OurTeam = () => {
    return (
        <div>
            <div className="mt-16 bg-white md:p-10 rounded-lg shadow-md">
                <h2 className="text-4xl pb-4 font-bold text-center text-gray-800">Our Team</h2>
                <div className=" lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:mx-auto md:justify-center md:items-center">
                    
                    <div className="text-center">
                        <Image
                            src={"https://i.ibb.co.com/WFk4dJ0/Tanvir.jpg"}
                            width={600}
                            height={400}
                            alt="Tanvir Ahamed"
                            className="md:w-32 w-28 h-32 rounded-full mx-auto mb-4 shadow-lg" />
                        <h3 className="text-2xl font-semibold">Tanvir Ahamed</h3>
                        <p className="text-gray-600">Design & Analysis</p>
                        <a href="https://linkedin.com" className="text-primary mt-2 block">LinkedIn</a>
                    </div>

                    <div className="text-center">
                        <Image
                            src={"https://i.ibb.co.com/54M49Z0/Hasan.jpg"}
                            width={600}
                            height={400}
                            alt="Hasan Al Mahmud"
                            className="md:w-32 w-28 h-32 rounded-full mx-auto mb-4 shadow-lg" />
                        <h3 className="text-2xl font-semibold">Hasan Al Mahmud</h3>
                        <p className="text-gray-600">Backend Developer</p>
                        <a href="https://linkedin.com" className="text-primary mt-2 block">LinkedIn</a>
                    </div>

                    <div className="text-center">
                        <Image
                            src={"https://i.ibb.co.com/FH7Yhb6/Rafizul.jpg"}
                            alt="Rafizul Islam"
                            width={600}
                            height={400}
                            className="md:w-32 w-28 h-32 rounded-full mx-auto mb-4 shadow-lg" />
                        <h3 className="text-2xl font-semibold">Rafizul Islam</h3>
                        <p className="text-gray-600">Frontend Developer</p>
                        <a href="https://linkedin.com" className="text-primary mt-2 block">LinkedIn</a>
                    </div>

                    <div className="text-center lg:col-span-2 lg:col-start-1">
                        <Image
                            src={"https://i.ibb.co.com/gz7jjtF/Shamim.jpg"}
                            alt="Md Shamim"
                            width={600}
                            height={400}
                            className="md:w-32 w-28 h-32 rounded-full mx-auto mb-4 shadow-lg" />
                        <h3 className="text-2xl font-semibold">Md Shamim</h3>
                        <p className="text-gray-600">Backend Developer</p>
                        <a href="https://linkedin.com" className="text-primary mt-2 block">LinkedIn</a>
                    </div>

                    <div className="text-center lg:relative lg:right-2/4">
                        <Image
                            src={"https://i.ibb.co.com/Ct6mM6L/Sahidul.jpg"}
                            alt="MD Sahidul Islam"
                            width={600}
                            height={400}
                            className="md:w-32 w-28 h-32 rounded-full mx-auto mb-4 shadow-lg" />

                        <h3 className="text-2xl font-semibold">MD Sahidul Islam</h3>
                        <p className="text-gray-600">Frontend Developer</p>
                        <a href="https://linkedin.com" className="text-primary mt-2 block">LinkedIn</a>
                    </div>
                </div>

               
            </div>
        </div>
    );
};

export default OurTeam;