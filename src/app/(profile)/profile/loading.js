'use client'
import { ScaleLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-386px)]">
            <ScaleLoader size={100} color="#2557a7" />
        </div>
    );
};

export default Loader;