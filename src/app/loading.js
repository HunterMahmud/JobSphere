'use client'
import { ScaleLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="flex justify-center items-center lg:min-h-[calc(100vh-287px)] md:min-h-[calc(100vh-355px)] min-h-[calc(100vh-510px)] w-full">
            <ScaleLoader size={100} color="#2557a7" />
        </div>
    );
};

export default Loader;